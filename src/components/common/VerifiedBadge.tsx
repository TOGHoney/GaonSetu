import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: { icon: "h-3.5 w-3.5", text: "text-[10px]" },
  md: { icon: "h-4 w-4", text: "text-xs" },
  lg: { icon: "h-5 w-5", text: "text-sm" },
}

export default function VerifiedBadge({ size = "md", className }: VerifiedBadgeProps) {
  const s = sizeMap[size]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 font-medium text-primary-600",
        s.text,
        className
      )}
    >
      <CheckCircle className={cn("text-primary-500", s.icon)} />
      Verified
    </span>
  )
}
