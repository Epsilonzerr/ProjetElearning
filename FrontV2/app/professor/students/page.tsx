"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import { BarChart, Download, FileText, MoreHorizontal, Search, UserPlus, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ProfessorStudents() {
  const { t } = useLanguage()
  const [showExportDialog, setShowExportDialog] = useState(false)

  const handleExport = () => {
    // In a real app, this would trigger a file download
    alert("Exporting student data...")
    setShowExportDialog(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("student_management")}</h1>
              <p className="text-muted-foreground">{t("view_manage_students")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder={t("search")} className="pl-8 w-full md:w-[200px]" />
              </div>

              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> {t("add_students")}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("total_students")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">{t("across_classes")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("average_grade")}</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.2/20</div>
                <p className="text-xs text-muted-foreground">{t("since_last_semester")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("success_rate")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">{t("since_last_semester_plus")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("assessments_taken")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">{t("this_semester")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t("student_list")}</CardTitle>
                  <Button variant="outline" onClick={() => setShowExportDialog(true)}>
                    <Download className="mr-2 h-4 w-4" /> {t("export")}
                  </Button>
                </div>
                <CardDescription>{t("all_enrolled_students")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-4">{t("name")}</div>
                    <div className="col-span-2">{t("class")}</div>
                    <div className="col-span-2 text-center">{t("average")}</div>
                    <div className="col-span-2 text-center">{t("assessments")}</div>
                    <div className="col-span-2 text-right">{t("actions")}</div>
                  </div>

                  {[
                    {
                      name: "Ahmed Benali",
                      class: "3ème année",
                      avg: "16.5/20",
                      completed: "8/10",
                      status: "excellent",
                    },
                    { name: "Fatima Zahra", class: "3ème année", avg: "15.0/20", completed: "10/10", status: "good" },
                    {
                      name: "Karim Idrissi",
                      class: "2ème année",
                      avg: "12.5/20",
                      completed: "7/8",
                      status: "average",
                    },
                    { name: "Leila Alaoui", class: "2ème année", avg: "14.0/20", completed: "8/8", status: "good" },
                    {
                      name: "Omar Benjelloun",
                      class: "1ère année",
                      avg: "10.5/20",
                      completed: "5/6",
                      status: "poor",
                    },
                    {
                      name: "Salma Tazi",
                      class: "3ème année",
                      avg: "17.5/20",
                      completed: "10/10",
                      status: "excellent",
                    },
                    {
                      name: "Youssef Amrani",
                      class: "1ère année",
                      avg: "13.0/20",
                      completed: "6/6",
                      status: "average",
                    },
                    { name: "Zineb Chaoui", class: "2ème année", avg: "15.5/20", completed: "8/8", status: "good" },
                  ].map((student, i) => (
                    <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                      <div className="col-span-4 font-medium">{student.name}</div>
                      <div className="col-span-2">{student.class}</div>
                      <div className="col-span-2 text-center">
                        <span
                          className={`font-medium ${
                            student.status === "excellent"
                              ? "text-green-600"
                              : student.status === "good"
                                ? "text-blue-600"
                                : student.status === "average"
                                  ? "text-amber-600"
                                  : "text-red-600"
                          }`}
                        >
                          {student.avg}
                        </span>
                      </div>
                      <div className="col-span-2 text-center">{student.completed}</div>
                      <div className="col-span-2 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>{t("view_profile")}</DropdownMenuItem>
                            <DropdownMenuItem>{t("view_results")}</DropdownMenuItem>
                            <DropdownMenuItem>{t("send_message")}</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">{t("remove_from_course")}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("export_student_data")}</DialogTitle>
            <DialogDescription>{t("export_student_data_description")}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>{t("export_format_description")}</p>
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
