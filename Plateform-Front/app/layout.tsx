import type React from "react"
import "@/app/globals.css"
import { Fraunces, Manrope } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata = {
  title: "Evalyo - Plateforme d'évaluation",
  description: "Plateforme d'évaluation pour les étudiants et les professeurs",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${manrope.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
