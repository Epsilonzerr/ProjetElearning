"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function MainHeader() {
  const { t } = useLanguage()

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.img
            src="/images/evalyo-logo.png"
            alt="Evalyo"
            className="h-16"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild className="bg-[#4052a8] hover:bg-[#4052a8]/90 text-white">
            <Link href="/login">{t("login")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about">{t("learn_more")}</Link>
          </Button>
          <LanguageSwitcher />
        </motion.div>
      </div>
    </nav>
  )
}
