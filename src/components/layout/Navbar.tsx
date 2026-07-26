"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Menu,
  X,
  Wheat,
  Bell,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Browse Listings" },
  { href: "/announcements", label: "Announcements" },
]

function getDashboardPath(role: string | null): string {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard"
    case "VILLAGER":
      return "/villager/dashboard"
    case "CONSUMER":
      return "/consumer/dashboard"
    default:
      return "/"
  }
}

function getProfilePath(role: string | null): string {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard"
    case "VILLAGER":
      return "/villager/profile"
    case "CONSUMER":
      return "/consumer/profile"
    default:
      return "/"
  }
}

function getNotificationsPath(role: string | null): string {
  switch (role) {
    case "VILLAGER":
      return "/villager/notifications"
    default:
      return "/villager/notifications"
  }
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [lang, setLang] = useState<"EN" | "HI">("EN")

  const { user, role, isAuthenticated } = useAuth()

  const dashboardPath = getDashboardPath(role)
  const profilePath = getProfilePath(role)
  const notificationsPath = getNotificationsPath(role)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Wheat className="h-7 w-7 text-primary-500" />
          <span className="text-xl font-bold text-primary-500">GaonSetu</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-primary-500"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-text-secondary transition-colors hover:bg-gray-100"
          >
            {lang}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href={dashboardPath}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-primary-500"
              >
                Dashboard
              </Link>

              {/* Notifications */}
              <Link
                href={notificationsPath}
                className="relative rounded-md p-2 text-text-secondary transition-colors hover:bg-gray-100 hover:text-primary-500"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-warning" />
              </Link>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-100"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-500">
                    {user?.name?.[0] ?? "U"}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-white py-1 shadow-lg animate-slideDown">
                      <div className="border-b border-border px-4 py-2">
                        <p className="text-sm font-medium text-text-primary">
                          {user?.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href={dashboardPath}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href={profilePath}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        onClick={() => {
                          setProfileOpen(false)
                          signOut({ callbackUrl: "/" })
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-2 text-text-secondary hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 pb-4 pt-2 animate-slideDown md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-border" />

            <button
              onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
              className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-text-secondary hover:bg-gray-50"
            >
              Language: {lang}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  href={dashboardPath}
                  className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href={notificationsPath}
                  className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Notifications
                </Link>
                <Link
                  href={profilePath}
                  className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-gray-50"
                  onClick={() => {
                    setMobileOpen(false)
                    signOut({ callbackUrl: "/" })
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
