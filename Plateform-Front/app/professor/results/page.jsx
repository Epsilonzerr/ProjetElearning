"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, PieChart, BarChart, Users, BookOpen } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useLanguage } from "@/contexts/language-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ProfessorResults() {
  const { t } = useLanguage()
  const [showExportDialog, setShowExportDialog] = useState(false)

  const handleExport = () => {
    // In a real app, this would trigger a file download
    alert(t("exporting_results_data"))
    setShowExportDialog(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {t("results")} & {t("analytics_insights")}
              </h1>
              <p className="text-muted-foreground">{t("view_student_performance")}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowExportDialog(true)}>
                <Download className="mr-2 h-4 w-4" /> {t("export")}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("average_score")}</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.8/20</div>
                <p className="text-xs text-muted-foreground">+0.6 {t("compared_to_last_assessment")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("success_rate")}</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86%</div>
                <p className="text-xs text-muted-foreground">+4% {t("compared_to_last_assessment")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("participants")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38/42</div>
                <p className="text-xs text-muted-foreground">4 {t("absent_students")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("average_time")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42 {t("minutes")}</div>
                <p className="text-xs text-muted-foreground">
                  {t("out_of")} 60 {t("allocated_minutes")}
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
              <TabsTrigger value="students">{t("by_student")}</TabsTrigger>
              <TabsTrigger value="questions">{t("by_question")}</TabsTrigger>
              <TabsTrigger value="recommendations">{t("ai_recommendations")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>{t("grade_distribution")}</CardTitle>
                    <CardDescription>{t("class_grade_distribution")}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{t("grade_distribution_chart")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>{t("skill_performance")}</CardTitle>
                    <CardDescription>{t("mastered_skills_analysis")}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
                      <div className="text-center">
                        <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{t("skills_radar_chart")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{t("assessment_analysis")}</CardTitle>
                    <CardDescription>{t("ai_generated_insights")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{t("strengths")}</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>{t("oop_concepts_mastered")}</li>
                        <li>{t("inheritance_polymorphism_high_scores")}</li>
                        <li>{t("prime_algorithm_success")}</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{t("areas_to_improve")}</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>{t("interface_abstract_confusion")}</li>
                        <li>{t("advanced_polymorphism_needs_examples")}</li>
                        <li>{t("algorithm_optimization_difficulties")}</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{t("comparison_with_previous")}</h3>
                      <p>{t("improvement_from_previous")}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("student_performance")}</CardTitle>
                  <CardDescription>{t("individual_results_progress")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">{t("student")}</div>
                      <div className="col-span-2 text-center">{t("grade")}</div>
                      <div className="col-span-2 text-center">{t("time")}</div>
                      <div className="col-span-2 text-center">{t("progress")}</div>
                      <div className="col-span-2 text-right">{t("actions")}</div>
                    </div>

                    {[
                      { name: "Ahmed Benali", score: 18, time: 38, progress: "+2.5" },
                      { name: "Fatima Zahra", score: 16, time: 45, progress: "+1.0" },
                      { name: "Karim Idrissi", score: 14.5, time: 52, progress: "+0.5" },
                      { name: "Leila Alaoui", score: 15, time: 40, progress: "+2.0" },
                      { name: "Omar Benjelloun", score: 12, time: 58, progress: "-1.0" },
                      { name: "Salma Tazi", score: 17, time: 35, progress: "+3.0" },
                      { name: "Youssef Amrani", score: 13.5, time: 49, progress: "+0.5" },
                      { name: "Zineb Chaoui", score: 15.5, time: 42, progress: "+1.5" },
                    ].map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2 text-center">{student.score}/20</div>
                        <div className="col-span-2 text-center">
                          {student.time} {t("min")}
                        </div>
                        <div
                          className={`col-span-2 text-center ${
                            Number.parseFloat(student.progress) > 0
                              ? "text-green-600"
                              : Number.parseFloat(student.progress) < 0
                                ? "text-red-600"
                                : ""
                          }`}
                        >
                          {student.progress}
                        </div>
                        <div className="col-span-2 text-right">
                          <Button variant="ghost" size="sm">
                            {t("details")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("question_analysis")}</CardTitle>
                  <CardDescription>{t("student_performance_by_question")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-5">{t("question")}</div>
                      <div className="col-span-2 text-center">{t("success_rate")}</div>
                      <div className="col-span-2 text-center">{t("average_time")}</div>
                      <div className="col-span-3 text-center">{t("difficulty")}</div>
                    </div>

                    {[
                      {
                        text: t("abstract_interface_difference"),
                        success: "68%",
                        time: "8 min",
                        difficulty: t("medium"),
                      },
                      {
                        text: t("quicksort_complexity"),
                        success: "82%",
                        time: "3 min",
                        difficulty: t("easy"),
                      },
                      {
                        text: t("polymorphism_definition"),
                        success: "75%",
                        time: "5 min",
                        difficulty: t("medium"),
                      },
                      {
                        text: t("oop_concepts_association"),
                        success: "90%",
                        time: "7 min",
                        difficulty: t("easy"),
                      },
                      {
                        text: t("prime_numbers_program"),
                        success: "62%",
                        time: "15 min",
                        difficulty: t("difficult"),
                      },
                    ].map((question, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-5 font-medium">
                          Q{i + 1}: {question.text}
                        </div>
                        <div
                          className={`col-span-2 text-center ${
                            Number.parseInt(question.success) >= 80
                              ? "text-green-600"
                              : Number.parseInt(question.success) <= 65
                                ? "text-red-600"
                                : "text-amber-600"
                          }`}
                        >
                          {question.success}
                        </div>
                        <div className="col-span-2 text-center">{question.time}</div>
                        <div className="col-span-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              question.difficulty === t("easy")
                                ? "bg-green-100 text-green-800"
                                : question.difficulty === t("medium")
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("question_improvement_recommendations")}</CardTitle>
                  <CardDescription>{t("ai_suggestions_for_future")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("questions_to_rephrase")}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">Q1:</span> {t("abstract_interface_question_suggestion")}
                      </li>
                      <li>
                        <span className="font-medium">Q3:</span> {t("polymorphism_question_suggestion")}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("difficulty_adjustment")}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">Q4:</span> {t("association_exercise_too_easy")}
                      </li>
                      <li>
                        <span className="font-medium">Q5:</span> {t("programming_exercise_too_long")}
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("pedagogical_recommendations")}</CardTitle>
                  <CardDescription>{t("personalized_suggestions_based_on_results")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary-blue" />
                      <h3 className="text-lg font-medium">{t("recommended_resources_for_class")}</h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        {
                          title: t("interfaces_vs_abstract_classes_guide"),
                          type: t("article"),
                          description: t("interfaces_vs_abstract_classes_description"),
                          url: "#",
                        },
                        {
                          title: t("polymorphism_workshop"),
                          type: t("exercise"),
                          description: t("polymorphism_workshop_description"),
                          url: "#",
                        },
                        {
                          title: t("algorithm_optimization"),
                          type: t("video"),
                          description: t("algorithm_optimization_description"),
                          url: "#",
                        },
                        {
                          title: t("design_patterns_course"),
                          type: t("course"),
                          description: t("design_patterns_course_description"),
                          url: "#",
                        },
                      ].map((resource, i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{resource.title}</CardTitle>
                            <CardDescription>{resource.type}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm">{resource.description}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="flex gap-2 w-full">
                              <Button variant="outline" className="flex-1">
                                {t("preview")}
                              </Button>
                              <Button className="flex-1">{t("share")}</Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary-blue" />
                      <h3 className="text-lg font-medium">{t("identified_student_groups")}</h3>
                    </div>

                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {t("group_1_excellent")} (8 {t("students")})
                          </CardTitle>
                          <CardDescription>{t("average_grade")}: 17.5/20</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{t("excellent_group_description")}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {t("group_2_good")} (22 {t("students")})
                          </CardTitle>
                          <CardDescription>{t("average_grade")}: 14.2/20</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{t("good_group_description")}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {t("group_3_struggling")} (8 {t("students")})
                          </CardTitle>
                          <CardDescription>{t("average_grade")}: 10.8/20</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{t("struggling_group_description")}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t("apply_recommendations")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("export_results")}</DialogTitle>
            <DialogDescription>{t("export_results_description")}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>{t("export_results_format_description")}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleExport}>{t("export")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
