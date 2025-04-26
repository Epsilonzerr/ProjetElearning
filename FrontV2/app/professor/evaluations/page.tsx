"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import {
  ArrowUpDown,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Edit,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfessorEvaluations() {
  const { t, language } = useLanguage()
  const [sortBy, setSortBy] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvaluation, setSelectedEvaluation] = useState(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showCopyCodeDialog, setShowCopyCodeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false)
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  // Add typeFilter state and filtering logic
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock evaluation data
  const evaluationsData = [
    {
      id: 1,
      title: t("java_programming_final_evaluation"),
      type: "summative",
      status: "active",
      dueDate: "2023-12-15",
      createdDate: "2023-11-20",
      students: "28/40",
      timeLimit: "90 min",
      questions: 15,
      maxScore: 100,
      code: "JAVA2023",
    },
    {
      id: 2,
      title: t("database_continuous_assessment"),
      type: "formative",
      status: "active",
      dueDate: "2023-12-10",
      createdDate: "2023-11-18",
      students: "22/35",
      timeLimit: "60 min",
      questions: 10,
      maxScore: 50,
      code: "DB2023",
    },
    {
      id: 3,
      title: t("algorithms_weekly_quiz"),
      type: "practice",
      status: "active",
      dueDate: "2023-12-05",
      createdDate: "2023-11-25",
      students: "15/40",
      timeLimit: "30 min",
      questions: 8,
      maxScore: 24,
      code: "ALGO2023",
    },
    {
      id: 4,
      title: t("ai_final_project"),
      type: "summative",
      status: "draft",
      dueDate: "",
      createdDate: "2023-11-22",
      students: "0/30",
      timeLimit: "120 min",
      questions: 5,
      maxScore: 100,
      code: "AI2023",
    },
    {
      id: 5,
      title: t("mathematics_midterm_exam"),
      type: "summative",
      status: "completed",
      dueDate: "2023-11-15",
      createdDate: "2023-10-30",
      students: "38/40",
      timeLimit: "120 min",
      questions: 12,
      maxScore: 60,
      code: "MATH2023",
    },
    {
      id: 6,
      title: t("networks_review_quiz"),
      type: "practice",
      status: "completed",
      dueDate: "2023-11-10",
      createdDate: "2023-10-25",
      students: "32/35",
      timeLimit: "45 min",
      questions: 20,
      maxScore: 40,
      code: "NET2023",
    },
  ]

  // Function to sort evaluations
  const sortEvaluations = (evaluations) => {
    const sortedEvaluations = [...evaluations]

    switch (sortBy) {
      case "recent":
        return sortedEvaluations.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
      case "oldest":
        return sortedEvaluations.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
      case "name-asc":
        return sortedEvaluations.sort((a, b) => a.title.localeCompare(b.title))
      case "name-desc":
        return sortedEvaluations.sort((a, b) => b.title.localeCompare(a.title))
      case "due-date":
        return sortedEvaluations.sort((a, b) => {
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        })
      default:
        return sortedEvaluations
    }
  }

  // Filter evaluations by search query
  const filterEvaluations = (evaluations) => {
    if (!searchQuery && typeFilter === "all") return evaluations

    return evaluations.filter((evaluation) => {
      const matchesSearch = !searchQuery || evaluation.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = typeFilter === "all" || evaluation.type === typeFilter
      return matchesSearch && matchesType
    })
  }

  const activeEvaluations = evaluationsData.filter((evaluation) => evaluation.status === "active")
  const draftEvaluations = evaluationsData.filter((evaluation) => evaluation.status === "draft")
  const completedEvaluations = evaluationsData.filter((evaluation) => evaluation.status === "completed")

  const sortedAllEvaluations = sortEvaluations(filterEvaluations(evaluationsData))
  const sortedActiveEvaluations = sortEvaluations(filterEvaluations(activeEvaluations))
  const sortedDraftEvaluations = sortEvaluations(filterEvaluations(draftEvaluations))
  const sortedCompletedEvaluations = sortEvaluations(filterEvaluations(completedEvaluations))

  // Format date based on language
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return language === "fr" ? date.toLocaleDateString("fr-FR") : date.toLocaleDateString("en-US")
  }

  // Get status badge
  const getStatusBadge = (status, type) => {
    if (status === "active") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("active")}</Badge>
    } else if (status === "draft") {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{t("draft")}</Badge>
    } else if (status === "completed") {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t("completed")}</Badge>
    }
    return null
  }

  // Get type badge
  const getTypeBadge = (type) => {
    if (type === "summative") {
      return (
        <Badge variant="outline" className="border-primary-blue text-primary-blue">
          {t("summative")}
        </Badge>
      )
    } else if (type === "formative") {
      return (
        <Badge variant="outline" className="border-secondary-turquoise text-secondary-turquoise">
          {t("formative")}
        </Badge>
      )
    } else if (type === "practice") {
      return (
        <Badge variant="outline" className="border-purple-500 text-purple-500">
          {t("practice")}
        </Badge>
      )
    }
    return null
  }

  const handleEdit = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setShowEditDialog(true)
  }

  const handleViewDetails = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setShowDetailsDialog(true)
  }

  const handleCopyCode = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setShowCopyCodeDialog(true)
  }

  const handleDelete = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setShowDeleteDialog(true)
  }

  const handleContinueEditing = (evaluation) => {
    // In a real app, this would navigate to the edit page
    window.location.href = `/professor/create-evaluation?id=${evaluation.id}`
  }

  const handlePublish = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setShowPublishDialog(true)
  }

  const handleDownload = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setShowDownloadDialog(true)
  }

  const handleViewAnalysis = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setShowAnalysisDialog(true)
  }

  const confirmEdit = () => {
    // In a real app, this would save the changes
    alert(t("editing_evaluation", { title: currentEvaluation.title }))
    setShowEditDialog(false)
  }

  const confirmViewDetails = () => {
    // In a real app, this would navigate to the details page
    window.location.href = `/professor/evaluation/${currentEvaluation.id}`
    setShowDetailsDialog(false)
  }

  const confirmCopyCode = () => {
    // In a real app, this would copy the code to clipboard
    navigator.clipboard.writeText(currentEvaluation.code)
    alert(t("code_copied_to_clipboard", { code: currentEvaluation.code }))
    setShowCopyCodeDialog(false)
  }

  const confirmDelete = () => {
    // In a real app, this would delete the evaluation
    alert(t("deleting_evaluation", { title: currentEvaluation.title }))
    setShowDeleteDialog(false)
  }

  const confirmPublish = () => {
    // In a real app, this would publish the evaluation
    alert(t("publishing_evaluation", { title: currentEvaluation.title }))
    setShowPublishDialog(false)
  }

  const confirmDownload = () => {
    // In a real app, this would download the evaluation
    alert(t("downloading_evaluation", { title: currentEvaluation.title }))
    setShowDownloadDialog(false)
  }

  const confirmViewAnalysis = () => {
    // In a real app, this would navigate to the analysis page
    window.location.href = `/professor/results?id=${currentEvaluation.id}`
    setShowAnalysisDialog(false)
  }

  // Direct navigation to create evaluation page
  const handleCreateEvaluation = () => {
    window.location.href = "https://fegezk0ws5i6moc46.lite.vusercontent.net/professor/create-evaluation"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" showSearch={false} />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("my_evaluations")}</h1>
              <p className="text-muted-foreground">{t("manage_assessments")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("search")}
                  className="pl-8 w-full md:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-[180px]">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    {sortBy === "recent" && t("sort_recent")}
                    {sortBy === "oldest" && t("sort_oldest")}
                    {sortBy === "name-asc" && t("sort_name_asc")}
                    {sortBy === "name-desc" && t("sort_name_desc")}
                    {sortBy === "due-date" && t("sort_due_date")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="recent">{t("sort_recent")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">{t("sort_oldest")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name-asc">{t("sort_name_asc")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name-desc">{t("sort_name_desc")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="due-date">{t("sort_due_date")}</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={handleCreateEvaluation}>
                <Plus className="mr-2 h-4 w-4" /> {t("create_evaluation")}
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("active_assessments")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeEvaluations.length}</div>
                <p className="text-xs text-muted-foreground">{t("active_assessments_change_text")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("assessed_students")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">{t("students_change_text")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("average_score")}</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.2/20</div>
                <p className="text-xs text-muted-foreground">{t("score_change_text")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("next_deadline")}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2j 4h</div>
                <p className="text-xs text-muted-foreground">{t("math_exam_text")}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">{t("all")}</TabsTrigger>
              <TabsTrigger value="active">{t("active")}</TabsTrigger>
              <TabsTrigger value="draft">{t("draft")}</TabsTrigger>
              <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
            </TabsList>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium">{t("filter_by_type")}:</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("select_type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all_types")}</SelectItem>
                    <SelectItem value="summative">{t("summative")}</SelectItem>
                    <SelectItem value="formative">{t("formative")}</SelectItem>
                    <SelectItem value="practice">{t("practice")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedAllEvaluations.map((evaluation) => (
                  <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{evaluation.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            {getStatusBadge(evaluation.status, evaluation.type)}
                            {getTypeBadge(evaluation.type)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">{t("menu")}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(evaluation)}>
                              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDetails(evaluation)}>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            {evaluation.status === "active" && (
                              <DropdownMenuItem onClick={() => handleCopyCode(evaluation)}>
                                <Copy className="mr-2 h-4 w-4" /> {t("copy_code")}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(evaluation)}>
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {t("created")}: {formatDate(evaluation.createdDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{evaluation.timeLimit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {evaluation.questions} {t("questions")}
                            </span>
                          </div>
                        </div>

                        {evaluation.status === "active" && (
                          <>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>{t("participants")}</span>
                              <span className="font-medium">{evaluation.students}</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-secondary-turquoise"
                                style={{
                                  width: `${
                                    (Number(evaluation.students.split("/")[0]) /
                                      Number(evaluation.students.split("/")[1])) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            {evaluation.dueDate && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {t("due")}: {formatDate(evaluation.dueDate)}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {evaluation.status === "draft" && (
                          <div className="flex items-center gap-2 py-2">
                            <span className="text-sm text-muted-foreground">{t("not_published")}</span>
                          </div>
                        )}

                        {evaluation.status === "completed" && (
                          <>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>{t("participation")}</span>
                              <span className="font-medium">{evaluation.students}</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-blue"
                                style={{
                                  width: `${
                                    (Number(evaluation.students.split("/")[0]) /
                                      Number(evaluation.students.split("/")[1])) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <span>
                                {t("completed_on")}: {formatDate(evaluation.dueDate)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        {evaluation.status === "active" && (
                          <>
                            <Button variant="outline" className="flex-1" onClick={() => handleViewDetails(evaluation)}>
                              {t("view_details")}
                            </Button>
                            <Button className="flex-1" onClick={() => handleViewDetails(evaluation)}>
                              {t("view_details")}
                            </Button>
                          </>
                        )}

                        {evaluation.status === "draft" && (
                          <>
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleContinueEditing(evaluation)}
                            >
                              {t("continue_editing")}
                            </Button>
                            <Button className="flex-1" onClick={() => handlePublish(evaluation)}>
                              {t("publish")}
                            </Button>
                          </>
                        )}

                        {evaluation.status === "completed" && (
                          <>
                            <Button variant="outline" className="flex-1" onClick={() => handleDownload(evaluation)}>
                              {t("download")}
                            </Button>
                            <Button className="flex-1" onClick={() => handleViewDetails(evaluation)}>
                              {t("view_details")}
                            </Button>
                          </>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedActiveEvaluations.map((evaluation) => (
                  <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{evaluation.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            {getStatusBadge(evaluation.status, evaluation.type)}
                            {getTypeBadge(evaluation.type)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">{t("menu")}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(evaluation)}>
                              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDetails(evaluation)}>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyCode(evaluation)}>
                              <Copy className="mr-2 h-4 w-4" /> {t("copy_code")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(evaluation)}>
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {t("created")}: {formatDate(evaluation.createdDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{evaluation.timeLimit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {evaluation.questions} {t("questions")}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{t("participants")}</span>
                          <span className="font-medium">{evaluation.students}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary-turquoise"
                            style={{
                              width: `${
                                (Number(evaluation.students.split("/")[0]) /
                                  Number(evaluation.students.split("/")[1])) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        {evaluation.dueDate && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {t("due")}: {formatDate(evaluation.dueDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1" onClick={() => handleViewDetails(evaluation)}>
                          {t("view_details")}
                        </Button>
                        <Button className="flex-1" onClick={() => handleViewDetails(evaluation)}>
                          {t("view_details")}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedDraftEvaluations.map((evaluation) => (
                  <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{evaluation.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            {getStatusBadge(evaluation.status, evaluation.type)}
                            {getTypeBadge(evaluation.type)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">{t("menu")}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(evaluation)}>
                              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDetails(evaluation)}>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(evaluation)}>
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {t("created")}: {formatDate(evaluation.createdDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{evaluation.timeLimit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {evaluation.questions} {t("questions")}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 py-2">
                          <span className="text-sm text-muted-foreground">{t("not_published")}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1" onClick={() => handleContinueEditing(evaluation)}>
                          {t("continue_editing")}
                        </Button>
                        <Button className="flex-1" onClick={() => handlePublish(evaluation)}>
                          {t("publish")}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedCompletedEvaluations.map((evaluation) => (
                  <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{evaluation.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            {getStatusBadge(evaluation.status, evaluation.type)}
                            {getTypeBadge(evaluation.type)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">{t("menu")}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewDetails(evaluation)}>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(evaluation)}>
                              <FileText className="mr-2 h-4 w-4" /> {t("download")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(evaluation)}>
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {t("created")}: {formatDate(evaluation.createdDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{evaluation.timeLimit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {evaluation.questions} {t("questions")}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{t("participation")}</span>
                          <span className="font-medium">{evaluation.students}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-blue"
                            style={{
                              width: `${
                                (Number(evaluation.students.split("/")[0]) /
                                  Number(evaluation.students.split("/")[1])) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>
                            {t("completed_on")}: {formatDate(evaluation.dueDate)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1" onClick={() => handleDownload(evaluation)}>
                          {t("download")}
                        </Button>
                        <Button className="flex-1" onClick={() => handleViewDetails(evaluation)}>
                          {t("view_details")}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Edit Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("edit_evaluation")}</DialogTitle>
                  <DialogDescription>{t("edit_evaluation_description")}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {currentEvaluation && (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-title">{t("title")}</Label>
                        <Input id="edit-title" defaultValue={currentEvaluation.title} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-type">{t("evaluation_type")}</Label>
                        <Select defaultValue={currentEvaluation.type}>
                          <SelectTrigger id="edit-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="summative">{t("summative")}</SelectItem>
                            <SelectItem value="formative">{t("formative")}</SelectItem>
                            <SelectItem value="practice">{t("practice")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-time-limit">{t("time_limit")}</Label>
                          <Input
                            id="edit-time-limit"
                            type="text"
                            defaultValue={currentEvaluation.timeLimit.replace(" min", "")}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-due-date">{t("due_date")}</Label>
                          <Input id="edit-due-date" type="date" defaultValue={currentEvaluation.dueDate} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={confirmEdit}>{t("save_changes")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* View Details Dialog */}
            <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("evaluation_details")}</DialogTitle>
                  <DialogDescription>{t("view_evaluation_details")}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {currentEvaluation && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">{t("title")}</h3>
                        <p>{currentEvaluation.title}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{t("type")}</h3>
                        <p>{t(currentEvaluation.type)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{t("status")}</h3>
                        <p>{t(currentEvaluation.status)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{t("time_limit")}</h3>
                        <p>{currentEvaluation.timeLimit}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{t("questions")}</h3>
                        <p>{currentEvaluation.questions}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{t("access_code")}</h3>
                        <p>{currentEvaluation.code}</p>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={confirmViewDetails}>{t("view_full_details")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Copy Code Dialog */}
            <Dialog open={showCopyCodeDialog} onOpenChange={setShowCopyCodeDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("copy_access_code")}</DialogTitle>
                  <DialogDescription>{t("copy_code_to_clipboard")}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {currentEvaluation && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <code className="font-mono">{currentEvaluation.code}</code>
                      <Button variant="outline" size="sm" onClick={confirmCopyCode}>
                        <Copy className="h-4 w-4 mr-2" /> {t("copy")}
                      </Button>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={() => setShowCopyCodeDialog(false)}>{t("close")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("delete_evaluation")}</DialogTitle>
                  <DialogDescription>{t("delete_evaluation_confirmation")}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {currentEvaluation && (
                    <p className="text-destructive">
                      {t("delete_evaluation_warning", { title: currentEvaluation.title })}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    {t("cancel")}
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    {t("delete")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Publish Dialog */}
            <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("publish_evaluation")}</DialogTitle>
                  <DialogDescription>{t("publish_evaluation_confirmation")}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {currentEvaluation && (
                    <p>{t("publish_evaluation_description", { title: currentEvaluation.title })}</p>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={confirmPublish}>{t("publish")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Download Dialog */}
            <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("download_evaluation")}</DialogTitle>
                  <DialogDescription>{t("download_evaluation_confirmation")}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {currentEvaluation && (
                    <p>{t("download_evaluation_description", { title: currentEvaluation.title })}</p>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={confirmDownload}>{t("download")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* View Analysis Dialog */}
            <Dialog open={showAnalysisDialog} onOpenChange={setShowAnalysisDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("view_analysis")}</DialogTitle>
                  <DialogDescription>{t("view_analysis_confirmation")}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {currentEvaluation && <p>{t("view_analysis_description", { title: currentEvaluation.title })}</p>}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAnalysisDialog(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={confirmViewAnalysis}>{t("view_analysis")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
