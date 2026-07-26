import Link from "next/link"
import { Sprout } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-background to-secondary-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Sprout className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-primary">
              Gaon<span className="text-secondary">Setu</span>
            </span>
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-white p-8 shadow-lg">
          {children}
        </div>
        <p className="mt-6 text-center text-xs text-text-secondary">
          By continuing, you agree to GaonSetu&apos;s{" "}
          <Link href="/terms" className="underline hover:text-primary">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
