import type {
  ListingCategory,
  ListingAvailability,
  SortOrder,
  ListingSortField,
  PaginationParams,
} from "./index"

export interface ListingFilters extends PaginationParams {
  category?: ListingCategory
  village?: string
  district?: string
  priceMin?: number
  priceMax?: number
  availability?: ListingAvailability
  search?: string
  sortBy?: ListingSortField
  sortOrder?: SortOrder
}

export interface ListingDetail {
  id: string
  listingId: string
  label: string
  value: string
}

export interface VillagerProfile {
  id: string
  userId: string
  village: string
  district: string
  state: string
  pincode: string
  address: string
  phone: string
}

export interface Listing {
  id: string
  title: string
  description: string
  category: ListingCategory
  price: number
  unit: string
  quantity: number
  availability: ListingAvailability
  images: string[]
  villagerId: string
  createdAt: string
  updatedAt: string
}

export interface ListingWithDetails extends Listing {
  villager: {
    id: string
    user: {
      id: string
      name: string
      email: string
      avatar: string | null
    }
    profile: VillagerProfile
  }
  details: ListingDetail[]
}

export interface CreateListingInput {
  title: string
  description: string
  category: ListingCategory
  price: number
  unit: string
  quantity: number
  availability: ListingAvailability
  images?: string[]
  details?: { label: string; value: string }[]
}

export interface UpdateListingInput extends Partial<CreateListingInput> {}
