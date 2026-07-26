"use client"

import { useState } from "react"
import {
  Bell,
  Check,
  CheckCheck,
  Package,
  AlertTriangle,
  MessageCircle,
  Megaphone,
  CreditCard,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EmptyState from "@/components/common/EmptyState"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  type: "listing" | "complaint" | "inquiry" | "announcement" | "payment"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Consumer Inquiry",
    body: "Priya Sharma is interested in your \"Fresh Tomatoes\" listing. They want to order 50 kg.",
    time: "2 hours ago",
    read: false,
    type: "inquiry",
  },
  {
    id: "2",
    title: "Complaint Status Updated",
    body: "Your complaint #GSC-2026-001234 (Water Supply) has been assigned to the Block Development Officer.",
    time: "5 hours ago",
    read: false,
    type: "complaint",
  },
  {
    id: "3",
    title: "Listing Viewed",
    body: "Your listing \"Fresh Organic Wheat Flour\" has received 15 new views today.",
    time: "1 day ago",
    read: true,
    type: "listing",
  },
  {
    id: "4",
    title: "Payment Received",
    body: "You received ₹3,000 for the milk supply order from Amit Patel.",
    time: "2 days ago",
    read: true,
    type: "payment",
  },
  {
    id: "5",
    title: "Government Scheme Update",
    body: "New PM-KISAN installment has been released. Check your bank account for ₹2,000 credit.",
    time: "3 days ago",
    read: true,
    type: "announcement",
  },
  {
    id: "6",
    title: "Complaint Resolved",
    body: "Your complaint #GSC-2026-001156 (Street Lights) has been marked as resolved.",
    time: "5 days ago",
    read: true,
    type: "complaint",
  },
  {
    id: "7",
    title: "New Inquiry",
    body: "Deepak Verma asked about the availability of your \"Mustard Seeds\" listing.",
    time: "6 days ago",
    read: true,
    type: "inquiry",
  },
  {
    id: "8",
    title: "Listing Approved",
    body: "Your listing \"Handwoven Cotton Bedsheet\" has been approved and is now live.",
    time: "1 week ago",
    read: true,
    type: "listing",
  },
]

const typeIcons: Record<string, typeof Bell> = {
  listing: Package,
  complaint: AlertTriangle,
  inquiry: MessageCircle,
  announcement: Megaphone,
  payment: CreditCard,
}

const typeColors: Record<string, string> = {
  listing: "bg-primary-50 text-primary-600",
  complaint: "bg-orange-50 text-orange-600",
  inquiry: "bg-blue-50 text-blue-600",
  announcement: "bg-yellow-50 text-yellow-600",
  payment: "bg-green-50 text-green-600",
}

export default function VillagerNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-text-primary">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="default" className="text-xs">{unreadCount} new</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up! Notifications about your listings, complaints, and inquiries will appear here."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.type] || Bell
            return (
              <Card
                key={notification.id}
                className={cn(
                  "cursor-pointer transition-colors hover:border-primary-200",
                  !notification.read && "border-l-4 border-l-primary-500 bg-primary-50/30"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", typeColors[notification.type])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn("text-sm font-medium", notification.read ? "text-text-primary" : "text-primary-700")}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{notification.body}</p>
                    <p className="mt-1 text-xs text-muted">{notification.time}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
