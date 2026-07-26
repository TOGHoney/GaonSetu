import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const flagSchema = z.object({
  reason: z
    .string()
    .min(1, "Reason is required")
    .max(500, "Reason must be less than 500 characters"),
})

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if ((session.user as any).role !== "CONSUMER") {
      return NextResponse.json(
        { error: "Only consumers can flag listings" },
        { status: 403 }
      )
    }

    const { id } = params
    const body = await request.json()
    const validated = flagSchema.parse(body)

    const listing = await prisma.listing.findUnique({
      where: { id },
      select: { id: true, isFlagged: true, villagerId: true },
    })

    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      )
    }

    if (listing.villagerId === (session.user as any).id) {
      return NextResponse.json(
        { error: "You cannot flag your own listing" },
        { status: 400 }
      )
    }

    if (listing.isFlagged) {
      return NextResponse.json(
        { error: "Listing is already flagged" },
        { status: 400 }
      )
    }

    await prisma.listing.update({
      where: { id },
      data: { isFlagged: true },
    })

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "UPDATE",
        entityType: "Listing",
        entityId: id,
        changes: { flagged: true, reason: validated.reason },
      },
    })

    return NextResponse.json({ message: "Listing flagged successfully" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    console.error("POST /api/listings/[id]/flag error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
