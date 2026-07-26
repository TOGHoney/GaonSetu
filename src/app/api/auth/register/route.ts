import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{9,14}$/).optional(),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z.string(),
    role: z.enum(["VILLAGER", "CONSUMER"]),
    village: z.string().max(200).optional(),
    panchayat: z.string().max(200).optional(),
    district: z.string().max(200).optional(),
    state: z.string().max(100).optional(),
    pincode: z.string().regex(/^\d{6}$/).optional(),
    city: z.string().max(200).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "VILLAGER") {
        return !!data.village && !!data.panchayat && !!data.district && !!data.state && !!data.pincode
      }
      return true
    },
    { message: "Villager requires village, panchayat, district, state, and pincode" }
  )
  .refine(
    (data) => {
      if (data.role === "CONSUMER") {
        return !!data.city && !!data.state && !!data.pincode
      }
      return true
    },
    { message: "Consumer requires city, state, and pincode" }
  )

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = registerSchema.parse(body)

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validated.email },
          ...(validated.phone ? [{ phone: validated.phone }] : []),
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            existingUser.email === validated.email
              ? "Email already registered"
              : "Phone number already registered",
        },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(validated.password, 12)

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone || undefined,
        passwordHash,
        role: validated.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    if (validated.role === "VILLAGER") {
      await prisma.villagerProfile.create({
        data: {
          userId: user.id,
          village: validated.village,
          panchayat: validated.panchayat,
          district: validated.district,
          state: validated.state,
          pincode: validated.pincode,
        },
      })
    } else if (validated.role === "CONSUMER") {
      await prisma.consumerProfile.create({
        data: {
          userId: user.id,
          city: validated.city,
          state: validated.state,
          pincode: validated.pincode,
          favoriteIds: [],
        },
      })
    }

    return NextResponse.json(
      { message: "Registration successful", user },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    console.error("POST /api/auth/register error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
