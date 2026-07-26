"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Download,
  FileText,
  Users,
  Package,
  AlertTriangle,
} from "lucide-react"

const summaryStats = [
  { label: "Total Users", value: "2,847", icon: Users, change: "+12.5%" },
  { label: "Active Listings", value: "1,234", icon: Package, change: "+8.2%" },
  { label: "Complaints", value: "292", icon: AlertTriangle, change: "-3.1%" },
  { label: "Resolution Rate", value: "87%", icon: FileText, change: "+5.4%" },
]

const previewData = [
  { period: "Jan 2024", users: 180, listings: 85, complaints: 45 },
  { period: "Feb 2024", users: 210, listings: 95, complaints: 52 },
  { period: "Mar 2024", users: 245, listings: 110, complaints: 39 },
  { period: "Apr 2024", users: 290, listings: 135, complaints: 61 },
  { period: "May 2024", users: 320, listings: 150, complaints: 48 },
  { period: "Jun 2024", users: 352, listings: 165, complaints: 47 },
]

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState("users")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">Generate and export platform reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Download CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <Badge variant="success" className="mt-2">{stat.change}</Badge>
                </div>
                <div className="p-3 rounded-full bg-[#2D6A4F]/10">
                  <stat.icon className="h-5 w-5 text-[#2D6A4F]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Users Report</SelectItem>
                  <SelectItem value="listings">Listings Report</SelectItem>
                  <SelectItem value="complaints">Complaints Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                className="w-[180px]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                className="w-[180px]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90">
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Data Preview - {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>New Users</TableHead>
                <TableHead>New Listings</TableHead>
                <TableHead>Complaints</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((row) => (
                <TableRow key={row.period}>
                  <TableCell className="font-medium">{row.period}</TableCell>
                  <TableCell>{row.users}</TableCell>
                  <TableCell>{row.listings}</TableCell>
                  <TableCell>{row.complaints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
