"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, BarChart3, Users, FileText, CheckSquare, Settings, HelpCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"
import { motion } from "framer-motion"

export default function ProfessorGuidePage() {
  const { t } = useLanguage()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <SiteHeader />

      {/* Hero Section */}
      <div className="iga-gradient text-white relative overflow-hidden dark:bg-gray-800">
        <motion.div
          className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t("professor_guide")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("professor_guide_description")}
            </motion.p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="text-white dark:text-gray-900"
            ></path>
          </svg>
        </div>
      </div>

      {/* Guide Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 dark:bg-gray-800">
            <TabsTrigger value="getting-started" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              {t("getting_started")}
            </TabsTrigger>
            <TabsTrigger value="assessments" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              {t("assessments")}
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              {t("evaluations")}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              {t("analytics")}
            </TabsTrigger>
            <TabsTrigger value="faq" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("getting_started")}</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("account_setup")}</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                        <li>{t("professor_guide_step1")}</li>
                        <li>{t("professor_guide_step2")}</li>
                        <li>{t("professor_guide_step3")}</li>
                        <li>{t("professor_guide_step4")}</li>
                      </ol>
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          <strong>{t("tip")}:</strong> {t("professor_guide_tip1")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("dashboard_overview")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("professor_dashboard_desc")}</p>
                      <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            <BarChart3 className="text-primary-blue dark:text-blue-400 h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{t("statistics_section")}</p>
                            <p className="text-sm">{t("statistics_section_desc")}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            <FileText className="text-primary-blue dark:text-blue-400 h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{t("recent_assessments")}</p>
                            <p className="text-sm">{t("recent_assessments_desc")}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            <Users className="text-primary-blue dark:text-blue-400 h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{t("student_performance")}</p>
                            <p className="text-sm">{t("student_performance_desc")}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("navigation_guide")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("navigation_guide_desc")}</p>

                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary-blue dark:text-blue-400" />
                            <p className="font-medium dark:text-white">{t("dashboard")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary-blue dark:text-blue-400" />
                            <p className="font-medium dark:text-white">{t("assessments")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckSquare className="h-5 w-5 text-primary-blue dark:text-blue-400" />
                            <p className="font-medium dark:text-white">{t("evaluations")}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary-blue dark:text-blue-400" />
                            <p className="font-medium dark:text-white">{t("statistics")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary-blue dark:text-blue-400" />
                            <p className="font-medium dark:text-white">{t("students")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-primary-blue dark:text-blue-400" />
                            <p className="font-medium dark:text-white">{t("settings")}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="assessments" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("creating_managing_assessments")}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("creating_assessment")}</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                        <li>{t("assessment_step1")}</li>
                        <li>{t("assessment_step2")}</li>
                        <li>{t("assessment_step3")}</li>
                        <li>{t("assessment_step4")}</li>
                        <li>{t("assessment_step5")}</li>
                      </ol>
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          <strong>{t("tip")}:</strong> {t("assessment_tip1")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("question_types")}</h3>
                      <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <div>
                          <p className="font-medium dark:text-white">{t("multiple_choice")}</p>
                          <p className="text-sm">{t("multiple_choice_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("true_false")}</p>
                          <p className="text-sm">{t("true_false_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("short_answer")}</p>
                          <p className="text-sm">{t("short_answer_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("essay")}</p>
                          <p className="text-sm">{t("essay_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("matching")}</p>
                          <p className="text-sm">{t("matching_desc")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="dark:bg-gray-800 dark:border-gray-700 mb-8">
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("managing_assessments")}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{t("managing_assessments_desc")}</p>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("editing_assessments")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("editing_assessments_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("duplicating_assessments")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("duplicating_assessments_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("archiving_assessments")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("archiving_assessments_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("sharing_assessments")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("sharing_assessments_desc")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("assessment_settings")}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium dark:text-white">{t("time_limits")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("time_limits_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("access_codes")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("access_codes_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("availability_windows")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("availability_windows_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("attempt_limits")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("attempt_limits_desc")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="evaluations" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("evaluations_grading")}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("grading_process")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("grading_process_desc")}</p>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                        <li>{t("grading_step1")}</li>
                        <li>{t("grading_step2")}</li>
                        <li>{t("grading_step3")}</li>
                        <li>{t("grading_step4")}</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("feedback_options")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("feedback_options_desc")}</p>
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{t("individual_feedback")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("individual_feedback_desc")}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{t("group_feedback")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("group_feedback_desc")}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{t("automated_feedback")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("automated_feedback_desc")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="dark:bg-gray-800 dark:border-gray-700 mb-8">
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("rubrics")}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{t("rubrics_desc")}</p>

                    <div className="space-y-4">
                      <div>
                        <p className="font-medium dark:text-white">{t("creating_rubrics")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("creating_rubrics_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("using_rubrics")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("using_rubrics_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("sharing_rubrics")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("sharing_rubrics_desc")}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>{t("tip")}:</strong> {t("rubrics_tip")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("grade_management")}</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">{t("grade_management_desc")}</p>

                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <p className="font-medium dark:text-white">{t("exporting_grades")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("exporting_grades_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("grade_adjustments")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("grade_adjustments_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("grade_visibility")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("grade_visibility_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("grade_appeals")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("grade_appeals_desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("analytics_insights")}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("assessment_analytics")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("assessment_analytics_desc")}</p>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium dark:text-white">{t("performance_metrics")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("performance_metrics_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("question_analysis")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("question_analysis_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("time_analysis")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("time_analysis_desc")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("student_analytics")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("student_analytics_desc")}</p>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium dark:text-white">{t("individual_progress")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("individual_progress_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("comparative_analysis")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("comparative_analysis_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("learning_gaps")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("learning_gaps_desc")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="dark:bg-gray-800 dark:border-gray-700 mb-8">
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("reports")}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{t("reports_desc")}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("class_reports")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("class_reports_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("individual_reports")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("individual_reports_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("assessment_reports")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("assessment_reports_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("trend_reports")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("trend_reports_desc")}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>{t("tip")}:</strong> {t("reports_tip")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("data_visualization")}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("data_visualization_desc")}</p>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium dark:text-white">{t("charts_graphs")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("charts_graphs_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("heatmaps")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("heatmaps_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("progress_tracking")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {t("progress_tracking_analytics_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">FAQ</h2>

                <div className="space-y-6">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("professor_faq_1")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("professor_faq_answer_1")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("professor_faq_2")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("professor_faq_answer_2")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("professor_faq_3")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("professor_faq_answer_3")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("professor_faq_4")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("professor_faq_answer_4")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("professor_faq_5")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("professor_faq_answer_5")}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 p-6 bg-primary-blue/10 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-primary-blue dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("need_more_help")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("need_more_help_desc")}</p>
                      <Button
                        asChild
                        className="bg-primary-blue hover:bg-primary-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        <Link href="/contact">{t("contact_support")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("ready_to_start")}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t("professor_guide_cta")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-blue hover:bg-primary-blue/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Link href="/login">{t("login_now")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Link href="/guides/student">{t("student_guide")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <FooterWithLanguage />
    </div>
  )
}
