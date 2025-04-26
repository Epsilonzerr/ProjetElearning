"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, BookOpen, Check, FileText, Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LearningPathPage({ params }: { params: { path: string[] } }) {
  const { t } = useLanguage()
  const pathId = params.path[0]
  const moduleId = params.path[1]

  // Mock learning content based on path and module
  const learningContent = {
    title:
      pathId === "poo"
        ? "Interfaces et Classes Abstraites"
        : pathId === "data-structures"
          ? "Graphes"
          : "Patterns Structurels",
    description: "Module d'apprentissage interactif",
    progress: 25,
    sections: [
      {
        title: "Introduction",
        completed: true,
        content: "Cette section présente les concepts fondamentaux du module.",
      },
      {
        title: "Théorie",
        completed: false,
        content: "Approfondissez votre compréhension avec des explications détaillées.",
      },
      {
        title: "Exemples pratiques",
        completed: false,
        content: "Voyez les concepts en action avec des exemples concrets.",
      },
      {
        title: "Exercices",
        completed: false,
        content: "Testez vos connaissances avec des exercices interactifs.",
      },
      {
        title: "Quiz final",
        completed: false,
        content: "Validez votre compréhension avec un quiz récapitulatif.",
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
              <h1 className="text-3xl font-bold tracking-tight">{learningContent.title}</h1>
              <p className="text-muted-foreground">{learningContent.description}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu du module</CardTitle>
                  <CardDescription>Progression: {learningContent.progress}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={learningContent.progress} className="h-2 mb-6" />

                  <div className="space-y-6">
                    {learningContent.sections.map((section, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            {section.completed && (
                              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                            {section.title}
                          </h3>
                          <Button size="sm" variant={section.completed ? "outline" : "default"}>
                            {section.completed ? "Revoir" : "Commencer"}
                          </Button>
                        </div>
                        <p className="text-muted-foreground">{section.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continuer l'apprentissage</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources complémentaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                    <BookOpen className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">Documentation officielle</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                    <Play className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">Tutoriel vidéo</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                    <FileText className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">Fiche de révision</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Votre progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Temps passé</span>
                      <span className="font-medium">45 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sections complétées</span>
                      <span className="font-medium">1/5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Exercices réussis</span>
                      <span className="font-medium">3/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
