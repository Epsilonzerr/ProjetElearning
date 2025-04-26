"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Download, FileText, RefreshCw, XCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useLanguage } from "@/contexts/language-context"
import { downloadAssessmentData } from "@/utils/download-utils"

export default function ResultsPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const assessmentId = searchParams.get("id")
  const [assessment, setAssessment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch the assessment results
    // For demo purposes, we'll simulate loading and then set mock data
    const loadData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      // Mock assessment data
      const mockAssessment = {
        id: assessmentId || "math-midterm-2023",
        title: language === "fr" ? "Mathématiques - Examen partiel" : "Mathematics - Midterm Exam",
        professor: "Prof. Martin",
        class: language === "fr" ? "3ème année" : "3rd year",
        date: "01/03/2023",
        duration: language === "fr" ? "1 heure 30" : "1 hour 30",
        score: "16/20",
        totalQuestions: 20,
        correctAnswers: 16,
        incorrectAnswers: 4,
        assessmentType: assessmentId === "java-practice-2023" ? "practice" : "summative",
        questions: [
          {
            id: 1,
            text:
              language === "fr"
                ? "Quelle est la dérivée de f(x) = x² + 3x + 2 ?"
                : "What is the derivative of f(x) = x² + 3x + 2?",
            type: "multiple-choice",
            userAnswer: "2x + 3",
            correctAnswer: "2x + 3",
            isCorrect: true,
            explanation:
              language === "fr"
                ? "La dérivée de x² est 2x et la dérivée de 3x est 3. La dérivée d'une constante est 0."
                : "The derivative of x² is 2x and the derivative of 3x is 3. The derivative of a constant is 0.",
          },
          {
            id: 2,
            text: language === "fr" ? "Résolvez l'équation: 2x² - 5x + 3 = 0" : "Solve the equation: 2x² - 5x + 3 = 0",
            type: "multiple-choice",
            userAnswer: language === "fr" ? "x = 1 ou x = 3/2" : "x = 1 or x = 3/2",
            correctAnswer: language === "fr" ? "x = 1 ou x = 3/2" : "x = 1 or x = 3/2",
            isCorrect: true,
            explanation:
              language === "fr"
                ? "En utilisant la formule quadratique: x = (-b ± √(b² - 4ac)) / 2a"
                : "Using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a",
          },
          {
            id: 3,
            text:
              language === "fr" ? "Calculez l'intégrale de f(x) = 2x + 3" : "Calculate the integral of f(x) = 2x + 3",
            type: "open-ended",
            userAnswer: "x² + 3x + C",
            correctAnswer: "x² + 3x + C",
            isCorrect: true,
            explanation:
              language === "fr"
                ? "L'intégrale de 2x est x² et l'intégrale de 3 est 3x. N'oubliez pas la constante d'intégration C."
                : "The integral of 2x is x² and the integral of 3 is 3x. Don't forget the integration constant C.",
          },
          {
            id: 4,
            text:
              language === "fr"
                ? "Quelle est la limite de (1 + 1/n)^n quand n tend vers l'infini?"
                : "What is the limit of (1 + 1/n)^n as n approaches infinity?",
            type: "multiple-choice",
            userAnswer: "e",
            correctAnswer: "e",
            isCorrect: true,
            explanation:
              language === "fr" ? "C'est la définition du nombre e." : "This is the definition of the number e.",
          },
          {
            id: 5,
            text:
              language === "fr"
                ? "Résolvez le système d'équations: 2x + y = 5, x - y = 1"
                : "Solve the system of equations: 2x + y = 5, x - y = 1",
            type: "open-ended",
            userAnswer: language === "fr" ? "x = 2, y = 1" : "x = 2, y = 1",
            correctAnswer: language === "fr" ? "x = 2, y = 1" : "x = 2, y = 1",
            isCorrect: true,
            explanation:
              language === "fr"
                ? "En additionnant les deux équations: 3x = 6, donc x = 2. En substituant: 2(2) + y = 5, donc y = 1."
                : "Adding the two equations: 3x = 6, so x = 2. Substituting: 2(2) + y = 5, so y = 1.",
          },
          {
            id: 6,
            text:
              language === "fr"
                ? "Quelle est la dérivée de f(x) = sin(x)?"
                : "What is the derivative of f(x) = sin(x)?",
            type: "multiple-choice",
            userAnswer: "cos(x)",
            correctAnswer: "cos(x)",
            isCorrect: true,
            explanation: language === "fr" ? "La dérivée de sin(x) est cos(x)." : "The derivative of sin(x) is cos(x).",
          },
          {
            id: 7,
            text:
              language === "fr"
                ? "Calculez la valeur de la série: 1 + 1/2 + 1/4 + 1/8 + ..."
                : "Calculate the value of the series: 1 + 1/2 + 1/4 + 1/8 + ...",
            type: "open-ended",
            userAnswer: "2",
            correctAnswer: "2",
            isCorrect: true,
            explanation:
              language === "fr"
                ? "C'est une série géométrique avec a=1 et r=1/2. La somme est a/(1-r) = 1/(1-1/2) = 2."
                : "This is a geometric series with a=1 and r=1/2. The sum is a/(1-r) = 1/(1-1/2) = 2.",
          },
          {
            id: 8,
            text: language === "fr" ? "Quelle est la valeur de cos(π)?" : "What is the value of cos(π)?",
            type: "multiple-choice",
            userAnswer: "-1",
            correctAnswer: "-1",
            isCorrect: true,
            explanation:
              language === "fr"
                ? "cos(π) = -1 est une valeur fondamentale en trigonométrie."
                : "cos(π) = -1 is a fundamental value in trigonometry.",
          },
          {
            id: 9,
            text: language === "fr" ? "Résolvez l'inéquation: x² - 4 < 0" : "Solve the inequality: x² - 4 < 0",
            type: "open-ended",
            userAnswer: language === "fr" ? "-2 < x < 2" : "-2 < x < 2",
            correctAnswer: language === "fr" ? "-2 < x < 2" : "-2 < x < 2",
            isCorrect: true,
            explanation:
              language === "fr"
                ? "x² - 4 < 0 implique (x-2)(x+2) < 0, ce qui est vrai quand -2 < x < 2."
                : "x² - 4 < 0 implies (x-2)(x+2) < 0, which is true when -2 < x < 2.",
          },
          {
            id: 10,
            text:
              language === "fr"
                ? "Quelle est la définition de la continuité d'une fonction en un point?"
                : "What is the definition of continuity of a function at a point?",
            type: "open-ended",
            userAnswer:
              language === "fr"
                ? "Une fonction f est continue en un point a si lim(x→a) f(x) = f(a)."
                : "A function f is continuous at a point a if lim(x→a) f(x) = f(a).",
            correctAnswer:
              language === "fr"
                ? "Une fonction f est continue en un point a si lim(x→a) f(x) = f(a)."
                : "A function f is continuous at a point a if lim(x→a) f(x) = f(a).",
            isCorrect: false,
            explanation:
              language === "fr"
                ? "La définition complète exige que la limite existe et que f(a) soit défini."
                : "The complete definition requires that the limit exists and that f(a) is defined.",
          },
        ],
      }

      setAssessment(mockAssessment)
      setLoading(false)
    }

    loadData()
  }, [assessmentId, language])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader userType="student" userName="Jean Dupont" />
        <main className="flex-1 container py-8">
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse space-y-4 w-full max-w-3xl">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader userType="student" userName="Jean Dupont" />
        <main className="flex-1 container py-8">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold">{t("assessment_not_found")}</h2>
              <p className="text-muted-foreground mt-2">{t("assessment_not_found_description")}</p>
              <Button asChild className="mt-4">
                <Link href="/student/dashboard">{t("back_to_dashboard")}</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const percentageScore = (assessment.correctAnswers / assessment.totalQuestions) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Jean Dupont" />

      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.history.back()}
              className="dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{assessment.title}</h1>
              <p className="text-muted-foreground">
                {assessment.professor} • {assessment.class} • {assessment.date}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge
              variant="outline"
              className={
                assessment.assessmentType === "practice"
                  ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
              }
            >
              {assessment.assessmentType === "practice" ? t("training_assessment") : t("summative_assessment")}
            </Badge>

            <Button variant="outline" size="sm" className="gap-2" onClick={() => downloadAssessmentData(assessment.id)}>
              <Download className="h-4 w-4" />
              {t("download_results")}
            </Button>

            {assessment.assessmentType === "practice" && (
              <Button size="sm" className="gap-2" asChild>
                <Link href={`/student/assessment?id=${assessment.id}&type=practice&retry=true`}>
                  <RefreshCw className="h-4 w-4" />
                  {t("retry_assessment")}
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("assessment_results")}</CardTitle>
                <CardDescription>{t("detailed_performance")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t("score")}</span>
                      <span className="text-sm font-medium">{assessment.score}</span>
                    </div>
                    <Progress value={percentageScore} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                        <div>
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">
                            {t("correct_answers")}
                          </p>
                          <p className="text-2xl font-bold text-green-800 dark:text-green-300">
                            {assessment.correctAnswers}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                        <div>
                          <p className="text-sm font-medium text-red-800 dark:text-red-300">{t("incorrect_answers")}</p>
                          <p className="text-2xl font-bold text-red-800 dark:text-red-300">
                            {assessment.incorrectAnswers}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("question_review")}</CardTitle>
                <CardDescription>{t("review_your_answers")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-gray-800">
                  {assessment.questions.map((question, index) => (
                    <div key={index} className="p-4 md:p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-1 flex-shrink-0 rounded-full p-1 ${
                            question.isCorrect
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {question.isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </div>
                        <div className="space-y-2 w-full">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">
                              {t("question")} {index + 1}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {question.type === "multiple-choice" ? t("multiple_choice") : t("open_ended")}
                            </Badge>
                          </div>
                          <p>{question.text}</p>

                          <div className="grid gap-2 mt-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">{t("your_answer")}</p>
                              <div
                                className={`p-3 rounded-md text-sm ${
                                  question.isCorrect
                                    ? "bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800"
                                    : "bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800"
                                }`}
                              >
                                {question.userAnswer}
                              </div>
                            </div>

                            {!question.isCorrect && (
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">{t("correct_answer")}</p>
                                <div className="p-3 rounded-md text-sm bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800">
                                  {question.correctAnswer}
                                </div>
                              </div>
                            )}

                            <div className="space-y-1 mt-2">
                              <p className="text-sm font-medium text-muted-foreground">{t("explanation")}</p>
                              <div className="p-3 rounded-md text-sm bg-gray-50 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                {question.explanation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-800 p-6">
                <Button asChild className="w-full">
                  <Link href="/student/dashboard">{t("back_to_dashboard")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("assessment_summary")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">{t("date")}</div>
                    <div className="font-medium text-right">{assessment.date}</div>

                    <div className="text-muted-foreground">{t("duration")}</div>
                    <div className="font-medium text-right">{assessment.duration}</div>

                    <div className="text-muted-foreground">{t("questions")}</div>
                    <div className="font-medium text-right">{assessment.totalQuestions}</div>

                    <div className="text-muted-foreground">{t("score")}</div>
                    <div className="font-medium text-right">{assessment.score}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("recommendations")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t("review_materials")}</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/student/learning">{t("view_learning_materials")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
