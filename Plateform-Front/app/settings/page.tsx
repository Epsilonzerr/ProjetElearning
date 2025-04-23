"use client"

import { Textarea } from "@/components/ui/textarea"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import DashboardHeader from "@/components/dashboard-header"
import { AlertCircle, Bell, Check, Key, Save, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [userType, setUserType] = useState<"professor" | "student">("professor")
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
              <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
              <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
            </div>

            {/* Toggle pour simuler le changement de type d'utilisateur (pour la démo) */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="user-type">Mode:</Label>
              <Select value={userType} onValueChange={(value) => setUserType(value as "professor" | "student")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type d'utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professor">Professeur</SelectItem>
                  <SelectItem value="student">Étudiant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {saveSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Vos paramètres ont été enregistrés avec succès.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              {userType === "professor" && <TabsTrigger value="evaluation">Évaluations</TabsTrigger>}
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="first-name">Prénom</Label>
                      <Input id="first-name" defaultValue={userType === "professor" ? "Jean" : "Ahmed"} />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="last-name">Nom</Label>
                      <Input id="last-name" defaultValue={userType === "professor" ? "Dupont" : "Benali"} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userType === "professor" ? "jean.dupont@iga.ac.ma" : "ahmed.benali@etud.iga.ac.ma"}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      L'adresse email ne peut pas être modifiée car elle est liée à votre compte IGA.
                    </p>
                  </div>

                  {userType === "professor" && (
                    <div className="space-y-2">
                      <Label htmlFor="department">Département</Label>
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
                      <Label htmlFor="class">Classe</Label>
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
                    <Label htmlFor="bio">Biographie</Label>
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
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Enregistrer
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Photo de profil</CardTitle>
                  <CardDescription>Changez votre photo de profil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline">Choisir une image</Button>
                      <p className="text-xs text-muted-foreground">JPG, GIF ou PNG. 1 MB maximum.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Changer le mot de passe</CardTitle>
                  <CardDescription>Mettez à jour votre mot de passe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un
                      chiffre.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>
                    <Key className="mr-2 h-4 w-4" /> Mettre à jour le mot de passe
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessions actives</CardTitle>
                  <CardDescription>Gérez vos sessions actives sur différents appareils</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        device: "Chrome - Windows",
                        location: "Casablanca, Maroc",
                        active: true,
                        lastActive: "Actuellement",
                      },
                      {
                        device: "Safari - MacBook",
                        location: "Casablanca, Maroc",
                        active: false,
                        lastActive: "Il y a 2 jours",
                      },
                      {
                        device: "Firefox - Android",
                        location: "Rabat, Maroc",
                        active: false,
                        lastActive: "Il y a 1 semaine",
                      },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">{session.device}</div>
                          <div className="text-sm text-muted-foreground">{session.location}</div>
                          <div className="text-xs mt-1">
                            {session.active ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-green-600 inline-block"></span> Actif
                              </span>
                            ) : (
                              <span className="text-muted-foreground">Dernière activité: {session.lastActive}</span>
                            )}
                          </div>
                        </div>

                        {!session.active && (
                          <Button variant="outline" size="sm">
                            Déconnecter
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Déconnecter toutes les autres sessions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>Configurez comment et quand vous souhaitez être notifié</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications par email</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-new-eval">Nouvelles évaluations</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un email lorsqu'une nouvelle évaluation est disponible
                        </p>
                      </div>
                      <Switch id="email-new-eval" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-results">Résultats d'évaluation</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un email lorsque les résultats d'une évaluation sont publiés
                        </p>
                      </div>
                      <Switch id="email-results" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-reminders">Rappels</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir des rappels pour les évaluations à venir
                        </p>
                      </div>
                      <Switch id="email-reminders" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications dans l'application</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-new-eval">Nouvelles évaluations</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir une notification lorsqu'une nouvelle évaluation est disponible
                        </p>
                      </div>
                      <Switch id="app-new-eval" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-results">Résultats d'évaluation</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir une notification lorsque les résultats d'une évaluation sont publiés
                        </p>
                      </div>
                      <Switch id="app-results" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-reminders">Rappels</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir des rappels pour les évaluations à venir
                        </p>
                      </div>
                      <Switch id="app-reminders" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>
                    <Bell className="mr-2 h-4 w-4" /> Enregistrer les préférences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {userType === "professor" && (
              <TabsContent value="evaluation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres d'évaluation</CardTitle>
                    <CardDescription>Configurez les paramètres par défaut pour vos évaluations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Paramètres généraux</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="default-time">Temps par défaut (minutes)</Label>
                          <Input id="default-time" type="number" defaultValue="60" min="1" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="default-points">Points par défaut par question</Label>
                          <Input id="default-points" type="number" defaultValue="2" min="1" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-correct">Correction automatique</Label>
                          <p className="text-sm text-muted-foreground">
                            Activer la correction automatique par défaut pour les QCM et réponses courtes
                          </p>
                        </div>
                        <Switch id="auto-correct" defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="shuffle-questions">Mélanger les questions</Label>
                          <p className="text-sm text-muted-foreground">Mélanger l'ordre des questions par défaut</p>
                        </div>
                        <Switch id="shuffle-questions" />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="prevent-back">Empêcher le retour en arrière</Label>
                          <p className="text-sm text-muted-foreground">
                            Empêcher les étudiants de revenir aux questions précédentes
                          </p>
                        </div>
                        <Switch id="prevent-back" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Exportation des résultats</h3>

                      <div className="space-y-2">
                        <Label htmlFor="export-format">Format d'exportation par défaut</Label>
                        <Select defaultValue="excel">
                          <SelectTrigger id="export-format">
                            <SelectValue placeholder="Sélectionner un format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                            <SelectItem value="csv">CSV (.csv)</SelectItem>
                            <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="include-analytics">Inclure les analyses</Label>
                          <p className="text-sm text-muted-foreground">
                            Inclure les analyses et graphiques dans les exportations
                          </p>
                        </div>
                        <Switch id="include-analytics" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  )
}

