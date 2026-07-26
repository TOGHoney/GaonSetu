"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Save, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const editSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required"),
  cropName: z.string().optional(),
  season: z.string().optional(),
  harvestStatus: z.string().optional(),
  isOrganic: z.boolean().optional(),
  availability: z.string(),
})

type EditFormValues = z.infer<typeof editSchema>

const mockListing = {
  id: "1",
  title: "Fresh Organic Wheat Flour",
  description: "Premium quality wheat flour ground from organically grown wheat. No chemicals or preservatives used. Direct from farm to your kitchen. Rich in fiber and nutrients.",
  category: "CROP",
  price: 45,
  quantity: "500",
  unit: "kg",
  cropName: "Wheat",
  season: "Rabi",
  harvestStatus: "Harvested",
  isOrganic: true,
  availability: "IN_STOCK",
}

export default function EditListing() {
  const router = useRouter()
  const params = useParams()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: mockListing.title,
      description: mockListing.description,
      price: mockListing.price,
      quantity: mockListing.quantity,
      unit: mockListing.unit,
      cropName: mockListing.cropName,
      season: mockListing.season,
      harvestStatus: mockListing.harvestStatus,
      isOrganic: mockListing.isOrganic,
      availability: mockListing.availability,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: EditFormValues) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    router.push("/villager/listings")
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/villager/listings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-xl font-bold text-text-primary">Edit Listing</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} className="mt-1" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} className="mt-1" rows={4} />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
            </div>
            <div>
              <Label>Availability</Label>
              <Select value={watch("availability")} onValueChange={(v) => setValue("availability", v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_STOCK">Active (In Stock)</SelectItem>
                  <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                  <SelectItem value="PRE_ORDER">Pre-Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Pricing & Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" {...register("price", { valueAsNumber: true })} className="mt-1" />
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" {...register("quantity")} className="mt-1" />
                {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={watch("unit")} onValueChange={(v) => setValue("unit", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="quintal">Quintal</SelectItem>
                    <SelectItem value="ton">Ton</SelectItem>
                    <SelectItem value="bag">Bag</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="liter">Liter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Crop Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cropName">Crop Name</Label>
                <Input id="cropName" {...register("cropName")} className="mt-1" />
              </div>
              <div>
                <Label>Season</Label>
                <Select value={watch("season")} onValueChange={(v) => setValue("season", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kharif">Kharif (Monsoon)</SelectItem>
                    <SelectItem value="Rabi">Rabi (Winter)</SelectItem>
                    <SelectItem value="Zaid">Zaid (Summer)</SelectItem>
                    <SelectItem value="Year Round">Year Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Harvest Status</Label>
                <Select value={watch("harvestStatus")} onValueChange={(v) => setValue("harvestStatus", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ready to Harvest">Ready to Harvest</SelectItem>
                    <SelectItem value="Harvested">Harvested</SelectItem>
                    <SelectItem value="Growing">Growing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="isOrganic"
                  checked={watch("isOrganic")}
                  onChange={(e) => setValue("isOrganic", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-500"
                />
                <Label htmlFor="isOrganic" className="cursor-pointer">Certified Organic</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Camera className="mx-auto h-8 w-8 text-muted" />
                <p className="mt-2 text-sm text-text-secondary">Click to upload photos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/villager/listings">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
