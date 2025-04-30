"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, BarChart, Clock, Copy, Download, FileText, Pause, Play, Settings, Share, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { use } from "react";

export default function EvaluationDetails({ params }: { params: Promise<{ id: string }> }) {
  const { t, language } = useLanguage();

  const resolvedParams = use(params); // 👈 UNWRAP the params
  const evaluationId = resolvedParams.id; // then use safely
  const [isPaused, setIsPaused] = useState(false)
  const [showExtendTimeDialog, setShowExtendTimeDialog] = useState(false)
  const [additionalMinutes, setAdditionalMinutes] = useState(15)

  // Mock evaluation data
  const evaluation = {
    id: evaluationId,
    title: "Programmation Java - Évaluation finale",
    type: "summative",
    status: "active",
    dueDate: "2023-12-15",
    createdDate: "2023-11-20",
    students: "28/40",
    timeLimit: "90 min",
    questions: 15,
    maxScore: 100,
    description:
      "Évaluation finale du cours de programmation Java couvrant les concepts de POO, les collections, et les design patterns.",
    code: "JV2023",
    settings: {
      shuffleQuestions: true,
      preventBackNavigation: true,
      showResultsImmediately: false,
      allowRetake: false,
    },
  }

  // Mock student data
  const students = [
    { id: 1, name: "Ahmed Benali", status: "completed", timeSpent: "65 min", score: "18/20" },
    { id: 2, name: "Fatima Zahra", status: "completed", timeSpent: "78 min", score: "16/20" },
    { id: 3, name: "Karim Idrissi", status: "in_progress", timeSpent: "45 min", score: "-" },
    { id: 4, name: "Leila Alaoui", status: "in_progress", timeSpent: "32 min", score: "-" },
    { id: 5, name: "Omar Benjelloun", status: "not_started", timeSpent: "-", score: "-" },
    { id: 6, name: "Salma Tazi", status: "completed", timeSpent: "70 min", score: "17/20" },
  ]

  // Mock questions data
  const questions = [
    {
      id: 1,
      type: "mcq",
      text: "Quelle est la différence entre une classe abstraite et une interface en Java?",
      points: 5,
    },
    {
      id: 2,
      type: "mcq",
      text: "Quelle est la complexité temporelle de l'algorithme QuickSort dans le pire des cas?",
      points: 3,
    },
    { id: 3, type: "open", text: "Expliquez le concept de polymorphisme et donnez un exemple concret.", points: 8 },
    { id: 4, type: "mcq", text: "Associez chaque concept de POO à sa définition correcte.", points: 4 },
    { id: 5, type: "code", text: "Écrivez un programme Java qui affiche les nombres premiers de 1 à 100.", points: 10 },
  ]

  // Format date based on language
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return language === "fr" ? date.toLocaleDateString("fr-FR") : date.toLocaleDateString("en-US")
  }

  // Get status badge for students
  const getStudentStatusBadge = (status) => {
    if (status === "completed") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("completed")}</Badge>
    } else if (status === "in_progress") {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t("in_progress")}</Badge>
    } else if (status === "not_started") {
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{t("not_started")}</Badge>
    }
    return null
  }

  // Get question type badge
  const getQuestionTypeBadge = (type) => {
    if (type === "mcq") {
      return (
        <Badge variant="outline" className="border-primary-blue text-primary-blue">
          {t("mcq")}
        </Badge>
      )
    } else if (type === "open") {
      return (
        <Badge variant="outline" className="border-secondary-turquoise text-secondary-turquoise">
          {t("open_questions")}
        </Badge>
      )
    } else if (type === "code") {
      return (
        <Badge variant="outline" className="border-purple-500 text-purple-500">
          {t("code")}
        </Badge>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" showSearch={false} />

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
                <h1 className="text-3xl font-bold tracking-tight dark:text-white">{evaluation.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("active")}</Badge>
                  <Badge variant="outline" className="border-primary-blue text-primary-blue">
                    {t("summative")}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? (
                  <>
                    <Play className="mr-2 h-4 w-4" /> {t("resume_assessment")}
                  </>
                ) : (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> {t("pause_assessment")}
                  </>
                )}
              </Button>

              <Button variant="outline" asChild>
                <Link href={`/professor/results?id=${evaluation.id}`}>
                  <BarChart className="mr-2 h-4 w-4" /> {t("view_statistics")}
                </Link>
              </Button>

              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" /> {t("share")}
              </Button>

              {/* <Button>
                <Settings className="mr-2 h-4 w-4" /> {t("settings")}
              </Button> */}
            </div>
          </div>

          {isPaused && (
            <Card className="mb-6 border-amber-200 bg-amber-50">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Pause className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium text-amber-800">{t("assessment_paused")}</h3>
                    <p className="text-sm text-amber-700">{t("assessment_paused_info")}</p>
                  </div>
                </div>
                <Button variant="outline" className="bg-white" onClick={() => setIsPaused(false)}>
                  <Play className="mr-2 h-4 w-4" /> {t("resume_assessment")}
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("participants")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{evaluation.students}</div>
                <p className="text-xs text-muted-foreground">{t("active_participants")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("time_limit")}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{evaluation.timeLimit}</div>
                <Dialog open={showExtendTimeDialog} onOpenChange={setShowExtendTimeDialog}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                      {t("extend_time")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("extend_time")}</DialogTitle>
                      <DialogDescription>{t("extend_time_description")}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="additional-minutes">{t("additional_minutes")}</Label>
                        <Input
                          id="additional-minutes"
                          type="number"
                          value={additionalMinutes}
                          onChange={(e) => setAdditionalMinutes(Number.parseInt(e.target.value))}
                          min={5}
                          max={60}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">{t("current_time")}</p>
                          <p className="text-sm text-muted-foreground">90 {t("minutes")}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t("new_total_time")}</p>
                          <p className="text-sm text-muted-foreground">
                            {90 + additionalMinutes} {t("minutes")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowExtendTimeDialog(false)}>
                        {t("cancel")}
                      </Button>
                      <Button onClick={() => setShowExtendTimeDialog(false)}>{t("confirm")}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("questions")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{evaluation.questions}</div>
                <p className="text-xs text-muted-foreground">
                  {t("total_points")}: {evaluation.maxScore}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("access_code")}</CardTitle>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">{evaluation.code}</div>
                <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                  {t("copy_code")}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
              <TabsTrigger value="students">{t("students")}</TabsTrigger>
              <TabsTrigger value="questions">{t("questions")}</TabsTrigger>
              {/* <TabsTrigger value="settings">{t("settings")}</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("general_information")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2 dark:text-white">{t("description")}</h3>
                      <p className="text-sm text-muted-foreground">{evaluation.description}</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1 dark:text-white">{t("creation_date")}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(evaluation.createdDate)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1 dark:text-white">{t("expiry_date")}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(evaluation.dueDate)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1 dark:text-white">{t("type")}</h3>
                        <p className="text-sm text-muted-foreground">{t("summative")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("active_restrictions")}</CardTitle>
                  <CardDescription>{t("active_restrictions_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 text-xs">✕</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium dark:text-white">{t("copy_paste_disabled_info")}</h3>
                        <p className="text-xs text-muted-foreground">{t("copy_paste_disabled_description")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 text-xs">✕</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium dark:text-white">{t("back_navigation_limited")}</h3>
                        <p className="text-xs text-muted-foreground">{t("back_navigation_description")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-600 text-xs">!</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium dark:text-white">{t("tab_switching_monitored")}</h3>
                        <p className="text-xs text-muted-foreground">{t("tab_switching_description")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium dark:text-white">{t("immediate_results")}</h3>
                        <p className="text-xs text-muted-foreground">{t("immediate_results_description")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("participant_progress")}</CardTitle>
                  <CardDescription>{t("participant_progress_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>{t("participants")}</span>
                      <span className="font-medium">{evaluation.students}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary-turquoise"
                        style={{
                          width: `${
                            (Number(evaluation.students.split("/")[0]) / Number(evaluation.students.split("/")[1])) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">{t("completed")}</p>
                        <p className="font-medium">3</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("in_progress")}</p>
                        <p className="font-medium">2</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("not_started")}</p>
                        <p className="font-medium">35</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t("student_list")}</CardTitle>
                    <CardDescription>{t("student_list_description")}</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> {t("export_results")}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">{t("student_name")}</div>
                      <div className="col-span-2 text-center">{t("status")}</div>
                      <div className="col-span-2 text-center">{t("time_spent")}</div>
                      <div className="col-span-2 text-center">{t("score")}</div>
                      <div className="col-span-2 text-right">{t("actions")}</div>
                    </div>

                    {students.map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2 flex justify-center">{getStudentStatusBadge(student.status)}</div>
                        <div className="col-span-2 text-center">{student.timeSpent}</div>
                        <div className="col-span-2 text-center">{student.score}</div>
                        <div className="col-span-2 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/professor/student/${student.id}`}>{t("details")}</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t("assessment_questions")}</CardTitle>
                    <CardDescription>{t("assessment_questions_description")}</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href={`/professor/edit-questions/${evaluation.id}`}>{t("edit_questions")}</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Q{i + 1}.</span>
                            {getQuestionTypeBadge(question.type)}
                          </div>
                          <span className="text-sm font-medium">
                            {question.points} {question.points > 1 ? t("points") : t("point")}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{question.text}</p>
                        <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                          {t("view_details")}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("assessment_settings")}</CardTitle>
                  <CardDescription>{t("assessment_settings_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t("general_settings")}</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="shuffle-questions">{t("shuffle_questions")}</Label>
                            <p className="text-sm text-muted-foreground">{t("shuffle_questions_desc")}</p>
                          </div>
                          <Switch id="shuffle-questions" checked={evaluation.settings.shuffleQuestions} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="prevent-back">{t("prevent_back_navigation")}</Label>
                            <p className="text-sm text-muted-foreground">{t("prevent_back_desc")}</p>
                          </div>
                          <Switch id="prevent-back" checked={evaluation.settings.preventBackNavigation} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="show-results">{t("show_results_immediately")}</Label>
                            <p className="text-sm text-muted-foreground">{t("show_results_desc")}</p>
                          </div>
                          <Switch id="show-results" checked={evaluation.settings.showResultsImmediately} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allow-retake">{t("allow_retake")}</Label>
                            <p className="text-sm text-muted-foreground">{t("allow_retake_desc")}</p>
                          </div>
                          <Switch id="allow-retake" checked={evaluation.settings.allowRetake} />
                        </div>
                      </div>
                    </div>
                    <Button>{t("save_settings")}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
