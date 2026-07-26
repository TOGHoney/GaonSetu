"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import VerifiedBadge from "@/components/common/VerifiedBadge"
import ContactButton from "@/components/common/ContactButton"
import {
  Wheat,
  Milk,
  Apple,
  Beef,
  HandMetal,
  Briefcase,
  HelpCircle,
  Eye,
  MessageCircle,
  MapPin,
  Calendar,
  Heart,
  Flag,
  ChevronRight,
  Star,
  ArrowLeft,
} from "lucide-react"

const MOCK_LISTING = {
  id: "1",
  title: "Fresh Basmati Rice — Premium Long Grain 1121",
  category: "crops",
  categoryLabel: "Crops",
  price: 85,
  unit: "kg",
  quantity: "500 kg available",
  description:
    "We are offering premium quality 1121 Basmati Rice, directly from our family farms in Raebareli, Uttar Pradesh. This rice is known for its extra-long grains, exquisite aroma, and fluffy texture when cooked. Grown using traditional methods without harmful chemicals. Ideal for biryanis, pulao, and everyday meals. Bulk orders welcome — minimum order 25 kg. Delivery available within 50 km radius. For orders beyond that, please contact us for shipping arrangements.",
  views: 342,
  inquiries: 23,
  postedDate: "2026-07-15",
  availability: "In Stock",
  seller: {
    name: "Ram Prasad",
    verified: true,
    village: "Raebareli",
    district: "Lucknow",
    state: "Uttar Pradesh",
    phone: "+91 98765 43210",
    totalListings: 12,
    memberSince: "Jan 2025",
  },
  photos: [
    { id: 1, color: "bg-green-100", label: "Main" },
    { id: 2, color: "bg-green-200", label: "Detail 1" },
    { id: 3, color: "bg-green-50", label: "Detail 2" },
    { id: 4, color: "bg-green-300", label: "Detail 3" },
  ],
}

const RELATED = [
  { id: "5", title: "Alsi (Flax Seeds) — Organic", price: 120, unit: "kg", color: "bg-yellow-100", district: "Jhansi" },
  { id: "6", title: "Local Honey — Wild Forest", price: 350, unit: "kg", color: "bg-amber-100", district: "Banda" },
  { id: "3", title: "Organic Tomatoes — Farm Fresh", price: 40, unit: "kg", color: "bg-red-100", district: "Varanasi" },
]

const categoryIconMap: Record<string, React.ElementType> = {
  crops: Wheat, milk: Milk, fruits: Apple, livestock: Beef,
  handmade: HandMetal, business: Briefcase, other: HelpCircle,
}

export default function ListingDetailPage() {
  const listing = MOCK_LISTING
  const [activePhoto, setActivePhoto] = useState(0)
  const [saved, setSaved] = useState(false)

  const CatIcon = categoryIconMap[listing.category] || HelpCircle

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-xs text-text-secondary">
          <Link href="/" className="hover:text-primary-500">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/listings" className="hover:text-primary-500">Listings</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-primary-500">{listing.categoryLabel}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-text-primary">{listing.title}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Gallery + Info */}
          <div className="lg:col-span-2">
            {/* Back button */}
            <Link
              href="/listings"
              className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to listings
            </Link>

            {/* Photo gallery */}
            <div className="mb-6 overflow-hidden rounded-xl border border-border bg-white">
              <div className={`flex h-64 items-center justify-center sm:h-80 ${listing.photos[activePhoto].color}`}>
                <CatIcon className="h-20 w-20 text-text-secondary/30" />
              </div>
              <div className="flex gap-2 p-3">
                {listing.photos.map((photo, idx) => (
                  <button
                    key={photo.id}
                    onClick={() => setActivePhoto(idx)}
                    className={`h-16 w-16 rounded-lg border-2 transition-all ${listing.photos[idx].color} ${
                      idx === activePhoto
                        ? "border-primary-500 ring-2 ring-primary-200"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title & meta */}
            <div className="mb-6">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{listing.categoryLabel}</Badge>
                <Badge className="bg-green-100 text-green-700 border-green-200">{listing.availability}</Badge>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">{listing.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {listing.views} views
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {listing.inquiries} inquiries
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Posted {listing.postedDate}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 rounded-lg border border-primary-100 bg-primary-50 p-4">
              <p className="text-sm text-text-secondary">Price</p>
              <p className="text-3xl font-bold text-primary-500">
                ₹{listing.price.toLocaleString()}
                <span className="ml-1 text-base font-normal text-text-secondary">/ {listing.unit}</span>
              </p>
              <p className="mt-1 text-sm text-text-secondary">{listing.quantity}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-text-primary">Description</h2>
              <p className="text-sm leading-relaxed text-text-secondary">{listing.description}</p>
            </div>
          </div>

          {/* Right: Seller card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-secondary">
                  Seller Information
                </h3>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-xl font-bold text-primary-500">
                    {listing.seller.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-text-primary">{listing.seller.name}</h4>
                      {listing.seller.verified && <VerifiedBadge size="sm" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <MapPin className="h-3 w-3" />
                      {listing.seller.village}, {listing.seller.district}
                    </div>
                    <p className="text-xs text-text-secondary">{listing.seller.state}</p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-text-primary">{listing.seller.totalListings}</p>
                    <p className="text-[10px] text-text-secondary">Listings</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-text-primary">{listing.seller.memberSince}</p>
                    <p className="text-[10px] text-text-secondary">Member Since</p>
                  </div>
                </div>

                <div className="mb-4 flex flex-col gap-2">
                  <a href={`tel:${listing.seller.phone.replace(/\s+/g, "")}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <span className="mr-2">📞</span>
                      Call: {listing.seller.phone}
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/91${listing.seller.phone.replace(/\s+/g, "").replace(/^\+?91/, "")}?text=${encodeURIComponent(`Hi, I'm interested in "${listing.title}" on GaonSetu.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                      <span className="mr-2">💬</span>
                      WhatsApp Seller
                    </Button>
                  </a>
                </div>

                <Button
                  variant={saved ? "default" : "outline"}
                  className="mb-3 w-full"
                  onClick={() => setSaved(!saved)}
                >
                  <Heart className={`mr-2 h-4 w-4 ${saved ? "fill-white" : ""}`} />
                  {saved ? "Saved to Favorites" : "Save to Favorites"}
                </Button>

                <button className="flex w-full items-center justify-center gap-1 text-xs text-text-secondary hover:text-error">
                  <Flag className="h-3 w-3" />
                  Report Listing
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Listings */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="mb-6 text-xl font-bold text-text-primary">Related Listings</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED.map((item) => {
              const RIcon = categoryIconMap["crops"] || HelpCircle
              return (
                <Link key={item.id} href={`/listings/${item.id}`}>
                  <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                    <div className={`flex h-32 items-center justify-center ${item.color}`}>
                      <RIcon className="h-10 w-10 text-text-secondary/30" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-text-primary group-hover:text-primary-500">
                        {item.title}
                      </h3>
                      <p className="text-lg font-bold text-primary-500">
                        ₹{item.price}
                        <span className="text-xs font-normal text-text-secondary"> / {item.unit}</span>
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
                        <MapPin className="h-3 w-3" />
                        {item.district}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
