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
        { error: "Only admins can update announcements" },
        { status: 403 }
      )
    }

    const { id } = params

    const existing = await prisma.announcement.findUnique({
      where: { id },
      select: { id: true, isPublished: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, body: announcementBody, type, targetRole, targetArea, isPublished, expiresAt } = body

    const updateData: Record<string, any> = {}
    if (title !== undefined) updateData.title = title
    if (announcementBody !== undefined) updateData.body = announcementBody
    if (type !== undefined) updateData.type = type
    if (targetRole !== undefined) updateData.targetRole = targetRole
    if (targetArea !== undefined) updateData.targetArea = targetArea
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished
      if (isPublished && !existing.isPublished) {
        updateData.publishedAt = new Date()
      }
    }
    if (expiresAt !== undefined) {
      updateData.expiresAt = expiresAt ? new Date(expiresAt) : null
    }

    const announcement = await prisma.announcement.update({
      where: { id },
      data: updateData,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ announcement })
  } catch (error) {
    console.error("PUT /api/admin/announcements/[id] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
        { error: "Only admins can delete announcements" },
        { status: 403 }
      )
    }

    const { id } = params

    const existing = await prisma.announcement.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      )
    }

    await prisma.announcement.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Announcement deleted successfully" })
  } catch (error) {
    console.error("DELETE /api/admin/announcements/[id] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
