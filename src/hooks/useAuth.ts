"use client"

import { useSession } from "next-auth/react"
import { useMemo } from "react"

export type UserRole = "VILLAGER" | "CONSUMER" | "ADMIN"

export interface AuthUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: UserRole
}

export function useAuth() {
  const { data: session, status } = useSession()

  const user = useMemo(() => {
    if (!session?.user) return null
    return {
      id: (session.user as any).id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      role: (session.user as any).role as UserRole,
    } as AuthUser
  }, [session])

  const role = user?.role ?? null
  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  const isVillager = role === "VILLAGER"
  const isConsumer = role === "CONSUMER"
  const isAdmin = role === "ADMIN"

  return {
    user,
    role,
    isAuthenticated,
    isLoading,
    isVillager,
    isConsumer,
    isAdmin,
  }
}
