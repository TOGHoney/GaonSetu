"use client"

import { useState } from "react"
import { MessageCircle, Phone, MessageSquare, Calendar, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EmptyState from "@/components/common/EmptyState"
import ContactButton from "@/components/common/ContactButton"

interface Inquiry {
  id: string
  listingTitle: string
  consumerName: string
  message: string
  date: string
  phone: string
  quantity: string
  status: "new" | "replied" | "completed"
}

const mockInquiries: Inquiry[] = [
  {
    id: "1",
    listingTitle: "Fresh Organic Wheat Flour",
    consumerName: "Priya Sharma",
    message: "Hi, I am interested in buying 50 kg of wheat flour for my grocery store. Can you provide bulk pricing? Also, is delivery available to Alwar city?",
    date: "2026-07-24",
    phone: "9876512345",
    quantity: "50 kg",
    status: "new",
  },
  {
    id: "2",
    listingTitle: "Pure Buffalo Milk",
    consumerName: "Amit Patel",
    message: "Do you offer daily milk delivery to Sector 5, Alwar? I need about 10 liters per day for my family.",
    date: "2026-07-22",
    phone: "9812345678",
    quantity: "10 liters/day",
    status: "replied",
  },
  {
    id: "3",
    listingTitle: "Fresh Tomatoes - Farm Direct",
    consumerName: "Sunita Devi",
    message: "I run a small restaurant and need 100 kg of tomatoes weekly. What would be the weekly rate? Can you guarantee consistent quality?",
    date: "2026-07-20",
    phone: "9988776655",
    quantity: "100 kg/week",
    status: "new",
  },
  {
    id: "4",
    listingTitle: "Handwoven Cotton Bedsheet",
    consumerName: "Ravi Mehta",
    message: "Beautiful bedsheets! Do you make custom sizes? I need king size (108x108 inches). Also, what are the available color options?",
    date: "2026-07-18",
    phone: "9112233445",
    quantity: "5 pieces",
    status: "completed",
  },
]

const statusBadge: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-100 text-blue-800" },
  replied: { label: "Replied", className: "bg-yellow-100 text-yellow-800" },
  completed: { label: "Completed", className: "bg-green-100 text-green-800" },
}

export default function VillagerInquiries() {
  const [inquiries] = useState(mockInquiries)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Consumer Inquiries</h2>
        <Badge variant="secondary">{inquiries.filter((i) => i.status === "new").length} new</Badge>
      </div>

      {inquiries.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="No inquiries yet"
          description="When consumers are interested in your listings, their inquiries will appear here."
        />
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} className="transition-colors hover:border-primary-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50">
                      <Package className="h-5 w-5 text-primary-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-primary-600">{inquiry.listingTitle}</p>
                        <Badge className={`text-[10px] ${statusBadge[inquiry.status].className}`}>
                          {statusBadge[inquiry.status].label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-text-primary">
                        <span className="font-medium">{inquiry.consumerName}</span> wants to order{" "}
                        <span className="font-medium">{inquiry.quantity}</span>
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{inquiry.message}</p>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                          <Calendar className="h-3.5 w-3.5" />
                          {inquiry.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                  <ContactButton phone={inquiry.phone} whatsappMessage={`Hi ${inquiry.consumerName}, thank you for your interest in "${inquiry.listingTitle}" on GaonSetu.`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
