import type {
  ComplaintStatus,
  ComplaintPriority,
  ComplaintCategory,
  SortOrder,
  ComplaintSortField,
  PaginationParams,
} from "./index"

export interface ComplaintFilters extends PaginationParams {
  status?: ComplaintStatus
  priority?: ComplaintPriority
  category?: ComplaintCategory
  village?: string
  district?: string
  search?: string
  sortBy?: ComplaintSortField
  sortOrder?: SortOrder
  dateFrom?: string
  dateTo?: string
}

export interface ComplaintComment {
  id: string
  complaintId: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

export interface ComplaintUpdate {
  id: string
  complaintId: string
  oldStatus: ComplaintStatus | null
  newStatus: ComplaintStatus
  updatedBy: string
  updaterName: string
  remark: string | null
  createdAt: string
}

export interface Complaint {
  id: string
  trackingId: string
  title: string
  description: string
  category: ComplaintCategory
  status: ComplaintStatus
  priority: ComplaintPriority
  village: string
  district: string
  address: string
  images: string[]
  submittedById: string
  assignedToId: string | null
  createdAt: string
  updatedAt: string
}

export interface ComplaintWithDetails extends Complaint {
  submittedBy: {
    id: string
    name: string
    email: string
    avatar: string | null
  }
  assignedTo: {
    id: string
    name: string
    email: string
  } | null
  comments: ComplaintComment[]
  updates: ComplaintUpdate[]
}

export interface CreateComplaintInput {
  title: string
  description: string
  category: ComplaintCategory
  priority: ComplaintPriority
  village: string
  district: string
  address: string
  images?: string[]
}

export interface UpdateComplaintInput {
  status?: ComplaintStatus
  priority?: ComplaintPriority
  assignedToId?: string
  remark?: string
}
