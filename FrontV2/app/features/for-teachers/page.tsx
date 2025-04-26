"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, FileText, BarChart3, Users, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"
import { motion } from "framer-motion"

export default function ForTeachersPage() {
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
          <div className="max-w-3xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t("for_teachers")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("teachers_detailed_description")}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> {t("back_to_home")}
            </Link>
          </Button>
        </div>

        <motion.div className="space-y-12" initial="hidden" animate="visible" variants={staggerContainer}>
          {/* Key Benefits Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("teacher_benefits")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("efficient_assessment")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("efficient_assessment_desc")}</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("data_insights")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("data_insights_desc")}</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("student_engagement")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("student_engagement_desc")}</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("teacher_features")}</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="text-primary-blue dark:text-blue-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("assessment_creation")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("assessment_creation_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("multiple_question_types")}</li>
                        <li>{t("customizable_scoring")}</li>
                        <li>{t("time_limits_settings")}</li>
                        <li>{t("question_bank_access")}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <BarChart3 className="text-primary-blue dark:text-blue-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("performance_tracking")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("performance_tracking_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("class_performance_overview")}</li>
                        <li>{t("individual_student_progress")}</li>
                        <li>{t("comparative_analytics")}</li>
                        <li>{t("exportable_reports")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <FileText className="text-primary-blue dark:text-blue-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("grading_tools")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("grading_tools_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("automated_grading")}</li>
                        <li>{t("rubric_creation")}</li>
                        <li>{t("feedback_templates")}</li>
                        <li>{t("batch_grading_options")}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="text-primary-blue dark:text-blue-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("collaboration_tools")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("collaboration_tools_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("assessment_sharing")}</li>
                        <li>{t("department_collaboration")}</li>
                        <li>{t("teaching_assistant_access")}</li>
                        <li>{t("peer_review_options")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("how_it_works_teachers")}</h2>
            <div className="space-y-6">
              <div className="relative pl-10 pb-10 border-l-2 border-primary-blue dark:border-blue-600">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-blue dark:bg-blue-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_1_create")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_1_create_desc")}</p>
              </div>
              <div className="relative pl-10 pb-10 border-l-2 border-primary-blue dark:border-blue-600">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-blue dark:bg-blue-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_2_assign")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_2_assign_desc")}</p>
              </div>
              <div className="relative pl-10 pb-10 border-l-2 border-primary-blue dark:border-blue-600">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-blue dark:bg-blue-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_3_monitor")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_3_monitor_desc")}</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-blue dark:bg-blue-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_4_analyze")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_4_analyze_desc")}</p>
              </div>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("teacher_testimonials")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="text-4xl text-primary-blue opacity-20 mb-2">"</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("teacher_testimonial_1")}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-blue/20 flex items-center justify-center text-primary-blue font-bold">
                      M
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold dark:text-white">Dr. Mohammed Alami</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("professor_computer_science")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="text-4xl text-primary-blue opacity-20 mb-2">"</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("teacher_testimonial_2")}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-blue/20 flex items-center justify-center text-primary-blue font-bold">
                      N
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold dark:text-white">Prof. Nadia Benali</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("department_head")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section variants={fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("ready_to_start_teaching")}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("ready_to_start_teaching_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Link href="/login">{t("get_started")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Link href="/guides/professor">{t("view_detailed_guide")}</Link>
              </Button>
            </div>
          </motion.section>
        </motion.div>
      </div>

      <FooterWithLanguage />
    </div>
  )
}
