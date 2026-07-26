"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Package,
  Eye,
  AlertTriangle,
  MessageCircle,
  Plus,
  FileWarning,
  Megaphone,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import VerifiedBadge from "@/components/common/VerifiedBadge"

const mockUser = {
  name: "Ramesh Kumar",
  village: "Rampur",
  district: "Alwar",
  state: "Rajasthan",
  verified: true,
}

const mockStats = [
  { label: "Active Listings", value: 12, icon: Package, color: "text-primary-500", bg: "bg-primary-50" },
  { label: "Total Views", value: 1847, icon: Eye, color: "text-secondary-500", bg: "bg-secondary-50" },
  { label: "Pending Complaints", value: 3, icon: AlertTriangle, color: "text-warning", bg: "bg-orange-50" },
  { label: "Consumer Inquiries", value: 8, icon: MessageCircle, color: "text-accent", bg: "bg-yellow-50" },
]

const mockActivity = [
  { id: "1", text: "New inquiry from Priya for Wheat Flour", time: "2 hours ago", type: "inquiry" },
  { id: "2", text: "Complaint #GSC-2026-001234 status updated", time: "5 hours ago", type: "complaint" },
  { id: "3", text: "Listing \"Fresh Tomatoes\" got 15 new views", time: "1 day ago", type: "listing" },
  { id: "4", text: "Payment received for Milk supply order", time: "2 days ago", type: "payment" },
]

const mockAnnouncements = [
  { id: "1", title: "Government subsidy for organic farming", date: "2026-07-20", type: "GOVT_SCHEME" },
  { id: "2", title: "Village market day scheduled for August 5", date: "2026-07-18", type: "EVENT" },
  { id: "3", title: "Water supply improvement project approved", date: "2026-07-15", type: "GENERAL" },
]

export default function VillagerDashboard() {
  const activityIcons: Record<string, typeof Package> = {
    inquiry: MessageCircle,
    complaint: AlertTriangle,
    listing: Package,
    payment: TrendingUp,
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-primary-100 bg-gradient-to-r from-primary-50 to-white">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              Welcome, {mockUser.name}! 👋
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {mockUser.village}, {mockUser.district}, {mockUser.state}
            </p>
            {mockUser.verified && (
              <div className="mt-2">
                <VerifiedBadge size="md" />
              </div>
            )}
          </div>
          <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-primary-100 sm:flex">
            <Package className="h-8 w-8 text-primary-500" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-secondary">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivity.map((item) => {
                  const Icon = activityIcons[item.type] || Clock
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50">
                        <Icon className="h-4 w-4 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">{item.text}</p>
                        <p className="text-xs text-text-secondary">{item.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/villager/listings/new">
              <Card className="cursor-pointer transition-colors hover:border-primary-300">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                    <Plus className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Create Listing</p>
                    <p className="text-xs text-text-secondary">Sell your products</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-text-secondary" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/villager/complaints/new">
              <Card className="cursor-pointer transition-colors hover:border-primary-300">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                    <FileWarning className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Raise Complaint</p>
                    <p className="text-xs text-text-secondary">Report an issue</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-text-secondary" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Announcements Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Megaphone className="h-5 w-5 text-accent" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnnouncements.map((ann) => (
                <div key={ann.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-text-primary">{ann.title}</p>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      {ann.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">{ann.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
