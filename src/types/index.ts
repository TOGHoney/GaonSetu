export type UserRole = "ADMIN" | "VILLAGER" | "CONSUMER"

export type ListingCategory =
  | "CROP"
  | "MILK"
  | "FRUITS_VEGETABLES"
  | "LIVESTOCK"
  | "HANDMADE"
  | "BUSINESS"
  | "OTHER"

export type ListingAvailability = "IN_STOCK" | "OUT_OF_STOCK" | "PRE_ORDER"

export type ComplaintStatus =
  | "SUBMITTED"
  | "RECEIVED"
  | "UNDER_REVIEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED"
  | "REOPENED"

export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export type ComplaintCategory =
  | "WATER"
  | "ELECTRICITY"
  | "ROAD"
  | "SANITATION"
  | "AGRICULTURE"
  | "HEALTH"
  | "EDUCATION"
  | "RATION"
  | "CORRUPTION"
  | "OTHER"

export type AnnouncementType = "NOTICE" | "SCHEME" | "EMERGENCY" | "ALERT"

export type SortOrder = "asc" | "desc"

export type ListingSortField = "createdAt" | "price" | "title"
export type ComplaintSortField = "createdAt" | "updatedAt" | "status" | "priority"

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}

export interface PaginationParams {
  page?: number
  pageSize?: number
}

export interface SortParams {
  field?: string
  order?: SortOrder
}

export interface BaseFilters extends PaginationParams, SortParams {
  search?: string
}

export interface BaseFormState {
  isSubmitting: boolean
  error: string | null
  success: boolean
}
