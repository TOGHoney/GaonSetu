import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can list users" },
        { status: 403 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search")
    const role = searchParams.get("role")
    const isActive = searchParams.get("isActive")
    const isVerified = searchParams.get("isVerified")
    const isSuspended = searchParams.get("isSuspended")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Prisma.UserWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ]
    }
    if (role) {
      where.role = role as any
    }
    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === "true"
    }
    if (isVerified !== null && isVerified !== undefined) {
      where.isVerified = isVerified === "true"
    }
    if (isSuspended !== null && isSuspended !== undefined) {
      where.isSuspended = isSuspended === "true"
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
          isActive: true,
          isSuspended: true,
          profilePhoto: true,
          createdAt: true,
          villagerProfile: {
            select: {
              village: true,
              district: true,
              state: true,
            },
          },
          consumerProfile: {
            select: {
              city: true,
              state: true,
            },
          },
          adminProfile: {
            select: {
              department: true,
              designation: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("GET /api/users error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
