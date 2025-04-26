"use client"

import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Clock, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function NotificationDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()

  // Mock notification data
  const notification = {
    id: Number.parseInt(id as string),
    type: "assessment",
    title: language === "fr" ? "Nouvelle évaluation disponible" : "New assessment available",
    description:
      language === "fr"
        ? "Prof. Abid a créé une nouvelle évaluation: Programmation Java"
        : "Prof. Abid has created a new assessment: Java Programming",
    date: "2023-05-15T10:30:00",
    content:
      language === "fr"
        ? "Une nouvelle évaluation a été créée par Prof. Abid. Cette évaluation porte sur la Programmation Java, spécifiquement sur les interfaces et les classes abstraites. L'évaluation est prévue pour le 20 mai 2023 et durera 90 minutes. Veuillez vous assurer d'avoir révisé les chapitres 5 à 8 du manuel de cours avant de passer l'évaluation."
        : "A new assessment has been created by Prof. Abid. This assessment covers Java Programming, specifically interfaces and abstract classes. The assessment is scheduled for May 20, 2023 and will last 90 minutes. Please make sure you have reviewed chapters 5 to 8 of the course textbook before taking the assessment.",
    read: false,
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assessment":
        return <FileText className="h-6 w-6 text-primary-blue" />
      case "result":
        return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
      case "reminder":
        return <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userType="student" userName="John Doe" showSearch={false} />

      <main className="container py-6">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back_to_notifications")}
        </Button>

        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <div className="flex items-center gap-3">
              {getNotificationIcon(notification.type)}
              <div>
                <CardTitle className="text-xl text-card-foreground">{notification.title}</CardTitle>
                <CardDescription>{formatDate(notification.date)}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <p className="text-foreground mb-4">{notification.description}</p>
            <p className="text-muted-foreground text-sm">{notification.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              {t("back")}
            </Button>
            <Button>
              {notification.type === "assessment"
                ? t("view_assessment")
                : notification.type === "result"
                  ? t("view_results")
                  : t("view_details")}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
