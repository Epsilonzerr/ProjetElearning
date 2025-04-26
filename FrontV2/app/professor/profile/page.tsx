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

export default function ProfessorProfilePage() {
  const { t } = useLanguage()
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

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
                    <Input id="first-name" defaultValue="Jean" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="last-name">{t("last_name")}</Label>
                    <Input id="last-name" defaultValue="Dupont" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" defaultValue="jean.dupont@iga.ac.ma" disabled />
                  <p className="text-xs text-muted-foreground">{t("email_note")}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">{t("department")}</Label>
                  <Select defaultValue="info">
                    <SelectTrigger id="department">
                      <SelectValue placeholder={t("select_department")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">{t("computer_science")}</SelectItem>
                      <SelectItem value="math">{t("mathematics")}</SelectItem>
                      <SelectItem value="physics">{t("physics")}</SelectItem>
                      <SelectItem value="elec">{t("electronics")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">{t("academic_title")}</Label>
                  <Select defaultValue="professor">
                    <SelectTrigger id="title">
                      <SelectValue placeholder={t("select_title")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">{t("professor")}</SelectItem>
                      <SelectItem value="associate">{t("associate_professor")}</SelectItem>
                      <SelectItem value="assistant">{t("assistant_professor")}</SelectItem>
                      <SelectItem value="lecturer">{t("lecturer")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">{t("specialization")}</Label>
                  <Input id="specialization" defaultValue={t("databases_and_programming")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t("bio")}</Label>
                  <Textarea id="bio" rows={4} defaultValue={t("professor_default_bio")} />
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
                  <CardTitle>{t("professor_settings")}</CardTitle>
                  <CardDescription>{t("professor_settings_description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="office-hours">{t("office_hours")}</Label>
                    <Input id="office-hours" defaultValue="Lundi 10h-12h, Mercredi 14h-16h" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="office-location">{t("office_location")}</Label>
                    <Input id="office-location" defaultValue="Bâtiment A, Bureau 304" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="research-interests">{t("research_interests")}</Label>
                    <Textarea
                      id="research-interests"
                      rows={3}
                      defaultValue="Intelligence artificielle, Bases de données, Algorithmes d'optimisation"
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
