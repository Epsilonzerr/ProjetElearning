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
    <header className="sticky top-0 z-50 w-full border-b border-white/12 bg-[hsl(var(--ink-deep)/0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <AnimatedLogo />

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="hidden rounded-none border border-white/10 bg-transparent px-5 text-white hover:bg-white/[0.06] hover:text-white md:inline-flex"
          >
            <Link href="/">{t("home")}</Link>
          </Button>
          <Button
            asChild
            className="rounded-none border border-[hsl(var(--accent-strong))] bg-[hsl(var(--accent-strong))] px-5 font-semibold text-[hsl(var(--ink-deep))] hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--ink-deep))]"
          >
            <Link href="/login">{t("login")}</Link>
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
