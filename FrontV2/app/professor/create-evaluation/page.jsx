"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, Clock, Eye, Plus, Save, Trash2, Upload } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CreateEvaluation() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const evaluationId = searchParams.get("id")
  const [activeTab, setActiveTab] = useState("basic")
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)

  // Form state
  const [evaluationData, setEvaluationData] = useState({
    title: evaluationId ? t("ai_project_evaluation") : "",
    description: evaluationId ? t("final_project_evaluation_description") : "",
    timeLimit: evaluationId ? "120" : "60",
    type: evaluationId ? "summative" : "formative",
    scheduledDate: evaluationId ? "2023-12-15" : "",
    scheduledTime: evaluationId ? "14:00" : "",
    deadlineDate: evaluationId ? "2023-12-22" : "",
    deadlineTime: evaluationId ? "23:59" : "",
    questions: evaluationId
      ? [
          {
            id: 1,
            type: "multiple-choice",
            text: t("neural_network_question"),
            options: [
              t("neural_network_option_1"),
              t("neural_network_option_2"),
              t("neural_network_option_3"),
              t("neural_network_option_4"),
            ],
            correctAnswer: 2,
            points: 5,
          },
          {
            id: 2,
            type: "short-answer",
            text: t("ml_algorithm_question"),
            expectedAnswer: t("ml_algorithm_answer"),
            points: 10,
          },
          {
            id: 3,
            type: "open-ended",
            text: t("ai_ethics_question"),
            points: 15,
          },
          {
            id: 4,
            type: "matching",
            text: t("matching_algorithms_question"),
            items: [
              { item: "K-means", match: t("clustering") },
              { item: "Linear Regression", match: t("regression") },
              { item: "Random Forest", match: t("classification") },
              { item: "PCA", match: t("dimensionality_reduction") },
            ],
            points: 8,
          },
        ]
      : [],
    settings: {
      shuffleQuestions: false,
      showOneByOne: true,
      preventBack: false,
      preventCopyPaste: true,
      showResults: true,
      passingScore: "60",
    },
  })

  const handleInputChange = (field, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveAsDraft = () => {
    // In a real app, this would save to a database as a draft
    alert(t("evaluation_saved_as_draft"))
    router.push("/professor/evaluations")
  }

  const handleSettingsChange = (field, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value,
      },
    }))
  }

  const addQuestion = (type) => {
    const newQuestion = {
      id: evaluationData.questions.length + 1,
      type,
      text: "",
      points: 5,
    }

    if (type === "multiple-choice") {
      newQuestion.options = ["", "", "", ""]
      newQuestion.correctAnswer = 0
    } else if (type === "short-answer") {
      newQuestion.expectedAnswer = ""
    } else if (type === "matching") {
      newQuestion.items = [
        { item: "", match: "" },
        { item: "", match: "" },
      ]
    }

    setEvaluationData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const removeQuestion = (id) => {
    setEvaluationData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
  }

  const updateQuestion = (id, field, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    }))
  }

  const updateQuestionOption = (questionId, optionIndex, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)),
            }
          : q,
      ),
    }))
  }

  const updateMatchingItem = (questionId, itemIndex, field, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              items: q.items.map((item, idx) => (idx === itemIndex ? { ...item, [field]: value } : item)),
            }
          : q,
      ),
    }))
  }

  const addMatchingItem = (questionId) => {
    setEvaluationData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              items: [...q.items, { item: "", match: "" }],
            }
          : q,
      ),
    }))
  }

  const removeMatchingItem = (questionId, itemIndex) => {
    setEvaluationData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              items: q.items.filter((_, idx) => idx !== itemIndex),
            }
          : q,
      ),
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    alert(t("evaluation_saved"))
    setShowSaveDialog(false)
    router.push("/professor/evaluations")
  }

  const handlePublish = () => {
    // In a real app, this would publish the evaluation
    alert(t("evaluation_published"))
    setShowPublishDialog(false)
    router.push("/professor/evaluations")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

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
                <h1 className="text-3xl font-bold tracking-tight">
                  {evaluationId ? t("edit_evaluation") : t("create_new_evaluation")}
                </h1>
                <p className="text-muted-foreground">
                  {evaluationId ? t("edit_evaluation_description") : t("create_evaluation_description")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setShowPreviewDialog(true)}>
                <Eye className="mr-2 h-4 w-4" /> {t("preview")}
              </Button>
              <Button variant="outline" onClick={() => handleSaveAsDraft()}>
                <Save className="mr-2 h-4 w-4" /> {t("save_as_draft")}
              </Button>
              <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
                <Save className="mr-2 h-4 w-4" /> {t("save")}
              </Button>
              <Button onClick={() => setShowPublishDialog(true)}>
                <Upload className="mr-2 h-4 w-4" /> {t("publish")}
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">{t("basic_information")}</TabsTrigger>
              <TabsTrigger value="questions">{t("questions")}</TabsTrigger>
              <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("evaluation_details")}</CardTitle>
                  <CardDescription>{t("basic_information_about_evaluation")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">{t("evaluation_title")}</Label>
                      <Input
                        id="title"
                        placeholder={t("evaluation_title_placeholder")}
                        value={evaluationData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">{t("description")}</Label>
                      <Textarea
                        id="description"
                        placeholder={t("evaluation_description_placeholder")}
                        value={evaluationData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <h3 className="font-medium">{t("deadline")}</h3>
                      <p className="text-sm text-muted-foreground">{t("specify_when_evaluation_is_due")}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="deadlineDate">{t("due_date")}</Label>
                          <Input
                            id="deadlineDate"
                            type="date"
                            value={evaluationData.deadlineDate || ""}
                            onChange={(e) => handleInputChange("deadlineDate", e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="deadlineTime">{t("due_time")}</Label>
                          <Input
                            id="deadlineTime"
                            type="time"
                            value={evaluationData.deadlineTime || ""}
                            onChange={(e) => handleInputChange("deadlineTime", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="scheduledDate">{t("scheduled_date")}</Label>
                        <Input
                          id="scheduledDate"
                          type="date"
                          value={evaluationData.scheduledDate || ""}
                          onChange={(e) => handleInputChange("scheduledDate", e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="scheduledTime">{t("scheduled_time")}</Label>
                        <Input
                          id="scheduledTime"
                          type="time"
                          value={evaluationData.scheduledTime || ""}
                          onChange={(e) => handleInputChange("scheduledTime", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="timeLimit">
                          {t("duration")} ({t("minutes")})
                        </Label>
                        <Input
                          id="timeLimit"
                          type="number"
                          min="1"
                          value={evaluationData.timeLimit}
                          onChange={(e) => handleInputChange("timeLimit", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="type">{t("evaluation_type")}</Label>
                        <Select value={evaluationData.type} onValueChange={(value) => handleInputChange("type", value)}>
                          <SelectTrigger id="type">
                            <SelectValue placeholder={t("select_evaluation_type")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="formative">{t("formative")}</SelectItem>
                            <SelectItem value="summative">{t("summative")}</SelectItem>
                            <SelectItem value="practice">{t("practice")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("questions")}</CardTitle>
                  <CardDescription>{t("add_edit_questions")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => addQuestion("multiple-choice")}>
                      <Plus className="mr-2 h-4 w-4" /> {t("multiple_choice")}
                    </Button>
                    <Button variant="outline" onClick={() => addQuestion("short-answer")}>
                      <Plus className="mr-2 h-4 w-4" /> {t("short_answer")}
                    </Button>
                    <Button variant="outline" onClick={() => addQuestion("open-ended")}>
                      <Plus className="mr-2 h-4 w-4" /> {t("open_ended")}
                    </Button>
                    <Button variant="outline" onClick={() => addQuestion("matching")}>
                      <Plus className="mr-2 h-4 w-4" /> {t("matching")}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {evaluationData.questions.map((question, index) => (
                      <Card key={question.id} className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>

                        <CardHeader>
                          <CardTitle className="text-base">
                            Question {index + 1}: {t(question.type)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor={`question-${question.id}-text`}>Question Text</Label>
                            <Textarea
                              id={`question-${question.id}-text`}
                              placeholder={t("enter_question_text")}
                              value={question.text}
                              onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                            />
                          </div>

                          {question.type === "multiple-choice" && (
                            <div className="space-y-4">
                              <Label>Options</Label>
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <RadioGroup
                                    value={question.correctAnswer.toString()}
                                    onValueChange={(value) =>
                                      updateQuestion(question.id, "correctAnswer", Number.parseInt(value))
                                    }
                                    className="flex-none"
                                  >
                                    <RadioGroupItem value={optIndex.toString()} id={`q${question.id}-opt${optIndex}`} />
                                  </RadioGroup>
                                  <Input
                                    placeholder={`${t("option")} ${optIndex + 1}`}
                                    value={option}
                                    onChange={(e) => updateQuestionOption(question.id, optIndex, e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {question.type === "short-answer" && (
                            <div className="grid gap-2">
                              <Label htmlFor={`question-${question.id}-answer`}>Expected Answer</Label>
                              <Input
                                id={`question-${question.id}-answer`}
                                placeholder={t("enter_expected_answer")}
                                value={question.expectedAnswer || ""}
                                onChange={(e) => updateQuestion(question.id, "expectedAnswer", e.target.value)}
                              />
                            </div>
                          )}

                          {question.type === "matching" && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label>{t("matching_items")}</Label>
                                <Button variant="outline" size="sm" onClick={() => addMatchingItem(question.id)}>
                                  <Plus className="h-3 w-3 mr-1" /> {t("add_item")}
                                </Button>
                              </div>
                              {question.items?.map((item, itemIndex) => (
                                <div key={itemIndex} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <div className="flex items-center gap-2">
                                    <Input
                                      placeholder={t("item")}
                                      value={item.item}
                                      onChange={(e) =>
                                        updateMatchingItem(question.id, itemIndex, "item", e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      placeholder={t("match")}
                                      value={item.match}
                                      onChange={(e) =>
                                        updateMatchingItem(question.id, itemIndex, "match", e.target.value)
                                      }
                                    />
                                    {question.items.length > 2 && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeMatchingItem(question.id, itemIndex)}
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="grid gap-2">
                            <Label htmlFor={`question-${question.id}-points`}>Points</Label>
                            <Input
                              id={`question-${question.id}-points`}
                              type="number"
                              min="1"
                              value={question.points}
                              onChange={(e) => updateQuestion(question.id, "points", e.target.value)}
                              className="w-24"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {evaluationData.questions.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>{t("no_questions_added")}</p>
                        <p className="text-sm">{t("click_buttons_to_add")}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("evaluation_settings")}</CardTitle>
                  <CardDescription>{t("configure_evaluation_behavior")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shuffle-questions">{t("shuffle_questions")}</Label>
                      <p className="text-sm text-muted-foreground">{t("shuffle_questions_description")}</p>
                    </div>
                    <Switch
                      id="shuffle-questions"
                      checked={evaluationData.settings.shuffleQuestions}
                      onCheckedChange={(checked) => handleSettingsChange("shuffleQuestions", checked)}
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-one-by-one">{t("show_one_by_one")}</Label>
                      <p className="text-sm text-muted-foreground">{t("show_one_by_one_description")}</p>
                    </div>
                    <Switch
                      id="show-one-by-one"
                      checked={evaluationData.settings.showOneByOne}
                      onCheckedChange={(checked) => handleSettingsChange("showOneByOne", checked)}
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="prevent-back">{t("prevent_back_navigation")}</Label>
                      <p className="text-sm text-muted-foreground">{t("prevent_back_navigation_description")}</p>
                    </div>
                    <Switch
                      id="prevent-back"
                      checked={evaluationData.settings.preventBack}
                      onCheckedChange={(checked) => handleSettingsChange("preventBack", checked)}
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="prevent-copy-paste">{t("prevent_copy_paste")}</Label>
                      <p className="text-sm text-muted-foreground">{t("prevent_copy_paste_description")}</p>
                    </div>
                    <Switch
                      id="prevent-copy-paste"
                      checked={evaluationData.settings.preventCopyPaste}
                      onCheckedChange={(checked) => handleSettingsChange("preventCopyPaste", checked)}
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-results">{t("show_results_after_completion")}</Label>
                      <p className="text-sm text-muted-foreground">{t("show_results_description")}</p>
                    </div>
                    <Switch
                      id="show-results"
                      checked={evaluationData.settings.showResults}
                      onCheckedChange={(checked) => handleSettingsChange("showResults", checked)}
                    />
                  </div>
                  <Separator />

                  <div className="grid gap-2">
                    <Label htmlFor="passing-score">{t("passing_score")} (%)</Label>
                    <Input
                      id="passing-score"
                      type="number"
                      min="0"
                      max="100"
                      value={evaluationData.settings.passingScore}
                      onChange={(e) => handleSettingsChange("passingScore", e.target.value)}
                      className="w-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("evaluation_preview")}</DialogTitle>
            <DialogDescription>{t("preview_description")}</DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">{evaluationData.title || t("untitled_evaluation")}</h2>
                <p className="text-muted-foreground">{evaluationData.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {evaluationData.timeLimit} {t("minutes")}
                  </span>
                </div>
                <div>
                  {t("total_questions")}: {evaluationData.questions.length}
                </div>
                <div>
                  {t("total_points")}:{" "}
                  {evaluationData.questions.reduce((sum, q) => sum + Number.parseInt(q.points || 0), 0)}
                </div>
              </div>

              <Separator />

              {evaluationData.questions.length > 0 ? (
                <div className="space-y-8">
                  {evaluationData.questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <div>
                        <h3 className="font-medium">
                          {t("question")} {index + 1} ({question.points} {t("points")})
                        </h3>
                        <p>{question.text || t("no_question_text")}</p>
                      </div>

                      {question.type === "multiple-choice" && (
                        <RadioGroup>
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={optIndex.toString()}
                                id={`preview-q${question.id}-opt${optIndex}`}
                                disabled
                              />
                              <Label htmlFor={`preview-q${question.id}-opt${optIndex}`}>
                                {option || `${t("option")} ${optIndex + 1}`}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      {question.type === "short-answer" && <Input placeholder={t("your_answer")} disabled />}

                      {question.type === "open-ended" && <Textarea placeholder={t("your_answer")} disabled />}

                      {question.type === "matching" && (
                        <div className="space-y-2">
                          {question.items?.map((item, itemIndex) => (
                            <div key={itemIndex} className="grid grid-cols-2 gap-4">
                              <div className="p-2 border rounded bg-muted">
                                {item.item || t("item") + " " + (itemIndex + 1)}
                              </div>
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("select_match")} />
                                </SelectTrigger>
                              </Select>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{t("no_questions_to_preview")}</p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreviewDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Evaluation</DialogTitle>
            <DialogDescription>{t("save_evaluation_description")}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>{t("save_as_draft_message")}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Evaluation</DialogTitle>
            <DialogDescription>{t("publish_evaluation_description")}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>{t("publish_confirmation_message")}</p>
            {evaluationData.questions.length === 0 && (
              <p className="text-destructive mt-2">{t("warning_no_questions")}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={evaluationData.questions.length === 0}>
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
