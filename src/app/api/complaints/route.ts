import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

function generateTrackingId(): string {
  const year = new Date().getFullYear()
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `GSC-${year}-${code}`
}

const complaintQuerySchema = z.object({
  status: z.string().optional(),
  category: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
})

const createComplaintSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().max(2000).optional(),
  category: z.enum([
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
  ]),
  village: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().regex(/^\d{6}$/).optional(),
  dateOfIssue: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  isAnonymous: z.boolean().optional(),
  contactPhone: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  media: z
    .array(
      z.object({
        type: z.enum(["PHOTO", "VIDEO"]),
        fileUrl: z.string().url(),
        thumbnailUrl: z.string().url().optional(),
      })
    )
    .max(5)
    .optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const userRole = (session.user as any).role
    const searchParams = request.nextUrl.searchParams

    const parsed = complaintQuerySchema.parse({
      status: searchParams.get("status"),
      category: searchParams.get("category"),
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    })

    const page = parseInt(parsed.page || "1")
    const limit = Math.min(parseInt(parsed.limit || "12"), 50)
    const skip = (page - 1) * limit

    const where: any = {}

    if (userRole === "VILLAGER") {
      where.villagerId = userId
    } else if (userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      )
    }

    if (parsed.status) {
      where.status = parsed.status
    }
    if (parsed.category) {
      where.category = parsed.category
    }

    const [complaints, total] = await Promise.all([
      prisma.complaint.findMany({
        where,
        include: {
          villager: {
            select: {
              id: true,
              name: true,
              profilePhoto: true,
            },
          },
          assignedUser: {
            select: {
              id: true,
              name: true,
            },
          },
          media: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.complaint.count({ where }),
    ])

    return NextResponse.json({
      complaints,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      )
    }
    console.error("GET /api/complaints error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if ((session.user as any).role !== "VILLAGER") {
      return NextResponse.json(
        { error: "Only villagers can submit complaints" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validated = createComplaintSchema.parse(body)

    const userId = (session.user as any).id
    const trackingId = generateTrackingId()

    const complaint = await prisma.complaint.create({
      data: {
        villagerId: userId,
        title: validated.title,
        description: validated.description,
        category: validated.category,
        village: validated.village,
        district: validated.district,
        state: validated.state,
        pincode: validated.pincode,
        dateOfIssue: validated.dateOfIssue ? new Date(validated.dateOfIssue) : undefined,
        priority: validated.priority,
        trackingId,
        isAnonymous: validated.isAnonymous ?? false,
        contactPhone: validated.contactPhone,
        latitude: validated.latitude,
        longitude: validated.longitude,
        ...(validated.media && validated.media.length > 0 && {
          media: {
            create: validated.media.map((m) => ({
              type: m.type,
              fileUrl: m.fileUrl,
              thumbnailUrl: m.thumbnailUrl,
            })),
          },
        }),
      },
      include: {
        villager: {
          select: { id: true, name: true },
        },
        media: true,
      },
    })

    await prisma.villagerProfile.update({
      where: { userId },
      data: { totalComplaints: { increment: 1 } },
    })

    return NextResponse.json(
      { complaint, trackingId },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    console.error("POST /api/complaints error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
