import Link from "next/link"
import { Sprout, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <Sprout className="h-5 w-5 text-accent" />
              </div>
              <span className="text-lg font-bold">
                Gaon<span className="text-accent">Setu</span>
              </span>
            </div>
            <p className="text-sm text-white/70">
              Bridging the gap between rural India and modern opportunities.
              Empowering villages through technology.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-sm text-white/70 hover:text-accent transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/track-complaint" className="text-sm text-white/70 hover:text-accent transition-colors">
                  Track Complaint
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-sm text-white/70 hover:text-accent transition-colors">
                  Announcements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
              For Villagers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="text-sm text-white/70 hover:text-accent transition-colors">
                  Sell Products
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-white/70 hover:text-accent transition-colors">
                  Raise Complaints
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-sm text-white/70 hover:text-accent transition-colors">
                  Government Schemes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 text-accent" />
                support@gaonsetu.in
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 text-accent" />
                +91 1800-XXX-XXXX
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-accent" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} GaonSetu. Made with care for Rural India.
        </div>
      </div>
    </footer>
  )
}
