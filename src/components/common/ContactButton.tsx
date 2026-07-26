import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ContactButtonProps {
  phone: string
  whatsappMessage?: string
  className?: string
}

export default function ContactButton({
  phone,
  whatsappMessage = "Hello, I found your listing on GaonSetu.",
  className,
}: ContactButtonProps) {
  const cleaned = phone.replace(/\s+/g, "")
  const whatsappUrl = `https://wa.me/91${cleaned.replace(/^\+?91/, "")}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a href={`tel:${cleaned}`} className="inline-flex">
        <Button variant="outline" size="sm">
          <Phone className="mr-1.5 h-4 w-4" />
          {phone}
        </Button>
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
        <Button
          variant="outline"
          size="sm"
          className="border-green-500 text-green-600 hover:bg-green-50"
        >
          <MessageCircle className="mr-1.5 h-4 w-4" />
          WhatsApp
        </Button>
      </a>
    </div>
  )
}
