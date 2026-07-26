"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  MapPin,
  Calendar,
  Tag,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { COMPLAINT_STATUS_COLORS, PRIORITY_COLORS, COMPLAINT_CATEGORY_LABELS } from "@/lib/utils"
import type { ComplaintStatus } from "@/types"

const mockComplaint = {
  id: "1",
  trackingId: "GSC-2026-001234",
  title: "Water supply stopped for 3 days",
  description:
    "The water supply in our area (Rampur Village, Ward No. 5) has completely stopped since July 18th, 2026. This is affecting over 200 households. The overhead tank appears to be empty and the motor pump at the main supply line is not functioning. Several residents have reported this to the local panchayat but no action has been taken yet. Children and elderly people are suffering the most. We request immediate intervention.",
  category: "WATER",
  status: "IN_PROGRESS",
  priority: "HIGH",
  village: "Rampur",
  district: "Alwar",
  state: "Rajasthan",
  pincode: "301001",
  dateOfIssue: "2026-07-18",
  submittedDate: "2026-07-20",
  assignedTo: "Suresh Sharma (Block Development Officer)",
  remarks: [
    {
      id: "1",
      author: "Block Development Officer",
      content: "Complaint received and acknowledged. We have informed the Jal Board office. A team will visit the site within 48 hours.",
      date: "2026-07-21 10:30 AM",
    },
    {
      id: "2",
      author: "Jal Board Engineer",
      content: "Site inspection completed. The main motor pump has malfunctioned. Replacement parts have been ordered and will arrive by July 25th.",
      date: "2026-07-23 02:15 PM",
    },
  ],
  timeline: [
    { status: "SUBMITTED", date: "2026-07-20 09:00 AM", label: "Complaint Submitted" },
    { status: "RECEIVED", date: "2026-07-20 11:00 AM", label: "Received by Block Office" },
    { status: "UNDER_REVIEW", date: "2026-07-21 10:30 AM", label: "Under Review" },
    { status: "ASSIGNED", date: "2026-07-21 02:00 PM", label: "Assigned to BDO" },
    { status: "IN_PROGRESS", date: "2026-07-23 02:15 PM", label: "Repair In Progress" },
  ],
}

const statusIcons: Record<string, typeof Clock> = {
  SUBMITTED: Clock,
  RECEIVED: Clock,
  UNDER_REVIEW: AlertTriangle,
  ASSIGNED: AlertTriangle,
  IN_PROGRESS: AlertTriangle,
  RESOLVED: CheckCircle,
  REJECTED: CheckCircle,
  REOPENED: RotateCcw,
}

const allStatuses: ComplaintStatus[] = [
  "SUBMITTED",
  "RECEIVED",
  "UNDER_REVIEW",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
]

export default function ComplaintDetail() {
  const complaint = mockComplaint

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/villager/complaints">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-text-primary">{complaint.title}</h2>
          <p className="text-sm text-text-secondary">{complaint.trackingId}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={`${COMPLAINT_STATUS_COLORS[complaint.status]}`}>{complaint.status.replace("_", " ")}</Badge>
          <Badge className={`${PRIORITY_COLORS[complaint.priority]}`}>{complaint.priority}</Badge>
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative ml-4 border-l-2 border-primary-200 space-y-6">
            {complaint.timeline.map((entry, idx) => {
              const Icon = statusIcons[entry.status] || Clock
              const isActive = entry.status === complaint.status
              const isPast = allStatuses.indexOf(entry.status) < allStatuses.indexOf(complaint.status)
              return (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-[23px] flex h-10 w-10 items-center justify-center rounded-full ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : isPast
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="ml-8">
                    <p className={`text-sm font-medium ${isActive ? "text-primary-600" : "text-text-primary"}`}>
                      {entry.label}
                    </p>
                    <p className="text-xs text-text-secondary">{entry.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Complaint Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-text-primary">{complaint.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-text-secondary" />
              <div>
                <p className="text-xs text-text-secondary">Category</p>
                <p className="font-medium">{COMPLAINT_CATEGORY_LABELS[complaint.category]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-text-secondary" />
              <div>
                <p className="text-xs text-text-secondary">Date of Issue</p>
                <p className="font-medium">{complaint.dateOfIssue}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-text-secondary" />
              <div>
                <p className="text-xs text-text-secondary">Location</p>
                <p className="font-medium">{complaint.village}, {complaint.district}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-text-secondary" />
              <div>
                <p className="text-xs text-text-secondary">Submitted</p>
                <p className="font-medium">{complaint.submittedDate}</p>
              </div>
            </div>
          </div>
          {complaint.assignedTo && (
            <div className="rounded-lg bg-primary-50 p-3">
              <p className="text-xs text-text-secondary">Assigned To</p>
              <p className="text-sm font-medium text-primary-700">{complaint.assignedTo}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Remarks */}
      {complaint.remarks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-primary-500" />
              Official Remarks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complaint.remarks.map((remark) => (
              <div key={remark.id} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-primary-600">{remark.author}</p>
                  <p className="text-xs text-text-secondary">{remark.date}</p>
                </div>
                <p className="mt-2 text-sm text-text-primary">{remark.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Link href="/villager/complaints">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Complaints
          </Button>
        </Link>
        {["RESOLVED", "REJECTED"].includes(complaint.status) && (
          <Button variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reopen Complaint
          </Button>
        )}
      </div>
    </div>
  )
}
