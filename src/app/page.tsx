import Link from "next/link"
import {
  Sprout,
  Users,
  ShoppingBag,
  AlertCircle,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  Globe,
  ChevronRight,
  Tractor,
  MessageSquare,
  BarChart3,

  Star,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/footer"

const stats = [
  { label: "Total Villagers", value: "12,400+", icon: Users },
  { label: "Active Listings", value: "3,800+", icon: ShoppingBag },
  { label: "Complaints Resolved", value: "1,250+", icon: AlertCircle },
  { label: "Districts Covered", value: "120+", icon: MapPin },
]

const features = [
  {
    icon: ShoppingBag,
    title: "Rural Marketplace",
    description:
      "Buy and sell crops, milk, dairy products, and handmade goods directly from villagers. No middlemen, fair prices, farm-fresh produce delivered to your doorstep.",
    color: "bg-primary-50 text-primary",
    accent: "bg-primary",
  },
  {
    icon: MessageSquare,
    title: "Grievance Portal",
    description:
      "Raise complaints with photo and video evidence. Track resolution status in real-time. Hold local governance accountable with transparent tracking.",
    color: "bg-secondary-50 text-secondary",
    accent: "bg-secondary",
  },
  {
    icon: BarChart3,
    title: "Government Dashboard",
    description:
      "Monitor and resolve community issues efficiently. Data-driven governance with analytics, priority management, and transparent reporting.",
    color: "bg-amber-50 text-amber-700",
    accent: "bg-amber-500",
  },
]

const villagerSteps = [
  { num: 1, title: "Register with Aadhaar", desc: "Sign up and verify your identity using Aadhaar for a trusted community." },
  { num: 2, title: "List Your Products", desc: "Photograph and price your crops, dairy, or handmade items in minutes." },
  { num: 3, title: "Connect & Sell", desc: "Receive orders directly from consumers and local buyers in your region." },
  { num: 4, title: "Get Paid Directly", desc: "Receive payments straight to your bank account — no commission cuts." },
]

const consumerSteps = [
  { num: 1, title: "Create Account", desc: "Quick registration with your email or phone number to start browsing." },
  { num: 2, title: "Browse Local Produce", desc: "Discover fresh, farm-direct products from verified village sellers." },
  { num: 3, title: "Place Your Order", desc: "Order directly from farmers and artisans — support rural livelihoods." },
  { num: 4, title: "Track Delivery", desc: "Real-time tracking from farm to your doorstep with transparent updates." },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary" />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary">
                <Sprout className="h-4 w-4" />
                Empowering 600,000+ villages across India
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-primary">GaonSetu</span>{" "}
                <span className="text-secondary">— गाँव सेतु</span>
              </h1>

              <p className="mb-4 text-lg text-text-secondary md:text-xl">
                Connecting rural India with the world. A digital bridge for villages
                to sell produce, raise grievances, and access government services.
              </p>

              <p className="mb-10 text-sm text-text-secondary/70">
                From farm to marketplace. From village to governance. One platform.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/listings">
                  <Button size="lg" className="gap-2 px-8 text-base">
                    Browse Listings
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg" className="gap-2 border-primary px-8 text-base text-primary hover:bg-primary hover:text-white">
                    Register as Villager
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                What We Offer
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Three pillars of rural empowerment
              </h2>
              <p className="mt-3 text-text-secondary">
                Everything a village needs — commerce, governance, and community — in one platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <Card key={f.title} className="group relative overflow-hidden border-border transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${f.color}`}>
                      <f.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{f.description}</p>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 h-1 w-full ${f.accent} scale-x-0 transition-transform group-hover:scale-x-100`} />
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">
                Simple & Accessible
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                How GaonSetu works
              </h2>
              <p className="mt-3 text-text-secondary">
                Whether you are a villager or a consumer, getting started takes just a few minutes.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Villager */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <Tractor className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">For Villagers</h3>
                </div>
                <div className="space-y-4">
                  {villagerSteps.map((s) => (
                    <div key={s.num} className="flex gap-4 rounded-xl border border-border p-4 transition-shadow hover:shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {s.num}
                      </div>
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="text-sm text-text-secondary">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consumer */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary">For Consumers</h3>
                </div>
                <div className="space-y-4">
                  {consumerSteps.map((s) => (
                    <div key={s.num} className="flex gap-4 rounded-xl border border-border p-4 transition-shadow hover:shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-sm font-bold text-secondary">
                        {s.num}
                      </div>
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="text-sm text-text-secondary">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Built on Trust
              </h2>
              <p className="mt-3 text-text-secondary">
                Your safety and privacy are our top priorities.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: Fingerprint, title: "Aadhaar Verified", desc: "All villagers are identity-verified through Aadhaar for a trustworthy marketplace." },
                { icon: ShieldCheck, title: "Secure Platform", desc: "End-to-end data encryption. Your personal and financial data stays protected." },
                { icon: Globe, title: "Multilingual Support", desc: "Use GaonSetu in Hindi, English, and regional languages for maximum accessibility." },
              ].map((t) => (
                <div key={t.title} className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm border border-border">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <t.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-semibold">{t.title}</h3>
                  <p className="text-sm text-text-secondary">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials placeholder */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">What People Say</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: "Ramesh K.", role: "Farmer, Bihar", text: "GaonSetu helped me sell my wheat directly to buyers in Delhi. No more middlemen cutting my earnings." },
                { name: "Priya S.", role: "Consumer, Mumbai", text: "I get fresh, organic vegetables delivered from village farms. The quality and price are unbeatable." },
                { name: "Sunita D.", role: "Sarpanch, Rajasthan", text: "The grievance portal made it easy to track and resolve water supply issues in our panchayat." },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl border border-border bg-background p-6">
                  <div className="mb-3 flex gap-1 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-text-secondary">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-700 py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent" />
          </div>
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to bridge the gap?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
              Join thousands of villagers and consumers who are already building a stronger, more connected rural India.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90 px-8">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+911800000000">
                <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10 px-8">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
