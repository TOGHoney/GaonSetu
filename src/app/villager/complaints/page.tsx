"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, AlertTriangle, Clock, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmptyState from "@/components/common/EmptyState"
import { COMPLAINT_STATUS_COLORS, PRIORITY_COLORS } from "@/lib/utils"
import type { ComplaintStatus, ComplaintPriority, ComplaintCategory } from "@/types"

interface MockComplaint {
  id: string
  trackingId: string
  title: string
  category: ComplaintCategory
  status: ComplaintStatus
  priority: ComplaintPriority
  date: string
  description: string
}

const mockComplaints: MockComplaint[] = [
  {
    id: "1",
    trackingId: "GSC-2026-001234",
    title: "Water supply stopped for 3 days",
    category: "WATER",
    status: "IN_PROGRESS",
    priority: "HIGH",
    date: "2026-07-20",
    description: "No water supply in our area since July 18th.",
  },
  {
    id: "2",
    trackingId: "GSC-2026-001198",
    title: "Broken road near school",
    category: "ROAD",
    status: "UNDER_REVIEW",
    priority: "MEDIUM",
    date: "2026-07-15",
    description: "Main road leading to government school has large potholes.",
  },
  {
    id: "3",
    trackingId: "GSC-2026-001156",
    title: "Street lights not working",
    category: "ELECTRICITY",
    status: "RESOLVED",
    priority: "LOW",
    date: "2026-07-10",
    description: "Multiple street lights on main road are non-functional.",
  },
  {
    id: "4",
    trackingId: "GSC-2026-001102",
    title: "Ration shop overcharging",
    category: "RATION",
    status: "SUBMITTED",
    priority: "URGENT",
    date: "2026-07-22",
    description: "Local ration shop charging above MRP for sugar and rice.",
  },
]

const statusIcons: Record<string, typeof Clock> = {
  SUBMITTED: Clock,
  RECEIVED: Clock,
  UNDER_REVIEW: AlertTriangle,
  ASSIGNED: AlertTriangle,
  IN_PROGRESS: AlertTriangle,
  RESOLVED: CheckCircle,
  REJECTED: XCircle,
  REOPENED: RotateCcw,
}

const statusLabels: Record<string, string> = {
  SUBMITTED: "Submitted",
  RECEIVED: "Received",
  UNDER_REVIEW: "Under Review",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
  REOPENED: "Reopened",
}

export default function VillagerComplaints() {
  const [filter, setFilter] = useState("all")

  const filtered = mockComplaints.filter((c) => {
    if (filter === "submitted") return c.status === "SUBMITTED"
    if (filter === "in_progress") return ["IN_PROGRESS", "UNDER_REVIEW", "ASSIGNED", "RECEIVED"].includes(c.status)
    if (filter === "resolved") return c.status === "RESOLVED"
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Complaint Center</h2>
        <Link href="/villager/complaints/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Raise New Complaint
          </Button>
        </Link>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All ({mockComplaints.length})</TabsTrigger>
          <TabsTrigger value="submitted">
            Submitted ({mockComplaints.filter((c) => c.status === "SUBMITTED").length})
          </TabsTrigger>
          <TabsTrigger value="in_progress">
            In Progress ({mockComplaints.filter((c) => ["IN_PROGRESS", "UNDER_REVIEW", "ASSIGNED", "RECEIVED"].includes(c.status)).length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({mockComplaints.filter((c) => c.status === "RESOLVED").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={AlertTriangle}
              title="No complaints found"
              description="You haven't raised any complaints in this category."
              actionLabel="Raise Complaint"
              onAction={() => {}}
            />
          ) : (
            <div className="mt-4 space-y-3">
              {filtered.map((complaint) => {
                const StatusIcon = statusIcons[complaint.status] || Clock
                return (
                  <Link key={complaint.id} href={`/villager/complaints/${complaint.id}`}>
                    <Card className="cursor-pointer transition-colors hover:border-primary-300">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50">
                          <StatusIcon className="h-5 w-5 text-primary-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-text-primary">{complaint.title}</p>
                              <p className="text-xs text-text-secondary">{complaint.trackingId}</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                              <Badge className={`text-[10px] ${COMPLAINT_STATUS_COLORS[complaint.status]}`}>
                                {statusLabels[complaint.status]}
                              </Badge>
                              <Badge className={`text-[10px] ${PRIORITY_COLORS[complaint.priority]}`}>
                                {complaint.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-xs text-text-secondary">
                            <span>{complaint.category.replace("_", " ")}</span>
                            <span>•</span>
                            <span>{complaint.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
