"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, ArrowUpDown, Download, FileText, Search, TrendingUp, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ProfessorStatistics() {
  const { t } = useLanguage()
  // Add the selectedSortOption state
  const [selectedSortOption, setSelectedSortOption] = useState("date")

  // Mock statistics data
  const statistics = {
    overview: {
      totalAssessments: 24,
      totalStudents: 120,
      completionRate: 87,
      averageScore: 14.2,
    },
    assessments: [
      {
        id: "1",
        title: t("java_programming_final_exam"),
        class: t("third_year"),
        date: "15/03/2023",
        students: 40,
        completionRate: 95,
        averageScore: 14.5,
        averageTime: 52,
        successRate: 85,
      },
      {
        id: "2",
        title: t("database_continuous_assessment"),
        class: t("second_year"),
        date: "22/02/2023",
        students: 38,
        completionRate: 100,
        averageScore: 15.2,
        averageTime: 45,
        successRate: 92,
      },
      {
        id: "3",
        title: t("algorithms_midterm_exam"),
        class: t("first_year"),
        date: "10/01/2023",
        students: 42,
        completionRate: 90,
        averageScore: 13.8,
        averageTime: 58,
        successRate: 76,
      },
    ],
    scoreDistribution: [
      { range: "0-5", count: 5 },
      { range: "6-8", count: 12 },
      { range: "9-10", count: 18 },
      { range: "11-13", count: 35 },
      { range: "14-16", count: 38 },
      { range: "17-20", count: 12 },
    ],
    timeDistribution: [
      { range: "0-15 min", count: 3 },
      { range: "16-30 min", count: 15 },
      { range: "31-45 min", count: 42 },
      { range: "46-60 min", count: 38 },
      { range: "61+ min", count: 22 },
    ],
    topChallenges: [
      { topic: t("interfaces_abstract_classes"), successRate: 62 },
      { topic: t("design_patterns"), successRate: 58 },
      { topic: t("polymorphism"), successRate: 71 },
      { topic: t("sorting_algorithms"), successRate: 68 },
      { topic: t("complex_sql_queries"), successRate: 55 },
    ],
  }

  // Calculate max count for proper scaling of bars
  const maxScoreCount = Math.max(...statistics.scoreDistribution.map((item) => item.count))
  const maxTimeCount = Math.max(...statistics.timeDistribution.map((item) => item.count))

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Mr Abid" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/professor/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t("statistics")}</h1>
                <p className="text-muted-foreground">{t("assessment_performance_analysis")}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder={t("search")} className="pl-8 w-[200px]" />
              </div>

              <Select value={selectedSortOption} onValueChange={setSelectedSortOption}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t("sort_by")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">{t("sort_by_date")}</SelectItem>
                  <SelectItem value="alpha">{t("sort_alphabetically")}</SelectItem>
                  <SelectItem value="participants">{t("sort_by_participants")}</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> {t("export")}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("assessments")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.overview.totalAssessments}</div>
                <p className="text-xs text-muted-foreground">
                  {statistics.assessments.length} {t("recent_assessments")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("students")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.overview.totalStudents}</div>
                <p className="text-xs text-muted-foreground">{t("across_3_levels")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("completion_rate")}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.overview.completionRate}%</div>
                <p className="text-xs text-muted-foreground">+2% {t("compared_to_previous_semester")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("average_score")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.overview.averageScore}/20</div>
                <p className="text-xs text-muted-foreground">-0.3 {t("compared_to_previous_semester")}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="assessments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="assessments">{t("assessments")}</TabsTrigger>
              {/* <TabsTrigger value="performance">{t("performance")}</TabsTrigger>
              <TabsTrigger value="challenges">{t("challenges")}</TabsTrigger> */}
            </TabsList>

            <TabsContent value="assessments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("assessment_results")}</CardTitle>
                  <CardDescription>{t("performance_overview_by_assessment")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4 flex items-center gap-2">
                        {t("assessment")} <ArrowUpDown className="h-3 w-3" />
                      </div>
                      <div className="col-span-2 text-center">{t("class")}</div>
                      <div className="col-span-1 text-center">{t("students")}</div>
                      <div className="col-span-1 text-center">{t("completion")}</div>
                      <div className="col-span-1 text-center">{t("success")}</div>
                      <div className="col-span-1 text-center">{t("avg_score")}</div>
                      <div className="col-span-1 text-center">{t("avg_time")}</div>
                      <div className="col-span-1 text-right">{t("actions")}</div>
                    </div>

                    {statistics.assessments
                      .sort((a, b) => {
                        if (selectedSortOption === "date") {
                          return (
                            new Date(b.date.split("/").reverse().join("-")) -
                            new Date(a.date.split("/").reverse().join("-"))
                          )
                        } else if (selectedSortOption === "alpha") {
                          return a.title.localeCompare(b.title)
                        } else if (selectedSortOption === "participants") {
                          return b.students - a.students
                        }
                        return 0
                      })
                      .map((assessment, i) => (
                        <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                          <div className="col-span-4 font-medium">{assessment.title}</div>
                          <div className="col-span-2 text-center">{assessment.class}</div>
                          <div className="col-span-1 text-center">{assessment.students}</div>
                          <div className="col-span-1 text-center">{assessment.completionRate}%</div>
                          <div className="col-span-1 text-center">{assessment.successRate}%</div>
                          <div className="col-span-1 text-center">{assessment.averageScore}/20</div>
                          <div className="col-span-1 text-center">
                            {assessment.averageTime} {t("min")}
                          </div>
                          <div className="col-span-1 text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/professor/assessment/${assessment.id}`}>{t("details")}</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("grade_distribution")}</CardTitle>
                    <CardDescription>{t("grade_distribution_across_assessments")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statistics.scoreDistribution.map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{item.range}/20</span>
                            <span className="font-medium">
                              {item.count} {t("students")}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(item.count / maxScoreCount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("time_distribution")}</CardTitle>
                    <CardDescription>{t("time_spent_on_assessments")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statistics.timeDistribution.map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{item.range}</span>
                            <span className="font-medium">
                              {item.count} {t("students")}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(item.count / maxTimeCount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent> */}

            {/* <TabsContent value="challenges" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("challenging_topics")}</CardTitle>
                  <CardDescription>{t("topics_with_lowest_success_rates")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {statistics.topChallenges.map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.topic}</span>
                          <span
                            className={`${
                              item.successRate < 60
                                ? "text-red-500"
                                : item.successRate < 70
                                  ? "text-amber-500"
                                  : "text-green-500"
                            }`}
                          >
                            {item.successRate}% {t("success_rate")}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.successRate < 60
                                ? "bg-red-500"
                                : item.successRate < 70
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${item.successRate}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("recommended_action")}:{" "}
                          {item.successRate < 60 ? t("review_material") : t("additional_exercises")}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">{t("improvement_suggestions")}</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-1.5 w-1.5 bg-primary mt-1.5"></div>
                        <span>{t("provide_additional_resources_for_design_patterns")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-1.5 w-1.5 bg-primary mt-1.5"></div>
                        <span>{t("create_interactive_exercises_for_complex_sql")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-1.5 w-1.5 bg-primary mt-1.5"></div>
                        <span>{t("organize_review_sessions_for_interfaces_and_abstract_classes")}</span>
                      </li>
                    </ul>
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
