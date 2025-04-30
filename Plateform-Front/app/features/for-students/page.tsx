"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FileText, BarChart3, Users, ArrowLeft, School } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"
import { motion } from "framer-motion"

export default function ForStudentsPage() {
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
      <div className="bg-secondary-turquoise text-white relative overflow-hidden dark:bg-teal-800">
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
              {t("for_students")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("students_detailed_description")}
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
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("student_benefits")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <BookOpen className="text-secondary-turquoise dark:text-teal-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("personalized_learning")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("personalized_learning_detailed")}</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="text-secondary-turquoise dark:text-teal-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("progress_tracking")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("progress_tracking_detailed")}</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="text-secondary-turquoise dark:text-teal-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("immediate_feedback")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("immediate_feedback_detailed")}</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("student_features")}</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <School className="text-secondary-turquoise dark:text-teal-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("assessment_taking")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("assessment_taking_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("user_friendly_interface")}</li>
                        <li>{t("multiple_device_support")}</li>
                        <li>{t("offline_mode")}</li>
                        <li>{t("accessibility_features")}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <BarChart3 className="text-secondary-turquoise dark:text-teal-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("performance_analytics")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("performance_analytics_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("progress_visualization")}</li>
                        <li>{t("strength_weakness_identification")}</li>
                        <li>{t("improvement_suggestions")}</li>
                        <li>{t("goal_setting_tools")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <BookOpen className="text-secondary-turquoise dark:text-teal-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("learning_resources")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("learning_resources_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("targeted_study_materials")}</li>
                        <li>{t("interactive_exercises")}</li>
                        <li>{t("video_tutorials")}</li>
                        <li>{t("practice_assessments")}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="text-secondary-turquoise dark:text-teal-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("peer_collaboration")}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{t("peer_collaboration_detailed")}</p>
                      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>{t("study_groups")}</li>
                        <li>{t("discussion_forums")}</li>
                        <li>{t("peer_review_options")}</li>
                        <li>{t("collaborative_projects")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("how_it_works_students")}</h2>
            <div className="space-y-6">
              <div className="relative pl-10 pb-10 border-l-2 border-secondary-turquoise dark:border-teal-600">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary-turquoise dark:bg-teal-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_1_access")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_1_access_desc")}</p>
              </div>
              <div className="relative pl-10 pb-10 border-l-2 border-secondary-turquoise dark:border-teal-600">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary-turquoise dark:bg-teal-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_2_complete")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_2_complete_desc")}</p>
              </div>
              <div className="relative pl-10 pb-10 border-l-2 border-secondary-turquoise dark:border-teal-600">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary-turquoise dark:bg-teal-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_3_review")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_3_review_desc")}</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary-turquoise dark:bg-teal-600"></div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("step_4_improve")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t("step_4_improve_desc")}</p>
              </div>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("student_testimonials")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="text-4xl text-secondary-turquoise opacity-20 mb-2">"</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("student_testimonial_1")}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary-turquoise/20 flex items-center justify-center text-secondary-turquoise font-bold">
                      F
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold dark:text-white">Fatima Zahra</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("student_engineering")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="text-4xl text-secondary-turquoise opacity-20 mb-2">"</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("student_testimonial_2")}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary-turquoise/20 flex items-center justify-center text-secondary-turquoise font-bold">
                      Y
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold dark:text-white">Youssef Amrani</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("student_business")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section variants={fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("ready_to_start_learning")}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("ready_to_start_learning_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-secondary-turquoise hover:bg-secondary-turquoise/90 text-white hover:text-white dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                <Link href="/login">{t("get_started")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Link href="/guides/student">{t("view_detailed_guide")}</Link>
              </Button>
            </div>
          </motion.section>
        </motion.div>
      </div>

      <FooterWithLanguage />
    </div>
  )
}
