"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  CheckCircle,
  Flag,
  Trash2,
  MapPin,
  Calendar,
  Tag,
  User,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

const listingData = {
  id: "LST-004",
  title: "Raw Wildflower Honey",
  category: "Agriculture",
  description:
    "Pure, unprocessed wildflower honey sourced from the forests near Haryana. Harvested using traditional methods without any chemical processing. Rich in enzymes and antioxidants. Available in 500ml and 1kg jars.",
  price: "₹450/kg",
  quantity: "100 kg",
  village: "Haryana",
  district: "Ambala",
  seller: {
    name: "Anita Sharma",
    id: "USR-006",
    role: "Villager",
    rating: 4.5,
  },
  status: "Flagged",
  created: "2024-06-05",
  images: ["Honey Jar 1", "Honey Jar 2", "Harvesting Process"],
}

export default function ListingDetailPage() {
  const [reason, setReason] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/listings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listing Details</h1>
          <p className="text-gray-500">{listingData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listing Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{listingData.title}</CardTitle>
                <Badge variant="destructive">{listingData.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-500">Price</Label>
                  <p className="font-semibold text-lg text-[#2D6A4F]">{listingData.price}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Quantity</Label>
                  <p className="font-semibold">{listingData.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">{listingData.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">{listingData.village}, {listingData.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Created {listingData.created}</span>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-gray-500">Description</Label>
                <p className="mt-1 text-gray-700">{listingData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5" /> Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {listingData.images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border"
                  >
                    {img}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Moderation Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Moderation Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button variant="default" className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90">
                  <CheckCircle className="h-4 w-4 mr-2" /> Approve
                </Button>
                <Button variant="secondary">
                  <Flag className="h-4 w-4 mr-2" /> Flag
                </Button>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Reason for Flag/Remove</Label>
                <Textarea
                  placeholder="Enter the reason for this moderation action..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seller Info */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" /> Seller Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] font-bold">
                {listingData.seller.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{listingData.seller.name}</p>
                <p className="text-sm text-gray-500">{listingData.seller.role}</p>
              </div>
            </div>
            <Separator />
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Seller ID</span>
                <span className="font-medium">{listingData.seller.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rating</span>
                <span className="font-medium text-[#E9C46A]">★ {listingData.seller.rating}</span>
              </div>
            </div>
            <Link href={`/admin/users/${listingData.seller.id}`}>
              <Button variant="outline" className="w-full">
                View Seller Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
