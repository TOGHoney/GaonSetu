import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const assignSchema = z.object({
  assignedTo: z.string().min(1, "Assigned user ID is required"),
})

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
        { error: "Only admins can assign complaints" },
        { status: 403 }
      )
    }

    const { id } = params
    const body = await request.json()
    const validated = assignSchema.parse(body)

    const existing = await prisma.complaint.findUnique({
      where: { id },
      select: { id: true, status: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      )
    }

    const assignee = await prisma.user.findUnique({
      where: { id: validated.assignedTo },
      select: { id: true, role: true, name: true },
    })

    if (!assignee) {
      return NextResponse.json(
        { error: "Assignee not found" },
        { status: 404 }
      )
    }

    const complaint = await prisma.complaint.update({
      where: { id },
      data: {
        assignedTo: validated.assignedTo,
        status: "ASSIGNED",
      },
      include: {
        villager: {
          select: { id: true, name: true },
        },
        assignedUser: {
          select: {
            id: true,
            name: true,
            adminProfile: {
              select: {
                department: true,
                designation: true,
              },
            },
          },
        },
      },
    })

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "UPDATE",
        entityType: "Complaint",
        entityId: id,
        changes: {
          previousStatus: existing.status,
          newStatus: "ASSIGNED",
          assignedTo: validated.assignedTo,
          assigneeName: assignee.name,
        },
      },
    })

    return NextResponse.json({ complaint })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    console.error("PUT /api/complaints/[id]/assign error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
