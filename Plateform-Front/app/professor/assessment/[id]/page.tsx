"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Pause,
  Play,
  Save,
  Share2,
  Users,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AssessmentDetails({ params }: { params: { id: string } }) {
  const [extendTime, setExtendTime] = useState(0)
  const [showExtendDialog, setShowExtendDialog] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Mock assessment data
  const assessment = {
    id: params.id,
    title: "Programmation Java - Examen final",
    description: "Examen final couvrant tous les aspects de la programmation Java vus en cours.",
    class: "3ème année",
    subject: "Programmation",
    code: "3re1oZ",
    status: "active",
    timeLimit: 60,
    questions: 15,
    totalPoints: 40,
    created: "15/03/2023",
    expires: "17/03/2023",
    participants: "28/40",
    averageScore: "14.5/20",
    completionRate: "65%",
    settings: {
      shuffleQuestions: true,
      preventBackNavigation: false,
      showResultsImmediately: false,
      allowRetake: false,
    },
  }

  const handleExtendTime = () => {
    // In a real app, this would call an API to extend the time
    setShowExtendDialog(false)
    alert(`Le temps a été prolongé de ${extendTime} minutes.`)
  }

  const handleTogglePause = () => {
    setIsPaused(!isPaused)
    // In a real app, this would call an API to pause/resume the assessment
    alert(isPaused ? "L'évaluation a été reprise." : "L'évaluation a été mise en pause.")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/professor/assessments">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{assessment.title}</h1>
                <p className="text-muted-foreground">
                  {assessment.class} • {assessment.subject} • Code: #{assessment.code}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="mr-2 h-4 w-4" /> Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" /> Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" /> Prévisualiser
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" /> Dupliquer
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" /> Exporter
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowExtendDialog(true)}>
                    <Clock className="mr-2 h-4 w-4" /> Prolonger le temps
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleTogglePause}>
                    {isPaused ? (
                      <>
                        <Play className="mr-2 h-4 w-4" /> Reprendre l'évaluation
                      </>
                    ) : (
                      <>
                        <Pause className="mr-2 h-4 w-4" /> Mettre en pause
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Partager
              </Button>

              <Button asChild>
                <Link href={`/professor/results?id=${params.id}`}>
                  <FileText className="mr-2 h-4 w-4" /> Voir les résultats
                </Link>
              </Button>
            </div>
          </div>

          {isPaused && (
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-600">Évaluation en pause</AlertTitle>
              <AlertDescription className="text-amber-600">
                L'évaluation est actuellement en pause. Les étudiants ne peuvent pas y accéder tant qu'elle n'est pas
                reprise.
              </AlertDescription>
            </Alert>
          )}

          {showExtendDialog && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Prolonger le temps</CardTitle>
                <CardDescription>Ajoutez du temps supplémentaire pour tous les étudiants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="extend-time">Minutes supplémentaires</Label>
                    <Input
                      id="extend-time"
                      type="number"
                      min="1"
                      max="60"
                      value={extendTime}
                      onChange={(e) => setExtendTime(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label>Temps actuel</Label>
                    <div className="h-10 px-3 py-2 rounded-md border bg-muted/50 flex items-center">
                      {assessment.timeLimit} minutes
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label>Nouveau temps total</Label>
                    <div className="h-10 px-3 py-2 rounded-md border bg-muted/50 flex items-center font-medium">
                      {assessment.timeLimit + extendTime} minutes
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowExtendDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleExtendTime}>
                  <Clock className="mr-2 h-4 w-4" /> Prolonger le temps
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assessment.participants}</div>
                <p className="text-xs text-muted-foreground">{assessment.completionRate} ont terminé</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temps restant</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 jours</div>
                <p className="text-xs text-muted-foreground">Expire le {assessment.expires}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assessment.averageScore}</div>
                <p className="text-xs text-muted-foreground">
                  Basée sur {assessment.participants.split("/")[0]} participants
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Code d'accès</CardTitle>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">#{assessment.code}</div>
                <p className="text-xs text-muted-foreground">Cliquez pour copier</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Titre</h3>
                        <p>{assessment.title}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Classe</h3>
                        <p>{assessment.class}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Matière</h3>
                        <p>{assessment.subject}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Date de création</h3>
                        <p>{assessment.created}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Date d'expiration</h3>
                        <p>{assessment.expires}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Statut</h3>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                        >
                          Actif
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                      <p className="mt-1">{assessment.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Structure de l'évaluation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Nombre de questions</h3>
                        <p>{assessment.questions}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Points totaux</h3>
                        <p>{assessment.totalPoints}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Temps limite</h3>
                        <p>{assessment.timeLimit} minutes</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Questions mélangées</h3>
                        <p>{assessment.settings.shuffleQuestions ? "Oui" : "Non"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Navigation arrière</h3>
                        <p>{assessment.settings.preventBackNavigation ? "Désactivée" : "Activée"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Résultats immédiats</h3>
                        <p>{assessment.settings.showResultsImmediately ? "Oui" : "Non"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Progression des participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Participants</span>
                        <span className="font-medium">{assessment.participants}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary-turquoise"
                          style={{
                            width: `${
                              (Number(assessment.participants.split("/")[0]) /
                                Number(assessment.participants.split("/")[1])) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Terminé</span>
                        <span className="font-medium">{assessment.completionRate}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-blue" style={{ width: assessment.completionRate }}></div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">En attente</div>
                          <div className="text-2xl font-bold">12</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">En cours</div>
                          <div className="text-2xl font-bold">10</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">Terminé</div>
                          <div className="text-2xl font-bold">18</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Questions de l'évaluation</CardTitle>
                    <Button variant="outline" asChild>
                      <Link href={`/professor/create-assessment?id=${params.id}`}>
                        <Edit className="mr-2 h-4 w-4" /> Modifier les questions
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        text: "Quelle est la différence entre une classe abstraite et une interface en Java?",
                        type: "open-ended",
                        points: 4,
                      },
                      {
                        id: 2,
                        text: "Quelle est la complexité de l'algorithme de tri rapide (Quicksort) dans le cas moyen?",
                        type: "multiple-choice",
                        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                        correctAnswer: 1,
                        points: 2,
                      },
                      {
                        id: 3,
                        text: "Qu'est-ce que le polymorphisme en programmation orientée objet?",
                        type: "short-answer",
                        points: 3,
                      },
                      {
                        id: 4,
                        text: "Associez chaque concept à sa définition correcte:",
                        type: "matching",
                        options: ["Héritage", "Encapsulation", "Polymorphisme", "Abstraction"],
                        points: 4,
                      },
                      {
                        id: 5,
                        text: "Écrivez un programme Java qui imprime les nombres premiers de 1 à 100.",
                        type: "open-ended",
                        points: 5,
                      },
                    ].map((question, i) => (
                      <div key={i} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Question {i + 1}</span>
                            <Badge variant="outline">
                              {question.type === "multiple-choice"
                                ? "QCM"
                                : question.type === "short-answer"
                                  ? "Réponse courte"
                                  : question.type === "matching"
                                    ? "Appariement"
                                    : "Question ouverte"}
                            </Badge>
                          </div>
                          <span className="text-sm">
                            {question.points} pt{question.points > 1 ? "s" : ""}
                          </span>
                        </div>

                        <p className="mb-3">{question.text}</p>

                        {question.type === "multiple-choice" && question.options && (
                          <div className="space-y-2 pl-4">
                            {question.options.map((option, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <div
                                  className={`h-4 w-4 rounded-full border ${
                                    j === question.correctAnswer ? "bg-primary-blue border-primary-blue" : ""
                                  }`}
                                ></div>
                                <span className={j === question.correctAnswer ? "font-medium" : ""}>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participants" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Liste des participants</CardTitle>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Exporter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">Étudiant</div>
                      <div className="col-span-2 text-center">Statut</div>
                      <div className="col-span-2 text-center">Temps passé</div>
                      <div className="col-span-2 text-center">Score</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {[
                      { name: "Ahmed Benali", status: "completed", time: "48 min", score: "18/20" },
                      { name: "Fatima Zahra", status: "completed", time: "52 min", score: "16/20" },
                      { name: "Karim Idrissi", status: "in_progress", time: "32 min", score: "-" },
                      { name: "Leila Alaoui", status: "in_progress", time: "25 min", score: "-" },
                      { name: "Omar Benjelloun", status: "not_started", time: "-", score: "-" },
                      { name: "Salma Tazi", status: "completed", time: "45 min", score: "15/20" },
                      { name: "Youssef Amrani", status: "not_started", time: "-", score: "-" },
                      { name: "Zineb Chaoui", status: "in_progress", time: "18 min", score: "-" },
                    ].map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2 text-center">
                          {student.status === "completed" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Terminé
                            </Badge>
                          ) : student.status === "in_progress" ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              En cours
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              Non commencé
                            </Badge>
                          )}
                        </div>
                        <div className="col-span-2 text-center">{student.time}</div>
                        <div className="col-span-2 text-center">{student.score}</div>
                        <div className="col-span-2 text-right">
                          <Button variant="ghost" size="sm">
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de l'évaluation</CardTitle>
                  <CardDescription>Configurez les paramètres de cette évaluation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Paramètres généraux</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="time-limit">Temps limite (minutes)</Label>
                        <Input id="time-limit" type="number" defaultValue={assessment.timeLimit} min="1" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Date d'expiration</Label>
                        <div className="flex">
                          <Input id="expiry-date" type="date" defaultValue="2023-03-17" />
                          <Button variant="ghost" size="icon" className="ml-2">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shuffle-questions">Mélanger les questions</Label>
                        <p className="text-sm text-muted-foreground">
                          Les questions seront présentées dans un ordre aléatoire à chaque étudiant
                        </p>
                      </div>
                      <Switch id="shuffle-questions" defaultChecked={assessment.settings.shuffleQuestions} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="prevent-back">Empêcher le retour en arrière</Label>
                        <p className="text-sm text-muted-foreground">
                          Les étudiants ne pourront pas revenir aux questions précédentes
                        </p>
                      </div>
                      <Switch id="prevent-back" defaultChecked={assessment.settings.preventBackNavigation} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-results">Afficher les résultats immédiatement</Label>
                        <p className="text-sm text-muted-foreground">
                          Les étudiants verront leurs résultats dès qu'ils auront terminé l'évaluation
                        </p>
                      </div>
                      <Switch id="show-results" defaultChecked={assessment.settings.showResultsImmediately} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-retake">Autoriser les reprises</Label>
                        <p className="text-sm text-muted-foreground">
                          Les étudiants pourront reprendre l'évaluation plusieurs fois
                        </p>
                      </div>
                      <Switch id="allow-retake" defaultChecked={assessment.settings.allowRetake} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

