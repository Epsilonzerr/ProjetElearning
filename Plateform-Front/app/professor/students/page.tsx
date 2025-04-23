import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import { BarChart, Download, FileText, MoreHorizontal, Search, UserPlus, Users } from "lucide-react"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
type User = {
  first_name: string;
  last_name: string;
  email: string;
};
export default function ProfessorStudents() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      console.log(token)
if (!token) {
  console.error("Token is missing");
}


      if (!userId || !token) {
        console.error("User ID or token missing");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:8000/users/data/${userId}/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUser();
  }, []);
  
  
  const handleLogout = () => {
    const router = useRouter();
    localStorage.removeItem("token")
    localStorage.removeItem("user_id");
        localStorage.removeItem("role")
    router.push("/login")




  }

  return (
    <div className="min-h-screen flex flex-col">
<DashboardHeader 
 user={user}
/>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des étudiants</h1>
              <p className="text-muted-foreground">Consultez et gérez les étudiants de vos classes</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher..." className="pl-8 w-full md:w-[200px]" />
              </div>

              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Ajouter des étudiants
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

            <Select defaultValue="name-asc">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                <SelectItem value="class">Classe</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total étudiants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">Répartis sur 5 classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.2/20</div>
                <p className="text-xs text-muted-foreground">+0.8 depuis le dernier semestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">+5% depuis le dernier semestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Évaluations passées</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Ce semestre</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Tous les étudiants</TabsTrigger>
              <TabsTrigger value="1a">1ère année</TabsTrigger>
              <TabsTrigger value="2a">2ème année</TabsTrigger>
              <TabsTrigger value="3a">3ème année</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Liste des étudiants</CardTitle>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Exporter
                    </Button>
                  </div>
                  <CardDescription>Tous les étudiants inscrits à vos cours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">Nom</div>
                      <div className="col-span-2">Classe</div>
                      <div className="col-span-2 text-center">Moyenne</div>
                      <div className="col-span-2 text-center">Évaluations</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {[
                      {
                        name: "Ahmed Benali",
                        class: "3ème année",
                        avg: "16.5/20",
                        completed: "8/10",
                        status: "excellent",
                      },
                      { name: "Fatima Zahra", class: "3ème année", avg: "15.0/20", completed: "10/10", status: "good" },
                      {
                        name: "Karim Idrissi",
                        class: "2ème année",
                        avg: "12.5/20",
                        completed: "7/8",
                        status: "average",
                      },
                      { name: "Leila Alaoui", class: "2ème année", avg: "14.0/20", completed: "8/8", status: "good" },
                      {
                        name: "Omar Benjelloun",
                        class: "1ère année",
                        avg: "10.5/20",
                        completed: "5/6",
                        status: "poor",
                      },
                      {
                        name: "Salma Tazi",
                        class: "3ème année",
                        avg: "17.5/20",
                        completed: "10/10",
                        status: "excellent",
                      },
                      {
                        name: "Youssef Amrani",
                        class: "1ère année",
                        avg: "13.0/20",
                        completed: "6/6",
                        status: "average",
                      },
                      { name: "Zineb Chaoui", class: "2ème année", avg: "15.5/20", completed: "8/8", status: "good" },
                    ].map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2">{student.class}</div>
                        <div className="col-span-2 text-center">
                          <span
                            className={`font-medium ${
                              student.status === "excellent"
                                ? "text-green-600"
                                : student.status === "good"
                                  ? "text-blue-600"
                                  : student.status === "average"
                                    ? "text-amber-600"
                                    : "text-red-600"
                            }`}
                          >
                            {student.avg}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">{student.completed}</div>
                        <div className="col-span-2 text-right">
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
                              <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                              <DropdownMenuItem>Voir les résultats</DropdownMenuItem>
                              <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Retirer du cours</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="3a" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Étudiants de 3ème année</CardTitle>
                      <CardDescription>Tous les étudiants inscrits en 3ème année</CardDescription>
                    </div>
                    <Badge className="ml-2">42 étudiants</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">Nom</div>
                      <div className="col-span-2">Spécialité</div>
                      <div className="col-span-2 text-center">Moyenne</div>
                      <div className="col-span-2 text-center">Évaluations</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {[
                      {
                        name: "Ahmed Benali",
                        speciality: "Développement",
                        avg: "16.5/20",
                        completed: "8/10",
                        status: "excellent",
                      },
                      {
                        name: "Fatima Zahra",
                        speciality: "Réseaux",
                        avg: "15.0/20",
                        completed: "10/10",
                        status: "good",
                      },
                      { name: "Salma Tazi", speciality: "IA", avg: "17.5/20", completed: "10/10", status: "excellent" },
                    ].map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2">{student.speciality}</div>
                        <div className="col-span-2 text-center">
                          <span
                            className={`font-medium ${
                              student.status === "excellent"
                                ? "text-green-600"
                                : student.status === "good"
                                  ? "text-blue-600"
                                  : student.status === "average"
                                    ? "text-amber-600"
                                    : "text-red-600"
                            }`}
                          >
                            {student.avg}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">{student.completed}</div>
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

            <TabsContent value="2a" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Étudiants de 2ème année</CardTitle>
                      <CardDescription>Tous les étudiants inscrits en 2ème année</CardDescription>
                    </div>
                    <Badge className="ml-2">38 étudiants</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">Nom</div>
                      <div className="col-span-2">Spécialité</div>
                      <div className="col-span-2 text-center">Moyenne</div>
                      <div className="col-span-2 text-center">Évaluations</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {[
                      {
                        name: "Karim Idrissi",
                        speciality: "Développement",
                        avg: "12.5/20",
                        completed: "7/8",
                        status: "average",
                      },
                      { name: "Leila Alaoui", speciality: "Réseaux", avg: "14.0/20", completed: "8/8", status: "good" },
                      { name: "Zineb Chaoui", speciality: "IA", avg: "15.5/20", completed: "8/8", status: "good" },
                    ].map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2">{student.speciality}</div>
                        <div className="col-span-2 text-center">
                          <span
                            className={`font-medium ${
                              student.status === "excellent"
                                ? "text-green-600"
                                : student.status === "good"
                                  ? "text-blue-600"
                                  : student.status === "average"
                                    ? "text-amber-600"
                                    : "text-red-600"
                            }`}
                          >
                            {student.avg}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">{student.completed}</div>
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

            <TabsContent value="1a" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Étudiants de 1ère année</CardTitle>
                      <CardDescription>Tous les étudiants inscrits en 1ère année</CardDescription>
                    </div>
                    <Badge className="ml-2">65 étudiants</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-4">Nom</div>
                      <div className="col-span-2">Groupe</div>
                      <div className="col-span-2 text-center">Moyenne</div>
                      <div className="col-span-2 text-center">Évaluations</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {[
                      {
                        name: "Omar Benjelloun",
                        speciality: "Groupe A",
                        avg: "10.5/20",
                        completed: "5/6",
                        status: "poor",
                      },
                      {
                        name: "Youssef Amrani",
                        speciality: "Groupe B",
                        avg: "13.0/20",
                        completed: "6/6",
                        status: "average",
                      },
                    ].map((student, i) => (
                      <div key={i} className="grid grid-cols-12 border-b p-3 text-sm">
                        <div className="col-span-4 font-medium">{student.name}</div>
                        <div className="col-span-2">{student.speciality}</div>
                        <div className="col-span-2 text-center">
                          <span
                            className={`font-medium ${
                              student.status === "excellent"
                                ? "text-green-600"
                                : student.status === "good"
                                  ? "text-blue-600"
                                  : student.status === "average"
                                    ? "text-amber-600"
                                    : "text-red-600"
                            }`}
                          >
                            {student.avg}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">{student.completed}</div>
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
          </Tabs>
        </div>
      </main>
    </div>
  )
}

