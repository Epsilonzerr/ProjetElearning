"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, BookOpen, Check, FileText, Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function CoursePage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const courseId = params.id

  // Mock course data
  const course = {
    title: courseId === "poo" ? "Programmation Orientée Objet" : "Cours",
    description: "Cours complet sur les concepts fondamentaux",
    progress: 45,
    chapters: [
      {
        title: "Introduction à la POO",
        description: "Concepts fondamentaux de la programmation orientée objet",
        completed: true,
        sections: [
          { title: "Qu'est-ce que la POO?", type: "text", completed: true },
          { title: "Avantages de la POO", type: "text", completed: true },
          { title: "Objets et classes", type: "text", completed: true },
          { title: "Quiz - Introduction", type: "quiz", completed: true },
        ],
      },
      {
        title: "Principes de la POO",
        description: "Les quatre piliers de la programmation orientée objet",
        completed: true,
        sections: [
          { title: "Encapsulation", type: "text", completed: true },
          { title: "Héritage", type: "text", completed: true },
          { title: "Polymorphisme", type: "text", completed: true },
          { title: "Abstraction", type: "text", completed: true },
          { title: "Quiz - Principes", type: "quiz", completed: true },
        ],
      },
      {
        title: "Interfaces et classes abstraites",
        description: "Comprendre et utiliser les interfaces et classes abstraites",
        completed: false,
        sections: [
          { title: "Classes abstraites", type: "text", completed: true },
          { title: "Méthodes abstraites", type: "text", completed: true },
          { title: "Interfaces", type: "text", completed: false },
          { title: "Interfaces vs Classes abstraites", type: "text", completed: false },
          { title: "Exercices pratiques", type: "exercise", completed: false },
          { title: "Quiz - Interfaces et classes abstraites", type: "quiz", completed: false },
        ],
      },
      {
        title: "Design patterns",
        description: "Modèles de conception en programmation orientée objet",
        completed: false,
        sections: [
          { title: "Introduction aux design patterns", type: "text", completed: false },
          { title: "Patterns créationnels", type: "text", completed: false },
          { title: "Patterns structurels", type: "text", completed: false },
          { title: "Patterns comportementaux", type: "text", completed: false },
          { title: "Exercices pratiques", type: "exercise", completed: false },
          { title: "Quiz - Design patterns", type: "quiz", completed: false },
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
              <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progression du cours</CardTitle>
                  <CardDescription>Votre avancement: {course.progress}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="h-2 mb-6" />

                  <div className="space-y-6">
                    {course.chapters.map((chapter, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            {chapter.completed && (
                              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                            {chapter.title}
                          </h3>
                          <Button size="sm" variant={chapter.completed ? "outline" : "default"} asChild>
                            <Link href={`/student/learning/poo/${chapter.title.toLowerCase().replace(/\s+/g, "-")}`}>
                              {chapter.completed ? "Revoir" : "Continuer"}
                            </Link>
                          </Button>
                        </div>

                        <p className="text-muted-foreground mb-4">{chapter.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {chapter.sections.map((section, j) => (
                            <div key={j} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                              {section.completed ? (
                                <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                                  <Check className="h-2 w-2 text-white" />
                                </div>
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-muted-foreground"></div>
                              )}
                              <span className="text-sm">{section.title}</span>
                              {section.type === "quiz" && (
                                <FileText className="h-3 w-3 text-muted-foreground ml-auto" />
                              )}
                              {section.type === "exercise" && (
                                <Play className="h-3 w-3 text-muted-foreground ml-auto" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/student/learning/poo/interfaces-et-classes-abstraites">Continuer l'apprentissage</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources complémentaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/resource/0">
                      <BookOpen className="mr-2 h-4 w-4" /> Documentation Java
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/resource/1">
                      <Play className="mr-2 h-4 w-4" /> Tutoriels vidéo
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/exercises/poo/interfaces">
                      <FileText className="mr-2 h-4 w-4" /> Exercices pratiques
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Chapitres complétés</span>
                      <span className="font-medium">2/4</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sections complétées</span>
                      <span className="font-medium">12/22</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Temps passé</span>
                      <span className="font-medium">3h 45min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Dernière activité</span>
                      <span className="font-medium">Aujourd'hui</span>
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
