"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Lang = "EN" | "HI"

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [lang, setLang] = useState<Lang>("EN")

  const toggle = () => setLang(lang === "EN" ? "HI" : "EN")

  return (
    <button
      onClick={toggle}
      className={cn(
        "rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-text-secondary transition-colors hover:bg-gray-100",
        className
      )}
    >
      {lang}
    </button>
  )
}
