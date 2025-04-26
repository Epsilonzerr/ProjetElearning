"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"
import FooterWithLanguage from "@/components/footer-with-language"
import { ThemeToggle } from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/language-switcher"

export default function ForgotPasswordPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email) {
      setError(t("please_enter_email"))
      setIsLoading(false)
      return
    }

    // Validate email domain
    if (!email.endsWith("@iga.ac.ma") && !email.endsWith("@etud.iga.ac.ma")) {
      setError(t("please_use_iga_email"))
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would be an API call to send the verification code
      // For demo purposes, we'll simulate a successful API call
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      // Store email in session storage for the next step
      sessionStorage.setItem("resetEmail", email)

      // Redirect to verification code page
      router.push("/verify-code")
    } catch (err) {
      setError(t("error_sending_code"))
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center mb-4">
            <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-16" />
          </Link>
          <p className="text-gray-600 dark:text-gray-400">{t("password_recovery")}</p>
        </div>

        <div className="flex justify-end items-center gap-2 mb-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <Card className="iga-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">{t("forgot_password")}</CardTitle>
            <CardDescription className="dark:text-gray-400">{t("enter_email_reset")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder={t("email_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                disabled={isLoading}
              >
                {isLoading ? t("sending") : t("send_verification_code")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6 border-gray-200 dark:border-gray-700">
            <Button variant="link" asChild className="dark:text-blue-400">
              <Link href="/login" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> {t("back_to_login")}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <FooterWithLanguage />
      </div>
    </div>
  )
}
