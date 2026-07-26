"use client"

import Sidebar from "./Sidebar"

interface DashboardLayoutProps {
  role: "villager" | "consumer" | "admin"
  children: React.ReactNode
}

export default function DashboardLayout({ role, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
