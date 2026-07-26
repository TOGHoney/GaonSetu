"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import VerifiedBadge from "@/components/common/VerifiedBadge"
import ContactButton from "@/components/common/ContactButton"
import {
  Search,
  SlidersHorizontal,
  X,
  Wheat,
  Milk,
  Apple,
  Beef,
  HandMetal,
  Briefcase,
  HelpCircle,
  Eye,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
} from "lucide-react"

const CATEGORIES = [
  { id: "crops", label: "Crops", icon: Wheat },
  { id: "milk", label: "Milk & Dairy", icon: Milk },
  { id: "fruits", label: "Fruits & Vegetables", icon: Apple },
  { id: "livestock", label: "Livestock", icon: Beef },
  { id: "handmade", label: "Handmade", icon: HandMetal },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "other", label: "Other", icon: HelpCircle },
]

const AVAILABILITY_OPTIONS = ["In Stock", "Upcoming", "Sold Out"]

const DISTRICTS = [
  "All Districts",
  "Lucknow",
  "Varanasi",
  "Jaipur",
  "Bhopal",
  "Pune",
  "Nagpur",
  "Indore",
  "Patna",
]

const STATES = [
  "All States",
  "Uttar Pradesh",
  "Rajasthan",
  "Madhya Pradesh",
  "Maharashtra",
  "Bihar",
  "Gujarat",
]

const MOCK_LISTINGS = [
  {
    id: "1",
    title: "Fresh Basmati Rice — Premium Long Grain",
    category: "crops",
    price: 85,
    unit: "kg",
    quantity: "500 kg available",
    village: "Raebareli",
    district: "Lucknow",
    seller: "Ram Prasad",
    verified: true,
    views: 342,
    color: "bg-green-100",
  },
  {
    id: "2",
    title: "Pure Desi Cow A2 Milk",
    category: "milk",
    price: 60,
    unit: "litre",
    quantity: "80 litres daily",
    village: "Mohanlalganj",
    district: "Lucknow",
    seller: "Sunita Devi",
    verified: true,
    views: 521,
    color: "bg-blue-100",
  },
  {
    id: "3",
    title: "Organic Tomatoes — Farm Fresh",
    category: "fruits",
    price: 40,
    unit: "kg",
    quantity: "200 kg available",
    village: "Sarnath",
    district: "Varanasi",
    seller: "Vikram Singh",
    verified: false,
    views: 187,
    color: "bg-red-100",
  },
  {
    id: "4",
    title: "Handwoven Banarasi Silk Saree",
    category: "handmade",
    price: 2500,
    unit: "piece",
    quantity: "12 pieces available",
    village: "Chowk",
    district: "Varanasi",
    seller: "Meera Textiles",
    verified: true,
    views: 893,
    color: "bg-purple-100",
  },
  {
    id: "5",
    title: "Alsi (Flax Seeds) — Organic Cold-Pressed",
    category: "crops",
    price: 120,
    unit: "kg",
    quantity: "100 kg available",
    village: "Jhansi",
    district: "Jhansi",
    seller: "Dhananjay Verma",
    verified: true,
    views: 256,
    color: "bg-yellow-100",
  },
  {
    id: "6",
    title: "Local Honey — Wild Forest采集",
    category: "other",
    price: 350,
    unit: "kg",
    quantity: "25 kg available",
    village: "Chitrakoot",
    district: "Banda",
    seller: "Honey Forest Co-op",
    verified: false,
    views: 124,
    color: "bg-amber-100",
  },
  {
    id: "7",
    title: "Jamunapari Goat Kids — Breed Stock",
    category: "livestock",
    price: 8000,
    unit: "pair",
    quantity: "6 pairs available",
    village: "Fatehpur",
    district: "Fatehpur",
    seller: "Rajendra Pal",
    verified: true,
    views: 412,
    color: "bg-orange-100",
  },
  {
    id: "8",
    title: "Fresh Paneer — Daily Made",
    category: "milk",
    price: 300,
    unit: "kg",
    quantity: "30 kg daily",
    village: "Kanpur",
    district: "Kanpur",
    seller: "Anita Dairy Farm",
    verified: true,
    views: 678,
    color: "bg-sky-100",
  },
]

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "views", label: "Most Viewed" },
]

const FEATURED_SELLERS = [
  { name: "Ram Prasad", village: "Raebareli", district: "Lucknow", listings: 12, rating: 4.8 },
  { name: "Sunita Devi", village: "Mohanlalganj", district: "Lucknow", listings: 8, rating: 4.9 },
  { name: "Meera Textiles", village: "Chowk", district: "Varanasi", listings: 15, rating: 4.7 },
]

function FilterSidebar({
  open,
  onClose,
  filters,
  setFilters,
}: {
  open: boolean
  onClose: () => void
  filters: { categories: string[]; availability: string[]; district: string; state: string; priceMin: string; priceMax: string }
  setFilters: (f: any) => void
}) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-border bg-white p-5 transition-transform lg:static lg:z-auto lg:translate-x-0 lg:w-full lg:rounded-lg lg:border lg:shadow-sm
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h2 className="font-semibold text-text-primary">Filters</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Category
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="flex cursor-pointer items-center gap-2 text-sm text-text-primary hover:text-primary-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  checked={filters.categories.includes(cat.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({ ...filters, categories: [...filters.categories, cat.id] })
                    } else {
                      setFilters({ ...filters, categories: filters.categories.filter((c: string) => c !== cat.id) })
                    }
                  }}
                />
                <cat.icon className="h-4 w-4 text-text-secondary" />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Location
          </h3>
          <select
            className="mb-2 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary"
            value={filters.district}
            onChange={(e) => setFilters({ ...filters, district: e.target.value })}
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          >
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Price Range
          </h3>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
              className="text-sm"
            />
            <span className="text-text-secondary">—</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
              className="text-sm"
            />
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Availability
          </h3>
          <div className="space-y-2">
            {AVAILABILITY_OPTIONS.map((opt) => (
              <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm text-text-primary hover:text-primary-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  checked={filters.availability.includes(opt)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({ ...filters, availability: [...filters.availability, opt] })
                    } else {
                      setFilters({ ...filters, availability: filters.availability.filter((a: string) => a !== opt) })
                    }
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            setFilters({
              categories: [],
              availability: [],
              district: "All Districts",
              state: "All States",
              priceMin: "",
              priceMax: "",
            })
          }
        >
          Clear All Filters
        </Button>
      </aside>
    </>
  )
}

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    availability: [] as string[],
    district: "All Districts",
    state: "All States",
    priceMin: "",
    priceMax: "",
  })

  const categoryIconMap: Record<string, React.ElementType> = {
    crops: Wheat,
    milk: Milk,
    fruits: Apple,
    livestock: Beef,
    handmade: HandMetal,
    business: Briefcase,
    other: HelpCircle,
  }

  const categoryLabelMap: Record<string, string> = {
    crops: "Crops",
    milk: "Milk & Dairy",
    fruits: "Fruits & Vegetables",
    livestock: "Livestock",
    handmade: "Handmade",
    business: "Business",
    other: "Other",
  }

  const suggestions = searchQuery
    ? MOCK_LISTINGS.filter((l) =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : []

  return (
    <div className="bg-background">
      {/* Hero search */}
      <section className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
            Browse Local Listings
          </h1>
          <p className="mb-6 text-sm text-text-secondary">
            Find fresh produce, handmade goods, and local products directly from villages
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search for rice, milk, sarees, honey..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-4"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full z-30 mt-1 w-full rounded-lg border border-border bg-white shadow-lg">
                {suggestions.map((s) => (
                  <Link
                    key={s.id}
                    href={`/listings/${s.id}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-gray-50"
                  >
                    <Search className="h-3.5 w-3.5 text-muted" />
                    <span>{s.title}</span>
                    <span className="ml-auto text-xs text-muted">{s.district}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Mobile filter toggle */}
          <button
            className="inline-flex items-center gap-2 self-start rounded-md border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary lg:hidden"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>

          {/* Filter sidebar */}
          <div className="hidden lg:block lg:w-64 lg:shrink-0">
            <FilterSidebar
              open={false}
              onClose={() => {}}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* Mobile sidebar */}
          {mobileFilterOpen && (
            <FilterSidebar
              open={mobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
              filters={filters}
              setFilters={setFilters}
            />
          )}

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{MOCK_LISTINGS.length}</span> listings
              </p>

              <div className="flex items-center gap-3">
                <label className="text-sm text-text-secondary">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-border bg-white px-3 py-1.5 text-sm text-text-primary"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Listing grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {MOCK_LISTINGS.map((listing) => {
                const CatIcon = categoryIconMap[listing.category] || HelpCircle
                return (
                  <Card key={listing.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                    <div className={`flex h-40 items-center justify-center ${listing.color}`}>
                      <CatIcon className="h-12 w-12 text-text-secondary/40" />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {categoryLabelMap[listing.category]}
                        </Badge>
                      </div>

                      <Link href={`/listings/${listing.id}`}>
                        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-text-primary group-hover:text-primary-500">
                          {listing.title}
                        </h3>
                      </Link>

                      <p className="mb-1 text-lg font-bold text-primary-500">
                        ₹{listing.price.toLocaleString()}
                        <span className="text-xs font-normal text-text-secondary"> / {listing.unit}</span>
                      </p>
                      <p className="mb-2 text-xs text-text-secondary">{listing.quantity}</p>

                      <div className="mb-3 flex items-center gap-1 text-xs text-text-secondary">
                        <MapPin className="h-3 w-3" />
                        {listing.village}, {listing.district}
                      </div>

                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[10px] font-bold text-primary-500">
                            {listing.seller[0]}
                          </div>
                          <span className="text-xs font-medium text-text-primary">{listing.seller}</span>
                          {listing.verified && <VerifiedBadge size="sm" />}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Eye className="h-3 w-3" />
                          {listing.views}
                        </span>
                      </div>

                      <ContactButton
                        phone="+91 98765 43210"
                        whatsappMessage={`Hi, I'm interested in "${listing.title}" listed on GaonSetu.`}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 3}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Sellers */}
        <section className="mt-12 border-t border-border pt-10">
          <h2 className="mb-6 text-xl font-bold text-text-primary">Featured Local Sellers</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_SELLERS.map((seller) => (
              <Card key={seller.name} className="p-4 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-lg font-bold text-primary-500">
                    {seller.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-text-primary">{seller.name}</h3>
                      <VerifiedBadge size="sm" />
                    </div>
                    <p className="text-xs text-text-secondary">
                      {seller.village}, {seller.district}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs text-text-secondary">{seller.listings} listings</span>
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    {seller.rating}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
