"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, BarChart3, ArrowRight, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"
import {getUserData,getEvaluations,joinEvaluation} from "@/lib/apiConfig"
export default function Home() {
  const { t } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    setMounted(true)
  }, [])

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const statsData = [
    { value: "10,000+", label: t("students") },
    { value: "500+", label: t("professors") },
    { value: "1,000+", label: t("assessments") },
    { value: "95%", label: t("satisfaction") },
  ]

  const testimonials = [
    {
      quote: t("testimonial_1"),
      author: "Dr. Mohammed Alami",
      role: t("professor_computer_science"),
    },
    {
      quote: t("testimonial_2"),
      author: "Fatima Zahra",
      role: t("student_engineering"),
    },
    {
      quote: t("testimonial_3"),
      author: "Prof. Nadia Benali",
      role: t("department_head"),
    },
  ]

  if (!mounted) {
    return null
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

        <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              className="md:w-1/2 space-y-6"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold leading-tight text-white dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {t("assessment_platform")}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl opacity-90 text-white dark:text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {t("platform_description")}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary-blue hover:bg-gray-100 shadow-lg dark:bg-white dark:text-primary-blue"
                >
                  <Link href="/login">{t("login")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10"
                >
                  <Link href="/about">{t("learn_more")}</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative w-full max-w-md">
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl transform rotate-3"
                  animate={{ rotate: 3 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                ></motion.div>
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl transform -rotate-3"
                  animate={{ rotate: -3 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                ></motion.div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                  <img src="/images/image.png" alt="IGA Assessment Platform" className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
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

      {/* Stats Section */}
      <motion.div
        className="py-16 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statsData.map((stat, index) => (
              <motion.div key={index} variants={cardVariants} className="p-6">
                <motion.p
                  className="text-4xl font-bold text-primary-blue dark:text-primary-blue"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white" variants={fadeIn}>
            {t("main_features")}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={cardVariants}>
              <Card className="iga-shadow hover:shadow-lg transition-shadow h-full dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6 h-full flex flex-col">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-primary-blue/20 w-12 h-12 flex items-center justify-center mb-4">
                    <GraduationCap className="text-primary-blue h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t("for_teachers")}</h3>
                  <p className="text-muted-foreground dark:text-gray-400 flex-grow">{t("teachers_description")}</p>
                  <Button variant="link" className="p-0 h-auto mt-4 flex items-center text-primary-blue" asChild>
                    <Link href="/features/for-teachers">
                      {t("learn_more")} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="iga-shadow hover:shadow-lg transition-shadow h-full dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6 h-full flex flex-col">
                  <div className="rounded-full bg-secondary-turquoise/10 dark:bg-secondary-turquoise/20 w-12 h-12 flex items-center justify-center mb-4">
                    <BookOpen className="text-secondary-turquoise h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t("for_students")}</h3>
                  <p className="text-muted-foreground dark:text-gray-400 flex-grow">{t("students_description")}</p>
                  <Button variant="link" className="p-0 h-auto mt-4 flex items-center text-secondary-turquoise" asChild>
                    <Link href="/features/for-students">
                      {t("learn_more")} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="iga-shadow hover:shadow-lg transition-shadow h-full dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 p-6 h-full flex flex-col">
                  <div className="rounded-full bg-primary-blue/10 dark:bg-primary-blue/20 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="text-primary-blue h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t("smart_analysis")}</h3>
                  <p className="text-muted-foreground dark:text-gray-400 flex-grow">{t("analysis_description")}</p>
                  <Button variant="link" className="p-0 h-auto mt-4 flex items-center text-primary-blue" asChild>
                    <Link href="/features/smart-analysis">
                      {t("learn_more")} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={fadeIn}>
            {t("what_people_say")}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={cardVariants} className="bg-gray-50 p-6 rounded-lg border relative">
                <div className="absolute -top-4 left-6 text-5xl text-primary-blue opacity-20">"</div>
                <p className="text-gray-700 mb-6 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-blue/20 flex items-center justify-center text-primary-blue font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div className="md:w-1/2" variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6">{t("why_choose_us")}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{t("innovative_platform")}</h3>
                    <p className="text-muted-foreground">{t("innovative_platform_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{t("expert_educators")}</h3>
                    <p className="text-muted-foreground">{t("expert_educators_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{t("continuous_improvement")}</h3>
                    <p className="text-muted-foreground">{t("continuous_improvement_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{t("community_support")}</h3>
                    <p className="text-muted-foreground">{t("community_support_desc")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="md:w-1/2" variants={fadeIn}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary-blue to-secondary-turquoise opacity-20 blur-lg"></div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                  <img src="/images/campus-students.jpg" alt="IGA Campus Students" className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="py-16 bg-primary-blue text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("ready_to_start")}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t("ready_to_start_desc")}</p>
          <Button asChild size="lg" className="bg-white text-primary-blue hover:bg-gray-100">
            <Link href="/login">{t("get_started_now")}</Link>
          </Button>
        </div>
      </motion.div>

      <FooterWithLanguage />
    </div>
  )
}
