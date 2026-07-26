import DashboardLayout from "@/components/layout/DashboardLayout"

export default function VillagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="villager">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Villager Dashboard</h1>
          <p className="text-sm text-text-secondary">Manage your listings, complaints, and profile</p>
        </div>
        {children}
      </div>
    </DashboardLayout>
  )
}
