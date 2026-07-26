"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import EmptyState from "@/components/common/EmptyState"
import {
  Bell,
  ShieldAlert,
  Leaf,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react"

type AnnouncementType = "notice" | "scheme" | "emergency" | "alert"

const MOCK_ANNOUNCEMENTS: {
  id: string
  type: AnnouncementType
  title: string
  body: string
  date: string
}[] = [
  {
    id: "1",
    type: "notice",
    title: "GaonSetu Platform Maintenance — July 28, 2026",
    body: "Scheduled maintenance will be performed on July 28 from 2:00 AM to 5:00 AM IST. During this time, the platform will be temporarily unavailable. We apologize for the inconvenience. Please ensure all critical transactions are completed before the maintenance window.",
    date: "2026-07-24",
  },
  {
    id: "2",
    type: "scheme",
    title: "PM-KISAN Scheme — 16th Installment Release",
    body: "The 16th installment of PM-KISAN Samman Nidhi has been released for eligible farmers. Beneficiaries can check their payment status through the official PM-KISAN portal or contact your local agriculture office. Ensure your Aadhaar and bank details are linked and updated.",
    date: "2026-07-22",
  },
  {
    id: "3",
    type: "emergency",
    title: "Heavy Rainfall Alert — Stay Safe",
    body: "IMD has issued a red alert for heavy to very heavy rainfall in several districts of Uttar Pradesh and Bihar for the next 48 hours. Farmers are advised to take precautions to protect standing crops and livestock. Avoid traveling near rivers and low-lying areas.",
    date: "2026-07-25",
  },
  {
    id: "4",
    type: "alert",
    title: "New Feature: Direct Buyer-Seller Chat",
    body: "We are excited to announce the launch of our new real-time chat feature. Sellers can now respond to buyer inquiries directly through the platform. This feature will be rolled out to all verified users by August 1, 2026.",
    date: "2026-07-20",
  },
  {
    id: "5",
    type: "scheme",
    title: "Subsidy on Solar Water Pumps — Apply Now",
    body: "The Ministry of New and Renewable Energy is offering up to 60% subsidy on solar-powered water pumps for agricultural use. Eligible farmers can apply through the national solar portal or their district agriculture office. Last date for applications: August 31, 2026.",
    date: "2026-07-18",
  },
]

const FILTER_TABS: { key: string; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All", icon: Bell },
  { key: "notice", label: "Notices", icon: Info },
  { key: "scheme", label: "Schemes", icon: Leaf },
  { key: "emergency", label: "Emergency Alerts", icon: ShieldAlert },
]

const TYPE_CONFIG: Record<
  AnnouncementType,
  { color: string; bg: string; icon: React.ElementType; label: string }
> = {
  notice: { color: "text-blue-700", bg: "bg-blue-100", icon: Info, label: "Notice" },
  scheme: { color: "text-green-700", bg: "bg-green-100", icon: Leaf, label: "Scheme" },
  emergency: { color: "text-red-700", bg: "bg-red-100", icon: ShieldAlert, label: "Emergency" },
  alert: { color: "text-yellow-700", bg: "bg-yellow-100", icon: AlertTriangle, label: "Alert" },
}

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered =
    activeTab === "all"
      ? MOCK_ANNOUNCEMENTS
      : MOCK_ANNOUNCEMENTS.filter((a) => a.type === activeTab)

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
            Announcements & Updates
          </h1>
          <p className="text-sm text-text-secondary">
            Stay informed about government schemes, platform updates, and emergency alerts
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setExpandedId(null)
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-border bg-white text-text-secondary hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Announcement cards */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No announcements"
            description="There are no announcements matching this filter right now. Check back later."
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((announcement) => {
              const config = TYPE_CONFIG[announcement.type]
              const isExpanded = expandedId === announcement.id
              const fullText = announcement.body
              const previewText =
                fullText.length > 120 ? fullText.slice(0, 120) + "..." : fullText

              return (
                <Card key={announcement.id} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge className={`${config.bg} ${config.color} border-transparent`}>
                        <config.icon className="mr-1 h-3 w-3" />
                        {config.label}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Calendar className="h-3 w-3" />
                        {announcement.date}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-text-primary">
                      {announcement.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-text-secondary">
                      {isExpanded ? fullText : previewText}
                    </p>

                    {fullText.length > 120 && (
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : announcement.id)
                        }
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600"
                      >
                        {isExpanded ? (
                          <>
                            Show less <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
