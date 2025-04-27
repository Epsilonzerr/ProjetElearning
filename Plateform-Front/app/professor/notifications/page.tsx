"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock, FileText, UserCheck } from "lucide-react"

export default function ProfessorNotificationsPage() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")

  // Mock notifications data for professor
  const notifications = [
    {
      id: 1,
      type: "submission",
      title: language === "fr" ? "Nouvelle soumission" : "New submission",
      description:
        language === "fr"
          ? "John Doe a soumis l'évaluation Java Programming"
          : "John Doe has submitted the Java Programming assessment",
      date: "2023-05-15T10:30:00",
      read: false,
    },
    {
      id: 2,
      type: "completion",
      title: language === "fr" ? "Évaluation terminée" : "Assessment completed",
      description:
        language === "fr"
          ? "L'évaluation Algorithmes et Structures de Données a été complétée par tous les étudiants"
          : "The Algorithms and Data Structures assessment has been completed by all students",
      date: "2023-05-14T15:45:00",
      read: true,
    },
    {
      id: 3,
      type: "reminder",
      title: language === "fr" ? "Rappel d'évaluation" : "Assessment reminder",
      description:
        language === "fr"
          ? "L'évaluation Bases de Données est prévue pour demain à 14h00"
          : "The Database assessment is scheduled for tomorrow at 2:00 PM",
      date: "2023-05-13T09:15:00",
      read: false,
    },
    {
      id: 4,
      type: "system",
      title: language === "fr" ? "Mise à jour du système" : "System update",
      description:
        language === "fr"
          ? "Nouvelles fonctionnalités ajoutées à la plateforme d'évaluation"
          : "New features added to the assessment platform",
      date: "2023-05-12T11:20:00",
      read: true,
    },
    {
      id: 5,
      type: "submission",
      title: language === "fr" ? "Soumission tardive" : "Late submission",
      description:
        language === "fr"
          ? "Maria Garcia a soumis l'évaluation Programmation Web en retard"
          : "Maria Garcia has submitted the Web Programming assessment late",
      date: "2023-05-10T16:30:00",
      read: false,
    },
  ]

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <FileText className="h-5 w-5 text-primary-blue" />
      case "completion":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "reminder":
        return <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      default:
        return <UserCheck className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userType="professor" userName="Prof. Smith" showSearch={false} />

      <main className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("notifications")}</h1>
          <Button variant="outline">{t("mark_all_as_read")}</Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            <TabsTrigger value="unread">{t("unread")}</TabsTrigger>
            <TabsTrigger value="submission">{t("submissions")}</TabsTrigger>
            <TabsTrigger value="completion">{t("completions")}</TabsTrigger>
            <TabsTrigger value="reminder">{t("reminders")}</TabsTrigger>
            <TabsTrigger value="system">{t("system")}</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-l-4 ${!notification.read ? "border-l-primary-blue" : "border-l-transparent"}`}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <CardTitle className="text-base font-medium text-foreground">{notification.title}</CardTitle>
                      {!notification.read && (
                        <Badge
                          variant="outline"
                          className="ml-2 bg-primary-blue/10 text-primary-blue dark:bg-primary-blue/20"
                        >
                          {t("new")}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-xs">{formatDate(notification.date)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <div className="mt-2 flex justify-end">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/professor/notifications/${notification.id}`}>{t("view_details")}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Bell className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t("no_notifications")}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
