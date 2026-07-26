import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { trackingId: string } }
) {
  try {
    const { trackingId } = params

    const complaint = await prisma.complaint.findUnique({
      where: { trackingId },
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        priority: true,
        trackingId: true,
        village: true,
        district: true,
        dateOfIssue: true,
        createdAt: true,
        updatedAt: true,
        resolutionNotes: true,
      },
    })

    if (!complaint) {
      return NextResponse.json(
        { error: "Complaint not found with this tracking ID" },
        { status: 404 }
      )
    }

    const auditLogs = await prisma.auditLog.findMany({
      where: {
        entityType: "Complaint",
        entityId: complaint.id,
      },
      orderBy: { createdAt: "asc" },
      select: {
        action: true,
        changes: true,
        createdAt: true,
      },
    })

    const timeline: { status: string; date: Date; remarks?: string }[] = [
      { status: "SUBMITTED", date: complaint.createdAt },
    ]

    for (const log of auditLogs) {
      const changes = log.changes as Record<string, any> | null
      if (changes?.newStatus) {
        timeline.push({
          status: changes.newStatus,
          date: log.createdAt,
          remarks: changes.remarks ?? undefined,
        })
      }
    }

    return NextResponse.json({
      status: complaint.status,
      title: complaint.title,
      category: complaint.category,
      dateOfIssue: complaint.dateOfIssue,
      timeline,
    })
  } catch (error) {
    console.error("GET /api/complaints/track/[trackingId] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
