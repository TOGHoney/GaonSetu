"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, MapPin, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EmptyState from "@/components/common/EmptyState"
import ContactButton from "@/components/common/ContactButton"

interface FavoriteListing {
  id: string
  title: string
  price: string
  village: string
  seller: string
  phone: string
  image: string
  category: string
  addedDate: string
}

const initialFavorites: FavoriteListing[] = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    price: "₹40/kg",
    village: "Wardha",
    seller: "Ramesh Patil",
    phone: "9876543210",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
    category: "Vegetables",
    addedDate: "2 days ago",
  },
  {
    id: "2",
    title: "Handwoven Cotton Saree",
    price: "₹1,200",
    village: "Nagpur",
    seller: "Sunita Devi",
    phone: "9876543211",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
    category: "Handloom",
    addedDate: "5 days ago",
  },
  {
    id: "3",
    title: "Desi Ghee (Pure Cow)",
    price: "₹600/litre",
    village: "Amravati",
    seller: "Mahesh Kumar",
    phone: "9876543212",
    image: "https://images.unsplash.com/photo-1631209119079-0f83e5f5e1dd?w=400&h=300&fit=crop",
    category: "Dairy",
    addedDate: "1 week ago",
  },
  {
    id: "4",
    title: "Traditional Jaggery",
    price: "₹80/kg",
    village: "Chandrapur",
    seller: "Vikram Gosavi",
    phone: "9876543213",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    category: "Food",
    addedDate: "1 week ago",
  },
  {
    id: "5",
    title: "Bamboo Craft Basket",
    price: "₹350",
    village: "Gadchiroli",
    seller: "Lata Bai",
    phone: "9876543214",
    image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=400&h=300&fit=crop",
    category: "Crafts",
    addedDate: "2 weeks ago",
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteListing[]>(initialFavorites)

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  if (favorites.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Saved Listings</h1>
          <p className="text-sm text-text-secondary">Your favorite products and sellers</p>
        </div>
        <EmptyState
          icon={Heart}
          title="No saved listings yet"
          description="Browse listings and save the ones you like. They will appear here for easy access."
          actionLabel="Browse Listings"
          onAction={() => router.push("/consumer/listings")}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Saved Listings</h1>
          <p className="text-sm text-text-secondary">
            {favorites.length} saved {favorites.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/consumer/listings")}
        >
          <ShoppingCart className="mr-1.5 h-4 w-4" />
          Browse More
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-accent text-text-primary">
                {item.category}
              </Badge>
              <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90">
                {item.price}
              </Badge>
              <button
                onClick={() => removeFavorite(item.id)}
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-sm transition-colors hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-text-primary">{item.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
                <MapPin className="h-3.5 w-3.5" />
                {item.village} &middot; {item.seller}
              </div>
              <p className="mt-1 text-xs text-text-secondary">Added {item.addedDate}</p>
              <div className="mt-3">
                <ContactButton phone={item.phone} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
