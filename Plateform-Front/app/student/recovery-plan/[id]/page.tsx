"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, BookOpen, Calendar, Check, Clock, FileText, Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function RecoveryPlanPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const planId = params.id

  // Mock recovery plan data
  const recoveryPlan = {
    title: "Plan de rattrapage - Programmation orientée objet",
    description: "Plan personnalisé pour améliorer vos compétences en POO",
    progress: 15,
    deadline: "25/04/2025",
    steps: [
      {
        title: "Révision des concepts",
        description: "Revoyez les concepts fondamentaux de la POO",
        duration: "3 jours",
        progress: 30,
        resources: [
          { title: "Interfaces et classes abstraites", type: "article", url: "/student/resource/0" },
          { title: "Polymorphisme en Java", type: "video", url: "/student/resource/1" },
          { title: "Design patterns", type: "article", url: "/student/resource/2" },
        ],
      },
      {
        title: "Exercices pratiques",
        description: "Renforcez votre compréhension avec des exercices",
        duration: "4 jours",
        progress: 10,
        resources: [
          { title: "Implémentation d'interfaces", type: "exercise", url: "/student/exercises/poo/interfaces" },
          { title: "Création de classes abstraites", type: "exercise", url: "/student/exercises/poo/abstract-classes" },
          { title: "Application du polymorphisme", type: "exercise", url: "/student/exercises/poo/polymorphism" },
        ],
      },
      {
        title: "Évaluation de pratique",
        description: "Testez vos connaissances avant l'évaluation finale",
        duration: "1 jour",
        progress: 0,
        resources: [
          { title: "QCM de révision", type: "quiz", url: "/student/quiz/poo" },
          {
            title: "Évaluation d'entraînement",
            type: "assessment",
            url: "/student/assessment?type=practice&code=poo123",
          },
        ],
      },
      {
        title: "Repasser l'évaluation",
        description: "Évaluation finale pour valider vos compétences",
        duration: "1 jour",
        progress: 0,
        resources: [
          { title: "Évaluation finale", type: "assessment", url: "/student/assessment?type=summative&code=poo456" },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Ahmed Benali" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/student/recommendations">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{recoveryPlan.title}</h1>
              <p className="text-muted-foreground">{recoveryPlan.description}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progression globale</CardTitle>
                  <CardDescription>Votre avancement dans le plan de rattrapage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Progression: {recoveryPlan.progress}%</span>
                      <span className="text-sm text-muted-foreground">Date limite: {recoveryPlan.deadline}</span>
                    </div>
                    <Progress value={recoveryPlan.progress} className="h-2" />
                  </div>

                  <div className="space-y-8">
                    {recoveryPlan.steps.map((step, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">
                            Étape {i + 1}: {step.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{step.duration}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{step.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Progression: {step.progress}%</span>
                          </div>
                          <Progress value={step.progress} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Ressources:</h4>
                          <div className="grid gap-2">
                            {step.resources.map((resource, j) => (
                              <Button key={j} variant="outline" className="justify-start" asChild>
                                <Link href={resource.url}>
                                  {resource.type === "article" && <BookOpen className="mr-2 h-4 w-4" />}
                                  {resource.type === "video" && <Play className="mr-2 h-4 w-4" />}
                                  {resource.type === "exercise" && <FileText className="mr-2 h-4 w-4" />}
                                  {resource.type === "quiz" && <FileText className="mr-2 h-4 w-4" />}
                                  {resource.type === "assessment" && <FileText className="mr-2 h-4 w-4" />}
                                  {resource.title}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendrier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 border border-blue-200">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Révision des concepts</p>
                        <p className="text-xs text-muted-foreground">20/04/2025 - 22/04/2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 border border-blue-200">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Exercices pratiques</p>
                        <p className="text-xs text-muted-foreground">23/04/2025 - 26/04/2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 border border-blue-200">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Évaluation de pratique</p>
                        <p className="text-xs text-muted-foreground">27/04/2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-red-50 border border-red-200">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium">Évaluation finale</p>
                        <p className="text-xs text-muted-foreground">28/04/2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Temps estimé</span>
                      <span className="font-medium">9 jours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Ressources</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Temps restant</span>
                      <span className="font-medium">8 jours</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Marquer l'étape comme terminée
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
