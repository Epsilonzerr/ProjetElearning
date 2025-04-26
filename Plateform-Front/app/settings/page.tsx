"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, you would check the user's role from authentication context
    // For now, we'll redirect to professor settings as requested
    router.push("/professor/settings")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to settings...</p>
    </div>
  )
}
