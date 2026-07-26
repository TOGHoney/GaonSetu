"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Download, Clock } from "lucide-react"

const mockAuditLog = [
  {
    timestamp: "2024-06-15 14:32:10",
    user: "Anita Sharma",
    action: "User Login",
    entityType: "Session",
    entityId: "SES-4521",
    details: "Successful login from Chrome/Android",
  },
  {
    timestamp: "2024-06-15 14:28:05",
    user: "Admin: Priya Singh",
    action: "Listing Approved",
    entityType: "Listing",
    entityId: "LST-001",
    details: "Approved: Organic Wheat Flour",
  },
  {
    timestamp: "2024-06-15 13:45:22",
    user: "Ramesh Kumar",
    action: "Complaint Filed",
    entityType: "Complaint",
    entityId: "CMP-1025",
    details: "Water supply disruption in Rampur",
  },
  {
    timestamp: "2024-06-15 12:15:30",
    user: "Admin: Anita Sharma",
    action: "User Verified",
    entityType: "User",
    entityId: "USR-004",
    details: "Verified account for Vikram Yadav",
  },
  {
    timestamp: "2024-06-15 11:00:00",
    user: "Sunita Devi",
    action: "Listing Created",
    entityType: "Listing",
    entityId: "LST-002",
    details: "Created listing: Handwoven Cotton Saree",
  },
  {
    timestamp: "2024-06-15 10:30:15",
    user: "System",
    action: "Backup Completed",
    entityType: "System",
    entityId: "BKP-782",
    details: "Daily database backup completed successfully",
  },
  {
    timestamp: "2024-06-15 09:45:00",
    user: "Admin: Priya Singh",
    action: "Complaint Assigned",
    entityType: "Complaint",
    entityId: "CMP-1022",
    details: "Assigned to Mr. Sharma (Water Dept.)",
  },
  {
    timestamp: "2024-06-15 09:10:45",
    user: "Amit Patel",
    action: "User Login",
    entityType: "Session",
    entityId: "SES-4510",
    details: "Successful login from Safari/iOS",
  },
  {
    timestamp: "2024-06-14 18:30:22",
    user: "Admin: Anita Sharma",
    action: "Listing Flagged",
    entityType: "Listing",
    entityId: "LST-004",
    details: "Flagged: Raw Wildflower Honey - Pricing concern",
  },
  {
    timestamp: "2024-06-14 17:15:00",
    user: "System",
    action: "Scheduled Task",
    entityType: "System",
    entityId: "TSK-102",
    details: "Automated complaint reminders sent to 5 officials",
  },
]

const actionColors: Record<string, string> = {
  "User Login": "secondary",
  "Listing Approved": "success",
  "Complaint Filed": "destructive",
  "User Verified": "success",
  "Listing Created": "default",
  "Backup Completed": "success",
  "Complaint Assigned": "warning",
  "Listing Flagged": "destructive",
  "Scheduled Task": "outline",
}

export default function AuditLogPage() {
  const [actionFilter, setActionFilter] = useState("all")
  const [userSearch, setUserSearch] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const filtered = mockAuditLog.filter((log) => {
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesUser = log.user.toLowerCase().includes(userSearch.toLowerCase())
    return matchesAction && matchesUser
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-500">Track all platform activities and changes</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Export Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Action Type</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="User Login">User Login</SelectItem>
                  <SelectItem value="Listing Approved">Listing Approved</SelectItem>
                  <SelectItem value="Listing Created">Listing Created</SelectItem>
                  <SelectItem value="Listing Flagged">Listing Flagged</SelectItem>
                  <SelectItem value="Complaint Filed">Complaint Filed</SelectItem>
                  <SelectItem value="Complaint Assigned">Complaint Assigned</SelectItem>
                  <SelectItem value="User Verified">User Verified</SelectItem>
                  <SelectItem value="Backup Completed">Backup Completed</SelectItem>
                  <SelectItem value="Scheduled Task">Scheduled Task</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>User</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search user..."
                  className="pl-9"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" /> Activity Log
            </CardTitle>
            <Badge variant="secondary">{filtered.length} entries</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity Type</TableHead>
                <TableHead>Entity ID</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant={(actionColors[log.action] as any) || "secondary"}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{log.entityType}</TableCell>
                  <TableCell className="font-mono text-xs text-[#1B4965]">
                    {log.entityId}
                  </TableCell>
                  <TableCell className="text-gray-500 max-w-[250px] truncate">
                    {log.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
