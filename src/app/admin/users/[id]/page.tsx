"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ShieldCheck,
  UserX,
  Ban,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  AlertTriangle,
  Clock,
} from "lucide-react"
import Link from "next/link"

const userData = {
  id: "USR-001",
  name: "Ramesh Kumar",
  email: "ramesh@email.com",
  phone: "+91 98765 43210",
  role: "Villager",
  status: "Active",
  verified: true,
  joined: "2024-01-15",
  photo: null,
  address: "Rampur Village, UP",
  bio: "Organic farmer with 5 acres of land. Specializes in wheat, rice, and spices.",
}

const userListings = [
  { id: "LST-001", title: "Organic Wheat Flour", price: "₹180/kg", status: "Active", date: "2024-05-20" },
  { id: "LST-004", title: "Basmati Rice", price: "₹220/kg", status: "Active", date: "2024-06-01" },
  { id: "LST-008", title: "Turmeric Powder", price: "₹250/kg", status: "Pending", date: "2024-06-10" },
]

const userComplaints = [
  { id: "CMP-1001", title: "Road damage near farm", status: "Resolved", date: "2024-03-10" },
  { id: "CMP-1015", title: "Irregular electricity supply", status: "In Progress", date: "2024-05-28" },
]

const auditLog = [
  { timestamp: "2024-06-15 14:32", action: "Login", details: "Successful login from Chrome/Mobile" },
  { timestamp: "2024-06-14 09:15", action: "Profile Updated", details: "Changed phone number" },
  { timestamp: "2024-06-12 11:20", action: "Listing Created", details: "Created listing: Turmeric Powder" },
  { timestamp: "2024-06-10 16:45", action: "Complaint Filed", details: "CMP-1015: Irregular electricity" },
  { timestamp: "2024-06-01 08:00", action: "Login", details: "Successful login from Chrome/Desktop" },
]

export default function UserDetailPage() {
  const [remark, setRemark] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500">{userData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] text-2xl font-bold mb-3">
                {userData.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <Badge variant={userData.role === "Villager" ? "default" : "secondary"} className="mt-2">
                {userData.role}
              </Badge>
              <Badge variant={userData.status === "Active" ? "success" : "destructive"} className="mt-1">
                {userData.status}
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="h-4 w-4" /> {userData.email}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Phone className="h-4 w-4" /> {userData.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4" /> {userData.address}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="h-4 w-4" /> Joined {userData.joined}
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-gray-600">{userData.bio}</p>
            <Separator className="my-4" />
            <div className="space-y-2">
              <Label>Admin Remark</Label>
              <Textarea
                placeholder="Add a remark for this user..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="default" size="sm">
                <ShieldCheck className="h-4 w-4 mr-1" /> Verify
              </Button>
              <Button variant="secondary" size="sm">
                <UserX className="h-4 w-4 mr-1" /> Suspend
              </Button>
              <Button variant="destructive" size="sm">
                <Ban className="h-4 w-4 mr-1" /> Block
              </Button>
              <Button variant="destructive" size="sm" className="bg-red-700 hover:bg-red-800">
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {/* Listings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" /> Their Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{listing.title}</p>
                      <p className="text-sm text-gray-500">{listing.price} - {listing.date}</p>
                    </div>
                    <Badge variant={listing.status === "Active" ? "success" : "warning"}>
                      {listing.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complaints */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Their Complaints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-gray-500">{complaint.id} - {complaint.date}</p>
                    </div>
                    <Badge variant={complaint.status === "Resolved" ? "success" : complaint.status === "In Progress" ? "warning" : "destructive"}>
                      {complaint.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audit Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" /> Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLog.map((log, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="h-2 w-2 rounded-full bg-[#2D6A4F] mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{log.action}</p>
                        <span className="text-xs text-gray-400">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-500">{log.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
