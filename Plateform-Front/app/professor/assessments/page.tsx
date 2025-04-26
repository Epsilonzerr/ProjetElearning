"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import { Clock, Copy, Edit, FileText, MoreHorizontal, Plus, Search, Trash2, ArrowUpDown } from "lucide-react"
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

export default function ProfessorAssessments() {
  const { t } = useLanguage()
  const [sortBy, setSortBy] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")

  // Function to sort assessments
  const sortAssessments = (assessments) => {
    const sortedAssessments = [...assessments]

    switch (sortBy) {
      case "recent":
        // Sort by created date (most recent first)
        return sortedAssessments.sort((a, b) => {
          const dateA = new Date(a.created.split("/").reverse().join("-"))
          const dateB = new Date(b.created.split("/").reverse().join("-"))
          return dateB - dateA
        })
      case "oldest":
        // Sort by created date (oldest first)
        return sortedAssessments.sort((a, b) => {
          const dateA = new Date(a.created.split("/").reverse().join("-"))
          const dateB = new Date(b.created.split("/").reverse().join("-"))
          return dateA - dateB
        })
      case "name-asc":
        // Sort by title (A-Z)
        return sortedAssessments.sort((a, b) => a.title.localeCompare(b.title))
      case "name-desc":
        // Sort by title (Z-A)
        return sortedAssessments.sort((a, b) => b.title.localeCompare(a.title))
      case "participants":
        // Sort by number of participants (highest first)
        return sortedAssessments.sort((a, b) => {
          const participantsA = Number(a.participants.split("/")[0])
          const participantsB = Number(b.participants.split("/")[0])
          return participantsB - participantsA
        })
      default:
        return sortedAssessments
    }
  }

  // Filter assessments by search query
  const filterAssessments = (assessments) => {
    if (!searchQuery) return assessments

    return assessments.filter((assessment) => assessment.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const assessmentsData = [
    {
      title: t("java_programming_final_exam"),
      class: t("third_year"),
      status: "active",
      code: "3re1oZ",
      participants: "28/40",
      expires: t("2_days"),
      created: "15/03/2023",
    },
    {
      title: t("database_continuous_assessment"),
      class: t("second_year"),
      status: "active",
      code: "7Ht5pQ",
      participants: "22/35",
      expires: t("1_day"),
      created: "16/03/2023",
    },
    {
      title: t("computer_networks_mcq"),
      class: t("third_year"),
      status: "active",
      code: "9kL4mN",
      participants: "15/40",
      expires: t("3_days"),
      created: "14/03/2023",
    },
    {
      title: t("artificial_intelligence_project"),
      class: t("fourth_year"),
      status: "draft",
      code: "",
      participants: "0/30",
      expires: "",
      created: "10/03/2023",
    },
    {
      title: t("mathematics_midterm_exam"),
      class: t("first_year"),
      status: "completed",
      code: "2Zx8yW",
      participants: "38/40",
      expires: "",
      created: "01/03/2023",
    },
    {
      title: t("algorithms_final_exam"),
      class: t("second_year"),
      status: "completed",
      code: "5Qr9sT",
      participants: "32/35",
      expires: "",
      created: "28/02/2023",
    },
  ]

  const activeAssessments = assessmentsData.filter((assessment) => assessment.status === "active")
  const draftAssessments = assessmentsData.filter((assessment) => assessment.status === "draft")
  const completedAssessments = assessmentsData.filter((assessment) => assessment.status === "completed")

  const sortedAllAssessments = sortAssessments(filterAssessments(assessmentsData))
  const sortedActiveAssessments = sortAssessments(filterAssessments(activeAssessments))
  const sortedDraftAssessments = sortAssessments(filterAssessments(draftAssessments))
  const sortedCompletedAssessments = sortAssessments(filterAssessments(completedAssessments))

  const handleCopyCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert(t("code_copied_to_clipboard"))
      })
      .catch((err) => {
        console.error(t("error_copying_code"), err)
      })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" showSearch={false} />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("my_assessments")}</h1>
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
                    {sortBy === "participants" && t("sort_participants")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="recent">{t("sort_recent")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">{t("sort_oldest")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name-asc">{t("sort_name_asc")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name-desc">{t("sort_name_desc")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="participants">{t("sort_participants")}</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button asChild>
                <Link href="/professor/create-assessment">
                  <Plus className="mr-2 h-4 w-4" /> {t("create_assessment")}
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">{t("all")}</TabsTrigger>
              <TabsTrigger value="active">{t("active")}</TabsTrigger>
              <TabsTrigger value="draft">{t("draft")}</TabsTrigger>
              <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedAllAssessments.map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            {assessment.status === "active" && (
                              <DropdownMenuItem onClick={() => handleCopyCode(assessment.code)}>
                                <Copy className="mr-2 h-4 w-4" /> {t("copy_code")}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {assessment.status === "active" && (
                          <>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>{t("participants")}</span>
                              <span className="font-medium">{assessment.participants}</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
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
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                              <Clock className="h-4 w-4" />
                              <span>
                                {t("expires_in")}: {assessment.expires}
                              </span>
                            </div>
                          </>
                        )}

                        {assessment.status === "draft" && (
                          <div className="flex items-center gap-2 py-2">
                            <span className="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 text-xs rounded-full">
                              {t("draft")}
                            </span>
                            <span className="text-sm text-muted-foreground">{t("not_published")}</span>
                          </div>
                        )}

                        {assessment.status === "completed" && (
                          <>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>{t("participation")}</span>
                              <span className="font-medium">{assessment.participants}</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-blue"
                                style={{
                                  width: `${
                                    (Number(assessment.participants.split("/")[0]) /
                                      Number(assessment.participants.split("/")[1])) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs rounded-full">
                                {t("completed")}
                              </span>
                            </div>
                          </>
                        )}

                        {assessment.status === "active" && (
                          <div className="flex items-center gap-2 mt-3">
                            <span className="font-medium text-sm">{t("code")}:</span>
                            <code className="px-2 py-1 bg-muted rounded text-sm font-mono">#{assessment.code}</code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-auto"
                              onClick={() => handleCopyCode(assessment.code)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        {assessment.status === "active" && (
                          <>
                            <Button variant="outline" className="flex-1" asChild>
                              <Link href={`/professor/assessment/${i}`}>{t("view_details")}</Link>
                            </Button>
                            <Button className="flex-1" asChild>
                              <Link href={`/professor/results?id=${i}`}>{t("results")}</Link>
                            </Button>
                          </>
                        )}

                        {assessment.status === "draft" && (
                          <>
                            <Button variant="outline" className="flex-1" asChild>
                              <Link href={`/professor/create-assessment?id=${i}`}>{t("continue_editing")}</Link>
                            </Button>
                            <Button className="flex-1">{t("publish")}</Button>
                          </>
                        )}

                        {assessment.status === "completed" && (
                          <>
                            <Button variant="outline" className="flex-1">
                              {t("download")}
                            </Button>
                            <Button className="flex-1" asChild>
                              <Link href={`/professor/results?id=${i}`}>{t("view_analysis")}</Link>
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
                {sortedActiveAssessments.map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyCode(assessment.code)}>
                              <Copy className="mr-2 h-4 w-4" /> {t("copy_code")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{t("participants")}</span>
                          <span className="font-medium">{assessment.participants}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
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
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                          <Clock className="h-4 w-4" />
                          <span>
                            {t("expires_in")}: {assessment.expires}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <span className="font-medium text-sm">{t("code")}:</span>
                          <code className="px-2 py-1 bg-muted rounded text-sm font-mono">#{assessment.code}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-auto"
                            onClick={() => handleCopyCode(assessment.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`/professor/assessment/${i}`}>{t("view_details")}</Link>
                        </Button>
                        <Button className="flex-1" asChild>
                          <Link href={`/professor/results?id=${i}`}>{t("results")}</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedDraftAssessments.map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 py-2">
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 text-xs rounded-full">
                            {t("draft")}
                          </span>
                          <span className="text-sm text-muted-foreground">{t("not_published")}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`/professor/create-assessment?id=${i}`}>{t("continue_editing")}</Link>
                        </Button>
                        <Button className="flex-1">{t("publish")}</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedCompletedAssessments.map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
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
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> {t("view_details")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> {t("duplicate")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{t("participation")}</span>
                          <span className="font-medium">{assessment.participants}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-blue"
                            style={{
                              width: `${
                                (Number(assessment.participants.split("/")[0]) /
                                  Number(assessment.participants.split("/")[1])) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs rounded-full">
                            {t("completed")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1">
                          {t("download")}
                        </Button>
                        <Button className="flex-1" asChild>
                          <Link href={`/professor/results?id=${i}`}>{t("view_analysis")}</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
