"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  MessageCircle,
  User,
  Bell,
  Search,
  Heart,
  Users,
  Megaphone,
  BarChart3,
  ClipboardList,
  Menu,
  X,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  role: "villager" | "consumer" | "admin"
}

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const getVillagerLinks = (): NavItem[] => [
  { href: "/villager/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/villager/listings", label: "My Listings", icon: Package },
  { href: "/villager/complaints", label: "Complaint Center", icon: AlertTriangle },
  { href: "/villager/inquiries", label: "Inquiries", icon: MessageCircle },
  { href: "/villager/profile", label: "Profile", icon: User },
  { href: "/villager/notifications", label: "Notifications", icon: Bell },
]

const getConsumerLinks = (): NavItem[] => [
  { href: "/consumer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/listings", label: "Browse Listings", icon: Search },
  { href: "/consumer/favorites", label: "Favorites", icon: Heart },
  { href: "/consumer/profile", label: "Profile", icon: User },
]

const getAdminLinks = (): NavItem[] => [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/listings", label: "Listings", icon: Package },
  { href: "/admin/complaints", label: "Complaints", icon: AlertTriangle },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/audit-log", label: "Audit Log", icon: ClipboardList },
]

const roleLinks: Record<string, NavItem[]> = {
  villager: getVillagerLinks(),
  consumer: getConsumerLinks(),
  admin: getAdminLinks(),
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = roleLinks[role] ?? getVillagerLinks()

  const showLogout = role === "villager" || role === "admin"

  const sidebarContent = (
    <nav className="flex h-full flex-col gap-1 p-3">
      <div className="flex flex-col gap-1">
        {links.map((item) => {
          const isActive =
            item.href === `/${role}/dashboard`
              ? pathname === `/${role}/dashboard`
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>
      {showLogout && (
        <div className="mt-auto border-t border-border pt-3">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Logout
          </button>
        </div>
      )}
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white shadow-lg transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-4">
          <span className="text-lg font-bold text-primary-500">
            {role.charAt(0).toUpperCase() + role.slice(1)} Panel
          </span>
        </div>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-white md:flex">
        <div className="flex h-16 items-center border-b border-border px-4">
          <span className="text-lg font-bold text-primary-500">
            {role.charAt(0).toUpperCase() + role.slice(1)} Panel
          </span>
        </div>
        {sidebarContent}
      </aside>
    </>
  )
}
