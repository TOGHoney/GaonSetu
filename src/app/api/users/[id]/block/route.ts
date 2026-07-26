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
        { error: "Only admins can block users" },
        { status: 403 }
      )
    }

    const { id } = params

    if (id === (session.user as any).id) {
      return NextResponse.json(
        { error: "You cannot block your own account" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { id },
      select: { id: true, isActive: true, name: true, role: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    if (existing.role === "ADMIN") {
      return NextResponse.json(
        { error: "Cannot block another admin" },
        { status: 400 }
      )
    }

    const newActiveState = !existing.isActive
    const user = await prisma.user.update({
      where: { id },
      data: {
        isActive: newActiveState,
        ...(newActiveState === false && { isSuspended: false }),
      },
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    })

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "BLOCK",
        entityType: "User",
        entityId: id,
        changes: {
          wasActive: existing.isActive,
          nowActive: user.isActive,
          userName: existing.name,
        },
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("PUT /api/users/[id]/block error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
