"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, Check, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"
import FooterWithLanguage from "@/components/footer-with-language"
import { ThemeToggle } from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import { Progress } from "@/components/ui/progress"

export default function ResetPasswordPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem("resetEmail")
    const codeVerified = sessionStorage.getItem("codeVerified")

    if (!storedEmail || codeVerified !== "true") {
      router.push("/forgot-password")
      return
    }

    setEmail(storedEmail)
  }, [router])

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 25

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25

    // Contains number or special char
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25

    setPasswordStrength(strength)
  }, [password])

  const getStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength < 50) return t("weak")
    if (passwordStrength < 75) return t("medium")
    return t("strong")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!password || !confirmPassword) {
      setError(t("please_enter_passwords"))
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError(t("passwords_do_not_match"))
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError(t("password_too_short"))
      setIsLoading(false)
      return
    }

    if (!/[A-Z]/.test(password)) {
      setError(t("password_needs_uppercase"))
      setIsLoading(false)
      return
    }

    if (!/[a-z]/.test(password)) {
      setError(t("password_needs_lowercase"))
      setIsLoading(false)
      return
    }

    if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError(t("password_needs_number_special"))
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would be an API call to reset the password
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      // Clear session storage
      sessionStorage.removeItem("resetEmail")
      sessionStorage.removeItem("codeVerified")

      // Show success message
      setSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      setError(t("error_resetting_password"))
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
            <CardTitle className="text-gray-900 dark:text-white">{t("reset_password")}</CardTitle>
            <CardDescription className="dark:text-gray-400">{t("create_new_password", { email })}</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-600 dark:text-green-400">
                  {t("password_reset_success")}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900 dark:text-white">
                    {t("new_password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      )}
                      <span className="sr-only">{showPassword ? t("hide_password") : t("show_password")}</span>
                    </Button>
                  </div>

                  {password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">{t("password_strength")}</span>
                        <span
                          className={`font-medium ${
                            passwordStrength < 50
                              ? "text-red-500 dark:text-red-400"
                              : passwordStrength < 75
                                ? "text-yellow-500 dark:text-yellow-400"
                                : "text-green-500 dark:text-green-400"
                          }`}
                        >
                          {getStrengthText()}
                        </span>
                      </div>
                      <Progress value={passwordStrength} className="h-1" indicatorClassName={getStrengthColor()} />
                      <ul className="text-xs space-y-1 text-gray-500 dark:text-gray-400 mt-2">
                        <li className={password.length >= 8 ? "text-green-500 dark:text-green-400" : ""}>
                          • {t("min_8_chars")}
                        </li>
                        <li className={/[A-Z]/.test(password) ? "text-green-500 dark:text-green-400" : ""}>
                          • {t("uppercase_letter")}
                        </li>
                        <li className={/[a-z]/.test(password) ? "text-green-500 dark:text-green-400" : ""}>
                          • {t("lowercase_letter")}
                        </li>
                        <li
                          className={
                            /[0-9!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-500 dark:text-green-400" : ""
                          }
                        >
                          • {t("number_or_special")}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-white">
                    {t("confirm_password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      )}
                      <span className="sr-only">{showConfirmPassword ? t("hide_password") : t("show_password")}</span>
                    </Button>
                  </div>
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1">{t("passwords_do_not_match")}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                  disabled={isLoading}
                >
                  {isLoading ? t("resetting") : t("reset_password")}
                </Button>
              </form>
            )}
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
