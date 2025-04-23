'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Bell, User, Settings, LogOut } from "lucide-react"
import { getUserData, getEvaluations, joinEvaluation } from "@/lib/apiConfig" 
import FooterWithLanguage from "@/components/footer-with-language"


type User = {
  first_name: string;
  last_name: string;
  email: string;
}

type Evaluation = {
  duration: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  status: "active" | "completed" | "pending";
  code: string;
}

export default function StudentDashboard() {
  const [code, setCode] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [joinedEvaluation, setJoinedEvaluation] = useState<Evaluation | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("token")
      console.log(userId)

      if (!userId || !token) return router.replace("/login")

      try {
        const [userData, evalData] = await Promise.all([
          getUserData(userId, token),
          getEvaluations(userId, token)
        ])

        setUser(userData)
        setEvaluations([...evalData.active, ...evalData.completed])
      } catch (err) {
        console.error("Error loading data:", err)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.replace("/login")
  }

  const handleJoinAssessment = async (code: string) => {
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    if (!userId || !token || !code) return

    try {
      const result = await joinEvaluation(userId, token, code)
      console.log(result.eval_data)
      const newEval: Evaluation = {
        title: result.eval_data.title,
        description: result.eval_data.description,
        status: result.eval_data.status,
        code: result.eval_data.code,
        duration: result.eval_data.duration,
        dateStart: result.eval_data.dateStart,
        dateEnd: result.eval_data.dateEnd
      }

      setJoinedEvaluation(newEval)
      setCode("") 

    } catch (err) {
      console.error("Erreur lors de la participation :", err)
    }
  }

  const isAlreadyJoined = joinedEvaluation && evaluations.some(e => e.code === joinedEvaluation.code)

  return (
    <div className="min-h-screen flex flex-col">
  
      <header className="w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-14" />
            </Link>
            <nav className="ml-6 hidden md:flex gap-6 text-sm font-medium">
              <Link href="/student/dashboard" className="text-primary">Mes évaluations</Link>
              <Link href="/student/results" className="text-gray-600 hover:text-primary">Résultats</Link>
              <Link href="/student/recommendations" className="text-gray-600 hover:text-primary">Recommandations</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback>{user?.first_name?.[0]}{user?.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Profil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Mon profil</DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Paramètres</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <div className="container py-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold">Mes évaluations</h1>
              <p className="text-muted-foreground">
                Bienvenue <b>{user ? `${user.first_name} ${user.last_name}` : "étudiant"}</b>, voici vos évaluations.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher..." className="pl-8" />
              </div>
              <form onSubmit={(e) => {
                e.preventDefault()
                handleJoinAssessment(code)
              }}>
                <div className="flex gap-2">
                  <Input name="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code d'évaluation" className="w-[180px]" />
                  <Button type="submit" className="bg-[#0f172a] hover:bg-[#1e293b]">Rejoindre</Button>
                </div>
              </form>
            </div>
          </div>

          {joinedEvaluation && !isAlreadyJoined && (
            <div className="mt-6 p-6 bg-white border rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Évaluation Rejointe</h2>
              <p><strong>Titre :</strong> {joinedEvaluation.title}</p>
              <p><strong>Description :</strong> {joinedEvaluation.description}</p>
              <p><strong>Status :</strong> {joinedEvaluation.status}</p>
              <p><strong>Code :</strong> {joinedEvaluation.code}</p>
              <p><strong>Durée :</strong> {joinedEvaluation.duration} minutes</p>
              <p><strong>Date de début :</strong> {new Date(joinedEvaluation.dateStart).toLocaleDateString()}</p>
              <p><strong>Date de fin :</strong> {new Date(joinedEvaluation.dateEnd).toLocaleDateString()}</p>
            </div>
          )}

          {/* TABS ÉVALUATIONS */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Actives</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="flex flex-wrap gap-4 mt-4">
              {evaluations.filter(e => e.status === "active").map((evaluation, i) => (
                <Card key={i} className="w-full md:w-[300px]">
                  <CardHeader>
                    <CardTitle>{evaluation.title}</CardTitle>
                    <CardDescription>{evaluation.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => handleJoinAssessment(evaluation.code)} variant="secondary">
                      Participer
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="flex flex-wrap gap-4 mt-4">
              {evaluations.filter(e => e.status === "completed").map((evaluation, i) => (
                <Card key={i} className="w-full md:w-[300px]">
                  <CardHeader>
                    <CardTitle>{evaluation.title}</CardTitle>
                    <CardDescription>{evaluation.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <span className="text-sm text-muted-foreground">Évaluation terminée</span>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <FooterWithLanguage />
    </div>
  )
}
