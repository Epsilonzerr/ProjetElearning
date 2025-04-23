"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowRight, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function JoinAssessmentPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code) {
      setError("Veuillez saisir un code d'évaluation")
      return
    }

    // Simulate validation - in a real app, this would check against a database
    if (code === "3re1oZ") {
      router.push("/student/assessment")
    } else {
      setError("Code d'évaluation invalide ou expiré")
    }
  }

  // Mock recent assessments
  const recentAssessments = [
    { id: 1, title: "Programmation Java", professor: "Prof. Dupont", date: "15/03/2023", code: "3re1oZ" },
    { id: 2, title: "Bases de données", professor: "Prof. Martin", date: "10/03/2023", code: "7Ht5pQ" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-12" />
            </Link>
            <nav className="ml-8 hidden md:flex space-x-6">
              <Link href="/student/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary">
                Mes évaluations
              </Link>
              <Link href="/student/results" className="text-sm font-medium text-gray-600 hover:text-primary">
                Résultats
              </Link>
              <Link href="/student/recommendations" className="text-sm font-medium text-gray-600 hover:text-primary">
                Recommandations
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Ahmed Benali</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Rejoindre une évaluation</h1>
              <p className="text-muted-foreground">
                Saisissez le code fourni par votre professeur pour accéder à l'évaluation
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Saisir un code d'évaluation</CardTitle>
                <CardDescription>
                  Le code d'évaluation est un identifiant unique fourni par votre professeur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="assessment-code">Code d'évaluation</Label>
                    <div className="flex gap-2">
                      <Input
                        id="assessment-code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Ex: 3re1oZ"
                        className="text-lg font-mono"
                      />
                      <Button type="submit" className="bg-[#0f172a] hover:bg-[#1e293b]">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Le code est généralement au format alphanumérique (ex: 3re1oZ)
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Assurez-vous d'avoir suffisamment de temps pour compléter l'évaluation. Une fois commencée, le
                    chronomètre ne peut pas être arrêté.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évaluations récentes</CardTitle>
                  <CardDescription>Accédez rapidement à vos évaluations récentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAssessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                        onClick={() => {
                          setCode(assessment.code)
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary-blue" />
                          <div>
                            <div className="font-medium">{assessment.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {assessment.professor} • {assessment.date}
                            </div>
                          </div>
                        </div>
                        <div className="font-mono text-sm">#{assessment.code}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Comment obtenir un code d'évaluation ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Le code d'évaluation est fourni par votre professeur. Il peut vous être communiqué par email, en
                      classe ou via le système de messagerie de l'IGA.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Problèmes de connexion ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Si vous rencontrez des difficultés pour rejoindre une évaluation, assurez-vous que le code est
                      correct et que l'évaluation est toujours active. Contactez votre professeur si le problème
                      persiste.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Contacter le support
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

