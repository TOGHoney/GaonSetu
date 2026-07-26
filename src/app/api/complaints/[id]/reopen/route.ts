import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if ((session.user as any).role !== "VILLAGER") {
      return NextResponse.json(
        { error: "Only villagers can reopen complaints" },
        { status: 403 }
      )
    }

    const { id } = params
    const userId = (session.user as any).id

    const existing = await prisma.complaint.findUnique({
      where: { id },
      select: {
        id: true,
        villagerId: true,
        status: true,
      },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      )
    }

    if (existing.villagerId !== userId) {
      return NextResponse.json(
        { error: "You can only reopen your own complaints" },
        { status: 403 }
      )
    }

    if (existing.status !== "RESOLVED" && existing.status !== "REJECTED") {
      return NextResponse.json(
        { error: "Complaint can only be reopened if it is resolved or rejected" },
        { status: 400 }
      )
    }

    const complaint = await prisma.complaint.update({
      where: { id },
      data: {
        status: "REOPENED",
        resolutionNotes: null,
      },
      include: {
        villager: {
          select: { id: true, name: true },
        },
      },
    })

    await prisma.auditLog.create({
      data: {
        userId,
        action: "UPDATE",
        entityType: "Complaint",
        entityId: id,
        changes: {
          previousStatus: existing.status,
          newStatus: "REOPENED",
          reopenedBy: userId,
        },
      },
    })

    return NextResponse.json({ complaint })
  } catch (error) {
    console.error("POST /api/complaints/[id]/reopen error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
