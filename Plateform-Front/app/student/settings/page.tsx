"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import DashboardHeader from "@/components/dashboard-header"
import { AlertCircle, Bell, Check, Key } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"

export default function StudentSettingsPage() {
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
              <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
              <p className="text-muted-foreground">{t("manage_account")}</p>
            </div>
          </div>

          {saveSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">{t("settings_saved_successfully")}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="security" className="space-y-4">
            <TabsList>
              <TabsTrigger value="security">{t("change_password")}</TabsTrigger>
              <TabsTrigger value="sessions">{t("active_sessions")}</TabsTrigger>
              <TabsTrigger value="notifications">{t("notification_preferences")}</TabsTrigger>
              <TabsTrigger value="learning">{t("learning_preferences")}</TabsTrigger>
            </TabsList>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("change_password")}</CardTitle>
                  <CardDescription>{t("update_password")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">{t("current_password")}</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t("new_password")}</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t("confirm_password")}</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{t("password_requirements")}</AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>
                    <Key className="mr-2 h-4 w-4" /> {t("update_password_button")}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("active_sessions")}</CardTitle>
                  <CardDescription>{t("manage_sessions")}</CardDescription>
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
                                <span className="h-2 w-2 rounded-full bg-green-600 inline-block"></span> {t("active")}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">
                                {t("last_active")}: {session.lastActive}
                              </span>
                            )}
                          </div>
                        </div>

                        {!session.active && (
                          <Button variant="outline" size="sm">
                            {t("disconnect")}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {t("disconnect_all")}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("notification_preferences")}</CardTitle>
                  <CardDescription>{t("configure_notifications")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("email_notifications")}</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-new-eval">{t("new_assessments")}</Label>
                        <p className="text-sm text-muted-foreground">{t("receive_email_new_assessment")}</p>
                      </div>
                      <Switch id="email-new-eval" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-results">{t("assessment_results")}</Label>
                        <p className="text-sm text-muted-foreground">{t("receive_email_results_published")}</p>
                      </div>
                      <Switch id="email-results" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-reminders">{t("reminders")}</Label>
                        <p className="text-sm text-muted-foreground">{t("receive_reminders_upcoming_assessments")}</p>
                      </div>
                      <Switch id="email-reminders" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("app_notifications")}</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-new-eval">{t("new_assessments")}</Label>
                        <p className="text-sm text-muted-foreground">{t("receive_notification_new_assessment")}</p>
                      </div>
                      <Switch id="app-new-eval" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-results">{t("assessment_results")}</Label>
                        <p className="text-sm text-muted-foreground">{t("receive_notification_results_published")}</p>
                      </div>
                      <Switch id="app-results" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-reminders">{t("reminders")}</Label>
                        <p className="text-sm text-muted-foreground">{t("receive_reminders_upcoming_assessments")}</p>
                      </div>
                      <Switch id="app-reminders" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>
                    <Bell className="mr-2 h-4 w-4" /> {t("save_preferences")}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("learning_preferences")}</CardTitle>
                  <CardDescription>{t("configure_learning_preferences")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("display_options")}</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-progress">{t("show_progress_indicators")}</Label>
                        <p className="text-sm text-muted-foreground">{t("display_progress_on_dashboard")}</p>
                      </div>
                      <Switch id="show-progress" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-recommendations">{t("show_recommendations")}</Label>
                        <p className="text-sm text-muted-foreground">{t("display_personalized_recommendations")}</p>
                      </div>
                      <Switch id="show-recommendations" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("assessment_preferences")}</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-save">{t("auto_save_responses")}</Label>
                        <p className="text-sm text-muted-foreground">{t("automatically_save_assessment_responses")}</p>
                      </div>
                      <Switch id="auto-save" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="timer-visible">{t("show_assessment_timer")}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t("display_countdown_timer_during_assessments")}
                        </p>
                      </div>
                      <Switch id="timer-visible" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>{t("save_preferences")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
