"use client"
import { use } from "react";
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
  TrendingUp,
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
import { useLanguage } from "@/contexts/language-context"

export default function AssessmentDetails({ params }: { params: Promise<{ id: string }> }) {

  const resolvedParams = use(params); // 👈 UNWRAP the params
  const evaluationId = resolvedParams.id; // then use safely
  const { t, language } = useLanguage()
  const [extendTime, setExtendTime] = useState(0)
  const [showExtendDialog, setShowExtendDialog] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Mock assessment data
  const assessment = {
    id: evaluationId,
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
    alert(
      language === "fr"
        ? `Le temps a été prolongé de ${extendTime} minutes.`
        : `Time has been extended by ${extendTime} minutes.`,
    )
  }

  const handleTogglePause = () => {
    setIsPaused(!isPaused)
    // In a real app, this would call an API to pause/resume the assessment
    alert(
      isPaused
        ? language === "fr"
          ? "L'évaluation a été reprise."
          : "The assessment has been resumed."
        : language === "fr"
          ? "L'évaluation a été mise en pause."
          : "The assessment has been paused.",
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Mr Abid" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/professor/evaluations">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight dark:text-white">{assessment.title}</h1>
                <p className="text-muted-foreground">
                  {assessment.class} • {assessment.subject} • {t("code")}: #{assessment.code}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="mr-2 h-4 w-4" /> {t("actions")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/professor/create-assessment?id=${evaluationId}`} className="flex gap-2 items-center w-full text-white hover:text-white">
                      <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" /> {t("preview")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" /> {t("duplicate")}
                  </DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" /> {t("export")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowExtendDialog(true)}>
                    <Clock className="mr-2 h-4 w-4" /> {t("extend_time")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleTogglePause}>
                    {isPaused ? (
                      <>
                        <Play className="mr-2 h-4 w-4" /> {t("resume_assessment")}
                      </>
                    ) : (
                      <>
                        <Pause className="mr-2 h-4 w-4" /> {t("pause_assessment")}
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/professor/statistics`} className="flex items-center w-full">
                      <TrendingUp className="mr-2 h-4 w-4" /> {t("view_statistics")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
{/* 
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> {t("share")}
              </Button> */}

              {/* <Button asChild>
                <Link href={`/professor/results?id=${evaluationId}`}>
                  <FileText className="mr-2 h-4 w-4" /> {t("view_results")}
                </Link>
              </Button> */}
            </div>
          </div>

          {isPaused && (
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-600">{t("assessment_paused")}</AlertTitle>
              <AlertDescription className="text-amber-600">{t("assessment_paused_info")}</AlertDescription>
            </Alert>
          )}

          {showExtendDialog && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t("extend_time")}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Ajoutez du temps supplémentaire pour tous les étudiants"
                    : "Add additional time for all students"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="extend-time">{t("additional_minutes")}</Label>
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
                    <Label>{t("current_time")}</Label>
                    <div className="h-10 px-3 py-2 rounded-md border bg-muted/50 flex items-center">
                      {assessment.timeLimit} {t("minutes")}
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label>{t("new_total_time")}</Label>
                    <div className="h-10 px-3 py-2 rounded-md border bg-muted/50 flex items-center font-medium">
                      {assessment.timeLimit + extendTime} {t("minutes")}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowExtendDialog(false)}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleExtendTime}>
                  <Clock className="mr-2 h-4 w-4" /> {t("extend_time")}
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("participants")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assessment.participants}</div>
                <p className="text-xs text-muted-foreground">
                  {assessment.completionRate} {t("completed_percentage")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("time_remaining")}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 {t("days")}</div>
                <p className="text-xs text-muted-foreground">
                  {t("expires_on")} {assessment.expires}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("average_score")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assessment.averageScore}</div>
                <p className="text-xs text-muted-foreground">
                  {language === "fr"
                    ? `Basée sur ${assessment.participants.split("/")[0]} participants`
                    : `Based on ${assessment.participants.split("/")[0]} participants`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("access_code")}</CardTitle>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent onClick={() => navigator.clipboard.writeText(assessment.code)} className="cursor-pointer">
                <div className="text-2xl font-bold font-mono">#{assessment.code}</div>
                <p className="text-xs text-muted-foreground">
                  {language === "fr" ? "Cliquez pour copier" : "Click to copy"}
                </p>
              </CardContent>

            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
              <TabsTrigger value="questions">{t("questions")}</TabsTrigger>
              <TabsTrigger value="participants">{t("participants")}</TabsTrigger>
              {/* <TabsTrigger value="settings">{t("settings")}</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("general_information")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("title")}</h3>
                        <p>{assessment.title}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("class")}</h3>
                        <p>{assessment.class}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("subject")}</h3>
                        <p>{assessment.subject}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("creation_date")}</h3>
                        <p>{assessment.created}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("expiry_date")}</h3>
                        <p>{assessment.expires}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("status")}</h3>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                        >
                          {t("active")}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("description")}</h3>
                      <p className="mt-1">{assessment.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("assessment_structure")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("number_of_questions")}</h3>
                        <p>{assessment.questions}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("total_points")}</h3>
                        <p>{assessment.totalPoints}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("time_limit")}</h3>
                        <p>
                          {assessment.timeLimit} {t("minutes")}
                        </p>
                      </div>
                      {/* <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("shuffle_questions")}</h3>
                        <p>{assessment.settings.shuffleQuestions ? t("yes") : t("no")}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("back_navigation")}</h3>
                        <p>{assessment.settings.preventBackNavigation ? t("disabled") : t("enabled")}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t("immediate_results")}</h3>
                        <p>{assessment.settings.showResultsImmediately ? t("yes") : t("no")}</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{t("participant_progress")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{t("participants")}</span>
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
                        <span>{t("completed")}</span>
                        <span className="font-medium">{assessment.completionRate}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-blue" style={{ width: assessment.completionRate }}></div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">{t("waiting")}</div>
                          <div className="text-2xl font-bold">12</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">{t("in_progress")}</div>
                          <div className="text-2xl font-bold">10</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">{t("finished")}</div>
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
                    <CardTitle>{t("assessment_questions")}</CardTitle>
                    <Button variant="outline" asChild>
                      <Link href={`/professor/create-assessment?id=${evaluationId}`}>
                        <Edit className="mr-2 h-4 w-4" /> {t("edit_questions")}
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
                            <span className="font-medium">
                              {language === "fr" ? `Question ${i + 1}` : `Question ${i + 1}`}
                            </span>
                            <Badge variant="outline">
                              {question.type === "multiple-choice"
                                ? t("multiple_choice")
                                : question.type === "short-answer"
                                  ? t("short_answer")
                                  : question.type === "matching"
                                    ? t("matching")
                                    : t("open_ended")}
                            </Badge>
                          </div>
                          <span className="text-sm">
                            {question.points} {question.points > 1 ? t("points") : t("point")}
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
                    <CardTitle>{t("student_list")}</CardTitle>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> {t("export_results")}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">{t("student_name")}</div>
                      <div className="col-span-2 text-center">{t("status")}</div>
                      {/* <div className="col-span-2 text-center">{t("time_spent")}</div> */}
                      <div className="col-span-2 text-center">{t("score")}</div>
                      <div className="col-span-2 text-right">{t("actions")}</div>
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
                              {t("completed")}
                            </Badge>
                          ) : student.status === "in_progress" ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {t("in_progress")}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              {t("not_started")}
                            </Badge>
                          )}
                        </div>
                        {/* <div className="col-span-2 text-center">{student.time}</div> */}
                        <div className="col-span-2 text-center">{student.score}</div>
                        <div className="col-span-2 text-right">
                          <Button variant="ghost" size="sm">
                            {t("details")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
{/* 
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("assessment_settings")}</CardTitle>
                  <CardDescription>
                    {language === "fr"
                      ? "Configurez les paramètres de cette évaluation"
                      : "Configure the settings for this assessment"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("general_settings")}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="time-limit">
                          {t("time_limit")} ({t("minutes")})
                        </Label>
                        <Input id="time-limit" type="number" defaultValue={assessment.timeLimit} min="1" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">{t("expiry_date")}</Label>
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
                        <Label htmlFor="shuffle-questions">{t("shuffle_questions")}</Label>
                        <p className="text-sm text-muted-foreground">{t("shuffle_questions_desc")}</p>
                      </div>
                      <Switch id="shuffle-questions" defaultChecked={assessment.settings.shuffleQuestions} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="prevent-back">{t("prevent_back_navigation")}</Label>
                        <p className="text-sm text-muted-foreground">{t("prevent_back_desc")}</p>
                      </div>
                      <Switch id="prevent-back" defaultChecked={assessment.settings.preventBackNavigation} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-results">{t("show_results_immediately")}</Label>
                        <p className="text-sm text-muted-foreground">{t("show_results_desc")}</p>
                      </div>
                      <Switch id="show-results" defaultChecked={assessment.settings.showResultsImmediately} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-retake">{t("allow_retake")}</Label>
                        <p className="text-sm text-muted-foreground">{t("allow_retake_desc")}</p>
                      </div>
                      <Switch id="allow-retake" defaultChecked={assessment.settings.allowRetake} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="mr-2 h-4 w-4" /> {t("save_settings")}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
