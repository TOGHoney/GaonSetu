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
  CheckCircle,
  Flag,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const mockListings = [
  {
    id: "LST-001",
    title: "Organic Wheat Flour",
    category: "Agriculture",
    seller: "Ramesh Kumar",
    village: "Rampur",
    status: "Active",
    created: "2024-05-20",
  },
  {
    id: "LST-002",
    title: "Handwoven Cotton Saree",
    category: "Textiles",
    seller: "Sunita Devi",
    village: "Sitapur",
    status: "Pending",
    created: "2024-06-01",
  },
  {
    id: "LST-003",
    title: "Fresh A2 Milk",
    category: "Dairy",
    seller: "Vikram Yadav",
    village: "Rampur",
    status: "Active",
    created: "2024-06-03",
  },
  {
    id: "LST-004",
    title: "Raw Wildflower Honey",
    category: "Agriculture",
    seller: "Anita Sharma",
    village: "Haryana",
    status: "Flagged",
    created: "2024-06-05",
  },
  {
    id: "LST-005",
    title: "Bamboo Handicraft Set",
    category: "Handicrafts",
    seller: "Priya Singh",
    village: "Assam",
    status: "Pending",
    created: "2024-06-08",
  },
  {
    id: "LST-006",
    title: "Basmati Rice Premium",
    category: "Agriculture",
    seller: "Ramesh Kumar",
    village: "Rampur",
    status: "Active",
    created: "2024-06-10",
  },
]

const statusVariant: Record<string, string> = {
  Active: "success",
  Pending: "warning",
  Flagged: "destructive",
  Removed: "secondary",
}

export default function AdminListingsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = mockListings.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.seller.toLowerCase().includes(search.toLowerCase()) ||
      l.village.toLowerCase().includes(search.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && l.status === "Pending") ||
      (activeTab === "active" && l.status === "Active") ||
      (activeTab === "flagged" && l.status === "Flagged")
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listing Moderation</h1>
          <p className="text-gray-500">Review and manage all product listings</p>
        </div>
        <Badge variant="secondary">{mockListings.length} Total</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search listings..."
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
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{listing.category}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{listing.seller}</TableCell>
                      <TableCell className="text-gray-500">{listing.village}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[listing.status] as any}>
                          {listing.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{listing.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {listing.status === "Pending" && (
                            <Button variant="ghost" size="icon" title="Approve">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" title="Flag">
                            <Flag className="h-4 w-4 text-yellow-600" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Remove">
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
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing 1-{filtered.length} of {filtered.length} listings
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
