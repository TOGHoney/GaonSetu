import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"]
const IMAGE_MAX_SIZE = 5 * 1024 * 1024
const VIDEO_MAX_SIZE = 50 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type)
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type)

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed: jpg, png, webp, mp4, webm`,
        },
        { status: 400 }
      )
    }

    if (isImage && file.size > IMAGE_MAX_SIZE) {
      return NextResponse.json(
        { error: "Image exceeds 5MB size limit" },
        { status: 400 }
      )
    }

    if (isVideo && file.size > VIDEO_MAX_SIZE) {
      return NextResponse.json(
        { error: "Video exceeds 50MB size limit" },
        { status: 400 }
      )
    }

    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const mockUrl = `https://res.cloudinary.com/demo/image/upload/sample_${timestamp}_${safeName}`

    return NextResponse.json({
      url: mockUrl,
      type: isImage ? "image" : "video",
    })
  } catch (error) {
    console.error("POST /api/upload error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
