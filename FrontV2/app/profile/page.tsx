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

export default function ProfilePage() {
  const { t } = useLanguage()
  const [userType, setUserType] = useState<"professor" | "student">("student")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType={userType} userName={userType === "professor" ? "Prof. Dupont" : "Ahmed Benali"} />

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
              <AlertDescription className="text-green-600">
                Vos informations ont été enregistrées avec succès.
              </AlertDescription>
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
                    <Input id="first-name" defaultValue={userType === "professor" ? "Jean" : "Ahmed"} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="last-name">{t("last_name")}</Label>
                    <Input id="last-name" defaultValue={userType === "professor" ? "Dupont" : "Benali"} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userType === "professor" ? "jean.dupont@iga.ac.ma" : "ahmed.benali@etud.iga.ac.ma"}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">{t("email_note")}</p>
                </div>

                {userType === "professor" && (
                  <div className="space-y-2">
                    <Label htmlFor="department">{t("department")}</Label>
                    <Select defaultValue="info">
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Sélectionner un département" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Informatique</SelectItem>
                        <SelectItem value="math">Mathématiques</SelectItem>
                        <SelectItem value="physics">Physique</SelectItem>
                        <SelectItem value="elec">Électronique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {userType === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="class">{t("class")}</Label>
                    <Select defaultValue="3a">
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1a">1ère année</SelectItem>
                        <SelectItem value="2a">2ème année</SelectItem>
                        <SelectItem value="3a">3ème année</SelectItem>
                        <SelectItem value="4a">4ème année</SelectItem>
                        <SelectItem value="5a">5ème année</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bio">{t("bio")}</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue={
                      userType === "professor"
                        ? "Professeur d'informatique spécialisé en programmation et bases de données."
                        : "Étudiant en 3ème année d'informatique, passionné par le développement web et l'IA."
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>{t("save")}</Button>
              </CardFooter>
            </Card>

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
          </div>
        </div>
      </main>
    </div>
  )
}
