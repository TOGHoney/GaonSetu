import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function generateTrackingId(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, "0")
  return `GSC-${year}-${random}`
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const COMPLAINT_STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-blue-100 text-blue-800",
  RECEIVED: "bg-yellow-100 text-yellow-800",
  UNDER_REVIEW: "bg-orange-100 text-orange-800",
  ASSIGNED: "bg-purple-100 text-purple-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  RESOLVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  REOPENED: "bg-pink-100 text-pink-800",
}

export const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
}

export const CATEGORY_LABELS: Record<string, string> = {
  CROP: "Crops",
  MILK: "Milk & Dairy",
  FRUITS_VEGETABLES: "Fruits & Vegetables",
  LIVESTOCK: "Livestock",
  HANDMADE: "Handmade Goods",
  BUSINESS: "Business & Services",
  OTHER: "Other",
}

export const COMPLAINT_CATEGORY_LABELS: Record<string, string> = {
  WATER: "Water Supply",
  ELECTRICITY: "Electricity",
  ROAD: "Roads & Infrastructure",
  SANITATION: "Sanitation & Cleanliness",
  AGRICULTURE: "Agriculture",
  HEALTH: "Healthcare",
  EDUCATION: "Education",
  RATION: "Ration & Supplies",
  CORRUPTION: "Corruption",
  OTHER: "Other",
}
