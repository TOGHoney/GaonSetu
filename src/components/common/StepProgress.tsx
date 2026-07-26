import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
  className?: string
}

export default function StepProgress({
  currentStep,
  totalSteps,
  stepLabels,
  className,
}: StepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {stepLabels.map((label, i) => {
          const stepNum = i + 1
          const isCompleted = stepNum < currentStep
          const isActive = stepNum === currentStep

          return (
            <div key={i} className="flex flex-1 items-center">
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    isCompleted && "bg-primary-500 text-white",
                    isActive && "border-2 border-primary-500 text-primary-600",
                    !isCompleted && !isActive && "border-2 border-gray-300 text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 whitespace-nowrap text-xs font-medium",
                    isActive ? "text-primary-600" : "text-text-secondary"
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    "mx-2 mb-6 h-0.5 flex-1 rounded-full",
                    stepNum < currentStep ? "bg-primary-500" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
