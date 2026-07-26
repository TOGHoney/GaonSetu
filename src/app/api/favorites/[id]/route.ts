import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { id } = params

    const existing = await prisma.favorite.findUnique({
      where: { id },
      select: { id: true, userId: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      )
    }

    if (existing.userId !== userId) {
      return NextResponse.json(
        { error: "You can only remove your own favorites" },
        { status: 403 }
      )
    }

    await prisma.favorite.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Favorite removed successfully" })
  } catch (error) {
    console.error("DELETE /api/favorites/[id] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
