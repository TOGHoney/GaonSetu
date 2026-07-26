"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  UserPlus,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const mockComplaints = [
  {
    id: "CMP-1025",
    title: "Water supply disruption in Rampur",
    category: "Infrastructure",
    village: "Rampur",
    priority: "High",
    status: "Open",
    filedDate: "2024-06-12",
  },
  {
    id: "CMP-1024",
    title: "Road damage near main market",
    category: "Infrastructure",
    village: "Sitapur",
    priority: "Medium",
    status: "In Progress",
    filedDate: "2024-06-10",
  },
  {
    id: "CMP-1023",
    title: "Electricity fluctuation in Block C",
    category: "Utilities",
    village: "Rampur",
    priority: "Low",
    status: "Open",
    filedDate: "2024-06-08",
  },
  {
    id: "CMP-1022",
    title: "Illegal waste dumping near school",
    category: "Environment",
    village: "Haryana",
    priority: "High",
    status: "Resolved",
    filedDate: "2024-06-05",
  },
  {
    id: "CMP-1021",
    title: "Pothole on NH-24 connector",
    category: "Infrastructure",
    village: "Rampur",
    priority: "Medium",
    status: "Rejected",
    filedDate: "2024-06-01",
  },
  {
    id: "CMP-1020",
    title: "Street light not working",
    category: "Utilities",
    village: "Sitapur",
    priority: "Low",
    status: "Open",
    filedDate: "2024-05-28",
  },
]

const priorityColor: Record<string, string> = {
  High: "destructive",
  Medium: "warning",
  Low: "secondary",
}

const statusColor: Record<string, string> = {
  Open: "destructive",
  "In Progress": "warning",
  Resolved: "success",
  Rejected: "secondary",
}

export default function AdminComplaintsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = mockComplaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.village.toLowerCase().includes(search.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" && c.status === "Open") ||
      (activeTab === "in-progress" && c.status === "In Progress") ||
      (activeTab === "resolved" && c.status === "Resolved") ||
      (activeTab === "rejected" && c.status === "Rejected")
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Complaint Management</h1>
          <p className="text-gray-500">Track and resolve community complaints</p>
        </div>
        <Badge variant="secondary">{mockComplaints.length} Total</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search complaints..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-mono font-medium text-[#1B4965]">
                        {complaint.id}
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {complaint.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{complaint.category}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{complaint.village}</TableCell>
                      <TableCell>
                        <Badge variant={priorityColor[complaint.priority] as any}>
                          {complaint.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColor[complaint.status] as any}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{complaint.filedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Assign Official">
                            <UserPlus className="h-4 w-4 text-[#1B4965]" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Update Status">
                            <RefreshCw className="h-4 w-4 text-[#2D6A4F]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing 1-{filtered.length} of {filtered.length} complaints
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
