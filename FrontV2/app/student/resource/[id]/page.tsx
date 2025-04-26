"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, BookOpen, ExternalLink, Play, ThumbsUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ResourcePage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const resourceId = Number.parseInt(params.id)

  // Mock resources data
  const resources = [
    {
      title: "Interfaces vs Classes abstraites en Java",
      type: "article",
      source: "Documentation Java",
      description:
        "Un guide complet sur les différences et cas d'utilisation des interfaces et classes abstraites en Java.",
      content: `
        <h2>Interfaces vs Classes abstraites en Java</h2>
        <p>Les interfaces et les classes abstraites sont deux mécanismes fondamentaux en Java pour implémenter l'abstraction et le polymorphisme. Bien qu'ils partagent certaines similitudes, ils ont des différences importantes qui déterminent quand utiliser l'un plutôt que l'autre.</p>
        
        <h3>Interfaces</h3>
        <p>Une interface en Java est une collection de méthodes abstraites (sans implémentation) et de constantes. Depuis Java 8, les interfaces peuvent également contenir des méthodes par défaut et des méthodes statiques avec implémentation.</p>
        
        <h4>Caractéristiques des interfaces:</h4>
        <ul>
          <li>Toutes les méthodes sont implicitement publiques et abstraites (sauf les méthodes par défaut et statiques)</li>
          <li>Tous les champs sont implicitement publics, statiques et finaux (constantes)</li>
          <li>Une classe peut implémenter plusieurs interfaces</li>
          <li>Les interfaces ne peuvent pas contenir de constructeurs</li>
        </ul>
        
        <h3>Classes abstraites</h3>
        <p>Une classe abstraite est une classe qui ne peut pas être instanciée et qui est conçue pour être étendue par des sous-classes. Elle peut contenir à la fois des méthodes abstraites et des méthodes avec implémentation.</p>
        
        <h4>Caractéristiques des classes abstraites:</h4>
        <ul>
          <li>Peuvent avoir des méthodes abstraites et non abstraites</li>
          <li>Peuvent avoir des constructeurs</li>
          <li>Peuvent avoir des champs d'instance (variables)</li>
          <li>Une classe ne peut hériter que d'une seule classe abstraite</li>
        </ul>
        
        <h3>Quand utiliser une interface?</h3>
        <p>Utilisez une interface lorsque:</p>
        <ul>
          <li>Vous voulez définir un contrat que plusieurs classes non liées doivent respecter</li>
          <li>Vous avez besoin d'implémenter l'héritage multiple</li>
          <li>Vous définissez un comportement commun pour des classes qui n'ont pas de relation hiérarchique</li>
        </ul>
        
        <h3>Quand utiliser une classe abstraite?</h3>
        <p>Utilisez une classe abstraite lorsque:</p>
        <ul>
          <li>Vous avez besoin de partager du code entre plusieurs classes étroitement liées</li>
          <li>Vous voulez fournir une implémentation partielle d'une fonctionnalité</li>
          <li>Vos classes dérivées ont besoin d'accéder à des méthodes ou champs non publics</li>
          <li>Vous avez besoin de définir des constructeurs pour initialiser des champs</li>
        </ul>
      `,
    },
    {
      title: "Polymorphisme avancé en Java",
      type: "video",
      source: "Cours IGA",
      description:
        "Une vidéo explicative sur les différentes formes de polymorphisme en Java avec des exemples concrets.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ]

  const resource = resourceId < resources.length ? resources[resourceId] : resources[0]

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
              <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>
              <p className="text-muted-foreground">
                {resource.type === "article" ? "Article" : "Vidéo"} • {resource.source}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {resource.type === "article" ? (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: resource.content }} />
                  ) : (
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={resource.videoUrl}
                        title={resource.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Utile
                  </Button>
                  <Button>
                    <ExternalLink className="mr-2 h-4 w-4" /> Ouvrir dans un nouvel onglet
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources connexes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                    <BookOpen className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">Documentation officielle Java</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                    <Play className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">Tutoriel vidéo sur les interfaces</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                    <BookOpen className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">Exercices pratiques</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parcours d'apprentissage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cette ressource fait partie du parcours d'apprentissage "Fondamentaux de la POO".
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/student/learning/poo/interfaces-classes-abstraites">Continuer le parcours</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
