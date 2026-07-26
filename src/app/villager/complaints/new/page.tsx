"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Send,
  Upload,
  MapPin,
  Camera,
  Video,
  CheckCircle,
  Copy,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateTrackingId } from "@/lib/utils"
import Link from "next/link"

const complaintSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  category: z.string().min(1, "Category is required"),
  village: z.string().min(1, "Village is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  dateOfIssue: z.string().min(1, "Date is required"),
  priority: z.string().min(1, "Priority is required"),
  contactPhone: z.string().min(10, "Phone is required"),
})

type ComplaintFormValues = z.infer<typeof complaintSchema>

export default function NewComplaint() {
  const router = useRouter()
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [trackingId, setTrackingId] = useState("")
  const [gpsLocation, setGpsLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      village: "Rampur",
      district: "Alwar",
      state: "Rajasthan",
      pincode: "301001",
      dateOfIssue: new Date().toISOString().split("T")[0],
      priority: "",
      contactPhone: "9876543210",
    },
  })

  const descriptionLength = watch("description")?.length || 0

  const captureGPS = () => {
    setGpsLocation("28.6139° N, 77.2090° E")
  }

  const onSubmit = async (data: ComplaintFormValues) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setTrackingId(generateTrackingId())
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-text-primary">Complaint Submitted!</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Your complaint has been successfully submitted. Use the tracking ID to check status.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 py-2">
              <span className="text-sm font-semibold text-primary-700">{trackingId}</span>
              <button onClick={copyTrackingId} className="rounded p-1 hover:bg-primary-100">
                <Copy className="h-4 w-4 text-primary-600" />
              </button>
            </div>
            <div className="mt-6 flex gap-3">
              <Link href="/villager/complaints">
                <Button variant="outline">View Complaints</Button>
              </Link>
              <Link href="/villager/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/villager/complaints">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-xl font-bold text-text-primary">Raise New Complaint</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Complaint Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} placeholder="Brief title of your complaint" className="mt-1" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe the issue in detail..."
                className="mt-1"
                rows={5}
              />
              <div className="mt-1 flex items-center justify-between">
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                <p className={`ml-auto text-xs ${descriptionLength > 1800 ? "text-red-500" : "text-text-secondary"}`}>
                  {descriptionLength}/2000
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Category</Label>
                <Select value={watch("category")} onValueChange={(v) => setValue("category", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WATER">Water Supply</SelectItem>
                    <SelectItem value="ELECTRICITY">Electricity</SelectItem>
                    <SelectItem value="ROAD">Roads & Infrastructure</SelectItem>
                    <SelectItem value="SANITATION">Sanitation & Cleanliness</SelectItem>
                    <SelectItem value="AGRICULTURE">Agriculture</SelectItem>
                    <SelectItem value="HEALTH">Healthcare</SelectItem>
                    <SelectItem value="EDUCATION">Education</SelectItem>
                    <SelectItem value="RATION">Ration & Supplies</SelectItem>
                    <SelectItem value="CORRUPTION">Corruption</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={watch("priority")} onValueChange={(v) => setValue("priority", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && <p className="mt-1 text-xs text-red-500">{errors.priority.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="village">Village</Label>
                <Input id="village" {...register("village")} className="mt-1" />
                {errors.village && <p className="mt-1 text-xs text-red-500">{errors.village.message}</p>}
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="dateOfIssue">Date of Issue</Label>
                <Input id="dateOfIssue" type="date" {...register("dateOfIssue")} className="mt-1" />
                {errors.dateOfIssue && <p className="mt-1 text-xs text-red-500">{errors.dateOfIssue.message}</p>}
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" {...register("contactPhone")} className="mt-1" />
                {errors.contactPhone && <p className="mt-1 text-xs text-red-500">{errors.contactPhone.message}</p>}
              </div>
            </div>
            <Button type="button" variant="outline" onClick={captureGPS} className="gap-2">
              <MapPin className="h-4 w-4" />
              {gpsLocation ? `GPS: ${gpsLocation}` : "Capture GPS Location"}
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Media Evidence (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Photos</Label>
              <div className="mt-2 flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 cursor-pointer transition-colors">
                <div className="text-center">
                  <Camera className="mx-auto h-8 w-8 text-muted" />
                  <p className="mt-2 text-sm text-text-secondary">Click to upload photos</p>
                </div>
              </div>
            </div>
            <div>
              <Label>Video</Label>
              <div className="mt-2 flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 cursor-pointer transition-colors">
                <div className="text-center">
                  <Video className="mx-auto h-8 w-8 text-muted" />
                  <p className="mt-2 text-sm text-text-secondary">Click to upload video</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-text-primary">Submit Anonymously</p>
              <p className="text-xs text-text-secondary">Your identity will be hidden from public view</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`relative h-6 w-11 rounded-full transition-colors ${isAnonymous ? "bg-primary-500" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${isAnonymous ? "translate-x-5" : ""}`}
              />
            </button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </div>
      </form>
    </div>
  )
}
