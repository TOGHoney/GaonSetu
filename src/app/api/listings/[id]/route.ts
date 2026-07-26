import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateListingSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  description: z.string().max(2000).optional(),
  price: z.number().min(0).optional(),
  priceUnit: z.string().max(50).optional(),
  quantityAvailable: z.number().min(0).optional(),
  quantityUnit: z.string().max(50).optional(),
  location: z.string().max(300).optional(),
  village: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().regex(/^\d{6}$/).optional(),
  photos: z.array(z.string().url()).max(10).optional(),
  isActive: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        villager: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profilePhoto: true,
            villagerProfile: {
              select: {
                village: true,
                panchayat: true,
                district: true,
                state: true,
                pincode: true,
                occupation: true,
                farmingType: true,
                dairyActivity: true,
                smallBusinessCategory: true,
                bio: true,
              },
            },
          },
        },
        cropDetails: true,
        milkDetails: true,
        businessDetails: true,
      },
    })

    if (!listing || !listing.isActive) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      )
    }

    await prisma.listing.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({
      listing: { ...listing, views: listing.views + 1 },
    })
  } catch (error) {
    console.error("GET /api/listings/[id] error:", error)
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

    const { id } = params
    const userId = (session.user as any).id
    const userRole = (session.user as any).role

    const existing = await prisma.listing.findUnique({
      where: { id },
      select: { villagerId: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      )
    }

    if (existing.villagerId !== userId && userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only update your own listings" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validated = updateListingSchema.parse(body)

    const data: Record<string, any> = {}
    if (validated.title !== undefined) data.title = validated.title
    if (validated.description !== undefined) data.description = validated.description
    if (validated.price !== undefined) data.price = validated.price
    if (validated.priceUnit !== undefined) data.priceUnit = validated.priceUnit
    if (validated.quantityAvailable !== undefined) data.quantityAvailable = validated.quantityAvailable
    if (validated.quantityUnit !== undefined) data.quantityUnit = validated.quantityUnit
    if (validated.location !== undefined) data.location = validated.location
    if (validated.village !== undefined) data.village = validated.village
    if (validated.district !== undefined) data.district = validated.district
    if (validated.state !== undefined) data.state = validated.state
    if (validated.pincode !== undefined) data.pincode = validated.pincode
    if (validated.photos !== undefined) data.photos = validated.photos
    if (validated.isActive !== undefined) data.isActive = validated.isActive

    const listing = await prisma.listing.update({
      where: { id },
      data,
      include: {
        villager: {
          select: { id: true, name: true, profilePhoto: true },
        },
        cropDetails: true,
        milkDetails: true,
        businessDetails: true,
      },
    })

    return NextResponse.json({ listing })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    console.error("PUT /api/listings/[id] error:", error)
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

    const { id } = params
    const userId = (session.user as any).id
    const userRole = (session.user as any).role

    const existing = await prisma.listing.findUnique({
      where: { id },
      select: { villagerId: true },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      )
    }

    if (existing.villagerId !== userId && userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only delete your own listings" },
        { status: 403 }
      )
    }

    await prisma.listing.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ message: "Listing deleted successfully" })
  } catch (error) {
    console.error("DELETE /api/listings/[id] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
