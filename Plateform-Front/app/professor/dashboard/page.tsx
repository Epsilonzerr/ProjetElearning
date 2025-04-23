import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Clock, FileText, Plus, Users, Bell, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import FooterWithLanguage from "@/components/footer-with-language"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function ProfessorDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-16" />
            </Link>
            <nav className="ml-8 hidden md:flex space-x-6">
              <Link href="/professor/dashboard" className="text-sm font-medium text-primary">
                Tableau de bord
              </Link>
              <Link href="/professor/assessments" className="text-sm font-medium text-gray-600 hover:text-primary">
                Mes évaluations
              </Link>
              <Link href="/professor/results" className="text-sm font-medium text-gray-600 hover:text-primary">
                Résultats
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback>PD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Prof. Dupont</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Mon profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link href="/login" className="w-full">
                    Se déconnecter
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
              <p className="text-muted-foreground">
                Bienvenue, Prof. Dupont. Gérez vos évaluations et suivez les performances des étudiants.
              </p>
            </div>
            <Link href="/professor/create-assessment">
              <Button className="iga-gradient border-0" size="lg">
                <Plus className="mr-2 h-4 w-4" /> Créer une évaluation
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Évaluations actives</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">+2 depuis la semaine dernière</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Étudiants évalués</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">+22 depuis la semaine dernière</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.2/20</div>
                <p className="text-xs text-muted-foreground">+0.8 depuis la dernière évaluation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prochaine échéance</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2j 4h</div>
                <p className="text-xs text-muted-foreground">Examen de Mathématiques - 3ème année</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Évaluations actives</TabsTrigger>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["Programmation Java", "Bases de données", "Réseaux informatiques", "Intelligence artificielle"].map(
                  (title, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>
                          {i % 2 === 0 ? "2ème année" : "3ème année"} • Code: #
                          {Math.random().toString(36).substring(2, 8)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Participants</span>
                          <span className="font-medium">{20 + i * 5}/40</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary-turquoise"
                            style={{ width: `${((20 + i * 5) / 40) * 100}%` }}
                          ></div>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>Expire dans: {1 + i} jours</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" className="flex-1">
                            Voir les détails
                          </Button>
                          <Button className="flex-1">Voir les résultats</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["Mathématiques", "Physique appliquée"].map((title, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{i % 2 === 0 ? "1ère année" : "2ème année"} • Planifié</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>Date: {new Date(Date.now() + (i + 3) * 86400000).toLocaleDateString()}</p>
                        <p>Durée: {60 + i * 30} minutes</p>
                        <p>Type: {i % 2 === 0 ? "QCM" : "Questions ouvertes"}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1">
                          Modifier
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
                {["Algorithmique", "Systèmes d'exploitation", "Génie logiciel"].map((title, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{i % 2 === 0 ? "3ème année" : "2ème année"} • Terminé</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Moyenne</span>
                        <span className="font-medium">{12 + i * 1.5}/20</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-blue"
                          style={{ width: `${((12 + i * 1.5) / 20) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>Participants: {30 + i * 3}</p>
                        <p>Date: {new Date(Date.now() - (i + 1) * 86400000).toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1">
                          Télécharger
                        </Button>
                        <Button className="flex-1">Voir l'analyse</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FooterWithLanguage />
    </div>
  )
}

