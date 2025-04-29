"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  GraduationCap,
  BarChart3,
  BookOpen,
  Users,
  Award,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitcher from "@/components/language-switcher";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

export default function AboutPage() {
  const { t } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* Navbar */}
      <nav className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <AnimatedLogo />
          <div className="flex items-center gap-4">
            <Button
              asChild
              // className="bg-[#4052a8] hover:bg-[#4052a8]/90 text-white hover:text-primary-blue dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Link href="/login">{t("login")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Link href="/">{t("home")}</Link>
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        className="iga-gradient text-white py-16 md:py-24 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about_platform")}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              {t("about_platform_description")}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary-blue hover:bg-gray-100 dark:bg-gray-200 dark:hover:bg-gray-300  hover:text-primary-blue shadow-lg"
            >
              <Link href="/login">{t("get_started")}</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-16 dark:text-white">
        <Tabs defaultValue="platform" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8 dark:bg-gray-800">
            <TabsTrigger
              value="platform"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300"
            >
              {t("the_platform")}
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300"
            >
              {t("key_features")}
            </TabsTrigger>
            <TabsTrigger
              value="benefits"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300"
            >
              {t("benefits")}
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300"
            >
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="platform" className="mt-6">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-4 dark:text-white">
                  {t("about_iga_platform")}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {t("platform_long_description")}
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3 dark:text-white">
                      {t("our_mission")}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("mission_description")}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3 dark:text-white">
                      {t("our_vision")}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("vision_description")}
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* 
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{t("platform_history")}</h3>
                <div className="relative border-l-2 border-primary-blue pl-6 ml-3 space-y-6 dark:border-blue-500">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-primary-blue dark:bg-blue-500"></div>
                    <h4 className="text-xl font-semibold dark:text-white">2020</h4>
                    <p className="text-gray-700 dark:text-gray-300">{t("history_2020")}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-primary-blue dark:bg-blue-500"></div>
                    <h4 className="text-xl font-semibold dark:text-white">2021</h4>
                    <p className="text-gray-700 dark:text-gray-300">{t("history_2021")}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-primary-blue dark:bg-blue-500"></div>
                    <h4 className="text-xl font-semibold dark:text-white">2022</h4>
                    <p className="text-gray-700 dark:text-gray-300">{t("history_2022")}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-primary-blue dark:bg-blue-500"></div>
                    <h4 className="text-xl font-semibold dark:text-white">2023</h4>
                    <p className="text-gray-700 dark:text-gray-300">{t("history_2023")}</p>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">
                  {t("platform_features")}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                        <GraduationCap className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        {t("assessment_creation")}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-400">
                        {t("assessment_creation_desc")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-12 h-12 flex items-center justify-center mb-4">
                        <BarChart3 className="text-secondary-turquoise dark:text-teal-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        {t("analytics_insights")}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-400">
                        {t("analytics_insights_desc")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                        <BookOpen className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        {t("learning_paths")}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-400">
                        {t("learning_paths_desc")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-12 h-12 flex items-center justify-center mb-4">
                        <Users className="text-secondary-turquoise dark:text-teal-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        {t("collaboration")}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-400">
                        {t("collaboration_desc")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="rounded-full bg-primary-blue/10 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                        <Award className="text-primary-blue dark:text-blue-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        {t("personalized_feedback")}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-400">
                        {t("personalized_feedback_desc")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="rounded-full bg-secondary-turquoise/10 dark:bg-teal-900/30 w-12 h-12 flex items-center justify-center mb-4">
                        <Shield className="text-secondary-turquoise dark:text-teal-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        {t("secure_environment")}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-400">
                        {t("secure_environment_desc")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-6">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">
                  {t("platform_benefits")}
                </h2>

                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                    {t("for_students")}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {t("personalized_learning")}
                        </h4>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {t("personalized_learning_desc")}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">{t("immediate_feedback")}</h4>
                        <p className="text-muted-foreground dark:text-gray-400">{t("immediate_feedback_desc")}</p>
                      </div>
                    </div> */}
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {t("progress_tracking")}
                        </h4>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {t("progress_tracking_desc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {t("flexible_learning")}
                        </h4>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {t("flexible_learning_desc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                    {t("for_teachers")}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {t("time_saving")}
                        </h4>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {t("time_saving_desc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {t("data_driven_teaching")}
                        </h4>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {t("data_driven_teaching_desc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {t("customizable_assessments")}
                        </h4>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {t("customizable_assessments_desc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {t("student_insights")}
                        </h4>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {t("student_insights_desc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">FAQ</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {t("faq_question_1")}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("faq_answer_1")}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {t("faq_question_2")}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("faq_answer_2")}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {t("faq_question_3")}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("faq_answer_3")}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {t("faq_question_4")}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("faq_answer_4")}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {t("faq_question_5")}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("faq_answer_5")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <motion.div
        className="bg-gray-50 dark:bg-gray-800 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            {t("ready_to_start")}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("ready_to_start_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-blue hover:bg-primary-blue/90 text-white hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Link href="/login">{t("get_started")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Link href="/contact">{t("contact_us")}</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-auto bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Institut supérieur du Génie
                Appliqué | Casablanca
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-primary-blue dark:text-gray-400 dark:hover:text-blue-400"
              >
                {t("terms")}
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-primary-blue dark:text-gray-400 dark:hover:text-blue-400"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-primary-blue dark:text-gray-400 dark:hover:text-blue-400"
              >
                {t("contact")}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
