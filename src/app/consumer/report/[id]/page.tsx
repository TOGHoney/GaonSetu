"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  AlertTriangle,
  ArrowLeft,
  Send,
  CheckCircle,
  Flag,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const mockListings: Record<string, { title: string; village: string }> = {
  "1": { title: "Fresh Organic Tomatoes", village: "Wardha" },
  "2": { title: "Handwoven Cotton Saree", village: "Nagpur" },
  "3": { title: "Desi Ghee (Pure Cow)", village: "Amravati" },
  "4": { title: "Traditional Jaggery", village: "Chandrapur" },
  "5": { title: "Fresh Farm Milk", village: "Yavatmal" },
}

const reportReasons = [
  { value: "fake", label: "Fake Listing" },
  { value: "inappropriate", label: "Inappropriate Content" },
  { value: "scam", label: "Scam or Fraud" },
  { value: "duplicate", label: "Duplicate Listing" },
  { value: "other", label: "Other" },
]

export default function ReportListingPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const listing = mockListings[id] || { title: "Unknown Listing", village: "Unknown" }

  const [reason, setReason] = useState("")
  const [description, setDescription] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-text-primary">Report Submitted</h1>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
              <CheckCircle className="h-8 w-8 text-primary-500" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Thank you for your report</h2>
            <p className="mt-2 max-w-sm text-sm text-text-secondary">
              Our team will review this listing and take appropriate action.
              We appreciate your help in keeping GaonSetu safe for everyone.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
              <Button onClick={() => router.push("/consumer/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Report Listing</h1>
          <p className="text-sm text-text-secondary">
            Help us maintain a safe marketplace
          </p>
        </div>
      </div>

      <Card className="border-rose-200 bg-rose-50/50">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary">{listing.title}</p>
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <MapPin className="h-3.5 w-3.5" />
              {listing.village}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flag className="h-5 w-5 text-rose-500" />
            Report Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Reason for Report</Label>
              <Select value={reason} onValueChange={setReason} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {reportReasons.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide details about why you are reporting this listing..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Your Email (optional)</Label>
              <Input
                id="contact"
                type="email"
                placeholder="In case we need to follow up"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={!reason || loading}
              variant="destructive"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
