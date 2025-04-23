import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import { Clock, Copy, Edit, FileText, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfessorAssessments() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="professor" userName="Prof. Dupont" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mes évaluations</h1>
              <p className="text-muted-foreground">Gérez toutes vos évaluations et suivez leur progression</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher..." className="pl-8 w-full md:w-[200px]" />
              </div>

              <Button asChild>
                <Link href="/professor/create-assessment">
                  <Plus className="mr-2 h-4 w-4" /> Créer une évaluation
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value="1a">1ère année</SelectItem>
                <SelectItem value="2a">2ème année</SelectItem>
                <SelectItem value="3a">3ème année</SelectItem>
                <SelectItem value="4a">4ème année</SelectItem>
                <SelectItem value="5a">5ème année</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par matière" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les matières</SelectItem>
                <SelectItem value="prog">Programmation</SelectItem>
                <SelectItem value="db">Bases de données</SelectItem>
                <SelectItem value="networks">Réseaux</SelectItem>
                <SelectItem value="math">Mathématiques</SelectItem>
                <SelectItem value="ai">Intelligence artificielle</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="recent">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récentes</SelectItem>
                <SelectItem value="oldest">Plus anciennes</SelectItem>
                <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                <SelectItem value="participants">Nombre de participants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="active">Actives</TabsTrigger>
              <TabsTrigger value="draft">Brouillons</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Programmation Java - Examen final",
                    class: "3ème année",
                    status: "active",
                    code: "3re1oZ",
                    participants: "28/40",
                    expires: "2 jours",
                    created: "15/03/2023",
                  },
                  {
                    title: "Bases de données - Contrôle continu",
                    class: "2ème année",
                    status: "active",
                    code: "7Ht5pQ",
                    participants: "22/35",
                    expires: "1 jour",
                    created: "16/03/2023",
                  },
                  {
                    title: "Réseaux informatiques - QCM",
                    class: "3ème année",
                    status: "active",
                    code: "9kL4mN",
                    participants: "15/40",
                    expires: "3 jours",
                    created: "14/03/2023",
                  },
                  {
                    title: "Intelligence artificielle - Projet",
                    class: "4ème année",
                    status: "draft",
                    code: "",
                    participants: "0/30",
                    expires: "",
                    created: "10/03/2023",
                  },
                  {
                    title: "Mathématiques - Examen partiel",
                    class: "1ère année",
                    status: "completed",
                    code: "2Zx8yW",
                    participants: "38/40",
                    expires: "",
                    created: "01/03/2023",
                  },
                  {
                    title: "Algorithmique - Examen final",
                    class: "2ème année",
                    status: "completed",
                    code: "5Qr9sT",
                    participants: "32/35",
                    expires: "",
                    created: "28/02/2023",
                  },
                ].map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> Voir les détails
                            </DropdownMenuItem>
                            {assessment.status === "active" && (
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" /> Copier le code
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {assessment.status === "active" && (
                          <>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Participants</span>
                              <span className="font-medium">{assessment.participants}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-secondary-turquoise"
                                style={{
                                  width: `${
                                    (Number(assessment.participants.split("/")[0]) /
                                      Number(assessment.participants.split("/")[1])) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                              <Clock className="h-4 w-4" />
                              <span>Expire dans: {assessment.expires}</span>
                            </div>
                          </>
                        )}

                        {assessment.status === "draft" && (
                          <div className="flex items-center gap-2 py-2">
                            <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                              Brouillon
                            </span>
                            <span className="text-sm text-muted-foreground">Non publié</span>
                          </div>
                        )}

                        {assessment.status === "completed" && (
                          <>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Participation</span>
                              <span className="font-medium">{assessment.participants}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-blue"
                                style={{
                                  width: `${
                                    (Number(assessment.participants.split("/")[0]) /
                                      Number(assessment.participants.split("/")[1])) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Terminée
                              </span>
                            </div>
                          </>
                        )}

                        {assessment.status === "active" && (
                          <div className="flex items-center gap-2 mt-3">
                            <span className="font-medium text-sm">Code:</span>
                            <code className="px-2 py-1 bg-muted rounded text-sm font-mono">#{assessment.code}</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        {assessment.status === "active" && (
                          <>
                            <Button variant="outline" className="flex-1" asChild>
                              <Link href={`/professor/assessment/${i}`}>Voir les détails</Link>
                            </Button>
                            <Button className="flex-1" asChild>
                              <Link href={`/professor/results?id=${i}`}>Résultats</Link>
                            </Button>
                          </>
                        )}

                        {assessment.status === "draft" && (
                          <>
                            <Button variant="outline" className="flex-1" asChild>
                              <Link href={`/professor/create-assessment?id=${i}`}>Continuer l'édition</Link>
                            </Button>
                            <Button className="flex-1">Publier</Button>
                          </>
                        )}

                        {assessment.status === "completed" && (
                          <>
                            <Button variant="outline" className="flex-1">
                              Télécharger
                            </Button>
                            <Button className="flex-1" asChild>
                              <Link href={`/professor/results?id=${i}`}>Voir l'analyse</Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Programmation Java - Examen final",
                    class: "3ème année",
                    status: "active",
                    code: "3re1oZ",
                    participants: "28/40",
                    expires: "2 jours",
                    created: "15/03/2023",
                  },
                  {
                    title: "Bases de données - Contrôle continu",
                    class: "2ème année",
                    status: "active",
                    code: "7Ht5pQ",
                    participants: "22/35",
                    expires: "1 jour",
                    created: "16/03/2023",
                  },
                  {
                    title: "Réseaux informatiques - QCM",
                    class: "3ème année",
                    status: "active",
                    code: "9kL4mN",
                    participants: "15/40",
                    expires: "3 jours",
                    created: "14/03/2023",
                  },
                ].map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" /> Copier le code
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Participants</span>
                          <span className="font-medium">{assessment.participants}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary-turquoise"
                            style={{
                              width: `${
                                (Number(assessment.participants.split("/")[0]) /
                                  Number(assessment.participants.split("/")[1])) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                          <Clock className="h-4 w-4" />
                          <span>Expire dans: {assessment.expires}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <span className="font-medium text-sm">Code:</span>
                          <code className="px-2 py-1 bg-muted rounded text-sm font-mono">#{assessment.code}</code>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`/professor/assessment/${i}`}>Voir les détails</Link>
                        </Button>
                        <Button className="flex-1" asChild>
                          <Link href={`/professor/results?id=${i}`}>Résultats</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Intelligence artificielle - Projet",
                    class: "4ème année",
                    status: "draft",
                    code: "",
                    participants: "0/30",
                    expires: "",
                    created: "10/03/2023",
                  },
                ].map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 py-2">
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Brouillon</span>
                          <span className="text-sm text-muted-foreground">Non publié</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`/professor/create-assessment?id=${i}`}>Continuer l'édition</Link>
                        </Button>
                        <Button className="flex-1">Publier</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Mathématiques - Examen partiel",
                    class: "1ère année",
                    status: "completed",
                    code: "2Zx8yW",
                    participants: "38/40",
                    expires: "",
                    created: "01/03/2023",
                  },
                  {
                    title: "Algorithmique - Examen final",
                    class: "2ème année",
                    status: "completed",
                    code: "5Qr9sT",
                    participants: "32/35",
                    expires: "",
                    created: "28/02/2023",
                  },
                ].map((assessment, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Dupliquer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {assessment.class} • {assessment.created}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Participation</span>
                          <span className="font-medium">{assessment.participants}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-blue"
                            style={{
                              width: `${
                                (Number(assessment.participants.split("/")[0]) /
                                  Number(assessment.participants.split("/")[1])) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Terminée</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1">
                          Télécharger
                        </Button>
                        <Button className="flex-1" asChild>
                          <Link href={`/professor/results?id=${i}`}>Voir l'analyse</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

