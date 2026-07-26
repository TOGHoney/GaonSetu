"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Wheat,
  Milk,
  Apple,
  Tractor,
  Palette,
  Package,
  Store,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmptyState from "@/components/common/EmptyState"
import { formatPrice } from "@/lib/utils"
import type { ListingCategory, ListingAvailability } from "@/types"

interface MockListing {
  id: string
  title: string
  category: ListingCategory
  price: number
  unit: string
  quantity: number
  views: number
  availability: ListingAvailability
  images: string[]
  createdAt: string
}

const mockListings: MockListing[] = [
  {
    id: "1",
    title: "Fresh Organic Wheat Flour",
    category: "CROP",
    price: 45,
    unit: "kg",
    quantity: 500,
    views: 342,
    availability: "IN_STOCK",
    images: [],
    createdAt: "2026-07-15",
  },
  {
    id: "2",
    title: "Pure Buffalo Milk",
    category: "MILK",
    price: 60,
    unit: "liter",
    quantity: 50,
    views: 218,
    availability: "IN_STOCK",
    images: [],
    createdAt: "2026-07-18",
  },
  {
    id: "3",
    title: "Fresh Tomatoes - Farm Direct",
    category: "FRUITS_VEGETABLES",
    price: 30,
    unit: "kg",
    quantity: 200,
    views: 156,
    availability: "IN_STOCK",
    images: [],
    createdAt: "2026-07-20",
  },
  {
    id: "4",
    title: "Handwoven Cotton Bedsheet",
    category: "HANDMADE",
    price: 800,
    unit: "piece",
    quantity: 15,
    views: 89,
    availability: "PRE_ORDER",
    images: [],
    createdAt: "2026-07-10",
  },
  {
    id: "5",
    title: "Desi Chicken Eggs",
    category: "LIVESTOCK",
    price: 12,
    unit: "piece",
    quantity: 300,
    views: 445,
    availability: "IN_STOCK",
    images: [],
    createdAt: "2026-07-22",
  },
  {
    id: "6",
    title: "Mustard Seeds - Premium Quality",
    category: "CROP",
    price: 180,
    unit: "kg",
    quantity: 100,
    views: 98,
    availability: "OUT_OF_STOCK",
    images: [],
    createdAt: "2026-06-28",
  },
]

const categoryIcons: Record<string, typeof Wheat> = {
  CROP: Wheat,
  MILK: Milk,
  FRUITS_VEGETABLES: Apple,
  LIVESTOCK: Tractor,
  HANDMADE: Palette,
  BUSINESS: Store,
  OTHER: MoreHorizontal,
}

const statusColors: Record<string, string> = {
  IN_STOCK: "bg-green-100 text-green-800",
  OUT_OF_STOCK: "bg-red-100 text-red-800",
  PRE_ORDER: "bg-yellow-100 text-yellow-800",
}

const statusLabels: Record<string, string> = {
  IN_STOCK: "Active",
  OUT_OF_STOCK: "Out of Stock",
  PRE_ORDER: "Pre-Order",
}

export default function VillagerListings() {
  const [filter, setFilter] = useState("all")

  const filteredListings = mockListings.filter((l) => {
    if (filter === "active") return l.availability === "IN_STOCK"
    if (filter === "pending") return l.availability === "PRE_ORDER"
    if (filter === "flagged") return l.availability === "OUT_OF_STOCK"
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">My Listings</h2>
        <Link href="/villager/listings/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Button>
        </Link>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All ({mockListings.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({mockListings.filter((l) => l.availability === "IN_STOCK").length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({mockListings.filter((l) => l.availability === "PRE_ORDER").length})
          </TabsTrigger>
          <TabsTrigger value="flagged">
            Out of Stock ({mockListings.filter((l) => l.availability === "OUT_OF_STOCK").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          {filteredListings.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No listings found"
              description="You don't have any listings in this category yet."
              actionLabel="Create Listing"
              onAction={() => {}}
            />
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => {
                const Icon = categoryIcons[listing.category] || MoreHorizontal
                return (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                      <Icon className="h-12 w-12 text-primary-300" />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="font-semibold text-text-primary">{listing.title}</h3>
                        <Badge className={`shrink-0 text-[10px] ${statusColors[listing.availability]}`}>
                          {statusLabels[listing.availability]}
                        </Badge>
                      </div>
                      <Badge variant="secondary" className="mb-3 text-[10px]">
                        {listing.category.replace("_", " ")}
                      </Badge>
                      <div className="mb-3 flex items-baseline justify-between">
                        <span className="text-lg font-bold text-primary-600">
                          {formatPrice(listing.price)}
                          <span className="text-xs font-normal text-text-secondary">/{listing.unit}</span>
                        </span>
                        <span className="text-xs text-text-secondary">{listing.quantity} {listing.unit}s</span>
                      </div>
                      <div className="mb-3 flex items-center gap-1 text-xs text-text-secondary">
                        <Eye className="h-3.5 w-3.5" />
                        {listing.views} views
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/villager/listings/${listing.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="mr-1 h-3.5 w-3.5" />
                            Edit
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
