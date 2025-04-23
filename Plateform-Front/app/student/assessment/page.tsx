"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowLeft, ArrowRight, Clock, Send } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Question {
  id: number
  text: string
  type: "multiple-choice" | "short-answer" | "open-ended" | "matching"
  options?: string[]
  points: number
}

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Mock assessment data
  const assessment = {
    title: "Programmation Java - Examen final",
    description:
      "Cet examen évalue vos connaissances en programmation Java. Vous avez 60 minutes pour compléter toutes les questions.",
    questions: [
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
    ] as Question[],
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleAnswer = (value: any) => {
    setAnswers({
      ...answers,
      [assessment.questions[currentQuestion].id]: value,
    })
  }

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowConfirmation(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit answers to the server
    router.push("/student/results")
  }

  const question = assessment.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with timer */}
      <header className="sticky top-0 z-30 w-full border-b bg-background shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-semibold">{assessment.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} sur {assessment.questions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={`font-mono ${timeLeft < 300 ? "text-destructive font-bold" : ""}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-1" />
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          {showConfirmation ? (
            <Card>
              <CardHeader>
                <CardTitle>Confirmer la soumission</CardTitle>
                <CardDescription>
                  Êtes-vous sûr de vouloir soumettre votre évaluation ? Vous ne pourrez plus modifier vos réponses après
                  la soumission.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Questions répondues:</span>
                    <span className="font-medium">
                      {Object.keys(answers).length} sur {assessment.questions.length}
                    </span>
                  </div>

                  {Object.keys(answers).length < assessment.questions.length && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>Attention: Vous n'avez pas répondu à toutes les questions.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                  Retour à l'évaluation
                </Button>
                <Button onClick={handleSubmit}>
                  <Send className="mr-2 h-4 w-4" /> Soumettre définitivement
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Question {currentQuestion + 1}</CardTitle>
                    <CardDescription>
                      {question.points} point{question.points > 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-lg">{question.text}</div>

                {question.type === "multiple-choice" && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-md border hover:bg-muted/50 cursor-pointer ${
                          answers[question.id] === i ? "border-primary-blue bg-primary-blue/5" : ""
                        }`}
                        onClick={() => handleAnswer(i)}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            answers[question.id] === i ? "border-primary-blue" : ""
                          }`}
                        >
                          {answers[question.id] === i && (
                            <div className="h-2.5 w-2.5 rounded-full bg-primary-blue"></div>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === "short-answer" && (
                  <div className="space-y-2">
                    <Label htmlFor="short-answer">Votre réponse</Label>
                    <Input
                      id="short-answer"
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Saisissez votre réponse..."
                    />
                  </div>
                )}

                {question.type === "open-ended" && (
                  <div className="space-y-2">
                    <Label htmlFor="open-answer">Votre réponse</Label>
                    <Textarea
                      id="open-answer"
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Saisissez votre réponse..."
                      rows={8}
                    />
                  </div>
                )}

                {question.type === "matching" && question.options && (
                  <div className="space-y-4">
                    {question.options.map((item, i) => (
                      <div key={i} className="grid grid-cols-2 gap-4 items-center">
                        <div className="p-3 border rounded-md bg-muted/50">{item}</div>
                        <Input
                          value={answers[question.id]?.[i] || ""}
                          onChange={(e) => {
                            const newMatching = { ...(answers[question.id] || {}) }
                            newMatching[i] = e.target.value
                            handleAnswer(newMatching)
                          }}
                          placeholder="Saisissez la définition..."
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
                </Button>
                <Button onClick={handleNext}>
                  {currentQuestion < assessment.questions.length - 1 ? (
                    <>
                      Suivant <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>Terminer</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

