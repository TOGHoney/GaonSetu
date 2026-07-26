import Link from "next/link"
import { Wheat, Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Browse Listings" },
  { href: "/announcements", label: "Announcements" },
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
]

export default function Footer() {
  return (
    <footer className="bg-secondary-800 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Wheat className="h-6 w-6 text-accent" />
              <span className="text-lg font-bold text-white">GaonSetu</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              GaonSetu bridges rural villages with urban consumers, enabling
              direct trade of agricultural produce, livestock, handmade goods,
              and local services. Empowering villagers and connecting communities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-gray-400">
                  support@gaonsetu.in
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-gray-400">
                  Rural Development Hub, New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-secondary-600 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} GaonSetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
