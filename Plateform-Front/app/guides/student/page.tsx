"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  CheckCircle,
  FileText,
  HelpCircle,
  BarChart3,
  Clock,
  MessageSquare,
  Settings,
  School,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"
import { motion } from "framer-motion"

export default function StudentGuidePage() {
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
              {t("student_guide")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("student_guide_description")}
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
            <TabsTrigger value="taking-assessments" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              {t("taking_assessments")}
            </TabsTrigger>
            <TabsTrigger value="learning-resources" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              {t("learning_resources")}
            </TabsTrigger>
            <TabsTrigger value="progress-tracking" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              {t("progress_tracking")}
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
                        <li>{t("student_guide_step1")}</li>
                        <li>{t("student_guide_step2")}</li>
                        <li>{t("student_guide_step3")}</li>
                        <li>{t("student_guide_step4")}</li>
                      </ol>
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          <strong>{t("tip")}:</strong> {t("student_guide_tip1")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("dashboard_overview")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("student_dashboard_desc")}</p>
                      <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            <FileText className="text-secondary-turquoise dark:text-teal-400 h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{t("upcoming_assessments")}</p>
                            <p className="text-sm">{t("upcoming_assessments_desc")}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            <BarChart3 className="text-secondary-turquoise dark:text-teal-400 h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{t("performance_summary")}</p>
                            <p className="text-sm">{t("performance_summary_desc")}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            <BookOpen className="text-secondary-turquoise dark:text-teal-400 h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{t("learning_resources")}</p>
                            <p className="text-sm">{t("learning_resources_desc_short")}</p>
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
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("student_navigation_guide_desc")}</p>

                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <School className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                            <p className="font-medium dark:text-white">{t("dashboard")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                            <p className="font-medium dark:text-white">{t("assessments")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                            <p className="font-medium dark:text-white">{t("learning")}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                            <p className="font-medium dark:text-white">{t("results")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                            <p className="font-medium dark:text-white">{t("feedback")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
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

          <TabsContent value="taking-assessments" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("taking_assessments")}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("joining_assessment")}</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                        <li>{t("join_assessment_step1")}</li>
                        <li>{t("join_assessment_step2")}</li>
                        <li>{t("join_assessment_step3")}</li>
                        <li>{t("join_assessment_step4")}</li>
                      </ol>
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          <strong>{t("tip")}:</strong> {t("join_assessment_tip")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("assessment_types")}</h3>
                      <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <div>
                          <p className="font-medium dark:text-white">{t("timed_assessments")}</p>
                          <p className="text-sm">{t("timed_assessments_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("practice_assessments")}</p>
                          <p className="text-sm">{t("practice_assessments_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("graded_assessments")}</p>
                          <p className="text-sm">{t("graded_assessments_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("self_assessments")}</p>
                          <p className="text-sm">{t("self_assessments_desc")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="dark:bg-gray-800 dark:border-gray-700 mb-8">
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("during_assessment")}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{t("during_assessment_desc")}</p>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                          <p className="font-medium dark:text-white">{t("time_management")}</p>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("time_management_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                          <p className="font-medium dark:text-white">{t("answering_questions")}</p>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("answering_questions_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-secondary-turquoise dark:text-teal-400" />
                          <p className="font-medium dark:text-white">{t("reviewing_answers")}</p>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("reviewing_answers_desc")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("assessment_completion")}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium dark:text-white">{t("submitting_assessment")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("submitting_assessment_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("confirmation")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("confirmation_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("immediate_feedback")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("immediate_feedback_desc_student")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("technical_issues")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("technical_issues_desc")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="learning-resources" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("learning_resources")}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("accessing_resources")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("accessing_resources_desc")}</p>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                        <li>{t("resources_step1")}</li>
                        <li>{t("resources_step2")}</li>
                        <li>{t("resources_step3")}</li>
                        <li>{t("resources_step4")}</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("resource_types")}</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{t("study_materials")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("study_materials_desc")}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{t("practice_exercises")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("practice_exercises_desc")}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{t("video_tutorials")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("video_tutorials_desc")}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{t("interactive_simulations")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {t("interactive_simulations_desc")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="dark:bg-gray-800 dark:border-gray-700 mb-8">
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("personalized_learning")}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{t("personalized_learning_desc_full")}</p>

                    <div className="space-y-4">
                      <div>
                        <p className="font-medium dark:text-white">{t("recommended_resources")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("recommended_resources_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("learning_paths")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("learning_paths_desc_student")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("recovery_plans")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("recovery_plans_desc")}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>{t("tip")}:</strong> {t("personalized_learning_tip")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("study_strategies")}</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">{t("study_strategies_desc")}</p>

                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <p className="font-medium dark:text-white">{t("effective_studying")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("effective_studying_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("note_taking")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("note_taking_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("group_study")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("group_study_desc")}</p>
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{t("test_preparation")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("test_preparation_desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="progress-tracking" className="mt-6">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("progress_tracking")}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("viewing_results")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("viewing_results_desc")}</p>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium dark:text-white">{t("assessment_scores")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("assessment_scores_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("detailed_feedback")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("detailed_feedback_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("correct_answers")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("correct_answers_desc")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("performance_analytics")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("performance_analytics_desc")}</p>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium dark:text-white">{t("progress_over_time")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("progress_over_time_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("strength_weakness")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("strength_weakness_desc")}</p>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{t("comparison_metrics")}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{t("comparison_metrics_desc")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="dark:bg-gray-800 dark:border-gray-700 mb-8">
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("improvement_strategies")}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{t("improvement_strategies_desc")}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("targeted_practice")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("targeted_practice_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("skill_building")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("skill_building_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("feedback_implementation")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("feedback_implementation_desc")}</p>
                      </div>
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="font-medium dark:text-white">{t("seeking_help")}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t("seeking_help_desc")}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>{t("tip")}:</strong> {t("improvement_tip")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{t("goal_setting")}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("goal_setting_desc")}</p>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium dark:text-white">{t("smart_goals")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("smart_goals_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("tracking_progress")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("tracking_progress_desc")}</p>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{t("celebrating_achievements")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t("celebrating_achievements_desc")}</p>
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
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("student_faq_1")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("student_faq_answer_1")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("student_faq_2")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("student_faq_answer_2")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("student_faq_3")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("student_faq_answer_3")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("student_faq_4")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("student_faq_answer_4")}</p>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("student_faq_5")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("student_faq_answer_5")}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 p-6 bg-secondary-turquoise/10 dark:bg-teal-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-secondary-turquoise dark:text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("need_more_help")}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{t("need_more_help_desc")}</p>
                      <Button
                        asChild
                        className="bg-secondary-turquoise hover:bg-secondary-turquoise/90 dark:bg-teal-600 dark:hover:bg-teal-700"
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
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t("student_guide_cta")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-secondary-turquoise hover:bg-secondary-turquoise/90 text-white dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              <Link href="/login">{t("login_now")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Link href="/guides/professor">{t("professor_guide")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <FooterWithLanguage />
    </div>
  )
}
