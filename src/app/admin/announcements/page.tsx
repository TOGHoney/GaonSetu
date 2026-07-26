"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const mockAnnouncements = [
  {
    id: "ANN-001",
    title: "Monsoon Relief Camp Registration",
    type: "Emergency",
    published: true,
    date: "2024-06-15",
    target: "All Users",
  },
  {
    id: "ANN-002",
    title: "PM-KISAN Scheme Update",
    type: "Scheme",
    published: true,
    date: "2024-06-12",
    target: "Villagers",
  },
  {
    id: "ANN-003",
    title: "Platform Maintenance Notice",
    type: "Notice",
    published: false,
    date: "2024-06-10",
    target: "All Users",
  },
  {
    id: "ANN-004",
    title: "Heavy Rainfall Alert - Next 48 Hours",
    type: "Alert",
    published: true,
    date: "2024-06-08",
    target: "All Users",
  },
  {
    id: "ANN-005",
    title: "New Feature: Video Listings",
    type: "Notice",
    published: true,
    date: "2024-06-05",
    target: "Consumers",
  },
  {
    id: "ANN-006",
    title: "Soil Testing Camp at Block Office",
    type: "Scheme",
    published: false,
    date: "2024-06-01",
    target: "Villagers",
  },
]

const typeVariant: Record<string, string> = {
  Emergency: "destructive",
  Scheme: "default",
  Notice: "secondary",
  Alert: "warning",
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)

  const togglePublish = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, published: !a.published } : a))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500">Create and manage platform announcements</p>
        </div>
        <Link href="/admin/announcements/new">
          <Button className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90">
            <Plus className="h-4 w-4 mr-2" /> Create New
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((ann) => (
                <TableRow key={ann.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Megaphone className="h-4 w-4 text-gray-400" />
                      {ann.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={typeVariant[ann.type] as any}>{ann.type}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{ann.target}</TableCell>
                  <TableCell>
                    <Badge variant={ann.published ? "success" : "secondary"}>
                      {ann.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {ann.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={ann.published ? "Unpublish" : "Publish"}
                        onClick={() => togglePublish(ann.id)}
                      >
                        {ann.published ? (
                          <EyeOff className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
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
