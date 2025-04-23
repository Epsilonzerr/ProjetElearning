import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import { BarChart, BookOpen, Download, FileText, PieChart, Users } from "lucide-react"

export default function ProfessorResults() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Résultats & Analyses</h1>
              <p className="text-muted-foreground">Consultez les performances des étudiants et les analyses IA.</p>
            </div>

            <div className="flex gap-2">
              <Select defaultValue="java">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner un cours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="java">Programmation Java</SelectItem>
                  <SelectItem value="db">Bases de données</SelectItem>
                  <SelectItem value="networks">Réseaux</SelectItem>
                  <SelectItem value="ai">Intelligence artificielle</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Exporter
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.8/20</div>
                <p className="text-xs text-muted-foreground">+0.6 par rapport à la dernière évaluation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86%</div>
                <p className="text-xs text-muted-foreground">+4% par rapport à la dernière évaluation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38/42</div>
                <p className="text-xs text-muted-foreground">4 étudiants absents</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temps moyen</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42 min</div>
                <p className="text-xs text-muted-foreground">Sur 60 minutes allouées</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="students">Par étudiant</TabsTrigger>
              <TabsTrigger value="questions">Par question</TabsTrigger>
              <TabsTrigger value="recommendations">Recommandations IA</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Distribution des notes</CardTitle>
                    <CardDescription>Répartition des notes sur l'ensemble de la classe</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Graphique de distribution des notes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Performance par compétence</CardTitle>
                    <CardDescription>Analyse des compétences maîtrisées et à améliorer</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
                      <div className="text-center">
                        <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Graphique radar des compétences</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Analyse de l'évaluation</CardTitle>
                    <CardDescription>Insights générés par l'IA sur les performances globales</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Points forts</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Les concepts de base de la programmation orientée objet sont bien maîtrisés par la majorité
                          des étudiants (82%).
                        </li>
                        <li>
                          Les questions sur l'héritage et le polymorphisme ont obtenu les meilleurs scores (moyenne de
                          16.2/20).
                        </li>
                        <li>
                          La plupart des étudiants (91%) ont correctement implémenté l'algorithme des nombres premiers.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Points à améliorer</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Les différences entre interfaces et classes abstraites restent confuses pour 42% des
                          étudiants.
                        </li>
                        <li>Les concepts avancés du polymorphisme nécessitent plus d'exemples pratiques.</li>
                        <li>28% des étudiants ont des difficultés avec l'optimisation des algorithmes.</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Comparaison avec les évaluations précédentes</h3>
                      <p>
                        Cette évaluation montre une amélioration de 8% par rapport à l'évaluation précédente sur des
                        sujets similaires. Les exercices pratiques supplémentaires semblent avoir eu un impact positif.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance des étudiants</CardTitle>
                  <CardDescription>Résultats individuels et progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">Étudiant</div>
                      <div className="col-span-2 text-center">Note</div>
                      <div className="col-span-2 text-center">Temps</div>
                      <div className="col-span-2 text-center">Progression</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {[
                      { name: "Ahmed Benali", score: 18, time: 38, progress: "+2.5" },
                      { name: "Fatima Zahra", score: 16, time: 45, progress: "+1.0" },
                      { name: "Karim Idrissi", score: 14.5, time: 52, progress: "+0.5" },
                      { name: "Leila Alaoui", score: 15, time: 40, progress: "+2.0" },
                      { name: "Omar Benjelloun", score: 12, time: 58, progress: "-1.0" },
                      { name: "Salma Tazi", score: 17, time: 35, progress: "+3.0" },
                      { name: "Youssef Amrani", score: 13.5, time: 49, progress: "+0.5" },
                      { name: "Zineb Chaoui", score: 15.5, time: 42, progress: "+1.5" },
                    ].map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2 text-center">{student.score}/20</div>
                        <div className="col-span-2 text-center">{student.time} min</div>
                        <div
                          className={`col-span-2 text-center ${
                            Number.parseFloat(student.progress) > 0
                              ? "text-green-600"
                              : Number.parseFloat(student.progress) < 0
                                ? "text-red-600"
                                : ""
                          }`}
                        >
                          {student.progress}
                        </div>
                        <div className="col-span-2 text-right">
                          <Button variant="ghost" size="sm">
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse par question</CardTitle>
                  <CardDescription>Performance des étudiants sur chaque question</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-5">Question</div>
                      <div className="col-span-2 text-center">Taux de réussite</div>
                      <div className="col-span-2 text-center">Temps moyen</div>
                      <div className="col-span-3 text-center">Difficulté</div>
                    </div>

                    {[
                      {
                        text: "Différence entre classe abstraite et interface",
                        success: "68%",
                        time: "8 min",
                        difficulty: "Moyenne",
                      },
                      {
                        text: "Complexité de l'algorithme Quicksort",
                        success: "82%",
                        time: "3 min",
                        difficulty: "Facile",
                      },
                      {
                        text: "Définition du polymorphisme",
                        success: "75%",
                        time: "5 min",
                        difficulty: "Moyenne",
                      },
                      {
                        text: "Association des concepts POO",
                        success: "90%",
                        time: "7 min",
                        difficulty: "Facile",
                      },
                      {
                        text: "Programme pour les nombres premiers",
                        success: "62%",
                        time: "15 min",
                        difficulty: "Difficile",
                      },
                    ].map((question, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-5 font-medium">
                          Q{i + 1}: {question.text}
                        </div>
                        <div
                          className={`col-span-2 text-center ${
                            Number.parseInt(question.success) >= 80
                              ? "text-green-600"
                              : Number.parseInt(question.success) <= 65
                                ? "text-red-600"
                                : "text-amber-600"
                          }`}
                        >
                          {question.success}
                        </div>
                        <div className="col-span-2 text-center">{question.time}</div>
                        <div className="col-span-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              question.difficulty === "Facile"
                                ? "bg-green-100 text-green-800"
                                : question.difficulty === "Moyenne"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommandations pour améliorer les questions</CardTitle>
                  <CardDescription>
                    Suggestions générées par l'IA pour optimiser vos futures évaluations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Questions à reformuler</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">Q1:</span> La question sur les classes abstraites et interfaces
                        pourrait être plus précise. Suggestion: demander des exemples concrets d'utilisation plutôt
                        qu'une définition théorique.
                      </li>
                      <li>
                        <span className="font-medium">Q3:</span> La définition du polymorphisme pourrait être
                        accompagnée d'un cas pratique pour mieux évaluer la compréhension.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Ajustement de la difficulté</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">Q4:</span> L'exercice d'association est trop facile (90% de
                        réussite). Suggestion: ajouter des concepts plus avancés ou des définitions plus nuancées.
                      </li>
                      <li>
                        <span className="font-medium">Q5:</span> L'exercice de programmation est trop long (15 minutes
                        en moyenne). Suggestion: réduire la portée ou diviser en sous-questions.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommandations pédagogiques</CardTitle>
                  <CardDescription>Suggestions personnalisées basées sur l'analyse des résultats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary-blue" />
                      <h3 className="text-lg font-medium">Ressources recommandées pour la classe</h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        {
                          title: "Interfaces vs Classes abstraites: Guide pratique",
                          type: "Article",
                          description:
                            "Un guide complet avec des exemples concrets pour clarifier les différences et cas d'utilisation.",
                          url: "#",
                        },
                        {
                          title: "Atelier pratique sur le polymorphisme en Java",
                          type: "Exercice",
                          description:
                            "Une série d'exercices progressifs pour maîtriser les différentes formes de polymorphisme.",
                          url: "#",
                        },
                        {
                          title: "Optimisation des algorithmes en Java",
                          type: "Vidéo",
                          description:
                            "Une vidéo explicative sur les techniques d'optimisation des algorithmes courants.",
                          url: "#",
                        },
                        {
                          title: "Design patterns en Java: cas pratiques",
                          type: "Cours",
                          description: "Un cours complet sur les design patterns avec des exemples d'implémentation.",
                          url: "#",
                        },
                      ].map((resource, i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{resource.title}</CardTitle>
                            <CardDescription>{resource.type}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm">{resource.description}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="flex gap-2 w-full">
                              <Button variant="outline" className="flex-1">
                                Prévisualiser
                              </Button>
                              <Button className="flex-1">Partager</Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary-blue" />
                      <h3 className="text-lg font-medium">Groupes d'étudiants identifiés</h3>
                    </div>

                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Groupe 1: Excellente maîtrise (8 étudiants)</CardTitle>
                          <CardDescription>Note moyenne: 17.5/20</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Ces étudiants maîtrisent bien tous les concepts. Suggestion: leur proposer des défis plus
                            avancés comme des projets de développement d'applications complètes ou l'exploration de
                            frameworks avancés.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Groupe 2: Bonne compréhension avec quelques lacunes (22 étudiants)
                          </CardTitle>
                          <CardDescription>Note moyenne: 14.2/20</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Ces étudiants comprennent bien les concepts de base mais ont des difficultés avec les
                            aspects plus avancés. Suggestion: renforcer la compréhension des interfaces et classes
                            abstraites avec des exercices pratiques supplémentaires.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Groupe 3: Difficultés significatives (8 étudiants)
                          </CardTitle>
                          <CardDescription>Note moyenne: 10.8/20</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Ces étudiants ont des lacunes importantes dans la compréhension des concepts fondamentaux.
                            Suggestion: organiser des sessions de rattrapage ciblées sur les principes de base de la POO
                            et proposer des ressources supplémentaires avec des explications pas à pas.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Appliquer ces recommandations</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

