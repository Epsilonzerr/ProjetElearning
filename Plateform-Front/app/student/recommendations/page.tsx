
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import DashboardHeader from "@/components/dashboard-header"
import { BookOpen, Check, ExternalLink, FileText, Play, TrendingUp } from "lucide-react"
import { getUserData } from "@/lib/apiConfig"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
type User = {
  first_name: string;
  last_name: string;
  email: string;
}

export default function StudentRecommendations() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
      const fetchData = async () => {
        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")
        console.log(userId)
  
        if (!userId || !token) return router.replace("/login")
  
        try {
          const [userData] = await Promise.all([
            getUserData(userId, token),
          ])
          
  
          setUser(userData)
        } catch (err) {
          console.error("Error loading data:", err)
        }
      }
  
      fetchData()
    }, [])
  
  const recommendations = {
    skills: [
      { name: "Programmation orientée objet", progress: 75 },
      { name: "Algorithmes de tri", progress: 60 },
      { name: "Structures de données", progress: 85 },
      { name: "Interfaces et classes abstraites", progress: 45 },
      { name: "Design patterns", progress: 30 },
    ],
    resources: [
      {
        title: "Interfaces vs Classes abstraites en Java",
        type: "article",
        source: "Documentation Java",
        description:
          "Un guide complet sur les différences et cas d'utilisation des interfaces et classes abstraites en Java.",
        url: "#",
        priority: "Élevée",
      },
      {
        title: "Polymorphisme avancé en Java",
        type: "video",
        source: "Cours IGA",
        description:
          "Une vidéo explicative sur les différentes formes de polymorphisme en Java avec des exemples concrets.",
        url: "#",
        priority: "Moyenne",
      },
      {
        title: "Exercices sur les design patterns",
        type: "practice",
        source: "Plateforme d'exercices IGA",
        description: "Une série d'exercices pour maîtriser les design patterns qui utilisent le polymorphisme.",
        url: "#",
        priority: "Élevée",
      },
      {
        title: "Optimisation des algorithmes en Java",
        type: "article",
        source: "Blog Tech",
        description: "Un article détaillé sur les techniques d'optimisation des algorithmes courants en Java.",
        url: "#",
        priority: "Moyenne",
      },
      {
        title: "Atelier pratique sur les structures de données",
        type: "workshop",
        source: "Département Informatique IGA",
        description: "Un atelier interactif pour approfondir vos connaissances sur les structures de données avancées.",
        url: "#",
        priority: "Basse",
      },
    ],
    learningPath: [
      {
        title: "Fondamentaux de la POO",
        description: "Maîtrisez les concepts fondamentaux de la programmation orientée objet",
        progress: 80,
        modules: [
          { name: "Classes et objets", completed: true },
          { name: "Héritage", completed: true },
          { name: "Polymorphisme", completed: true },
          { name: "Encapsulation", completed: true },
          { name: "Interfaces et classes abstraites", completed: false },
        ],
      },
      {
        title: "Structures de données avancées",
        description: "Apprenez à utiliser les structures de données complexes",
        progress: 60,
        modules: [
          { name: "Listes chaînées", completed: true },
          { name: "Arbres binaires", completed: true },
          { name: "Graphes", completed: false },
          { name: "Tables de hachage", completed: true },
          { name: "Files de priorité", completed: false },
        ],
      },
      {
        title: "Design patterns",
        description: "Découvrez les modèles de conception logicielle",
        progress: 30,
        modules: [
          { name: "Patterns créationnels", completed: true },
          { name: "Patterns structurels", completed: false },
          { name: "Patterns comportementaux", completed: false },
          { name: "Application pratique", completed: false },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
            <DashboardHeader user={user} />
      

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Recommandations personnalisées</h1>
              <p className="text-muted-foreground">Ressources et parcours d'apprentissage adaptés à votre profil</p>
            </div>
          </div>

          <Tabs defaultValue="resources" className="space-y-4">
            <TabsList>
              <TabsTrigger value="resources">Ressources recommandées</TabsTrigger>
              <TabsTrigger value="skills">Compétences à améliorer</TabsTrigger>
              <TabsTrigger value="path">Parcours d'apprentissage</TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.resources.map((resource, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            resource.priority === "Élevée"
                              ? "bg-red-100 text-red-800"
                              : resource.priority === "Moyenne"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {resource.priority}
                        </span>
                      </div>
                      <CardDescription>
                        {resource.type === "article"
                          ? "Article"
                          : resource.type === "video"
                            ? "Vidéo"
                            : resource.type === "practice"
                              ? "Exercices pratiques"
                              : "Atelier"}
                        {" • "}
                        {resource.source}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={resource.url}>
                          {resource.type === "video" ? (
                            <Play className="mr-2 h-4 w-4" />
                          ) : resource.type === "practice" ? (
                            <FileText className="mr-2 h-4 w-4" />
                          ) : (
                            <ExternalLink className="mr-2 h-4 w-4" />
                          )}
                          Accéder à la ressource
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compétences à améliorer</CardTitle>
                  <CardDescription>Basé sur vos performances aux évaluations récentes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {recommendations.skills.map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>À améliorer</span>
                        <span>Maîtrisé</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" /> Voir les ressources d'apprentissage
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="path" className="space-y-4">
              {recommendations.learningPath.map((path, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{path.title}</CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </div>
                      <div className="text-2xl font-bold">{path.progress}%</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={path.progress} className="h-2" />

                    <div className="space-y-2">
                      {path.modules.map((module, j) => (
                        <div key={j} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                          <div
                            className={`h-5 w-5 rounded-full flex items-center justify-center ${
                              module.completed ? "bg-primary-blue text-white" : "border border-muted-foreground"
                            }`}
                          >
                            {module.completed && <Check className="h-3 w-3" />}
                          </div>
                          <span className={module.completed ? "line-through text-muted-foreground" : ""}>
                            {module.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <TrendingUp className="mr-2 h-4 w-4" /> Continuer l'apprentissage
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

