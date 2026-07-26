import type { Metadata } from "next"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "GaonSetu - गाँव सेतु | Village Bridge",
  description:
    "GaonSetu is a digital platform connecting rural villages with India. Browse local produce, raise community grievances, and access government services — all from one place.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
