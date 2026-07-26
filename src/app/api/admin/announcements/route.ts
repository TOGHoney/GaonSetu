import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const announcementTypeMap: Record<string, string> = {
  GENERAL: "NOTICE",
  EVENT: "NOTICE",
  SCHEME: "SCHEME",
  EMERGENCY: "EMERGENCY",
  GOVERNMENT: "NOTICE",
  COMMUNITY: "NOTICE",
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Prisma.AnnouncementWhereInput = {
      isPublished: true,
    }

    if (type) {
      where.type = announcementTypeMap[type] as any || type
    }

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              profilePhoto: true,
            },
          },
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.announcement.count({ where }),
    ])

    return NextResponse.json({
      announcements,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("GET /api/admin/announcements error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can create announcements" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, body: announcementBody, type, targetRole, targetArea, isPublished, expiresAt } = body

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const mappedType = announcementTypeMap[type] || "NOTICE"

    const announcement = await prisma.announcement.create({
      data: {
        adminId: (session.user as any).id,
        title,
        body: announcementBody || undefined,
        type: mappedType as any,
        targetRole: targetRole || undefined,
        targetArea: targetArea || undefined,
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ announcement }, { status: 201 })
  } catch (error) {
    console.error("POST /api/admin/announcements error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
