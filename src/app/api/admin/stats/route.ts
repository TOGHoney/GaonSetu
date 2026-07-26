import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can access stats" },
        { status: 403 }
      )
    }

    const [
      totalUsers,
      usersByRole,
      totalListings,
      listingsByCategory,
      activeListings,
      totalComplaints,
      complaintsByStatus,
      complaintsByCategory,
      recentUsers,
      recentListings,
      recentComplaints,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.groupBy({
        by: ["role"],
        _count: { id: true },
      }),

      prisma.listing.count(),

      prisma.listing.groupBy({
        by: ["category"],
        _count: { id: true },
        where: { isActive: true },
      }),

      prisma.listing.count({ where: { isActive: true } }),

      prisma.complaint.count(),

      prisma.complaint.groupBy({
        by: ["status"],
        _count: { id: true },
      }),

      prisma.complaint.groupBy({
        by: ["category"],
        _count: { id: true },
      }),

      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      prisma.listing.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          price: true,
          createdAt: true,
          villager: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      prisma.complaint.findMany({
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          createdAt: true,
          villager: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ])

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyUsers = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: { id: true },
      where: {
        createdAt: { gte: sixMonthsAgo },
      },
      orderBy: { createdAt: "asc" },
    })

    const monthlyComplaints = await prisma.complaint.groupBy({
      by: ["createdAt"],
      _count: { id: true },
      where: {
        createdAt: { gte: sixMonthsAgo },
      },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({
      users: {
        total: totalUsers,
        byRole: usersByRole.reduce(
          (acc: Record<string, number>, item) => {
            acc[item.role] = item._count.id
            return acc
          },
          {}
        ),
      },
      listings: {
        total: totalListings,
        active: activeListings,
        byCategory: listingsByCategory.reduce(
          (acc: Record<string, number>, item) => {
            acc[item.category] = item._count.id
            return acc
          },
          {}
        ),
      },
      complaints: {
        total: totalComplaints,
        byStatus: complaintsByStatus.reduce(
          (acc: Record<string, number>, item) => {
            acc[item.status] = item._count.id
            return acc
          },
          {}
        ),
        byCategory: complaintsByCategory.reduce(
          (acc: Record<string, number>, item) => {
            acc[item.category] = item._count.id
            return acc
          },
          {}
        ),
      },
      monthlyTrends: {
        users: monthlyUsers.map((item) => ({
          date: item.createdAt,
          count: item._count.id,
        })),
        complaints: monthlyComplaints.map((item) => ({
          date: item.createdAt,
          count: item._count.id,
        })),
      },
      recent: {
        users: recentUsers,
        listings: recentListings,
        complaints: recentComplaints,
      },
    })
  } catch (error) {
    console.error("GET /api/admin/stats error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
