"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Eye,
  ShieldCheck,
  Ban,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const mockUsers = [
  {
    id: "USR-001",
    name: "Ramesh Kumar",
    email: "ramesh@email.com",
    phone: "+91 98765 43210",
    role: "Villager",
    status: "Active",
    verified: true,
    joined: "2024-01-15",
  },
  {
    id: "USR-002",
    name: "Sunita Devi",
    email: "sunita@email.com",
    phone: "+91 87654 32109",
    role: "Villager",
    status: "Active",
    verified: true,
    joined: "2024-02-20",
  },
  {
    id: "USR-003",
    name: "Amit Patel",
    email: "amit@email.com",
    phone: "+91 76543 21098",
    role: "Consumer",
    status: "Active",
    verified: true,
    joined: "2024-03-10",
  },
  {
    id: "USR-004",
    name: "Priya Singh",
    email: "priya@email.com",
    phone: "+91 65432 10987",
    role: "Consumer",
    status: "Suspended",
    verified: false,
    joined: "2024-04-05",
  },
  {
    id: "USR-005",
    name: "Vikram Yadav",
    email: "vikram@email.com",
    phone: "+91 54321 09876",
    role: "Villager",
    status: "Pending",
    verified: false,
    joined: "2024-05-12",
  },
  {
    id: "USR-006",
    name: "Anita Sharma",
    email: "anita@email.com",
    phone: "+91 43210 98765",
    role: "Admin",
    status: "Active",
    verified: true,
    joined: "2024-01-01",
  },
]

const roleBadgeVariant: Record<string, string> = {
  Villager: "default",
  Consumer: "secondary",
  Admin: "outline",
}

const statusColor: Record<string, string> = {
  Active: "text-green-600",
  Suspended: "text-red-600",
  Pending: "text-yellow-600",
  Blocked: "text-gray-600",
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [page, setPage] = useState(1)

  const filtered = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
    const matchesRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">Manage all platform users</p>
        </div>
        <Badge variant="secondary">{mockUsers.length} Total Users</Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="villager">Villagers</SelectItem>
                <SelectItem value="consumer">Consumers</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] text-sm font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{user.email}</TableCell>
                  <TableCell className="text-gray-500">{user.phone}</TableCell>
                  <TableCell>
                    <Badge variant={roleBadgeVariant[user.role] as any}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${statusColor[user.status]}`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.verified ? (
                      <Badge variant="success">Verified</Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-500">{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Verify">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Suspend">
                        <UserX className="h-4 w-4 text-yellow-600" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Block">
                        <Ban className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing 1-{filtered.length} of {mockUsers.length} users
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm">{page}</Button>
          <Button variant="outline" size="sm" onClick={() => setPage(page + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
