"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard-header"
import { FileText, Clock, BookOpen, ArrowUpDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { t } = useLanguage()
  const [sortBy, setSortBy] = useState("relevance")

  // Mock search results
  const mockResults = [
    {
      type: "assessment",
      title: "Programmation Java - Examen final",
      description: "Évaluation active • Prof. Mr Abid • 3ème année",
      date: "Expire dans: 2 jours",
      url: "/student/assessment?type=summative&code=3re1oZ",
      relevance: 0.95,
      dateCreated: new Date("2023-03-15"),
    },
    {
      type: "result",
      title: "Algorithmique - Examen final",
      description: "Évaluation terminée • Note: 16/20",
      date: "Terminé le: 15/03/2023",
      url: "/student/results?id=0",
      relevance: 0.85,
      dateCreated: new Date("2023-03-01"),
    },
    {
      type: "resource",
      title: "Interfaces vs Classes abstraites en Java",
      description: "Article • Documentation Java",
      date: "Priorité: Élevée",
      url: "/student/resource/0",
      relevance: 0.75,
      dateCreated: new Date("2023-04-10"),
    },
    {
      type: "course",
      title: "Fondamentaux de la POO",
      description: "Parcours d'apprentissage • 80% complété",
      date: "Dernière activité: 10/04/2023",
      url: "/student/learning/poo/interfaces-classes-abstraites",
      relevance: 0.65,
      dateCreated: new Date("2023-02-15"),
    },
  ]

  // Filter results based on query
  const filteredResults = mockResults.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()),
  )

  // Sort results based on selected sort option
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "relevance":
        return b.relevance - a.relevance
      case "newest":
        return b.dateCreated.getTime() - a.dateCreated.getTime()
      case "oldest":
        return a.dateCreated.getTime() - b.dateCreated.getTime()
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Ahmed Benali" showSearch={false} />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Résultats de recherche</h1>
              <p className="text-muted-foreground">
                {sortedResults.length} résultats pour "{query}"
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  {sortBy === "relevance" && "Trier par pertinence"}
                  {sortBy === "newest" && "Trier par date (récent)"}
                  {sortBy === "oldest" && "Trier par date (ancien)"}
                  {sortBy === "title-asc" && "Trier par titre (A-Z)"}
                  {sortBy === "title-desc" && "Trier par titre (Z-A)"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="relevance">Pertinence</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Date (récent)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Date (ancien)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="title-asc">Titre (A-Z)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="title-desc">Titre (Z-A)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-4">
            {sortedResults.length > 0 ? (
              sortedResults.map((result, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{result.title}</CardTitle>
                        <CardDescription>{result.description}</CardDescription>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        {result.type === "assessment" && <Clock className="mr-2 h-4 w-4" />}
                        {result.type === "result" && <FileText className="mr-2 h-4 w-4" />}
                        {result.type === "resource" && <BookOpen className="mr-2 h-4 w-4" />}
                        {result.type === "course" && <BookOpen className="mr-2 h-4 w-4" />}
                        <span>{result.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link href={result.url}>
                        {result.type === "assessment" && "Accéder à l'évaluation"}
                        {result.type === "result" && "Voir les résultats"}
                        {result.type === "resource" && "Consulter la ressource"}
                        {result.type === "course" && "Continuer l'apprentissage"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Aucun résultat trouvé</CardTitle>
                  <CardDescription>
                    Aucun résultat ne correspond à votre recherche "{query}". Essayez avec d'autres termes.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
