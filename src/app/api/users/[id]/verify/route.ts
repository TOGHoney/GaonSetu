import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can verify users" },
        { status: 403 }
      )
    }

    const { id } = params

    const existing = await prisma.user.findUnique({
      where: { id },
      select: { id: true, isVerified: true, name: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
      },
    })

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "VERIFY",
        entityType: "User",
        entityId: id,
        changes: {
          wasVerified: existing.isVerified,
          nowVerified: true,
          userName: existing.name,
        },
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("PUT /api/users/[id]/verify error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
