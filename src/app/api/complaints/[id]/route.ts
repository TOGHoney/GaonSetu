import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateComplaintSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  description: z.string().max(2000).optional(),
  category: z
    .enum([
      "WATER",
      "ELECTRICITY",
      "ROAD",
      "SANITATION",
      "AGRICULTURE",
      "HEALTH",
      "EDUCATION",
      "RATION",
      "CORRUPTION",
      "OTHER",
    ])
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  resolutionNotes: z.string().max(2000).optional(),
  village: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().regex(/^\d{6}$/).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    const complaint = await prisma.complaint.findUnique({
      where: { id },
      include: {
        villager: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profilePhoto: true,
          },
        },
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
            adminProfile: {
              select: {
                department: true,
                designation: true,
              },
            },
          },
        },
        media: true,
      },
    })

    if (!complaint) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      )
    }

    const userRole = (session.user as any).role
    const userId = (session.user as any).id

    if (userRole === "VILLAGER" && complaint.villagerId !== userId) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      )
    }

    return NextResponse.json({ complaint })
  } catch (error) {
    console.error("GET /api/complaints/[id] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

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
        { error: "Only admins can update complaints" },
        { status: 403 }
      )
    }

    const { id } = params

    const existing = await prisma.complaint.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validated = updateComplaintSchema.parse(body)

    const data: Record<string, any> = {}
    if (validated.title !== undefined) data.title = validated.title
    if (validated.description !== undefined) data.description = validated.description
    if (validated.category !== undefined) data.category = validated.category
    if (validated.priority !== undefined) data.priority = validated.priority
    if (validated.resolutionNotes !== undefined) data.resolutionNotes = validated.resolutionNotes
    if (validated.village !== undefined) data.village = validated.village
    if (validated.district !== undefined) data.district = validated.district
    if (validated.state !== undefined) data.state = validated.state
    if (validated.pincode !== undefined) data.pincode = validated.pincode

    const complaint = await prisma.complaint.update({
      where: { id },
      data,
      include: {
        villager: {
          select: { id: true, name: true },
        },
        assignedUser: {
          select: { id: true, name: true },
        },
        media: true,
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
    console.error("PUT /api/complaints/[id] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
