"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitcher from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedLogo } from "./ui/AnimatedLogo";

export default function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <AnimatedLogo />

        <div className="flex items-center gap-4">
          <Button
            asChild
            className="bg-[#4052a8] hover:bg-[#4052a8]/90 hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Link href="/login">{t("login")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Link href="/">{t("home")}</Link>
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
