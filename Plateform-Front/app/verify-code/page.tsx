"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"
import FooterWithLanguage from "@/components/footer-with-language"
import { ThemeToggle } from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/language-switcher"

export default function VerifyCodePage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem("resetEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
      return
    }
    setEmail(storedEmail)

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsExpired(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!code) {
      setError(t("please_enter_code"))
      setIsLoading(false)
      return
    }

    if (isExpired) {
      setError(t("code_expired"))
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would be an API call to verify the code
      // For demo purposes, we'll simulate a successful verification if code is "123456"
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      if (code === "123456") {
        // Store verification status in session storage
        sessionStorage.setItem("codeVerified", "true")

        // Redirect to reset password page
        router.push("/reset-password")
      } else {
        setError(t("invalid_code"))
      }
    } catch (err) {
      setError(t("error_verifying_code"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would be an API call to resend the code
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      // Reset timer
      setTimeLeft(300)
      setIsExpired(false)
    } catch (err) {
      setError(t("error_sending_code"))
    } finally {
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
            <CardTitle className="text-gray-900 dark:text-white">{t("verify_code")}</CardTitle>
            <CardDescription className="dark:text-gray-400">{t("verification_code_sent", { email })}</CardDescription>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="code" className="text-gray-900 dark:text-white">
                    {t("verification_code")}
                  </Label>
                  <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-center text-lg tracking-widest"
                  maxLength={6}
                  disabled={isLoading || isExpired}
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400">{t("check_spam_folder")}</p>
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                  disabled={isLoading || isExpired}
                >
                  {isLoading ? t("verifying") : t("verify_code")}
                </Button>

                {isExpired && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onClick={handleResendCode}
                    disabled={isLoading}
                  >
                    {isLoading ? t("sending") : t("resend_code")}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6 border-gray-200 dark:border-gray-700">
            <Button variant="link" asChild className="dark:text-blue-400">
              <Link href="/forgot-password" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> {t("back_to_email")}
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
