"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, PieChart, LineChart, ArrowLeft, TrendingUp, Brain, Lightbulb, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"
import { motion } from "framer-motion"

export default function SmartAnalysisPage() {
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
              {t("smart_analysis")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("analysis_detailed_description")}
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
          {/* Key Features Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("analysis_key_features")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("performance_metrics")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("performance_metrics_detailed")}</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <TrendingUp className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("trend_analysis")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("trend_analysis_detailed")}</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <Brain className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("ai_insights")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("ai_insights_detailed")}</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Visualization Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("data_visualization")}</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-16 h-16 flex items-center justify-center mb-4">
                    <BarChart3 className="text-primary-blue dark:text-blue-400 h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("bar_charts")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("bar_charts_desc")}</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-16 h-16 flex items-center justify-center mb-4">
                    <LineChart className="text-primary-blue dark:text-blue-400 h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("line_graphs")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("line_graphs_desc")}</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-16 h-16 flex items-center justify-center mb-4">
                    <PieChart className="text-primary-blue dark:text-blue-400 h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("pie_charts")}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t("pie_charts_desc")}</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>{t("pro_tip")}:</strong> {t("visualization_tip")}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("analysis_benefits")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold dark:text-white">{t("for_professors")}</h3>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="text-primary-blue dark:text-blue-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{t("teaching_insights")}</p>
                    <p className="text-gray-700 dark:text-gray-300">{t("teaching_insights_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="text-primary-blue dark:text-blue-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{t("class_performance")}</p>
                    <p className="text-gray-700 dark:text-gray-300">{t("class_performance_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="text-primary-blue dark:text-blue-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{t("curriculum_optimization")}</p>
                    <p className="text-gray-700 dark:text-gray-300">{t("curriculum_optimization_desc")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold dark:text-white">{t("for_students")}</h3>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="text-secondary-turquoise dark:text-teal-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{t("learning_insights")}</p>
                    <p className="text-gray-700 dark:text-gray-300">{t("learning_insights_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="text-secondary-turquoise dark:text-teal-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{t("personal_progress")}</p>
                    <p className="text-gray-700 dark:text-gray-300">{t("personal_progress_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="text-secondary-turquoise dark:text-teal-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{t("study_optimization")}</p>
                    <p className="text-gray-700 dark:text-gray-300">{t("study_optimization_desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Use Cases Section */}
          <motion.section variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("analysis_use_cases")}</h2>
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("identifying_gaps")}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("identifying_gaps_desc")}</p>
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm italic text-gray-700 dark:text-gray-300">{t("identifying_gaps_example")}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("predicting_outcomes")}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("predicting_outcomes_desc")}</p>
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm italic text-gray-700 dark:text-gray-300">
                      {t("predicting_outcomes_example")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("personalized_recommendations")}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t("personalized_recommendations_desc")}</p>
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm italic text-gray-700 dark:text-gray-300">
                      {t("personalized_recommendations_example")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section variants={fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t("ready_to_analyze")}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("ready_to_analyze_desc")}
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
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <Link href="/guides/professor#analytics">
                  {t("view_analytics_guide")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.section>
        </motion.div>
      </div>

      <FooterWithLanguage />
    </div>
  )
}
