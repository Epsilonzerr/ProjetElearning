"use client"

import Link from "next/link"

import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Clock, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function StudentNotificationDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()

  // Mock notification data based on ID
  const notifications = {
    "1": {
      id: 1,
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
      actionLink: "/student/assessment",
      actionText: language === "fr" ? "Voir l'évaluation" : "View Assessment",
    },
    "2": {
      id: 2,
      type: "result",
      title: language === "fr" ? "Résultats disponibles" : "Results available",
      description:
        language === "fr"
          ? "Les résultats de l'évaluation Algorithmes et Structures de Données sont disponibles"
          : "Results for the Algorithms and Data Structures assessment are available",
      date: "2023-05-14T15:45:00",
      content:
        language === "fr"
          ? "Les résultats de votre évaluation sur les Algorithmes et Structures de Données sont maintenant disponibles. Vous pouvez consulter votre note, les commentaires du professeur et les réponses correctes. N'hésitez pas à contacter votre professeur si vous avez des questions concernant votre évaluation."
          : "The results of your Algorithms and Data Structures assessment are now available. You can view your grade, professor's comments, and correct answers. Feel free to contact your professor if you have any questions regarding your assessment.",
      read: true,
      actionLink: "/student/results",
      actionText: language === "fr" ? "Voir les résultats" : "View Results",
    },
    "3": {
      id: 3,
      type: "reminder",
      title: language === "fr" ? "Rappel d'évaluation" : "Assessment reminder",
      description:
        language === "fr"
          ? "L'évaluation Bases de Données est prévue pour demain à 14h00"
          : "The Database assessment is scheduled for tomorrow at 2:00 PM",
      date: "2023-05-13T09:15:00",
      content:
        language === "fr"
          ? "Ceci est un rappel que votre évaluation sur les Bases de Données est prévue pour demain à 14h00. L'évaluation durera 120 minutes et couvrira les chapitres 1 à 7 du manuel de cours. Assurez-vous d'avoir un environnement calme et une connexion Internet stable pour passer l'évaluation. Bonne chance!"
          : "This is a reminder that your Database assessment is scheduled for tomorrow at 2:00 PM. The assessment will last 120 minutes and will cover chapters 1 to 7 of the course textbook. Make sure you have a quiet environment and a stable internet connection to take the assessment. Good luck!",
      read: false,
      actionLink: "/student/dashboard",
      actionText: language === "fr" ? "Voir le calendrier" : "View Schedule",
    },
  }

  const notification = notifications[id as keyof typeof notifications] || notifications["1"]

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
            <Button asChild>
              <Link href={notification.actionLink}>{notification.actionText}</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
