"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DashboardHeader from "@/components/dashboard-header"
import { Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"

export default function ProfessorProfile() {
  const { t } = useLanguage()
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Mock data
  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    username: "jdupont",
    email: "jean.dupont@university.edu",
  })

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName={`${profileData.firstName} ${profileData.lastName}`} />

      <main className="flex-1 bg-slate-50 dark:bg-gray-900">
        <div className="container py-6">
          <h1 className="text-2xl font-bold tracking-tight mb-6">{t("profile")}</h1>

          {saveSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">{t("profile_updated")}</AlertDescription>
            </Alert>
          )}

          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>{t("personal_info")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">{t("first_name")}</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">{t("last_name")}</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">{t("username")}</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" value={profileData.email} disabled />
                  <p className="text-xs text-muted-foreground">{t("email_note")}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>{t("save")}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
