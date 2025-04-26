"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function FooterWithLanguage() {
  const { t } = useLanguage()

  return (
    <footer className="w-full py-4 text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-primary-blue dark:hover:text-blue-400">
            {t("terms")}
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-primary-blue dark:hover:text-blue-400">
            {t("privacy")}
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-primary-blue dark:hover:text-blue-400">
            {t("contact")}
          </Link>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} Institut supérieur du Génie Appliqué
      </div>
    </footer>
  )
}
