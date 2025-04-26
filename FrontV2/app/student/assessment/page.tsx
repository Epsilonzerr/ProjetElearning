"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowLeft, ArrowRight, Clock, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"

export default function AssessmentPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const assessmentId = searchParams.get("id") || ""
  const assessmentType = searchParams.get("type") || "practice"
  const assessmentCode = searchParams.get("code") || ""
  const isRetry = searchParams.get("retry") === "true"

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(assessmentType === "summative" ? 90 * 60 : 0) // 90 minutes for summative
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [isTabSwitchWarningOpen, setIsTabSwitchWarningOpen] = useState(false)
  const [tabSwitchCount, setTabSwitchCount] = useState(0)
  const [isPasteBlocked, setIsPasteBlocked] = useState(false)
  const [showPasteWarning, setShowPasteWarning] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [showStartDialog, setShowStartDialog] = useState(true)

  const timerRef = useRef(null)

  // Mock assessment data
  const assessment = {
    title:
      language === "fr"
        ? "Programmation Java - Interfaces et Classes Abstraites"
        : "Java Programming - Interfaces and Abstract Classes",
    professor: "Mr Abid",
    class: language === "fr" ? "3ème année" : "3rd year",
    questions: [
      {
        id: 1,
        text:
          language === "fr"
            ? "Quelle est la différence principale entre une interface et une classe abstraite en Java?"
            : "What is the main difference between an interface and an abstract class in Java?",
        type: "multiple-choice",
        options:
          language === "fr"
            ? [
                "Une interface peut avoir des méthodes implémentées, une classe abstraite non",
                "Une classe abstraite peut avoir des méthodes implémentées, une interface non",
                "Une interface peut être instanciée, une classe abstraite non",
                "Une classe abstraite peut hériter de plusieurs classes, une interface non",
              ]
            : [
                "An interface can have implemented methods, an abstract class cannot",
                "An abstract class can have implemented methods, an interface cannot",
                "An interface can be instantiated, an abstract class cannot",
                "An abstract class can inherit from multiple classes, an interface cannot",
              ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text:
          language === "fr"
            ? "Expliquez le concept de polymorphisme en programmation orientée objet et donnez un exemple concret en Java."
            : "Explain the concept of polymorphism in object-oriented programming and give a concrete example in Java.",
        type: "open-ended",
      },
      {
        id: 3,
        text:
          language === "fr"
            ? "Quelle(s) affirmation(s) est/sont vraie(s) concernant les interfaces en Java?"
            : "Which statement(s) is/are true regarding interfaces in Java?",
        type: "multiple-choice",
        options:
          language === "fr"
            ? [
                "Une classe peut implémenter plusieurs interfaces",
                "Les interfaces peuvent contenir des variables d'instance",
                "Les méthodes dans une interface sont implicitement publiques et abstraites",
                "Les interfaces peuvent hériter d'autres interfaces",
              ]
            : [
                "A class can implement multiple interfaces",
                "Interfaces can contain instance variables",
                "Methods in an interface are implicitly public and abstract",
                "Interfaces can inherit from other interfaces",
              ],
        correctAnswer: 0,
      },
      {
        id: 4,
        text:
          language === "fr"
            ? "Quand utiliseriez-vous une classe abstraite plutôt qu'une interface? Justifiez votre réponse avec un exemple."
            : "When would you use an abstract class rather than an interface? Justify your answer with an example.",
        type: "open-ended",
      },
      {
        id: 5,
        text:
          language === "fr"
            ? "Quel design pattern utilise des classes abstraites pour définir un squelette d'algorithme?"
            : "Which design pattern uses abstract classes to define an algorithm skeleton?",
        type: "multiple-choice",
        options: ["Factory Method", "Observer", "Template Method", "Strategy"],
        correctAnswer: 2,
      },
    ],
  }

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Start the assessment
  const handleStartAssessment = () => {
    setIsStarted(true)
    setShowStartDialog(false)

    // Start the timer for summative assessments
    if (assessmentType === "summative") {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Set initial time
      setTimeLeft(90 * 60) // 90 minutes

      // Start new timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            handleSubmitAssessment()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  // Handle timer cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Handle tab visibility for summative assessments
  useEffect(() => {
    if (isStarted && assessmentType === "summative") {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          setTabSwitchCount((prev) => prev + 1)
          setIsTabSwitchWarningOpen(true)
        }
      }

      document.addEventListener("visibilitychange", handleVisibilityChange)

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange)
      }
    }
  }, [assessmentType, isStarted])

  // Handle paste blocking for summative assessments
  useEffect(() => {
    if (isStarted && assessmentType === "summative") {
      const handlePaste = (e) => {
        e.preventDefault()
        setShowPasteWarning(true)
        setTimeout(() => setShowPasteWarning(false), 3000)
      }

      document.addEventListener("paste", handlePaste)

      return () => {
        document.removeEventListener("paste", handlePaste)
      }
    }
  }, [assessmentType, isStarted])

  // Handle answer change
  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value,
    })
  }

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Submit assessment
  const handleSubmitAssessment = () => {
    // In a real app, this would submit the answers to the server
    // For now, we'll redirect to the dashboard with a completed parameter
    router.push(`/student/dashboard?completed=${assessmentId}`)
  }

  // Calculate progress
  const progress = (Object.keys(answers).length / assessment.questions.length) * 100

  // If not started, show the start dialog
  if (!isStarted) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
        <header className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.history.back()}
                className="dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 dark:text-gray-300" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{assessment.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Prof. {assessment.professor} • {assessment.class}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 self-end md:self-auto">
              <Badge
                variant="outline"
                className={
                  assessmentType === "practice"
                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                }
              >
                {assessmentType === "practice" ? t("training_assessment") : t("summative_assessment")}
              </Badge>
            </div>
          </div>
        </header>

        <main className="flex-1 py-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">{t("assessment_details")}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {language === "fr" ? "Vérifiez les détails avant de commencer" : "Review details before starting"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("title")}</h3>
                    <p className="mt-1 text-gray-900 dark:text-white">{assessment.title}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("professor")}</h3>
                    <p className="mt-1 text-gray-900 dark:text-white">{assessment.professor}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("type")}</h3>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {assessmentType === "practice" ? t("training_assessment") : t("summative_assessment")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("number_of_questions")}</h3>
                    <p className="mt-1 text-gray-900 dark:text-white">{assessment.questions.length}</p>
                  </div>
                  {assessmentType === "summative" && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("time_limit")}</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">90 {t("minutes")}</p>
                    </div>
                  )}
                </div>

                {assessmentType === "summative" && (
                  <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertTitle className="text-amber-600 dark:text-amber-400">{t("active_restrictions")}</AlertTitle>
                    <AlertDescription className="text-amber-600 dark:text-amber-400">
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>{t("copy_paste_disabled_info")}</li>
                        <li>{t("back_navigation_limited")}</li>
                        <li>{t("tab_switching_monitored")}</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleStartAssessment}
                    className="w-full bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                  >
                    {t("start_assessment")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <header className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => (assessmentType === "summative" ? setIsLeaveDialogOpen(true) : window.history.back())}
              className="dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 dark:text-gray-300" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{assessment.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prof. {assessment.professor} • {assessment.class}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto">
            <Badge
              variant="outline"
              className={
                assessmentType === "practice"
                  ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
              }
            >
              {assessmentType === "practice" ? t("training_assessment") : t("summative_assessment")}
            </Badge>

            {assessmentType === "summative" && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 px-3 py-1 rounded-md border">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => setIsSubmitDialogOpen(true)}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            >
              {t("finish")}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {t("question")} {currentQuestion + 1} {t("of")} {assessment.questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {progress.toFixed(0)}% {t("completed")}
                  </span>
                  <Progress value={progress} className="w-24 h-2" />
                </div>
              </div>

              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-900 dark:text-white">
                    {assessment.questions[currentQuestion].text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {assessment.questions[currentQuestion].type === "multiple-choice" ? (
                    <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswerChange}>
                      {assessment.questions[currentQuestion].options?.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2 py-2">
                          <RadioGroupItem
                            value={i.toString()}
                            id={`option-${i}`}
                            className="border-gray-300 dark:border-gray-600 text-primary-blue"
                          />
                          <Label htmlFor={`option-${i}`} className="text-gray-800 dark:text-gray-200 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Textarea
                      placeholder={t("enter_answer_here")}
                      value={answers[currentQuestion] || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="min-h-[200px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                    />
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t("previous")}
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={currentQuestion === assessment.questions.length - 1}
                    className="bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                  >
                    {t("next")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-900 dark:text-white">{t("navigation")}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {t("assessment_progress")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {assessment.questions.map((_, i) => (
                      <Button
                        key={i}
                        variant={i === currentQuestion ? "default" : answers[i] ? "outline" : "ghost"}
                        className={`h-10 w-10 p-0 font-medium ${
                          i === currentQuestion
                            ? "bg-primary-blue text-white dark:bg-blue-600 dark:text-white"
                            : answers[i]
                              ? "border-primary-blue text-primary-blue dark:border-blue-500 dark:text-blue-400"
                              : "dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setCurrentQuestion(i)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    className="w-full bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                    onClick={() => setIsSubmitDialogOpen(true)}
                  >
                    <Save className="mr-2 h-4 w-4" /> {t("finish")}
                  </Button>
                </CardFooter>
              </Card>

              {assessmentType === "summative" && (
                <Alert className="mt-4 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-600 dark:text-amber-400">{t("active_restrictions")}</AlertTitle>
                  <AlertDescription className="text-amber-600 dark:text-amber-400">
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>{t("copy_paste_disabled_info")}</li>
                      <li>{t("back_navigation_limited")}</li>
                      <li>{t("tab_switching_monitored")}</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Submit confirmation dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">{t("finish_assessment_question")}</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {assessmentType === "summative" ? t("summative_submit_warning") : t("practice_submit_info")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-800 dark:text-gray-300">{t("questions_answered")}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Object.keys(answers).length}/{assessment.questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSubmitDialogOpen(false)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleSubmitAssessment}
              className="bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              {t("submit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leave warning dialog */}
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">{t("leave_assessment_question")}</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {t("leave_assessment_warning")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLeaveDialogOpen(false)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              {t("cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => window.history.back()}
              className="dark:bg-red-900 dark:hover:bg-red-800"
            >
              {t("leave_assessment")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tab switch warning */}
      <Dialog open={isTabSwitchWarningOpen} onOpenChange={setIsTabSwitchWarningOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">{t("tab_switch_detected")}</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {language === "fr"
                ? `Vous avez changé d'onglet ou de fenêtre ${tabSwitchCount} fois. Cette action est considérée comme une tentative de triche et est enregistrée.`
                : `You have switched tabs or windows ${tabSwitchCount} times. This action is considered cheating and is recorded.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsTabSwitchWarningOpen(false)}
              className="bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              {t("understand")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Paste blocked notification */}
      {showPasteWarning && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300 px-4 py-3 rounded shadow-lg z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{t("copy_paste_disabled")}</span>
          </div>
        </div>
      )}
    </div>
  )
}
