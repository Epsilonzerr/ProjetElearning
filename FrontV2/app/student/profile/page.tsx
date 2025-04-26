"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import { Check, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"

export default function StudentProfilePage() {
  const { t } = useLanguage()
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Ahmed Benali" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("profile")}</h1>
              <p className="text-muted-foreground">{t("update_personal_info")}</p>
            </div>
          </div>

          {saveSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">{t("information_saved_successfully")}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("personal_info")}</CardTitle>
                <CardDescription>{t("update_personal_info")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="first-name">{t("first_name")}</Label>
                    <Input id="first-name" defaultValue="Ahmed" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="last-name">{t("last_name")}</Label>
                    <Input id="last-name" defaultValue="Benali" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" defaultValue="ahmed.benali@etud.iga.ac.ma" disabled />
                  <p className="text-xs text-muted-foreground">{t("email_note")}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">{t("class")}</Label>
                  <Select defaultValue="3a">
                    <SelectTrigger id="class">
                      <SelectValue placeholder={t("select_class")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a">{t("first_year")}</SelectItem>
                      <SelectItem value="2a">{t("second_year")}</SelectItem>
                      <SelectItem value="3a">{t("third_year")}</SelectItem>
                      <SelectItem value="4a">{t("fourth_year")}</SelectItem>
                      <SelectItem value="5a">{t("fifth_year")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">{t("major")}</Label>
                  <Select defaultValue="cs">
                    <SelectTrigger id="major">
                      <SelectValue placeholder={t("select_major")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">{t("computer_science")}</SelectItem>
                      <SelectItem value="math">{t("mathematics")}</SelectItem>
                      <SelectItem value="physics">{t("physics")}</SelectItem>
                      <SelectItem value="elec">{t("electronics")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t("bio")}</Label>
                  <Textarea id="bio" rows={4} defaultValue={t("student_default_bio")} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>{t("save")}</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile_picture")}</CardTitle>
                  <CardDescription>{t("change_profile_picture")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline">{t("choose_image")}</Button>
                      <p className="text-xs text-muted-foreground">{t("image_requirements")}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>{t("save")}</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("student_settings")}</CardTitle>
                  <CardDescription>{t("student_settings_description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">{t("student_id")}</Label>
                    <Input id="student-id" defaultValue="20210134" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enrollment-year">{t("enrollment_year")}</Label>
                    <Input id="enrollment-year" defaultValue="2021" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">{t("academic_interests")}</Label>
                    <Textarea
                      id="interests"
                      rows={3}
                      defaultValue="Développement web, Intelligence artificielle, Cybersécurité"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>{t("save")}</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
