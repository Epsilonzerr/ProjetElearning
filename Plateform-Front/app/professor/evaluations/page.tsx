"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpDown, CalendarDays, FileText, Plus, Search, Users } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { getProfessorEvaluations } from "@/lib/apiConfig"
import { clearSession, getSession, updateSession } from "@/lib/auth"

type ProfessorEvaluation = {
  id: number
  title: string
  description?: string
  duration?: number | string
  dateStart?: string
  status?: string
  code?: string
  students?: number
  ponderation?: number | string
}

const copy = {
  fr: {
    title: "Espace professeur",
    subtitle: "Pilotez vos evaluations publiees, en attente ou deja terminees depuis un tableau plus lisible.",
    search: "Rechercher une evaluation",
    sortRecent: "Plus recente",
    sortTitle: "Titre A-Z",
    all: "Toutes",
    active: "Actives",
    pending: "En attente",
    completed: "Terminees",
    empty: "Aucune evaluation pour ce filtre.",
    create: "Creer une evaluation",
    total: "Evaluations",
    students: "Participations",
    activeCount: "Actives",
    weight: "Ponderation",
    duration: "Duree",
    created: "Creation",
    code: "Code",
  },
  en: {
    title: "Professor workspace",
    subtitle: "Monitor published, pending, and completed assessments from a clearer working surface.",
    search: "Search an assessment",
    sortRecent: "Most recent",
    sortTitle: "Title A-Z",
    all: "All",
    active: "Active",
    pending: "Pending",
    completed: "Completed",
    empty: "No assessment for this filter.",
    create: "Create an assessment",
    total: "Assessments",
    students: "Participations",
    activeCount: "Active",
    weight: "Weight",
    duration: "Duration",
    created: "Created",
    code: "Code",
  },
}

function formatDate(value, language) {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export default function ProfessorEvaluations() {
  const router = useRouter()
  const { language } = useLanguage()
  const text = copy[language]

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [userName, setUserName] = useState("Professor")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<ProfessorEvaluation[]>([])

  useEffect(() => {
    let ignore = false

    async function loadProfessorSpace() {
      const session = getSession()
      if (!session?.accessToken || !session.userId) {
        clearSession()
        router.replace("/login")
        return
      }

      try {
        setIsLoading(true)
        setError("")
        const result = await getProfessorEvaluations(session.userId, session.accessToken)
        if (ignore) return

        setItems(result.items || [])
        const profileName =
          [session.profile?.first_name, session.profile?.last_name].filter(Boolean).join(" ") ||
          session.profile?.email ||
          "Professor"
        setUserName(profileName)
        updateSession(session)
      } catch (err) {
        if (ignore) return
        const message = err instanceof Error ? err.message : "Unable to load professor evaluations"
        if (message.toLowerCase().includes("token") || message.toLowerCase().includes("forbidden")) {
          clearSession()
          router.replace("/login")
          return
        }
        setError(message)
        setItems([])
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadProfessorSpace()
    return () => {
      ignore = true
    }
  }, [router])

  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter((item) => item.status === "active").length,
      students: items.reduce((sum, item) => sum + (item.students || 0), 0),
    }
  }, [items])

  const filteredItems = useMemo(() => {
    const searched = items.filter((item) =>
      `${item.title} ${item.description || ""} ${item.code || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    )

    const sorted = [...searched]
    if (sortBy === "title") {
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    }

    return sorted.sort((a, b) => new Date(b.dateStart || 0).getTime() - new Date(a.dateStart || 0).getTime())
  }, [items, searchQuery, sortBy])

  const grouped = {
    all: filteredItems,
    active: filteredItems.filter((item) => item.status === "active"),
    pending: filteredItems.filter((item) => item.status === "pending"),
    completed: filteredItems.filter((item) => item.status === "completed"),
  }

  const renderList = (list: ProfessorEvaluation[]) => {
    if (!list.length) {
      return (
        <div className="rounded-none border border-dashed border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">
          {text.empty}
        </div>
      )
    }

    return (
      <div className="grid gap-4 xl:grid-cols-2">
        {list.map((item) => (
          <Card key={item.id} className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <p className="mt-2 text-sm leading-6 text-[hsl(var(--ink-muted))]">{item.description || "-"}</p>
                </div>
                <Badge variant="outline" className="rounded-none capitalize">
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-[hsl(var(--ink-muted))] sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{text.created}: {formatDate(item.dateStart, language)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{text.students}: {item.students || 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{text.duration}: {item.duration || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{text.weight}: {item.ponderation || "-"}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[hsl(var(--ink-faint))]">{text.code}: </span>
                <strong className="text-[hsl(var(--ink-deep))]">{item.code || "-"}</strong>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <DashboardHeader userType="professor" userName={userName} showSearch={false} />

      <main className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-[hsl(var(--line-soft))] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl">{text.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[hsl(var(--ink-muted))]">{text.subtitle}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-[hsl(var(--ink-faint))]" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={text.search}
                className="rounded-none border-[hsl(var(--line-soft))] bg-white pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none border-[hsl(var(--line-soft))]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {sortBy === "recent" ? text.sortRecent : text.sortTitle}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="recent">{text.sortRecent}</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="title">{text.sortTitle}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="rounded-none bg-[hsl(var(--accent-strong))] text-[hsl(var(--ink-deep))] hover:bg-[hsl(var(--accent-soft))]">
              <Link href="/professor/create-assessment">
                <Plus className="mr-2 h-4 w-4" />
                {text.create}
              </Link>
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">{text.total}</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{stats.total}</div></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">{text.activeCount}</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{stats.active}</div></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">{text.students}</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{stats.students}</div></CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mt-8 space-y-6">
          <TabsList className="rounded-none bg-[hsl(var(--paper-muted))]">
            <TabsTrigger value="all">{text.all}</TabsTrigger>
            <TabsTrigger value="active">{text.active}</TabsTrigger>
            <TabsTrigger value="pending">{text.pending}</TabsTrigger>
            <TabsTrigger value="completed">{text.completed}</TabsTrigger>
          </TabsList>

          <TabsContent value="all">{isLoading ? <div className="rounded-none border border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">Loading...</div> : renderList(grouped.all)}</TabsContent>
          <TabsContent value="active">{isLoading ? <div className="rounded-none border border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">Loading...</div> : renderList(grouped.active)}</TabsContent>
          <TabsContent value="pending">{isLoading ? <div className="rounded-none border border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">Loading...</div> : renderList(grouped.pending)}</TabsContent>
          <TabsContent value="completed">{isLoading ? <div className="rounded-none border border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">Loading...</div> : renderList(grouped.completed)}</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
