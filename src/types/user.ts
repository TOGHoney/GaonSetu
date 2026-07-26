import type { UserRole } from "./index"

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string | null
  phone: string | null
  createdAt: string
  updatedAt: string
}

export interface AdminProfile extends UserProfile {
  role: "ADMIN"
}

export interface VillagerUser extends UserProfile {
  role: "VILLAGER"
  villagerProfile: {
    id: string
    village: string
    district: string
    state: string
    pincode: string
    address: string
    phone: string
    aadhaarNumber: string | null
    landArea: number | null
    crops: string[]
  }
}

export interface ConsumerUser extends UserProfile {
  role: "CONSUMER"
  consumerProfile: {
    id: string
    deliveryAddress: string
    city: string
    state: string
    pincode: string
    phone: string
    preferredCategories: string[]
  }
}

export interface UpdateProfileInput {
  name?: string
  phone?: string
  avatar?: string
}

export interface UpdateVillagerProfileInput {
  village?: string
  district?: string
  state?: string
  pincode?: string
  address?: string
  phone?: string
  aadhaarNumber?: string
  landArea?: number
  crops?: string[]
}

export interface UpdateConsumerProfileInput {
  deliveryAddress?: string
  city?: string
  state?: string
  pincode?: string
  phone?: string
  preferredCategories?: string[]
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
