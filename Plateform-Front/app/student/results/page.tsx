"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import { AlertCircle, BookOpen, Check, ExternalLink, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getUserData } from "@/lib/apiConfig"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
type User = {
  first_name: string;
  last_name: string;
  email: string;
}


export default function StudentResults() {
    const router = useRouter()

  const [user, setUser] = useState<User | null>(null);
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
  const results = {
    title: "Programmation Java - Examen final",
    score: 16,
    maxScore: 20,
    date: "15/03/2023",
    professor: "Prof. Dupont",
    questions: [
      {
        id: 1,
        text: "Quelle est la différence entre une classe abstraite et une interface en Java?",
        type: "open-ended",
        points: 4,
        score: 3,
        feedback:
          "Bonne explication des différences principales, mais vous n'avez pas mentionné que les classes abstraites peuvent avoir des constructeurs contrairement aux interfaces.",
      },
      {
        id: 2,
        text: "Quelle est la complexité de l'algorithme de tri rapide (Quicksort) dans le cas moyen?",
        type: "multiple-choice",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 1,
        userAnswer: 1,
        points: 2,
        score: 2,
        feedback: "Correct! La complexité moyenne du Quicksort est bien O(n log n).",
      },
      {
        id: 3,
        text: "Qu'est-ce que le polymorphisme en programmation orientée objet?",
        type: "short-answer",
        correctAnswer:
          "Le polymorphisme est la capacité d'un objet à prendre plusieurs formes. En Java, cela permet à une référence de type parent d'être utilisée pour référencer un objet de type enfant.",
        userAnswer: "Le polymorphisme permet à un objet d'avoir plusieurs formes et comportements.",
        points: 3,
        score: 2,
        feedback: "Définition correcte mais incomplète. Il manque des exemples concrets d'utilisation.",
      },
      {
        id: 4,
        text: "Associez chaque concept à sa définition correcte:",
        type: "matching",
        options: ["Héritage", "Encapsulation", "Polymorphisme", "Abstraction"],
        correctAnswers: {
          0: "Mécanisme permettant à une classe d'hériter des propriétés et méthodes d'une autre classe",
          1: "Principe de regroupement des données et méthodes dans une classe en masquant les détails d'implémentation",
          2: "Capacité d'un objet à prendre plusieurs formes",
          3: "Processus de simplification en cachant les détails complexes et en montrant uniquement les fonctionnalités essentielles",
        },
        userAnswers: {
          0: "Mécanisme permettant à une classe d'hériter des propriétés et méthodes d'une autre classe",
          1: "Principe de regroupement des données et méthodes dans une classe en masquant les détails d'implémentation",
          2: "Capacité d'un objet à prendre plusieurs formes",
          3: "Processus de simplification en cachant les détails complexes et en montrant uniquement les fonctionnalités essentielles",
        },
        points: 4,
        score: 4,
        feedback: "Parfait! Toutes les associations sont correctes.",
      },
      {
        id: 5,
        text: "Écrivez un programme Java qui imprime les nombres premiers de 1 à 100.",
        type: "open-ended",
        points: 5,
        score: 5,
        feedback:
          "Excellent code, bien structuré et efficace. Vous avez utilisé l'algorithme du crible d'Ératosthène qui est optimal pour ce problème.",
      },
    ],
    recommendations: [
      {
        title: "Interfaces et classes abstraites en Java",
        type: "article",
        url: "#",
        description:
          "Un article détaillé sur les différences et cas d'utilisation des interfaces et classes abstraites.",
      },
      {
        title: "Polymorphisme avancé en Java",
        type: "video",
        url: "#",
        description:
          "Une vidéo explicative sur les différentes formes de polymorphisme en Java avec des exemples concrets.",
      },
      {
        title: "Exercices sur les design patterns",
        type: "practice",
        url: "#",
        description: "Une série d'exercices pour maîtriser les design patterns qui utilisent le polymorphisme.",
      },
    ],
  }

  const scorePercentage = (results.score / results.maxScore) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{results.title}</h1>
              <p className="text-muted-foreground">Résultats et feedback • {results.date}</p>
            </div>

            <Button asChild variant="outline">
              <Link href="/student/dashboard">Retour au tableau de bord</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
                <CardDescription>Votre performance globale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className={`${scorePercentage >= 70 ? "text-primary-blue" : "text-amber-500"}`}
                        strokeWidth="10"
                        strokeDasharray={360}
                        strokeDashoffset={360 - (scorePercentage / 100) * 360}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold">
                      {results.score}/{results.maxScore}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-medium">
                    {scorePercentage >= 80
                      ? "Excellent!"
                      : scorePercentage >= 70
                        ? "Très bien!"
                        : scorePercentage >= 60
                          ? "Bien"
                          : scorePercentage >= 50
                            ? "Passable"
                            : "À améliorer"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Professeur:</span>
                    <span className="font-medium">{results.professor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Date:</span>
                    <span className="font-medium">{results.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span className="font-medium">{results.questions.length}</span>
                  </div>
                </div>

                <Alert className={scorePercentage >= 70 ? "bg-primary-blue/10" : "bg-amber-500/10"}>
                  <AlertCircle
                    className={`h-4 w-4 ${scorePercentage >= 70 ? "text-primary-blue" : "text-amber-500"}`}
                  />
                  <AlertDescription className="text-sm">
                    {scorePercentage >= 70
                      ? "Félicitations! Vous avez bien réussi cette évaluation."
                      : "Vous avez des points à améliorer. Consultez les recommandations."}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="questions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="questions">Questions & Réponses</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
                </TabsList>

                <TabsContent value="questions" className="space-y-4 pt-4">
                  {results.questions.map((question, index) => (
                    <Card key={question.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Question {index + 1}</CardTitle>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">
                              {question.score}/{question.points}
                            </span>
                            {question.score === question.points ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        <CardDescription>{question.text}</CardDescription>
                      </CardHeader>

                      <CardContent className="pb-2">
                        {question.type === "multiple-choice" && (
                          <div className="space-y-2">
                            {question.options?.map((option, i) => (
                              <div
                                key={i}
                                className={`flex items-center gap-3 p-3 rounded-md border ${
                                  i === question.correctAnswer
                                    ? "border-green-500 bg-green-50"
                                    : i === question.userAnswer && i !== question.correctAnswer
                                      ? "border-red-500 bg-red-50"
                                      : ""
                                }`}
                              >
                                <div
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                    i === question.correctAnswer
                                      ? "border-green-500"
                                      : i === question.userAnswer && i !== question.correctAnswer
                                        ? "border-red-500"
                                        : ""
                                  }`}
                                >
                                  {i === question.correctAnswer && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                  )}
                                  {i === question.userAnswer && i !== question.correctAnswer && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                                  )}
                                </div>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "short-answer" && (
                          <div className="space-y-2">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Votre réponse:</p>
                              <div className="p-3 rounded-md border">{question.userAnswer}</div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Réponse correcte:</p>
                              <div className="p-3 rounded-md border border-green-500 bg-green-50">
                                {question.correctAnswer}
                              </div>
                            </div>
                          </div>
                        )}

                        {question.type === "open-ended" && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Votre réponse:</p>
                            <div className="p-3 rounded-md border">{question.userAnswer || "Réponse longue..."}</div>
                          </div>
                        )}

                        {question.type === "matching" && (
                          <div className="space-y-4">
                            {question.options?.map((item, i) => (
                              <div key={i} className="grid grid-cols-2 gap-4 items-center">
                                <div className="p-3 border rounded-md bg-muted/50">{item}</div>
                                {/* <div
                                  className={`p-3 rounded-md border ${
                                    question.userAnswers?.[i] === question.correctAnswers?.[i]
                                      ? "border-green-500 bg-green-50"
                                      : "border-red-500 bg-red-50"
                                  }`}
                                >
                                  {question.userAnswers?.[i]}
                                </div> */}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 p-3 rounded-md bg-muted">
                          <p className="text-sm font-medium">Feedback:</p>
                          <p className="text-sm">{question.feedback}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4 pt-4">
                  <Alert>
                    <BookOpen className="h-4 w-4" />
                    <AlertTitle>Recommandations personnalisées</AlertTitle>
                    <AlertDescription>
                      Basées sur votre performance, voici des ressources pour vous aider à progresser.
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4 md:grid-cols-2">
                    {results.recommendations.map((rec, i) => (
                      <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <CardDescription>
                            {rec.type === "article"
                              ? "Article"
                              : rec.type === "video"
                                ? "Vidéo"
                                : "Exercices pratiques"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm">{rec.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="w-full">
                            <Link href={rec.url}>
                              <ExternalLink className="mr-2 h-4 w-4" /> Accéder à la ressource
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

