"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  User,
  Truck,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Building2,
  Hash,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  registerSchema,
  villagerProfileSchema,
  type RegisterInput,
} from "@/lib/validators"

const steps = ["Role", "Account", "Profile", "Confirm"]
const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [role, setRole] = useState<"VILLAGER" | "CONSUMER" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Step 2: basic form
  const basicForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: undefined },
  })

  // Step 3: villager profile
  const villagerForm = useForm({
    resolver: zodResolver(villagerProfileSchema),
    defaultValues: {
      village: "",
      panchayat: "",
      district: "",
      state: "",
      pincode: "",
      occupation: "",
      aadharNumber: "",
      landSize: "",
      languagesSpoken: ["Hindi"] as string[],
    },
  })

  // Step 3: consumer profile
  const consumerSchema = z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z
      .string()
      .min(1, "Pincode is required")
      .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  })

  const consumerForm = useForm({
    resolver: zodResolver(consumerSchema),
    defaultValues: { city: "", state: "", pincode: "" },
  })

  const selectRole = (r: "VILLAGER" | "CONSUMER") => {
    setRole(r)
    basicForm.setValue("role", r)
  }

  const goNext = async () => {
    if (step === 0 && !role) return

    if (step === 1) {
      const valid = await basicForm.trigger()
      if (!valid) return
    }

    if (step === 2) {
      if (role === "VILLAGER") {
        const valid = await villagerForm.trigger()
        if (!valid) return
      } else {
        const valid = await consumerForm.trigger()
        if (!valid) return
      }
    }

    setStep((s) => Math.min(s + 1, 3))
  }

  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const basicValues = basicForm.getValues()
      const profileValues = role === "VILLAGER" ? villagerForm.getValues() : consumerForm.getValues()
      const payload = {
        ...basicValues,
        ...profileValues,
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.")
        return
      }

      router.push("/login?registered=true")
    } catch {
      setError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Create your account</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Join GaonSetu and start your journey
        </p>
      </div>

      {/* Step Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  i < step && "bg-primary text-white",
                  i === step && "bg-primary text-white ring-4 ring-primary/20",
                  i > step && "bg-gray-200 text-gray-500"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-0.5 w-8 sm:w-12 transition-colors",
                    i < step ? "bg-primary" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-text-secondary">
          {steps.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Step 0: Role */}
      {step === 0 && (
        <div className="space-y-4">
          <p className="text-center text-sm text-text-secondary">
            How do you want to use GaonSetu?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => selectRole("VILLAGER")}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:shadow-md",
                role === "VILLAGER"
                  ? "border-primary bg-primary-50 shadow-md"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl",
                role === "VILLAGER" ? "bg-primary text-white" : "bg-primary/10 text-primary"
              )}>
                <Truck className="h-7 w-7" />
              </div>
              <span className="font-semibold">I&apos;m a Villager</span>
              <span className="text-center text-xs text-text-secondary">
                Sell products, raise complaints
              </span>
            </button>

            <button
              onClick={() => selectRole("CONSUMER")}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:shadow-md",
                role === "CONSUMER"
                  ? "border-secondary bg-secondary-50 shadow-md"
                  : "border-border hover:border-secondary/50"
              )}
            >
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl",
                role === "CONSUMER" ? "bg-secondary text-white" : "bg-secondary/10 text-secondary"
              )}>
                <User className="h-7 w-7" />
              </div>
              <span className="font-semibold">I&apos;m a Consumer</span>
              <span className="text-center text-xs text-text-secondary">
                Buy fresh, farm-direct products
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input
                id="name"
                placeholder="Enter your full name"
                className="pl-10"
                disabled={loading}
                {...basicForm.register("name")}
              />
            </div>
            {basicForm.formState.errors.name && (
              <p className="text-xs text-red-500">{basicForm.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reg-email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                disabled={loading}
                {...basicForm.register("email")}
              />
            </div>
            {basicForm.formState.errors.email && (
              <p className="text-xs text-red-500">{basicForm.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input
                id="phone"
                placeholder="+91 XXXXX XXXXX"
                className="pl-10"
                disabled={loading}
                {...basicForm.register("phone")}
              />
            </div>
            {basicForm.formState.errors.phone && (
              <p className="text-xs text-red-500">{basicForm.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reg-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 chars, upper, lower & number"
                className="pl-10 pr-10"
                disabled={loading}
                {...basicForm.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted hover:text-text-secondary"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {basicForm.formState.errors.password && (
              <p className="text-xs text-red-500">{basicForm.formState.errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className="pl-10"
                disabled={loading}
                {...basicForm.register("confirmPassword")}
              />
            </div>
            {basicForm.formState.errors.confirmPassword && (
              <p className="text-xs text-red-500">{basicForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>
        </form>
      )}

      {/* Step 2: Profile Details */}
      {step === 2 && role === "VILLAGER" && (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <p className="text-sm font-medium text-primary">Villager Profile</p>

          <div className="space-y-2">
            <Label htmlFor="village">Village</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input id="village" placeholder="Your village name" className="pl-10" disabled={loading} {...villagerForm.register("village")} />
            </div>
            {villagerForm.formState.errors.village && (
              <p className="text-xs text-red-500">{villagerForm.formState.errors.village.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="panchayat">Panchayat</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input id="panchayat" placeholder="Gram Panchayat name" className="pl-10" disabled={loading} {...villagerForm.register("panchayat")} />
            </div>
            {villagerForm.formState.errors.panchayat && (
              <p className="text-xs text-red-500">{villagerForm.formState.errors.panchayat.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="District" disabled={loading} {...villagerForm.register("district")} />
              {villagerForm.formState.errors.district && (
                <p className="text-xs text-red-500">{villagerForm.formState.errors.district.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="v-state">State</Label>
              <select
                id="v-state"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                {...villagerForm.register("state")}
              >
                <option value="">Select state</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {villagerForm.formState.errors.state && (
                <p className="text-xs text-red-500">{villagerForm.formState.errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted" />
                <Input id="pincode" placeholder="6-digit pincode" className="pl-10" disabled={loading} {...villagerForm.register("pincode")} />
              </div>
              {villagerForm.formState.errors.pincode && (
                <p className="text-xs text-red-500">{villagerForm.formState.errors.pincode.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted" />
                <Input id="occupation" placeholder="e.g. Farmer" className="pl-10" disabled={loading} {...villagerForm.register("occupation")} />
              </div>
              {villagerForm.formState.errors.occupation && (
                <p className="text-xs text-red-500">{villagerForm.formState.errors.occupation.message}</p>
              )}
            </div>
          </div>
        </form>
      )}

      {step === 2 && role === "CONSUMER" && (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <p className="text-sm font-medium text-secondary">Consumer Profile</p>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input id="city" placeholder="Your city" className="pl-10" disabled={loading} {...consumerForm.register("city")} />
            </div>
            {consumerForm.formState.errors.city && (
              <p className="text-xs text-red-500">{consumerForm.formState.errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="c-state">State</Label>
            <select
              id="c-state"
              className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              {...consumerForm.register("state")}
            >
              <option value="">Select state</option>
              {indianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {consumerForm.formState.errors.state && (
              <p className="text-xs text-red-500">{consumerForm.formState.errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="c-pincode">Pincode</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <Input id="c-pincode" placeholder="6-digit pincode" className="pl-10" disabled={loading} {...consumerForm.register("pincode")} />
            </div>
            {consumerForm.formState.errors.pincode && (
              <p className="text-xs text-red-500">{consumerForm.formState.errors.pincode.message}</p>
            )}
          </div>
        </form>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-2 text-sm font-semibold text-text-secondary">Account Details</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-text-secondary">Name:</span>
              <span className="font-medium">{basicForm.watch("name")}</span>
              <span className="text-text-secondary">Email:</span>
              <span className="font-medium">{basicForm.watch("email")}</span>
              <span className="text-text-secondary">Phone:</span>
              <span className="font-medium">{basicForm.watch("phone")}</span>
              <span className="text-text-secondary">Role:</span>
              <span className="font-medium">{role === "VILLAGER" ? "Villager" : "Consumer"}</span>
            </div>
          </div>

          {role === "VILLAGER" && (
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="mb-2 text-sm font-semibold text-primary">Villager Profile</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-text-secondary">Village:</span>
                <span className="font-medium">{villagerForm.watch("village")}</span>
                <span className="text-text-secondary">Panchayat:</span>
                <span className="font-medium">{villagerForm.watch("panchayat")}</span>
                <span className="text-text-secondary">District:</span>
                <span className="font-medium">{villagerForm.watch("district")}</span>
                <span className="text-text-secondary">State:</span>
                <span className="font-medium">{villagerForm.watch("state")}</span>
                <span className="text-text-secondary">Pincode:</span>
                <span className="font-medium">{villagerForm.watch("pincode")}</span>
                <span className="text-text-secondary">Occupation:</span>
                <span className="font-medium">{villagerForm.watch("occupation")}</span>
              </div>
            </div>
          )}

          {role === "CONSUMER" && (
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="mb-2 text-sm font-semibold text-secondary">Consumer Profile</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-text-secondary">City:</span>
                <span className="font-medium">{consumerForm.watch("city")}</span>
                <span className="text-text-secondary">State:</span>
                <span className="font-medium">{consumerForm.watch("state")}</span>
                <span className="text-text-secondary">Pincode:</span>
                <span className="font-medium">{consumerForm.watch("pincode")}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <Button type="button" variant="outline" onClick={goBack} disabled={loading} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button type="button" onClick={goNext} disabled={step === 0 && !role} className="flex-1 gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onSubmit} disabled={loading} className="flex-1 gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </>
  )
}
