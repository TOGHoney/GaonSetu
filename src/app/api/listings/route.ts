import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Prisma } from "@prisma/client"

const listingQuerySchema = z.object({
  category: z.string().optional(),
  village: z.string().optional(),
  district: z.string().optional(),
  priceMin: z.string().optional(),
  priceMax: z.string().optional(),
  search: z.string().optional(),
  sort: z
    .enum(["newest", "price-asc", "price-desc", "views"])
    .optional()
    .default("newest"),
  page: z.string().optional(),
  limit: z.string().optional(),
})

const createListingBodySchema = z.object({
  category: z.enum(["CROP", "MILK", "FRUITS_VEGETABLES", "LIVESTOCK", "HANDMADE", "BUSINESS", "OTHER"]),
  title: z.string().min(5).max(200),
  description: z.string().max(2000).optional(),
  price: z.number().min(0),
  priceUnit: z.string().max(50).optional(),
  currency: z.string().default("INR"),
  quantityAvailable: z.number().min(0),
  quantityUnit: z.string().max(50).optional(),
  location: z.string().max(300).optional(),
  village: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().regex(/^\d{6}$/).optional(),
  photos: z.array(z.string().url()).max(10).optional(),
  expiresAt: z.string().optional(),
  cropDetails: z
    .object({
      cropName: z.string().optional(),
      season: z.string().optional(),
      harvestStatus: z.string().optional(),
      isOrganic: z.boolean().optional(),
      expectedHarvestDate: z.string().optional(),
      quantityUnit: z.enum(["kg", "quintal", "ton", "bag"]).optional(),
    })
    .optional(),
  milkDetails: z
    .object({
      milkType: z.enum(["COW", "BUFFALO", "MIXED"]),
      dailyQuantity: z.number().optional(),
      unit: z.string().optional(),
      supplyTime: z.enum(["MORNING", "EVENING", "BOTH"]),
      isRecurring: z.boolean().optional(),
      pricePerLiter: z.number().optional(),
      deliveryOption: z.enum(["PICKUP", "DELIVERY", "BOTH"]),
    })
    .optional(),
  businessDetails: z
    .object({
      businessName: z.string().optional(),
      businessCategory: z.string().optional(),
      servicesOffered: z.any().optional(),
      operatingHours: z.string().optional(),
      homeDelivery: z.boolean().optional(),
      localPickup: z.boolean().optional(),
    })
    .optional(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const parsed = listingQuerySchema.parse({
      category: searchParams.get("category"),
      village: searchParams.get("village"),
      district: searchParams.get("district"),
      priceMin: searchParams.get("priceMin"),
      priceMax: searchParams.get("priceMax"),
      search: searchParams.get("search"),
      sort: searchParams.get("sort"),
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    })

    const page = parseInt(parsed.page || "1")
    const limit = Math.min(parseInt(parsed.limit || "12"), 50)
    const skip = (page - 1) * limit

    const where: Prisma.ListingWhereInput = {
      isActive: true,
    }

    if (parsed.category) {
      where.category = parsed.category as any
    }
    if (parsed.village) {
      where.village = { contains: parsed.village, mode: "insensitive" }
    }
    if (parsed.district) {
      where.district = { contains: parsed.district, mode: "insensitive" }
    }
    if (parsed.priceMin || parsed.priceMax) {
      where.price = {}
      if (parsed.priceMin) where.price.gte = parseFloat(parsed.priceMin)
      if (parsed.priceMax) where.price.lte = parseFloat(parsed.priceMax)
    }
    if (parsed.search) {
      where.OR = [
        { title: { contains: parsed.search, mode: "insensitive" } },
        { description: { contains: parsed.search, mode: "insensitive" } },
      ]
    }

    let orderBy: Prisma.ListingOrderByWithRelationInput
    switch (parsed.sort) {
      case "price-asc":
        orderBy = { price: "asc" }
        break
      case "price-desc":
        orderBy = { price: "desc" }
        break
      case "views":
        orderBy = { views: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          villager: {
            select: {
              id: true,
              name: true,
              profilePhoto: true,
              villagerProfile: {
                select: {
                  village: true,
                  district: true,
                  state: true,
                },
              },
            },
          },
          cropDetails: true,
          milkDetails: true,
          businessDetails: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ])

    return NextResponse.json({
      listings,
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
    console.error("GET /api/listings error:", error)
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
        { error: "Only villagers can create listings" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validated = createListingBodySchema.parse(body)

    const userId = (session.user as any).id

    const villagerProfile = await prisma.villagerProfile.findUnique({
      where: { userId },
    })

    if (!villagerProfile) {
      return NextResponse.json(
        { error: "Villager profile not found" },
        { status: 404 }
      )
    }

    const listing = await prisma.listing.create({
      data: {
        villagerId: userId,
        category: validated.category,
        title: validated.title,
        description: validated.description,
        price: validated.price,
        priceUnit: validated.priceUnit,
        currency: validated.currency,
        quantityAvailable: validated.quantityAvailable,
        quantityUnit: validated.quantityUnit,
        quantityLeft: validated.quantityAvailable,
        location: validated.location,
        village: validated.village || villagerProfile.village,
        district: validated.district || villagerProfile.district,
        state: validated.state || villagerProfile.state,
        pincode: validated.pincode || villagerProfile.pincode,
        photos: validated.photos || [],
        expiresAt: validated.expiresAt ? new Date(validated.expiresAt) : undefined,
        ...(validated.category === "CROP" && validated.cropDetails && {
          cropDetails: {
            create: {
              cropName: validated.cropDetails.cropName,
              season: validated.cropDetails.season,
              harvestStatus: validated.cropDetails.harvestStatus,
              isOrganic: validated.cropDetails.isOrganic ?? false,
              expectedHarvestDate: validated.cropDetails.expectedHarvestDate
                ? new Date(validated.cropDetails.expectedHarvestDate)
                : undefined,
              quantityUnit: validated.cropDetails.quantityUnit,
            },
          },
        }),
        ...(validated.category === "MILK" && validated.milkDetails && {
          milkDetails: {
            create: {
              milkType: validated.milkDetails.milkType,
              dailyQuantity: validated.milkDetails.dailyQuantity,
              unit: validated.milkDetails.unit,
              supplyTime: validated.milkDetails.supplyTime,
              isRecurring: validated.milkDetails.isRecurring ?? false,
              pricePerLiter: validated.milkDetails.pricePerLiter,
              deliveryOption: validated.milkDetails.deliveryOption,
            },
          },
        }),
        ...(validated.category === "BUSINESS" && validated.businessDetails && {
          businessDetails: {
            create: {
              businessName: validated.businessDetails.businessName,
              businessCategory: validated.businessDetails.businessCategory,
              servicesOffered: validated.businessDetails.servicesOffered,
              operatingHours: validated.businessDetails.operatingHours,
              homeDelivery: validated.businessDetails.homeDelivery ?? false,
              localPickup: validated.businessDetails.localPickup ?? false,
            },
          },
        }),
      },
      include: {
        villager: {
          select: { id: true, name: true, profilePhoto: true },
        },
        cropDetails: true,
        milkDetails: true,
        businessDetails: true,
      },
    })

    await prisma.villagerProfile.update({
      where: { userId },
      data: { totalListings: { increment: 1 } },
    })

    return NextResponse.json({ listing }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    console.error("POST /api/listings error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
