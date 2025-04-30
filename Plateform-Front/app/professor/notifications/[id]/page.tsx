"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import DashboardHeader from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bell, CheckCircle, Clock, FileText, UserCheck } from "lucide-react"

export default function NotificationDetailsPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [notification, setNotification] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call to fetch notification details
    const fetchNotification = () => {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        // Mock notification data based on ID
        const mockNotification = {
          id: params.id,
          type: "submission",
          title: language === "fr" ? "Nouvelle soumission" : "New submission",
          description:
            language === "fr"
              ? "John Doe a soumis l'évaluation Java Programming"
              : "John Doe has submitted the Java Programming assessment",
          date: "2023-05-15T10:30:00",
          content:
            language === "fr"
              ? "L'étudiant John Doe a terminé et soumis l'évaluation Java Programming. Vous pouvez maintenant examiner ses réponses et fournir des commentaires. L'évaluation a été complétée en 45 minutes, ce qui est inférieur au temps moyen pour cette évaluation. Toutes les questions ont reçu une réponse."
              : "Student John Doe has completed and submitted the Java Programming assessment. You can now review their answers and provide feedback. The assessment was completed in 45 minutes, which is below the average time for this assessment. All questions have been answered.",
          relatedLinks: [
            {
              title: language === "fr" ? "Voir les réponses de l'étudiant" : "View student answers",
              url: "/professor/student/john-doe/assessment/java-programming",
            },
            {
              title: language === "fr" ? "Voir tous les résultats de l'évaluation" : "View all assessment results",
              url: "/professor/assessment/java-programming/results",
            },
          ],
          read: false,
        }
        setNotification(mockNotification)
        setLoading(false)
      }, 500)
    }

    if (params.id) {
      fetchNotification()
    }
  }, [params.id, language])

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <FileText className="h-6 w-6 text-primary-blue" />
      case "completion":
        return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
      case "reminder":
        return <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
      case "system":
        return <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      default:
        return <UserCheck className="h-6 w-6 text-muted-foreground" />
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader userType="professor" userName="Prof. Smith" showSearch={false} />
        <main className="container py-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("loading")}</h1>
          </div>
          <Card className="animate-pulse">
            <CardHeader className="h-20 bg-muted/50"></CardHeader>
            <CardContent className="py-6">
              <div className="h-4 bg-muted/50 rounded mb-4"></div>
              <div className="h-4 bg-muted/50 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-muted/50 rounded mb-4 w-1/2"></div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (!notification) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader userType="professor" userName="Prof. Smith" showSearch={false} />
        <main className="container py-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("notification_not_found")}</h1>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Bell className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t("notification_not_found_message")}</p>
              <Button className="mt-4" asChild>
                <Link href="/professor/notifications">{t("back_to_notifications")}</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userType="professor" userName="Prof. Smith" showSearch={false} />
      <main className="container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("notification_details")}</h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-blue/10">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{notification.title}</CardTitle>
              <CardDescription>{formatDate(notification.date)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{notification.description}</p>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">{t("details")}</h3>
              <p>{notification.content}</p>
            </div>
            {notification.relatedLinks && notification.relatedLinks.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">{t("related_links")}</h3>
                <ul className="space-y-2">
                  {notification.relatedLinks.map((link: any, index: number) => (
                    <li key={index}>
                      <Button variant="link" className="p-0 h-auto" asChild>
                        <Link href={link.url}>{link.title}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              {t("back")}
            </Button>
            <Button>{t("mark_as_read")}</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
