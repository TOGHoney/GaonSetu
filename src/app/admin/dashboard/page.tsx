"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Megaphone,
  FileText,
  Shield,
  Activity,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

const kpiData = [
  {
    title: "Total Users",
    value: "2,847",
    trend: "+12.5%",
    trendUp: true,
    icon: Users,
    color: "bg-[#2D6A4F]/10 text-[#2D6A4F]",
  },
  {
    title: "Active Listings",
    value: "1,234",
    trend: "+8.2%",
    trendUp: true,
    icon: Package,
    color: "bg-[#1B4965]/10 text-[#1B4965]",
  },
  {
    title: "Open Complaints",
    value: "47",
    trend: "-3.1%",
    trendUp: false,
    icon: AlertTriangle,
    color: "bg-[#E9C46A]/10 text-[#E9C46A]",
  },
  {
    title: "Resolved This Month",
    value: "89",
    trend: "+24.7%",
    trendUp: true,
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
  },
]

const complaintsTrendData = [
  { month: "Jan", filed: 45, resolved: 38 },
  { month: "Feb", filed: 52, resolved: 45 },
  { month: "Mar", filed: 39, resolved: 42 },
  { month: "Apr", filed: 61, resolved: 55 },
  { month: "May", filed: 48, resolved: 50 },
  { month: "Jun", filed: 47, resolved: 52 },
]

const listingsByCategoryData = [
  { name: "Agriculture", value: 340, color: "#2D6A4F" },
  { name: "Handicrafts", value: 225, color: "#1B4965" },
  { name: "Dairy", value: 180, color: "#E9C46A" },
  { name: "Textiles", value: 150, color: "#264653" },
  { name: "Spices", value: 120, color: "#2A9D8F" },
  { name: "Other", value: 219, color: "#8AB17D" },
]

const usersByRoleData = [
  { role: "Villagers", count: 1456 },
  { role: "Consumers", count: 1123 },
  { role: "Admins", count: 8 },
  { role: "Officials", count: 15 },
  { role: "Moderators", count: 12 },
]

const recentActivity = [
  { id: 1, action: "New user registered", detail: "Ramesh Kumar joined as Villager", time: "5 min ago" },
  { id: 2, action: "Complaint resolved", detail: "CMP-1024 - Road repair completed", time: "12 min ago" },
  { id: 3, action: "Listing approved", detail: "Organic Turmeric - ₹250/kg", time: "28 min ago" },
  { id: 4, action: "New complaint filed", detail: "CMP-1025 - Water supply issue in Rampur", time: "45 min ago" },
  { id: 5, action: "User verified", detail: "Sunita Devi - Villager account", time: "1 hr ago" },
  { id: 6, action: "Listing flagged", detail: "Suspicious pricing on Wheat Flour", time: "1.5 hr ago" },
]

const quickLinks = [
  { label: "Manage Users", icon: Users, href: "/admin/users" },
  { label: "Moderate Listings", icon: Package, href: "/admin/listings" },
  { label: "Handle Complaints", icon: AlertTriangle, href: "/admin/complaints" },
  { label: "Announcements", icon: Megaphone, href: "/admin/announcements" },
  { label: "Generate Reports", icon: FileText, href: "/admin/reports" },
  { label: "Audit Log", icon: Shield, href: "/admin/audit-log" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of GaonSetu platform metrics and activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{kpi.title}</p>
                  <p className="text-3xl font-bold mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trendUp ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${kpi.trendUp ? "text-green-600" : "text-red-500"}`}>
                      {kpi.trend}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints Trend - Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Complaints Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={complaintsTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="filed" stroke="#E9C46A" strokeWidth={2} name="Filed" />
                <Line type="monotone" dataKey="resolved" stroke="#2D6A4F" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Listings by Category - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Listings by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={listingsByCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {listingsByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Users by Role Bar Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users by Role - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersByRoleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2D6A4F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Badge variant="secondary">
              <Activity className="h-3 w-3 mr-1" /> Live
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#2D6A4F] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-500 truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickLinks.map((link) => (
              <a key={link.label} href={link.href}>
                <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 hover:bg-[#2D6A4F]/5 hover:border-[#2D6A4F]/30">
                  <link.icon className="h-5 w-5 text-[#2D6A4F]" />
                  <span className="text-xs">{link.label}</span>
                </Button>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
