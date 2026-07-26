import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname

      // Public routes
      if (
        path === "/" ||
        path.startsWith("/login") ||
        path.startsWith("/register") ||
        path.startsWith("/forgot-password") ||
        path.startsWith("/listings") ||
        path.startsWith("/announcements") ||
        path.startsWith("/track-complaint")
      ) {
        return true
      }

      if (!token) return false

      // Admin routes
      if (path.startsWith("/admin") && token.role !== "ADMIN") return false

      // Villager routes
      if (path.startsWith("/villager") && token.role !== "VILLAGER") return false

      // Consumer routes
      if (path.startsWith("/consumer") && token.role !== "CONSUMER") return false

      return true
    },
  },
})

export const config = {
  matcher: ["/admin/:path*", "/villager/:path*", "/consumer/:path*"],
}
