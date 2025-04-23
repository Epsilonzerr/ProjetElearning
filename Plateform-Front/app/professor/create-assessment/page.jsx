"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import DashboardHeader from "@/components/dashboard-header"
import { AlertCircle, Clock, Copy, FileImage, Grip, Plus, Save, Trash2, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CreateAssessment() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [timeLimit, setTimeLimit] = useState(60)
  const [questions, setQuestions] = useState([
    {
      id: "q1",
      type: "multiple-choice",
      text: "Quelle est la complexité de l'algorithme de tri rapide (Quicksort) dans le cas moyen?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      points: 2,
    },
  ])
  const [currentTab, setCurrentTab] = useState("basic")
  const [autoCorrect, setAutoCorrect] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

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
    alert(`Évaluation créée avec succès! Code d'accès: #${assessmentCode}`)
    router.push("/professor/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Créer une évaluation</h1>
              <p className="text-muted-foreground">Configurez votre évaluation et ajoutez des questions.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? "Éditer" : "Aperçu"}
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </div>
          </div>

          {!showPreview ? (
            <div className="grid gap-6 md:grid-cols-5">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                  <CardDescription>Configurez les détails de base de votre évaluation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de l'évaluation</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Examen final de programmation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Instructions pour les étudiants..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Classe</Label>
                      <Select defaultValue="3a">
                        <SelectTrigger id="class">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1a">1ère année</SelectItem>
                          <SelectItem value="2a">2ème année</SelectItem>
                          <SelectItem value="3a">3ème année</SelectItem>
                          <SelectItem value="4a">4ème année</SelectItem>
                          <SelectItem value="5a">5ème année</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Matière</Label>
                      <Select defaultValue="prog">
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathématiques</SelectItem>
                          <SelectItem value="prog">Programmation</SelectItem>
                          <SelectItem value="db">Bases de données</SelectItem>
                          <SelectItem value="networks">Réseaux</SelectItem>
                          <SelectItem value="ai">Intelligence artificielle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time-limit">Temps limite (minutes)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="time-limit"
                        type="number"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Number.parseInt(e.target.value))}
                        min={1}
                      />
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="auto-correct" checked={autoCorrect} onCheckedChange={setAutoCorrect} />
                    <Label htmlFor="auto-correct">Correction automatique</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Questions</CardTitle>
                    <CardDescription>Ajoutez et configurez les questions de votre évaluation.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs value={currentTab} onValueChange={setCurrentTab}>
                      <TabsList className="grid grid-cols-4">
                        <TabsTrigger value="basic">Questions</TabsTrigger>
                        <TabsTrigger value="add">Ajouter</TabsTrigger>
                        <TabsTrigger value="settings">Paramètres</TabsTrigger>
                        <TabsTrigger value="preview">Aperçu</TabsTrigger>
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
                                <CardTitle className="text-base">Question {index + 1}</CardTitle>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor={`q-${question.id}-text`}>Texte de la question</Label>
                                <Textarea
                                  id={`q-${question.id}-text`}
                                  value={question.text}
                                  onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                                  placeholder="Saisissez votre question ici..."
                                />
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="w-1/2">
                                  <Label htmlFor={`q-${question.id}-type`}>Type</Label>
                                  <Select
                                    value={question.type}
                                    onValueChange={(value) => updateQuestion(question.id, "type", value)}
                                  >
                                    <SelectTrigger id={`q-${question.id}-type`}>
                                      <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="multiple-choice">Choix multiple</SelectItem>
                                      <SelectItem value="short-answer">Réponse courte</SelectItem>
                                      <SelectItem value="open-ended">Question ouverte</SelectItem>
                                      <SelectItem value="matching">Appariement</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="w-1/2">
                                  <Label htmlFor={`q-${question.id}-points`}>Points</Label>
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
                                  <Label>Options</Label>
                                  {question.options.map((option, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <Input
                                        value={option}
                                        onChange={(e) => updateOption(question.id, i, e.target.value)}
                                        placeholder={`Option ${i + 1}`}
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
                                    <Plus className="mr-2 h-4 w-4" /> Ajouter une option
                                  </Button>
                                </div>
                              )}

                              {question.type === "short-answer" && (
                                <div className="space-y-2">
                                  <Label htmlFor={`q-${question.id}-answer`}>Réponse correcte</Label>
                                  <Input
                                    id={`q-${question.id}-answer`}
                                    value={question.answer || ""}
                                    onChange={(e) => updateQuestion(question.id, "answer", e.target.value)}
                                    placeholder="Réponse attendue"
                                  />
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <FileImage className="mr-2 h-4 w-4" /> Ajouter une image
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {questions.length === 0 && (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Aucune question</AlertTitle>
                            <AlertDescription>
                              Utilisez l&apos;onglet &quot;Ajouter&quot; pour créer des questions.
                            </AlertDescription>
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
                            <span>Choix multiple</span>
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
                            <span>Réponse courte</span>
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
                            <span>Question ouverte</span>
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
                            <span>Appariement</span>
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="settings" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="shuffle" />
                            <Label htmlFor="shuffle">Mélanger les questions</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="one-by-one" />
                            <Label htmlFor="one-by-one">Afficher une question à la fois</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="prevent-back" />
                            <Label htmlFor="prevent-back">Empêcher le retour aux questions précédentes</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="prevent-copy" />
                            <Label htmlFor="prevent-copy">Empêcher le copier-coller</Label>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="preview" className="pt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>{title || "Titre de l'évaluation"}</CardTitle>
                            <CardDescription>{description || "Description de l'évaluation"}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {questions.map((question, index) => (
                                <div key={question.id} className="space-y-2">
                                  <h3 className="font-medium">
                                    Question {index + 1} ({question.points} pt{question.points > 1 ? "s" : ""})
                                  </h3>
                                  <p>{question.text || "Texte de la question"}</p>

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
                                            {option || `Option ${i + 1}`}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {question.type === "short-answer" && <Input placeholder="Votre réponse..." />}

                                  {question.type === "open-ended" && (
                                    <Textarea placeholder="Votre réponse..." rows={3} />
                                  )}

                                  {question.type === "matching" && (
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="space-y-2">
                                        <p className="font-medium">Éléments</p>
                                        {(question.options || ["Élément 1", "Élément 2"]).map((item, i) => (
                                          <div key={i} className="p-2 border rounded-md">
                                            {item || `Élément ${i + 1}`}
                                          </div>
                                        ))}
                                      </div>
                                      <div className="space-y-2">
                                        <p className="font-medium">Correspondances</p>
                                        {(question.options || ["Correspondance 1", "Correspondance 2"]).map(
                                          (item, i) => (
                                            <Select key={i}>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {(question.options || []).map((opt, j) => (
                                                  <SelectItem key={j} value={`${j}`}>
                                                    {opt || `Élément ${j + 1}`}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full">Soumettre</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.push("/professor/dashboard")}>
                      Annuler
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" /> Enregistrer
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
                <CardTitle>{title || "Titre de l'évaluation"}</CardTitle>
                <CardDescription>{description || "Description de l'évaluation"}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Temps limite: {timeLimit} minutes</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Question {index + 1}</h3>
                        <span className="text-sm text-muted-foreground">
                          {question.points} point{question.points > 1 ? "s" : ""}
                        </span>
                      </div>

                      <p className="text-base">{question.text || "Texte de la question"}</p>

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
                              <span>{option || `Option ${i + 1}`}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "short-answer" && <Input placeholder="Votre réponse..." />}

                      {question.type === "open-ended" && <Textarea placeholder="Votre réponse..." rows={4} />}

                      {question.type === "matching" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="font-medium">Éléments</p>
                            {(question.options || ["Élément 1", "Élément 2"]).map((item, i) => (
                              <div key={i} className="p-3 border rounded-md bg-muted/50">
                                {item || `Élément ${i + 1}`}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <p className="font-medium">Correspondances</p>
                            {(question.options || ["Correspondance 1", "Correspondance 2"]).map((item, i) => (
                              <Select key={i}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une correspondance" />
                                </SelectTrigger>
                                <SelectContent>
                                  {(question.options || []).map((opt, j) => (
                                    <SelectItem key={j} value={`${j}`}>
                                      {opt || `Élément ${j + 1}`}
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
                  <span className="text-sm font-medium">Code d'accès:</span>
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                    <span className="text-sm font-mono">#3re1oZ</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Button className="iga-gradient border-0">Soumettre</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

