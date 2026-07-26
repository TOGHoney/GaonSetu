import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const statusSchema = z.object({
  status: z.enum([
    "SUBMITTED",
    "RECEIVED",
    "UNDER_REVIEW",
    "ASSIGNED",
    "IN_PROGRESS",
    "RESOLVED",
    "REJECTED",
    "REOPENED",
  ]),
  remarks: z
    .string()
    .max(500, "Remarks must be less than 500 characters")
    .optional(),
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
        { error: "Only admins can update complaint status" },
        { status: 403 }
      )
    }

    const { id } = params
    const body = await request.json()
    const validated = statusSchema.parse(body)

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

    const complaint = await prisma.complaint.update({
      where: { id },
      data: {
        status: validated.status,
        ...(validated.remarks && { resolutionNotes: validated.remarks }),
      },
      include: {
        villager: {
          select: { id: true, name: true },
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
          newStatus: validated.status,
          remarks: validated.remarks,
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
    console.error("PUT /api/complaints/[id]/status error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
