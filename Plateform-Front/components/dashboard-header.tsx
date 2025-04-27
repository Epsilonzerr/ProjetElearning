"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { ThemeToggle } from "@/components/theme-toggle";
import LanguageSwitcher from "@/components/language-switcher";
import StaticLogo from "./ui/StaticLogo";

interface DashboardHeaderProps {
  userType: "student" | "professor" | "admin";
  userName: string;
  showSearch?: boolean;
}

export default function DashboardHeader({
  userType,
  userName,
  showSearch = false,
}: DashboardHeaderProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: t("new_assessment_available"),
      description:
        userType === "professor"
          ? t("student_submitted_assessment")
          : t("prof_created_assessment"),
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: t("results_available"),
      description: t("assessment_results_available"),
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: t("reminder"),
      description: t("assessment_scheduled_tomorrow"),
      time: "3 hours ago",
      unread: false,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const studentNavItems = [
    { name: t("dashboard"), href: "/student/dashboard" },
    { name: t("recommendations"), href: "/student/recommendations" },
  ];

  const professorNavItems = [
    {
      name: t("dashboard"),
      href: "/professor/dashboard",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: t("students"),
      href: "/professor/students",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: t("statistics"),
      href: "/professor/statistics",
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  const navItems = userType === "student" ? studentNavItems : professorNavItems;
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-8">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="flex flex-col gap-6">
                <StaticLogo />
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === item.href
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <StaticLogo />

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {showSearch && (
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("search")}
                  className="w-[200px] lg:w-[300px] pl-8 bg-white dark:bg-gray-800"
                />
              </div>
            </form>
          )}

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* <Link href="/notifications" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              <span className="sr-only">{t("notifications")}</span>
            </Button>
          </Link> */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
                <span className="sr-only">{t("notifications")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>{t("notifications")}</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                  <Link href={`/${userType}/notifications`}>{t("view_all")}</Link>
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{notification.description}</span>
                  {notification.unread && (
                    <div className="mt-1 flex w-full justify-end">
                      <span className="text-xs text-primary-blue">{t("unread")}</span>
                    </div>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center" asChild>
                <Link href={`/${userType}/notifications`}>{t("see_all_notifications")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt={userName} />
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userType === "student" ? t("student") : t("professor")}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/${userType}/profile`}
                  className="cursor-pointer flex w-full items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${userType}/settings`}
                  className="cursor-pointer flex w-full items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("settings")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="md:hidden p-2">
                <div className="flex items-center gap-2 mb-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link
                  href="/login"
                  className="cursor-pointer flex w-full items-center text-red-500 dark:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("logout")}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
