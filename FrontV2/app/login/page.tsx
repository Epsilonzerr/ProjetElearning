"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, GraduationCap, School } from "lucide-react"
import FooterWithLanguage from "@/components/footer-with-language"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [userType, setUserType] = useState("student")
  const [mounted, setMounted] = useState(false)

  // Only render the component after it has mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate email domain based on user type
    const professorDomain = "@iga.ac.ma"
    const studentDomain = "@etud.iga.ac.ma"
    const requiredDomain = userType === "professor" ? professorDomain : studentDomain

    if (!email.endsWith(requiredDomain)) {
      setError(
        language === "fr"
          ? `L'adresse email doit se terminer par ${requiredDomain}`
          : `Email address must end with ${requiredDomain}`,
      )
      return
    }

    // Simulate login - in a real app, this would call an API
    if (userType === "professor") {
      router.push("/professor/dashboard")
    } else {
      router.push("/student/dashboard")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center mb-4">
            <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-16" />
          </Link>
          <p className="text-gray-600 dark:text-gray-400">{t("assessment_platform_tagline")}</p>
        </div>

        <div className="flex justify-end items-center gap-2 mb-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <Tabs defaultValue="student" className="w-full" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger
              value="student"
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 dark:text-gray-200"
            >
              <School className="h-4 w-4" />
              <span>{t("student")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="professor"
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 dark:text-gray-200"
            >
              <GraduationCap className="h-4 w-4" />
              <span>{t("professor")}</span>
            </TabsTrigger>
          </TabsList>

          <Card className="iga-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">{t("login")}</CardTitle>
              <CardDescription className="dark:text-gray-400">
                {userType === "professor" ? t("professor_access") : t("student_access")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-white">
                    {t("email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={userType === "professor" ? "nom@iga.ac.ma" : "nom@etud.iga.ac.ma"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-900 dark:text-white">
                      {t("password")}
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary-blue hover:underline dark:text-blue-400"
                    >
                      {t("forgot_password")}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                >
                  {t("login")}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6 border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("terms_agreement")}{" "}
                <Link href="/terms" className="text-primary-blue hover:underline dark:text-blue-400">
                  {t("terms")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Tabs>
      </div>

      <div className="mt-8">
        <FooterWithLanguage />
      </div>
    </div>
  )
}
