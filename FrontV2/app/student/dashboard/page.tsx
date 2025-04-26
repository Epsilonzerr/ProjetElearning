"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowRight, ArrowUpDown, Clock, FileText, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function StudentDashboard() {
  const { t, language } = useLanguage()
  const [sortBy, setSortBy] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false)
  const [assessmentCode, setAssessmentCode] = useState("")
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [codeError, setCodeError] = useState("")
  const [typeFilter, setTypeFilter] = useState("all") // "all", "summative", "practice"

  // State for active and completed assessments
  const [activeAssessments, setActiveAssessments] = useState([
    {
      id: "java-final-2023",
      title: "Programmation Java - Examen final",
      titleEn: "Java Programming - Final Exam",
      class: "3ème année",
      classEn: "3rd year",
      type: "Examen",
      typeEn: "Exam",
      assessmentType: "summative",
      date: "15/03/2023",
      time: "14:00 - 16:00",
      duration: "2 heures",
      durationEn: "2 hours",
      questions: 25,
      status: "active",
      code: "JAVA2023",
    },
    {
      id: "db-test-2023",
      title: "Bases de données - Contrôle continu",
      titleEn: "Databases - Continuous Assessment",
      class: "3ème année",
      classEn: "3rd year",
      type: "Contrôle",
      typeEn: "Test",
      assessmentType: "summative",
      date: "16/03/2023",
      time: "10:00 - 11:30",
      duration: "1 heure 30",
      durationEn: "1 hour 30",
      questions: 15,
      status: "active",
      code: "DB2023",
    },
    {
      id: "algo-practice-2023",
      title: "Algorithmique - Entraînement",
      titleEn: "Algorithms - Practice",
      class: "3ème année",
      classEn: "3rd year",
      type: "Entraînement",
      typeEn: "Practice",
      assessmentType: "practice",
      date: "14/03/2023",
      time: "Disponible",
      duration: "Non limité",
      durationEn: "Unlimited",
      questions: 20,
      status: "active",
      code: "ALGO2023",
    },
    {
      id: "web-practice-2023",
      title: "Développement Web - Entraînement",
      titleEn: "Web Development - Practice",
      class: "3ème année",
      classEn: "3rd year",
      type: "Entraînement",
      typeEn: "Practice",
      assessmentType: "practice",
      date: "13/03/2023",
      time: "Disponible",
      duration: "Non limité",
      durationEn: "Unlimited",
      questions: 15,
      status: "active",
      code: "WEB2023", // Added code for all practice evaluations
    },
  ])

  const [completedAssessments, setCompletedAssessments] = useState([
    {
      id: "math-midterm-2023",
      title: "Mathématiques - Examen partiel",
      titleEn: "Mathematics - Midterm Exam",
      class: "3ème année",
      classEn: "3rd year",
      type: "Examen",
      typeEn: "Exam",
      assessmentType: "summative",
      date: "01/03/2023",
      score: "16/20",
      questions: "18/20",
      status: "completed",
    },
    {
      id: "algo-final-2023",
      title: "Algorithmique - Examen final",
      titleEn: "Algorithms - Final Exam",
      class: "3ème année",
      classEn: "3rd year",
      type: "Examen",
      typeEn: "Exam",
      assessmentType: "summative",
      date: "28/02/2023",
      score: "14/20",
      questions: "14/20",
      status: "completed",
    },
    {
      id: "java-practice-2023",
      title: "Java - Entraînement",
      titleEn: "Java - Practice",
      class: "3ème année",
      classEn: "3rd year",
      type: "Entraînement",
      typeEn: "Practice",
      assessmentType: "practice",
      date: "25/02/2023",
      score: "18/20",
      questions: "19/20",
      status: "completed",
    },
  ])

  // Check for completed assessment in URL params
  useEffect(() => {
    // Simulate completing an assessment when returning from assessment page
    const urlParams = new URLSearchParams(window.location.search)
    const completedId = urlParams.get("completed")

    if (completedId) {
      // Find the assessment in active assessments
      const assessmentToMove = activeAssessments.find((a) => a.id === completedId)

      if (assessmentToMove) {
        // Remove from active assessments
        setActiveAssessments((prev) => prev.filter((a) => a.id !== completedId))

        // Add to completed assessments with a score
        const completedAssessment = {
          ...assessmentToMove,
          status: "completed",
          score: "15/20", // Mock score
          questions: "15/20", // Mock correct questions
        }

        setCompletedAssessments((prev) => [completedAssessment, ...prev])

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  }, [activeAssessments])

  // Function to sort assessments
  const sortAssessments = (assessments) => {
    const sortedAssessments = [...assessments]

    switch (sortBy) {
      case "recent":
        // Sort by date (most recent first)
        return sortedAssessments.sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"))
          const dateB = new Date(b.date.split("/").reverse().join("-"))
          return dateB - dateA
        })
      case "oldest":
        // Sort by date (oldest first)
        return sortedAssessments.sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"))
          const dateB = new Date(b.date.split("/").reverse().join("-"))
          return dateA - dateB
        })
      case "title-asc":
        // Sort by title (A-Z)
        return sortedAssessments.sort((a, b) => {
          const titleA = language === "en" ? a.titleEn || a.title : a.title
          const titleB = language === "en" ? b.titleEn || b.title : b.title
          return titleA.localeCompare(titleB)
        })
      case "title-desc":
        // Sort by title (Z-A)
        return sortedAssessments.sort((a, b) => {
          const titleA = language === "en" ? a.titleEn || a.title : a.title
          const titleB = language === "en" ? b.titleEn || b.title : b.title
          return titleB.localeCompare(titleA)
        })
      default:
        return sortedAssessments
    }
  }

  // Filter assessments by search query and type
  const filterAssessments = (assessments) => {
    let filtered = assessments

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((assessment) => {
        const title = language === "en" ? assessment.titleEn || assessment.title : assessment.title
        return title.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((assessment) => assessment.assessmentType === typeFilter)
    }

    return filtered
  }

  // Get sorted and filtered assessments
  const filteredActiveAssessments = filterAssessments(sortAssessments(activeAssessments))
  const filteredCompletedAssessments = filterAssessments(sortAssessments(completedAssessments))

  const handleStartAssessment = (assessment) => {
    // Always require a code for active assessments
    setSelectedAssessment(assessment)
    setIsCodeDialogOpen(true)
    setAssessmentCode("")
    setCodeError("")
  }

  const handleCodeSubmit = () => {
    // Verify the code
    if (!assessmentCode) {
      setCodeError(t("please_enter_code"))
      return
    }

    if (selectedAssessment && selectedAssessment.code && assessmentCode !== selectedAssessment.code) {
      setCodeError(t("invalid_code"))
      return
    }

    // Close dialog and redirect to assessment
    setIsCodeDialogOpen(false)

    // Simulate completing the assessment by adding a completed parameter
    // In a real app, this would be handled after the user completes the assessment
    window.location.href = `/student/assessment?id=${selectedAssessment.id}&type=${selectedAssessment.assessmentType}&code=${assessmentCode}`
  }

  // Function to get the badge color based on assessment type
  const getAssessmentTypeBadge = (assessmentType) => {
    if (assessmentType === "summative") {
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
        >
          {language === "en" ? "Summative" : "Sommatif"}
        </Badge>
      )
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
        >
          {language === "en" ? "Training" : "Entraînement"}
        </Badge>
      )
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Jean Dupont" showSearch={false} />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
              <p className="text-muted-foreground">
                {t("welcome")} {t("student_dashboard")}
              </p>
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
                    {sortBy === "title-asc" && t("sort_title_asc")}
                    {sortBy === "title-desc" && t("sort_title_desc")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="recent">{t("sort_recent")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">{t("sort_oldest")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="title-asc">{t("sort_title_asc")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="title-desc">{t("sort_title_desc")}</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button asChild className="bg-[#0f172a] hover:bg-[#1e293b] text-white">
                <Link href="/student/join-assessment">{t("join_assessment")}</Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">{t("active")}</TabsTrigger>
              <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-lg font-medium">{t("active_assessments")}</h2>

                <ToggleGroup type="single" value={typeFilter} onValueChange={(value) => value && setTypeFilter(value)}>
                  <ToggleGroupItem value="all" aria-label="Toggle all">
                    {t("all")}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="summative" aria-label="Toggle summative">
                    {language === "en" ? "Summative" : "Sommatif"}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="practice" aria-label="Toggle practice">
                    {language === "en" ? "Training" : "Entraînement"}
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {filteredActiveAssessments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t("no_assessments_found")}</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredActiveAssessments.map((assessment, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow dark:border-gray-700">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">
                            {language === "en" ? assessment.titleEn || assessment.title : assessment.title}
                          </CardTitle>
                          {getAssessmentTypeBadge(assessment.assessmentType)}
                        </div>
                        <CardDescription>
                          {language === "en" ? assessment.classEn : assessment.class} •{" "}
                          {language === "en" ? assessment.typeEn : assessment.type}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {assessment.date} • {assessment.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {assessment.questions} {t("questions")} •{" "}
                              {language === "en" ? assessment.durationEn : assessment.duration}
                            </span>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">{t("code")}: </span>
                            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{assessment.code}</code>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleStartAssessment(assessment)}>
                          {t("start")} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-lg font-medium">{t("completed_assessments")}</h2>

                <ToggleGroup type="single" value={typeFilter} onValueChange={(value) => value && setTypeFilter(value)}>
                  <ToggleGroupItem value="all" aria-label="Toggle all">
                    {t("all")}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="summative" aria-label="Toggle summative">
                    {language === "en" ? "Summative" : "Sommatif"}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="practice" aria-label="Toggle practice">
                    {language === "en" ? "Training" : "Entraînement"}
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {filteredCompletedAssessments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t("no_assessments_found")}</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCompletedAssessments.map((assessment, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow dark:border-gray-700">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">
                            {language === "en" ? assessment.titleEn || assessment.title : assessment.title}
                          </CardTitle>
                          {getAssessmentTypeBadge(assessment.assessmentType)}
                        </div>
                        <CardDescription>
                          {language === "en" ? assessment.classEn : assessment.class} •{" "}
                          {language === "en" ? assessment.typeEn : assessment.type}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>{t("score")}</span>
                            <span className="font-medium">{assessment.score}</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-blue"
                              style={{
                                width: `${(Number(assessment.score.split("/")[0]) / Number(assessment.score.split("/")[1])) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                            <FileText className="h-4 w-4" />
                            <span>
                              {t("correct_questions")}: {assessment.questions} • {assessment.date}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className={assessment.assessmentType === "practice" ? "grid grid-cols-2 gap-2" : ""}>
                        <Button
                          variant="outline"
                          className={assessment.assessmentType === "practice" ? "" : "w-full"}
                          asChild
                        >
                          <Link href={`/student/results?id=${assessment.id}`}>{t("view_results")}</Link>
                        </Button>

                        {assessment.assessmentType === "practice" && (
                          <Button asChild>
                            <Link
                              href={`/student/assessment?id=${assessment.id}&type=practice&retry=true`}
                              className="flex items-center"
                            >
                              <RefreshCw className="mr-2 h-4 w-4" /> {t("retry")}
                            </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Assessment Code Dialog */}
      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("enter_assessment_code")}</DialogTitle>
            <DialogDescription>
              {selectedAssessment?.assessmentType === "summative"
                ? t("enter_code_to_start_summative")
                : t("enter_code_to_start_practice")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">{t("assessment_code")}</Label>
              <Input
                id="code"
                placeholder={t("enter_code")}
                value={assessmentCode}
                onChange={(e) => {
                  setAssessmentCode(e.target.value)
                  setCodeError("")
                }}
                className="text-center text-lg tracking-wider"
              />
              {codeError && <p className="text-sm text-red-500">{codeError}</p>}
            </div>

            <div className="text-sm text-muted-foreground">{t("code_provided_by_professor")}</div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsCodeDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" onClick={handleCodeSubmit}>
              {t("start_assessment")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
