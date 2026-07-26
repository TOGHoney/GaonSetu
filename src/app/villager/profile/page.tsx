"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Save, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import VerifiedBadge from "@/components/common/VerifiedBadge"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  village: z.string().min(1, "Village is required"),
  panchayat: z.string().min(1, "Panchayat is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  farmingType: z.string().optional(),
  landholdingType: z.string().optional(),
  dairyActivity: z.string().optional(),
  smallBusinessCategory: z.string().optional(),
  bio: z.string().optional(),
  aadhaarNumber: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

const mockProfile: ProfileFormValues = {
  name: "Ramesh Kumar",
  email: "ramesh.kumar@email.com",
  phone: "9876543210",
  village: "Rampur",
  panchayat: "Rampur Gram Panchayat",
  district: "Alwar",
  state: "Rajasthan",
  pincode: "301001",
  farmingType: "Mixed Farming",
  landholdingType: "Small (1-2 hectares)",
  dairyActivity: "Yes - Buffalo",
  smallBusinessCategory: "",
  bio: "Experienced farmer with 15 years of farming. Specialize in organic wheat and mustard cultivation.",
  aadhaarNumber: "",
}

export default function VillagerProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockProfile,
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {saved && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Profile saved successfully!
        </div>
      )}

      {/* Profile Photo */}
      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600">
              RK
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-md hover:bg-primary-600">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">{watch("name")}</h2>
            <p className="text-sm text-text-secondary">{watch("village")}, {watch("district")}</p>
            <div className="mt-1">
              <VerifiedBadge size="sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} className="mt-1" />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} disabled className="mt-1 bg-gray-50" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} className="mt-1" />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="village">Village</Label>
                <Input id="village" {...register("village")} className="mt-1" />
                {errors.village && <p className="mt-1 text-xs text-red-500">{errors.village.message}</p>}
              </div>
              <div>
                <Label htmlFor="panchayat">Panchayat</Label>
                <Input id="panchayat" {...register("panchayat")} className="mt-1" />
                {errors.panchayat && <p className="mt-1 text-xs text-red-500">{errors.panchayat.message}</p>}
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input id="district" {...register("district")} className="mt-1" />
                {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district.message}</p>}
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register("state")} className="mt-1" />
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" {...register("pincode")} className="mt-1" />
                {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Occupation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Farming Type</Label>
                <Select value={watch("farmingType")} onValueChange={(v) => setValue("farmingType", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select farming type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Crop Farming">Crop Farming</SelectItem>
                    <SelectItem value="Mixed Farming">Mixed Farming</SelectItem>
                    <SelectItem value="Organic Farming">Organic Farming</SelectItem>
                    <SelectItem value="Horticulture">Horticulture</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Landholding Type</Label>
                <Select value={watch("landholdingType")} onValueChange={(v) => setValue("landholdingType", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select landholding" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marginal (<1 hectare)">Marginal (&lt;1 hectare)</SelectItem>
                    <SelectItem value="Small (1-2 hectares)">Small (1-2 hectares)</SelectItem>
                    <SelectItem value="Semi-Medium (2-4 hectares)">Semi-Medium (2-4 hectares)</SelectItem>
                    <SelectItem value="Medium (4-10 hectares)">Medium (4-10 hectares)</SelectItem>
                    <SelectItem value="Large (>10 hectares)">Large (&gt;10 hectares)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Dairy Activity</Label>
                <Select value={watch("dairyActivity")} onValueChange={(v) => setValue("dairyActivity", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select dairy activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Yes - Cow">Yes - Cow</SelectItem>
                    <SelectItem value="Yes - Buffalo">Yes - Buffalo</SelectItem>
                    <SelectItem value="Yes - Mixed">Yes - Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Small Business Category</Label>
                <Select value={watch("smallBusinessCategory")} onValueChange={(v) => setValue("smallBusinessCategory", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tailoring">Tailoring</SelectItem>
                    <SelectItem value="Grocery Shop">Grocery Shop</SelectItem>
                    <SelectItem value="Food Stall">Food Stall</SelectItem>
                    <SelectItem value="Repair Services">Repair Services</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" {...register("bio")} placeholder="Tell consumers about yourself..." className="mt-1" rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Aadhaar Verification */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary-500" />
              Aadhaar Verification (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
              <Input id="aadhaarNumber" {...register("aadhaarNumber")} placeholder="12-digit Aadhaar number" className="mt-1" />
              {errors.aadhaarNumber && <p className="mt-1 text-xs text-red-500">{errors.aadhaarNumber.message}</p>}
              <p className="mt-2 text-xs text-text-secondary">
                Verifying your Aadhaar builds trust with consumers. Your number is stored securely and not shared publicly.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
