"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import DashboardHeader from "@/components/dashboard-header"
import { AlertCircle, Clock, Copy, FileImage, Grip, Plus, Save, Trash2, X, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"
import { downloadAssessmentData } from "@/utils/download-utils"

// Mock assessment data for editing
const mockAssessments = [
  {
    id: "1",
    title: "Java Programming Final Exam",
    description: "Final examination covering all Java programming concepts from the semester",
    class: "3a",
    subject: "prog",
    timeLimit: 60,
    autoCorrect: true,
    assessmentType: "sommative",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        text: "What is the time complexity of quicksort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        points: 2,
      },
      {
        id: "q2",
        type: "short-answer",
        text: "Define polymorphism in object-oriented programming.",
        answer: "The ability of an object to take on many forms",
        points: 3,
      },
      {
        id: "q3",
        type: "multiple-choice",
        text: "Which of the following is not a Java access modifier?",
        options: ["public", "private", "protected", "friend"],
        points: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Database Continuous Assessment",
    description: "Assessment covering SQL queries, database design, and normalization",
    class: "2a",
    subject: "db",
    timeLimit: 45,
    autoCorrect: true,
    assessmentType: "sommative",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        text: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        points: 2,
      },
      {
        id: "q2",
        type: "open-ended",
        text: "Design a database schema for a library management system. Include at least 4 tables and explain the relationships.",
        points: 5,
      },
    ],
  },
  {
    id: "3",
    title: "Artificial Intelligence Project",
    description: "Project proposal for implementing a machine learning algorithm",
    class: "4a",
    subject: "ai",
    timeLimit: 0, // No time limit for project
    autoCorrect: false,
    assessmentType: "entrainement",
    questions: [
      {
        id: "q1",
        type: "open-ended",
        text: "Describe your proposed machine learning project, including the problem statement, dataset, and methodology.",
        points: 10,
      },
    ],
  },
]

export default function CreateAssessment() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  // Get the assessment ID from the URL if it exists
  const assessmentId = searchParams.get("id")
  const isEditing = !!assessmentId

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [timeLimit, setTimeLimit] = useState(60)
  const [questions, setQuestions] = useState([
    {
      id: "q1",
      type: "multiple-choice",
      text: "",
      options: ["", "", "", ""],
      points: 2,
    },
  ])
  const [currentTab, setCurrentTab] = useState("basic")
  const [autoCorrect, setAutoCorrect] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedClass, setSelectedClass] = useState("3a")
  const [selectedSubject, setSelectedSubject] = useState("prog")
  const [deadlineDate, setDeadlineDate] = useState("")
  const [deadlineTime, setDeadlineTime] = useState("23:59")
  const [assessmentType, setAssessmentType] = useState("sommative")
  const [isLoading, setIsLoading] = useState(isEditing)

  // Load assessment data if editing
  useEffect(() => {
    if (isEditing && assessmentId) {
      setIsLoading(true)

      // In a real app, this would be an API call
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        const assessmentIndex = Number.parseInt(assessmentId) - 1
        if (assessmentIndex >= 0 && assessmentIndex < mockAssessments.length) {
          const assessment = mockAssessments[assessmentIndex]
          setTitle(assessment.title)
          setDescription(assessment.description)
          setTimeLimit(assessment.timeLimit)
          setQuestions(assessment.questions)
          setAutoCorrect(assessment.autoCorrect)
          setSelectedClass(assessment.class)
          setSelectedSubject(assessment.subject)
          setAssessmentType(assessment.assessmentType || "sommative")
          if (assessment.deadlineDate) {
            setDeadlineDate(assessment.deadlineDate)
          } else {
            // Set default deadline to 7 days from now
            const defaultDate = new Date()
            defaultDate.setDate(defaultDate.getDate() + 7)
            setDeadlineDate(defaultDate.toISOString().split("T")[0])
          }
          if (assessment.deadlineTime) {
            setDeadlineTime(assessment.deadlineTime)
          }
        }
        setIsLoading(false)
      }, 500) // Simulate API delay
    }
  }, [assessmentId, isEditing])

  const addQuestion = (type) => {
    const newQuestion = {
      id: `q${questions.length + 1}`,
      type,
      text: "",
      points: 1,
    }

    if (type === "multiple-choice") {
      newQuestion.options = ["", "", "", ""]
    } else if (type === "matching") {
      newQuestion.options = ["", "", "", ""]
    }

    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const updateOption = (questionId, index, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options]
          newOptions[index] = value
          return { ...q, options: newOptions }
        }
        return q
      }),
    )
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    const assessmentCode = Math.random().toString(36).substring(2, 8)

    if (isEditing) {
      alert(`${t("assessment_updated_success")}`)
    } else {
      alert(`${t("assessment_created_success")} ${t("access_code")}: #${assessmentCode}`)
    }

    router.push("/professor/assessments")
  }

  const handleDownload = () => {
    // Download the assessment data
    downloadAssessmentData(assessmentId || "new", "pdf")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader userType="professor" userName="Prof. Dupont" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">{t("loading_assessment")}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight dark:text-white">
                {isEditing ? t("edit_assessment") : t("create_assessment")}
              </h1>
              <p className="text-muted-foreground">{t("configure_assessment_add_questions")}</p>
            </div>
            <div className="flex gap-2">
              {isEditing && (
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> {t("download")}
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? t("edit") : t("preview")}
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> {t("save")}
              </Button>
            </div>
          </div>

          {!showPreview ? (
            <div className="grid gap-6 md:grid-cols-5">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{t("settings")}</CardTitle>
                  <CardDescription>{t("basic_assessment_settings")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t("assessment_title")}</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={t("assessment_title_placeholder")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t("description")}</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t("assessment_description_placeholder")}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assessment-type">{t("assessment_type")}</Label>
                    <Select value={assessmentType} onValueChange={setAssessmentType}>
                      <SelectTrigger id="assessment-type">
                        <SelectValue placeholder={t("select_assessment_type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sommative">{t("sommative_assessment")}</SelectItem>
                        <SelectItem value="entrainement">{t("training_assessment")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {assessmentType === "sommative"
                        ? t("sommative_assessment_description")
                        : t("training_assessment_description")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline-date">{t("deadline_date")}</Label>
                    <Input
                      id="deadline-date"
                      type="date"
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      disabled={assessmentType === "entrainement"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline-time">{t("deadline_time")}</Label>
                    <Input
                      id="deadline-time"
                      type="time"
                      value={deadlineTime}
                      onChange={(e) => setDeadlineTime(e.target.value)}
                      disabled={assessmentType === "entrainement"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time-limit">
                      {t("time_limit")} ({t("minutes")})
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="time-limit"
                        type="number"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Number.parseInt(e.target.value))}
                        min={0}
                        disabled={assessmentType === "entrainement"}
                      />
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {assessmentType === "entrainement" ? t("training_no_time_limit") : t("zero_for_no_time_limit")}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="auto-correct" checked={autoCorrect} onCheckedChange={setAutoCorrect} />
                    <Label htmlFor="auto-correct">{t("auto_correction")}</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("questions")}</CardTitle>
                    <CardDescription>{t("add_configure_questions")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs value={currentTab} onValueChange={setCurrentTab}>
                      <TabsList className="grid grid-cols-4">
                        <TabsTrigger value="basic">{t("questions")}</TabsTrigger>
                        <TabsTrigger value="add">{t("add")}</TabsTrigger>
                        <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
                        <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="basic" className="space-y-4 pt-4">
                        {questions.map((question, index) => (
                          <Card key={question.id} className="relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2"
                              onClick={() => removeQuestion(question.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>

                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-2">
                                <Grip className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-base">
                                  {t("question")} {index + 1}
                                </CardTitle>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor={`q-${question.id}-text`}>{t("question_text")}</Label>
                                <Textarea
                                  id={`q-${question.id}-text`}
                                  value={question.text}
                                  onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                                  placeholder={t("enter_question_text")}
                                />
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="w-1/2">
                                  <Label htmlFor={`q-${question.id}-type`}>{t("type")}</Label>
                                  <Select
                                    value={question.type}
                                    onValueChange={(value) => updateQuestion(question.id, "type", value)}
                                  >
                                    <SelectTrigger id={`q-${question.id}-type`}>
                                      <SelectValue placeholder={t("select")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="multiple-choice">{t("multiple_choice")}</SelectItem>
                                      <SelectItem value="short-answer">{t("short_answer")}</SelectItem>
                                      <SelectItem value="open-ended">{t("open_ended")}</SelectItem>
                                      <SelectItem value="matching">{t("matching")}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="w-1/2">
                                  <Label htmlFor={`q-${question.id}-points`}>{t("points")}</Label>
                                  <Input
                                    id={`q-${question.id}-points`}
                                    type="number"
                                    value={question.points}
                                    onChange={(e) =>
                                      updateQuestion(question.id, "points", Number.parseInt(e.target.value))
                                    }
                                    min={1}
                                  />
                                </div>
                              </div>

                              {question.type === "multiple-choice" && question.options && (
                                <div className="space-y-2">
                                  <Label>{t("options")}</Label>
                                  {question.options.map((option, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <Input
                                        value={option}
                                        onChange={(e) => updateOption(question.id, i, e.target.value)}
                                        placeholder={`${t("option")} ${i + 1}`}
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          const newOptions = [...question.options]
                                          newOptions.splice(i, 1)
                                          updateQuestion(question.id, "options", newOptions)
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      updateQuestion(question.id, "options", [...question.options, ""])
                                    }}
                                  >
                                    <Plus className="mr-2 h-4 w-4" /> {t("add_option")}
                                  </Button>
                                </div>
                              )}

                              {question.type === "short-answer" && (
                                <div className="space-y-2">
                                  <Label htmlFor={`q-${question.id}-answer`}>{t("correct_answer")}</Label>
                                  <Input
                                    id={`q-${question.id}-answer`}
                                    value={question.answer || ""}
                                    onChange={(e) => updateQuestion(question.id, "answer", e.target.value)}
                                    placeholder={t("expected_answer")}
                                  />
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <FileImage className="mr-2 h-4 w-4" /> {t("add_image")}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {questions.length === 0 && (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t("no_questions")}</AlertTitle>
                            <AlertDescription>{t("use_add_tab")}</AlertDescription>
                          </Alert>
                        )}
                      </TabsContent>

                      <TabsContent value="add" className="pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            className="h-24 flex flex-col items-center justify-center"
                            onClick={() => {
                              addQuestion("multiple-choice")
                              setCurrentTab("basic")
                            }}
                          >
                            <div className="text-2xl mb-2">🔘</div>
                            <span>{t("multiple_choice")}</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-24 flex flex-col items-center justify-center"
                            onClick={() => {
                              addQuestion("short-answer")
                              setCurrentTab("basic")
                            }}
                          >
                            <div className="text-2xl mb-2">📝</div>
                            <span>{t("short_answer")}</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-24 flex flex-col items-center justify-center"
                            onClick={() => {
                              addQuestion("open-ended")
                              setCurrentTab("basic")
                            }}
                          >
                            <div className="text-2xl mb-2">📄</div>
                            <span>{t("open_ended")}</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-24 flex flex-col items-center justify-center"
                            onClick={() => {
                              addQuestion("matching")
                              setCurrentTab("basic")
                            }}
                          >
                            <div className="text-2xl mb-2">🔗</div>
                            <span>{t("matching")}</span>
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="settings" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="shuffle" />
                            <Label htmlFor="shuffle">{t("shuffle_questions")}</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="one-by-one" />
                            <Label htmlFor="one-by-one">{t("one_question_at_a_time")}</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="prevent-back" />
                            <Label htmlFor="prevent-back">{t("prevent_going_back")}</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="prevent-copy" />
                            <Label htmlFor="prevent-copy">{t("prevent_copy_paste")}</Label>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="preview" className="pt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>{title || t("assessment_title")}</CardTitle>
                            <CardDescription>{description || t("assessment_description")}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {questions.map((question, index) => (
                                <div key={question.id} className="space-y-2">
                                  <h3 className="font-medium">
                                    {t("question")} {index + 1} ({question.points} pt{question.points > 1 ? "s" : ""})
                                  </h3>
                                  <p>{question.text || t("question_text")}</p>

                                  {question.type === "multiple-choice" && question.options && (
                                    <div className="space-y-2">
                                      {question.options.map((option, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                          <input
                                            type="radio"
                                            id={`preview-${question.id}-${i}`}
                                            name={`preview-${question.id}`}
                                          />
                                          <label htmlFor={`preview-${question.id}-${i}`}>
                                            {option || `${t("option")} ${i + 1}`}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {question.type === "short-answer" && <Input placeholder={t("your_answer")} />}

                                  {question.type === "open-ended" && (
                                    <Textarea placeholder={t("your_answer")} rows={3} />
                                  )}

                                  {question.type === "matching" && (
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="space-y-2">
                                        <p className="font-medium">{t("elements")}</p>
                                        {(question.options || [t("element_1"), t("element_2")]).map((item, i) => (
                                          <div key={i} className="p-2 border rounded-md">
                                            {item || `${t("element")} ${i + 1}`}
                                          </div>
                                        ))}
                                      </div>
                                      <div className="space-y-2">
                                        <p className="font-medium">{t("matches")}</p>
                                        {(question.options || [t("match_1"), t("match_2")]).map((item, i) => (
                                          <Select key={i}>
                                            <SelectTrigger>
                                              <SelectValue placeholder={t("select")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {(question.options || []).map((opt, j) => (
                                                <SelectItem key={j} value={`${j}`}>
                                                  {opt || `${t("element")} ${j + 1}`}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full">{t("submit")}</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.push("/professor/assessments")}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" /> {t("save")}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={() => setShowPreview(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardTitle>{title || t("assessment_title")}</CardTitle>
                <CardDescription>{description || t("assessment_description")}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {assessmentType === "sommative" ? (
                      timeLimit > 0 ? (
                        <>
                          {t("time_limit")}: {timeLimit} {t("minutes")}
                        </>
                      ) : (
                        <>{t("no_time_limit")}</>
                      )
                    ) : (
                      <>{t("training_assessment_no_time_limit")}</>
                    )}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          {t("question")} {index + 1}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {question.points} point{question.points > 1 ? "s" : ""}
                        </span>
                      </div>

                      <p className="text-base">{question.text || t("question_text")}</p>

                      {question.type === "multiple-choice" && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted/50 cursor-pointer"
                            >
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border">
                                <div className="h-2.5 w-2.5 rounded-full bg-primary-blue hidden"></div>
                              </div>
                              <span>{option || `${t("option")} ${i + 1}`}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "short-answer" && <Input placeholder={t("your_answer")} />}

                      {question.type === "open-ended" && <Textarea placeholder={t("your_answer")} rows={4} />}

                      {question.type === "matching" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="font-medium">{t("elements")}</p>
                            {(question.options || [t("element_1"), t("element_2")]).map((item, i) => (
                              <div key={i} className="p-3 border rounded-md bg-muted/50">
                                {item || `${t("element")} ${i + 1}`}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <p className="font-medium">{t("matches")}</p>
                            {(question.options || [t("match_1"), t("match_2")]).map((item, i) => (
                              <Select key={i}>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("select_match")} />
                                </SelectTrigger>
                                <SelectContent>
                                  {(question.options || []).map((opt, j) => (
                                    <SelectItem key={j} value={`${j}`}>
                                      {opt || `${t("element")} ${j + 1}`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t("access_code")}:</span>
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                    <span className="text-sm font-mono">#3re1oZ</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Button className="iga-gradient border-0">{t("submit")}</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
