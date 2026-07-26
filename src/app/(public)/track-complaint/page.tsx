"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  FileText,
  CheckCircle2,
  Clock,
  Circle,
  AlertCircle,
  MessageSquare,
  XCircle,
} from "lucide-react"

interface ComplaintStatus {
  step: string
  date: string
  remark: string
  done: boolean
}

interface ComplaintResult {
  trackingId: string
  title: string
  category: string
  status: "Filed" | "Under Review" | "In Progress" | "Resolved" | "Closed"
  filedDate: string
  timeline: ComplaintStatus[]
  remarks: { date: string; text: string }[]
}

const MOCK_COMPLAINTS: Record<string, ComplaintResult> = {
  "GSC-2026-001234": {
    trackingId: "GSC-2026-001234",
    title: "Pothole on village main road near school",
    category: "Infrastructure",
    status: "In Progress",
    filedDate: "2026-07-01",
    timeline: [
      { step: "Filed", date: "2026-07-01", remark: "Complaint registered successfully.", done: true },
      { step: "Under Review", date: "2026-07-03", remark: "Assigned to Block Development Officer for inspection.", done: true },
      { step: "In Progress", date: "2026-07-10", remark: "Road repair work initiated. Expected completion by end of July.", done: true },
      { step: "Resolved", date: "", remark: "", done: false },
    ],
    remarks: [
      { date: "2026-07-10", text: "Road repair work initiated. Expected completion by end of July." },
      { date: "2026-07-03", text: "Assigned to Block Development Officer for inspection." },
      { date: "2026-07-01", text: "Complaint registered successfully by village representative." },
    ],
  },
  "GSC-2026-005678": {
    trackingId: "GSC-2026-005678",
    title: "Water supply disruption in Ward 3",
    category: "Water Supply",
    status: "Resolved",
    filedDate: "2026-06-20",
    timeline: [
      { step: "Filed", date: "2026-06-20", remark: "Complaint registered.", done: true },
      { step: "Under Review", date: "2026-06-22", remark: "Local panchayat notified.", done: true },
      { step: "In Progress", date: "2026-06-25", remark: "Pipeline inspection and repair underway.", done: true },
      { step: "Resolved", date: "2026-06-28", remark: "Water supply restored. Complaint resolved.", done: true },
    ],
    remarks: [
      { date: "2026-06-28", text: "Water supply restored. Complaint resolved." },
      { date: "2026-06-25", text: "Pipeline inspection and repair underway." },
      { date: "2026-06-22", text: "Local panchayat notified." },
      { date: "2026-06-20", text: "Complaint registered." },
    ],
  },
}

const STATUS_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Filed: { icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
  "Under Review": { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
  "In Progress": { icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
  Resolved: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  Closed: { icon: XCircle, color: "text-gray-600", bg: "bg-gray-100" },
}

export default function TrackComplaintPage() {
  const [trackingId, setTrackingId] = useState("")
  const [result, setResult] = useState<ComplaintResult | null>(null)
  const [error, setError] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleTrack = () => {
    setSearched(true)
    const trimmed = trackingId.trim().toUpperCase()
    const found = MOCK_COMPLAINTS[trimmed]
    if (found) {
      setResult(found)
      setError(false)
    } else {
      setResult(null)
      setError(true)
    }
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
            Track Complaint
          </h1>
          <p className="text-sm text-text-secondary">
            Enter your tracking ID to check the current status of your grievance
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search input */}
        <div className="mx-auto max-w-lg">
          <label className="mb-2 block text-sm font-medium text-text-primary">
            Tracking ID
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="GSC-2026-XXXXXX"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTrack()
              }}
              className="font-mono text-sm"
            />
            <Button onClick={handleTrack} disabled={!trackingId.trim()}>
              <Search className="mr-1.5 h-4 w-4" />
              Track
            </Button>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            Example: <button onClick={() => setTrackingId("GSC-2026-001234")} className="font-mono text-primary-500 hover:underline">GSC-2026-001234</button> or{" "}
            <button onClick={() => setTrackingId("GSC-2026-005678")} className="font-mono text-primary-500 hover:underline">GSC-2026-005678</button>
          </p>
        </div>

        {/* Error state */}
        {searched && error && (
          <div className="mx-auto mt-6 max-w-lg">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="flex items-center gap-3 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-red-700">Complaint not found</p>
                  <p className="text-sm text-red-600">
                    No complaint exists with ID "{trackingId.trim().toUpperCase()}". Please check and try again.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mx-auto mt-8 max-w-3xl">
            {/* Complaint header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-text-secondary">
                    {result.trackingId}
                  </span>
                  {(() => {
                    const config = STATUS_CONFIG[result.status]
                    return (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.color}`}
                      >
                        <config.icon className="h-3.5 w-3.5" />
                        {result.status}
                      </span>
                    )
                  })()}
                </div>
                <h2 className="mb-1 text-xl font-bold text-text-primary">{result.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                  <span>Category: <strong>{result.category}</strong></span>
                  <span>Filed: <strong>{result.filedDate}</strong></span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-text-secondary">
                  Status Timeline
                </h3>
                <div className="relative ml-3 border-l-2 border-gray-200 pl-6">
                  {result.timeline.map((step, idx) => {
                    const isLast = idx === result.timeline.length - 1
                    const config = STATUS_CONFIG[step.step]
                    return (
                      <div key={step.step} className={`relative pb-6 ${isLast ? "pb-0" : ""}`}>
                        <div
                          className={`absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            step.done
                              ? "border-primary-500 bg-primary-500 text-white"
                              : "border-gray-300 bg-white text-gray-400"
                          }`}
                        >
                          {step.done ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <Circle className="h-3 w-3" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm font-semibold ${
                                step.done ? "text-text-primary" : "text-muted"
                              }`}
                            >
                              {step.step}
                            </h4>
                            {step.date && (
                              <span className="text-xs text-text-secondary">{step.date}</span>
                            )}
                          </div>
                          {step.remark && (
                            <p className="mt-0.5 text-sm text-text-secondary">{step.remark}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Remarks */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-secondary">
                  <MessageSquare className="h-4 w-4" />
                  Status Updates & Remarks
                </h3>
                <div className="space-y-3">
                  {result.remarks.map((remark, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-border bg-gray-50 p-3"
                    >
                      <p className="mb-1 text-xs text-text-secondary">{remark.date}</p>
                      <p className="text-sm text-text-primary">{remark.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
