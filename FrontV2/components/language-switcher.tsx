"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <Globe className="h-4 w-4" />
          <span>{language === "fr" ? "Français" : "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
        <DropdownMenuItem
          onClick={() => setLanguage("fr")}
          className={`${language === "fr" ? "bg-gray-100 dark:bg-gray-700" : ""} dark:text-gray-300 dark:hover:bg-gray-700`}
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`${language === "en" ? "bg-gray-100 dark:bg-gray-700" : ""} dark:text-gray-300 dark:hover:bg-gray-700`}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
