"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import DashboardHeader from "@/components/dashboard-header"
import { BookOpen, ExternalLink, FileText, Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function StudentRecommendations() {
  const { t, language } = useLanguage()

  // Mock data for recommendations with translations
  const recommendations = {
    skills: [
      {
        name: "Programmation orientée objet",
        nameEn: "Object-oriented programming",
        progress: 75,
      },
      {
        name: "Algorithmes de tri",
        nameEn: "Sorting algorithms",
        progress: 60,
      },
      {
        name: "Structures de données",
        nameEn: "Data structures",
        progress: 85,
      },
      {
        name: "Interfaces et classes abstraites",
        nameEn: "Interfaces and abstract classes",
        progress: 45,
      },
      {
        name: "Design patterns",
        nameEn: "Design patterns",
        progress: 30,
      },
    ],
    resources: [
      {
        title: "Interfaces vs Classes abstraites en Java",
        titleEn: "Interfaces vs Abstract Classes in Java",
        type: "article",
        typeEn: "article",
        source: "Documentation Java",
        sourceEn: "Java Documentation",
        description:
          "Un guide complet sur les différences et cas d'utilisation des interfaces et classes abstraites en Java.",
        descriptionEn:
          "A comprehensive guide on the differences and use cases of interfaces and abstract classes in Java.",
        url: "#",
        priority: "Élevée",
        priorityEn: "High",
      },
      {
        title: "Polymorphisme avancé en Java",
        titleEn: "Advanced Polymorphism in Java",
        type: "video",
        typeEn: "video",
        source: "Cours IGA",
        sourceEn: "IGA Course",
        description:
          "Une vidéo explicative sur les différentes formes de polymorphisme en Java avec des exemples concrets.",
        descriptionEn: "An explanatory video on the different forms of polymorphism in Java with concrete examples.",
        url: "#",
        priority: "Moyenne",
        priorityEn: "Medium",
      },
      {
        title: "Exercices sur les design patterns",
        titleEn: "Exercises on Design Patterns",
        type: "practice",
        typeEn: "practice",
        source: "Plateforme d'exercices IGA",
        sourceEn: "IGA Exercise Platform",
        description: "Une série d'exercices pour maîtriser les design patterns qui utilisent le polymorphisme.",
        descriptionEn: "A series of exercises to master design patterns that use polymorphism.",
        url: "#",
        priority: "Élevée",
        priorityEn: "High",
      },
      {
        title: "Optimisation des algorithmes en Java",
        titleEn: "Algorithm Optimization in Java",
        type: "article",
        typeEn: "article",
        source: "Blog Tech",
        sourceEn: "Tech Blog",
        description: "Un article détaillé sur les techniques d'optimisation des algorithmes courants en Java.",
        descriptionEn: "A detailed article on optimization techniques for common algorithms in Java.",
        url: "#",
        priority: "Moyenne",
        priorityEn: "Medium",
      },
      {
        title: "Atelier pratique sur les structures de données",
        titleEn: "Practical Workshop on Data Structures",
        type: "workshop",
        typeEn: "workshop",
        source: "Département Informatique IGA",
        sourceEn: "IGA Computer Science Department",
        description: "Un atelier interactif pour approfondir vos connaissances sur les structures de données avancées.",
        descriptionEn: "An interactive workshop to deepen your knowledge of advanced data structures.",
        url: "#",
        priority: "Basse",
        priorityEn: "Low",
      },
    ],
  }

  // Helper function to get the priority color class
  const getPriorityColorClass = (priority) => {
    const priorityText = language === "en" ? priority.priorityEn : priority.priority

    if (priorityText === "Élevée" || priorityText === "High") {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    } else if (priorityText === "Moyenne" || priorityText === "Medium") {
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
    } else {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    }
  }

  // Helper function to get resource type icon
  const getResourceTypeIcon = (type) => {
    const resourceType = language === "en" ? type.typeEn : type.type

    if (resourceType === "video" || resourceType === "vidéo") {
      return <Play className="mr-2 h-4 w-4" />
    } else if (resourceType === "practice" || resourceType === "pratique" || resourceType === "exercices") {
      return <FileText className="mr-2 h-4 w-4" />
    } else {
      return <ExternalLink className="mr-2 h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Anwar Ajaboud" showSearch={false} />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("personalized_recommendations")}</h1>
              <p className="text-muted-foreground">{t("resources_tailored_to_profile")}</p>
            </div>
          </div>

          <Tabs defaultValue="resources" className="space-y-4">
            <TabsList>
              <TabsTrigger value="resources">{t("recommended_resources")}</TabsTrigger>
              <TabsTrigger value="skills">{t("skills_to_improve")}</TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.resources.map((resource, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">
                          {language === "en" ? resource.titleEn : resource.title}
                        </CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColorClass(resource)}`}>
                          {language === "en" ? resource.priorityEn : resource.priority}
                        </span>
                      </div>
                      <CardDescription>
                        {language === "en" ? resource.typeEn : resource.type}
                        {" • "}
                        {language === "en" ? resource.sourceEn : resource.source}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{language === "en" ? resource.descriptionEn : resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/student/resource/${i}`}>
                          {getResourceTypeIcon(resource)}
                          {t("access_resource")}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>{t("skills_to_improve")}</CardTitle>
                  <CardDescription>{t("based_on_recent_assessments")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {recommendations.skills.map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{language === "en" ? skill.nameEn : skill.name}</span>
                        <span className="text-sm">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{t("needs_improvement")}</span>
                        <span>{t("mastered")}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/student/resources">
                      <BookOpen className="mr-2 h-4 w-4" /> {t("view_learning_resources")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
