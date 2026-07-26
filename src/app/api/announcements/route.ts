import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type")

    const where: Prisma.AnnouncementWhereInput = {
      isPublished: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    }

    if (type) {
      where.type = type as any
    }

    const announcements = await prisma.announcement.findMany({
      where,
      select: {
        id: true,
        title: true,
        body: true,
        type: true,
        targetRole: true,
        targetArea: true,
        publishedAt: true,
        expiresAt: true,
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { publishedAt: "desc" },
    })

    return NextResponse.json({ announcements })
  } catch (error) {
    console.error("GET /api/announcements error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
