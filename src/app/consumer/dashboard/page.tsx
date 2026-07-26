"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  Search,
  Heart,
  Eye,
  MapPin,
  Star,
  ArrowRight,
  TrendingUp,
  Store,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ConsumerDashboard() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([])
  const [stats, setStats] = useState({
    savedListings: 0,
    recentViews: 0,
    nearbySellers: 0,
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const favRes = await fetch("/api/favorites")
        if (favRes.ok) {
          const favData = await favRes.json()
          setStats((prev) => ({
            ...prev,
            savedListings: favData.favorites?.length ?? 0,
          }))
        }
      } catch {}

      try {
        const listRes = await fetch("/api/listings?limit=50")
        if (listRes.ok) {
          const listData = await listRes.json()
          const listings = listData.listings ?? []
          const uniqueSellers = new Set(listings.map((l: any) => l.villagerId))
          setStats((prev) => ({
            ...prev,
            nearbySellers: uniqueSellers.size,
          }))
        }
      } catch {}
    }

    fetchDashboardData()
  }, [])

  const userName = (session?.user as any)?.name?.split(" ")[0] || "there"

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/consumer/listings?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 p-6 text-white sm:p-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome, {userName}!</h1>
        <p className="mt-1 text-primary-100">
          Discover fresh produce and handcrafted goods from local villages
        </p>
        <form onSubmit={handleSearch} className="mt-4 flex max-w-lg gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for products, sellers, villages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/95 border-0 text-text-primary placeholder:text-gray-400"
            />
          </div>
          <Button type="submit" variant="secondary" className="bg-white text-primary-600 hover:bg-primary-50">
            Search
          </Button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
              <Heart className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.savedListings}</p>
              <p className="text-sm text-text-secondary">Saved Listings</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
              <Eye className="h-6 w-6 text-secondary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.recentViews}</p>
              <p className="text-sm text-text-secondary">Recent Views</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
              <Store className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.nearbySellers}</p>
              <p className="text-sm text-text-secondary">Nearby Sellers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recently Viewed */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Recently Viewed</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-600"
            onClick={() => router.push("/consumer/listings")}
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        {recentlyViewed.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted mb-3" />
              <h3 className="font-medium text-text-primary">No products viewed yet</h3>
              <p className="mt-1 text-sm text-text-secondary">
                Start browsing listings to see your recently viewed items here.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push("/consumer/listings")}
              >
                Browse Listings
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map((item: any) => (
              <Card
                key={item.id}
                className="min-w-[260px] max-w-[260px] shrink-0 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/consumer/report/${item.id}`)}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium text-text-primary line-clamp-1">{item.title}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.village}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Trending Section */}
      <section className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Trending in Your Area</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Organic Vegetables", "Handloom Products", "Desi Ghee", "Homemade Pickles", "Farm Fresh Milk", "Jaggery"].map(
            (tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className="rounded-full border-accent/40 hover:bg-accent/20"
                onClick={() => router.push(`/consumer/listings?search=${encodeURIComponent(tag)}`)}
              >
                {tag}
              </Button>
            )
          )}
        </div>
      </section>
    </div>
  )
}
