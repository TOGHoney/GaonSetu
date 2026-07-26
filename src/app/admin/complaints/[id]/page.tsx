"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Tag,
  AlertTriangle,
  User,
  CheckCircle,
  Clock,
  Circle,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

const complaintData = {
  id: "CMP-1025",
  title: "Water supply disruption in Rampur",
  category: "Infrastructure",
  village: "Rampur",
  district: "Varanasi",
  priority: "High",
  status: "Open",
  filedDate: "2024-06-12",
  filedBy: "Ramesh Kumar",
  description:
    "The main water supply pipeline serving the eastern part of Rampur village has been disrupted for the past 3 days. Approximately 200 households are affected. The pipeline appears to have been damaged during recent road construction work.",
  media: ["Photo of damaged pipe", "Area overview", "Community protest photo"],
  timeline: [
    { date: "2024-06-12 10:30", event: "Complaint Filed", status: "done" },
    { date: "2024-06-12 14:00", event: "Acknowledged by Admin", status: "done" },
    { date: "2024-06-13 09:00", event: "Assigned to Water Dept.", status: "current" },
    { date: "", event: "Under Investigation", status: "pending" },
    { date: "", event: "Resolution", status: "pending" },
  ],
}

const officials = ["Mr. Sharma (Water Dept.)", "Mrs. Gupta (Public Works)", "Mr. Singh (Municipality)"]

export default function ComplaintDetailPage() {
  const [status, setStatus] = useState("open")
  const [official, setOfficial] = useState("")
  const [remarks, setRemarks] = useState("")
  const [resolution, setResolution] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/complaints">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Complaint Details</h1>
          <p className="text-gray-500 font-mono">{complaintData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{complaintData.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="destructive">{complaintData.priority}</Badge>
                  <Badge variant="warning">{complaintData.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Category: </span>
                  <span className="font-medium">{complaintData.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">{complaintData.village}, {complaintData.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Filed: {complaintData.filedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Filed by: {complaintData.filedBy}</span>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-gray-500">Description</Label>
                <p className="mt-1 text-gray-700">{complaintData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Media Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5" /> Media Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {complaintData.media.map((item, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resolution Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resolution Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter resolution notes or internal comments..."
                className="min-h-[120px]"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              />
              <Button className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90">
                Update Complaint
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" /> Status Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaintData.timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1">
                      {item.status === "done" ? (
                        <CheckCircle className="h-5 w-5 text-[#2D6A4F]" />
                      ) : item.status === "current" ? (
                        <div className="h-5 w-5 rounded-full border-2 border-[#E9C46A] bg-[#E9C46A]/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-[#E9C46A]" />
                        </div>
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${item.status === "pending" ? "text-gray-400" : ""}`}>
                        {item.event}
                      </p>
                      {item.date && (
                        <p className="text-xs text-gray-400">{item.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assign Official */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assign Official</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={official} onValueChange={setOfficial}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an official" />
                </SelectTrigger>
                <SelectContent>
                  {officials.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                Assign
              </Button>
            </CardContent>
          </Card>

          {/* Update Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-y-2">
                <Label>Remarks</Label>
                <Textarea
                  placeholder="Add remarks for this status update..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              <Button variant="outline" className="w-full">
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
