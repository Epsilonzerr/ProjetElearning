"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpDown, Clock3, FileText, RefreshCw, Search } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { getEvaluations, getUserData } from "@/lib/apiConfig"
import { clearSession, getSession, updateSession } from "@/lib/auth"

type AssessmentItem = {
  title: string
  description?: string
  duration?: number | string
  dateStart?: string
  status?: string
  code?: string
}

const dashboardCopy = {
  fr: {
    subtitle: "Vos evaluations en cours et celles deja terminees.",
    refresh: "Rafraichir",
    join: "Rejoindre une evaluation",
    searchPlaceholder: "Rechercher une evaluation",
    sortRecent: "Plus recent",
    sortTitle: "Titre A-Z",
    active: "Actives",
    completed: "Terminees",
    activeTitle: "Evaluations actives",
    completedTitle: "Historique recent",
    emptyActive: "Aucune evaluation active pour le moment.",
    emptyCompleted: "Aucune evaluation terminee pour le moment.",
    loadError: "Impossible de charger les donnees.",
    sessionExpired: "Session invalide. Merci de vous reconnecter.",
    code: "Code",
    duration: "Duree",
    startedAt: "Ouverture",
    activeBadge: "Active",
    completedBadge: "Terminee",
  },
  en: {
    subtitle: "Your current assessments and the ones already completed.",
    refresh: "Refresh",
    join: "Join an assessment",
    searchPlaceholder: "Search an assessment",
    sortRecent: "Most recent",
    sortTitle: "Title A-Z",
    active: "Active",
    completed: "Completed",
    activeTitle: "Active assessments",
    completedTitle: "Recent history",
    emptyActive: "No active assessment right now.",
    emptyCompleted: "No completed assessment right now.",
    loadError: "Unable to load data.",
    sessionExpired: "Invalid session. Please sign in again.",
    code: "Code",
    duration: "Duration",
    startedAt: "Opened",
    activeBadge: "Active",
    completedBadge: "Completed",
  },
}

function formatDate(value?: string, language = "fr") {
  if (!value) return "-"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function normalizeAssessments(items: AssessmentItem[] = []) {
  return items.map((item, index) => ({
    id: `${item.code || item.title || "assessment"}-${index}`,
    title: item.title || "Untitled assessment",
    description: item.description || "",
    duration: item.duration || "-",
    dateStart: item.dateStart || "",
    status: item.status || "",
    code: item.code || "-",
  }))
}

export default function StudentDashboard() {
  const router = useRouter()
  const { language, t } = useLanguage()
  const copy = dashboardCopy[language] ?? dashboardCopy.en

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [userName, setUserName] = useState("Student")
  const [activeAssessments, setActiveAssessments] = useState<AssessmentItem[]>([])
  const [completedAssessments, setCompletedAssessments] = useState<AssessmentItem[]>([])

  useEffect(() => {
    let ignore = false

    async function loadDashboard() {
      const session = getSession()

      if (!session?.accessToken || !session.userId) {
        clearSession()
        router.replace("/login")
        return
      }

      try {
        setIsLoading(true)
        setError("")

        const profile = session.profile || (await getUserData(session.userId, session.accessToken))
        const evaluationData = await getEvaluations(session.userId, session.accessToken)

        if (ignore) return

        updateSession({ ...session, profile })
        setUserName(
          [profile.first_name, profile.last_name].filter(Boolean).join(" ") || profile.email || "Student",
        )
        setActiveAssessments(normalizeAssessments(evaluationData.active))
        setCompletedAssessments(normalizeAssessments(evaluationData.completed))
      } catch (err) {
        const message = err instanceof Error ? err.message : copy.loadError

        if (!ignore) {
          if (message.toLowerCase().includes("no evaluations")) {
            setError("")
            setActiveAssessments([])
            setCompletedAssessments([])
            return
          }

          if (message.toLowerCase().includes("forbidden") || message.toLowerCase().includes("token")) {
            clearSession()
            setError(copy.sessionExpired)
            router.replace("/login")
            return
          }

          setError(message)
          setActiveAssessments([])
          setCompletedAssessments([])
        }
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadDashboard()

    return () => {
      ignore = true
    }
  }, [router, copy.loadError, copy.sessionExpired])

  const filterAndSort = (items: AssessmentItem[]) => {
    const filtered = items.filter((item) => {
      const text = `${item.title} ${item.description} ${item.code}`.toLowerCase()
      return text.includes(searchQuery.toLowerCase())
    })

    if (sortBy === "title") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }

    return [...filtered].sort((a, b) => {
      const aDate = new Date(a.dateStart || 0).getTime()
      const bDate = new Date(b.dateStart || 0).getTime()
      return bDate - aDate
    })
  }

  const visibleActive = useMemo(
    () => filterAndSort(activeAssessments),
    [activeAssessments, searchQuery, sortBy],
  )
  const visibleCompleted = useMemo(
    () => filterAndSort(completedAssessments),
    [completedAssessments, searchQuery, sortBy],
  )

  const renderAssessments = (items: ReturnType<typeof normalizeAssessments>, emptyLabel: string, badgeLabel: string) => {
    if (!items.length) {
      return (
        <div className="rounded-none border border-dashed border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">
          {emptyLabel}
        </div>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((assessment) => (
          <Card key={assessment.id} className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-xl">{assessment.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6">
                    {assessment.description || "-"}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="rounded-none">
                  {badgeLabel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-[hsl(var(--ink-muted))]">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                <span>
                  {copy.duration}: {assessment.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>
                  {copy.startedAt}: {formatDate(assessment.dateStart, language)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>
                  {copy.code}: <strong className="text-[hsl(var(--ink-deep))]">{assessment.code}</strong>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <DashboardHeader userType="student" userName={userName} showSearch={false} />

      <main className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-[hsl(var(--line-soft))] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl">{t("dashboard")}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[hsl(var(--ink-muted))]">{copy.subtitle}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-[hsl(var(--ink-faint))]" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="rounded-none border-[hsl(var(--line-soft))] bg-white pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none border-[hsl(var(--line-soft))]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {sortBy === "recent" ? copy.sortRecent : copy.sortTitle}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="recent">{copy.sortRecent}</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="title">{copy.sortTitle}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="rounded-none bg-[hsl(var(--accent-strong))] text-[hsl(var(--ink-deep))] hover:bg-[hsl(var(--accent-soft))]">
              <Link href="/student/join-assessment">{copy.join}</Link>
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Tabs defaultValue="active" className="mt-8 space-y-6">
          <TabsList className="rounded-none bg-[hsl(var(--paper-muted))]">
            <TabsTrigger value="active">{copy.active}</TabsTrigger>
            <TabsTrigger value="completed">{copy.completed}</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-5">
            <h2 className="text-2xl">{copy.activeTitle}</h2>
            {isLoading ? (
              <div className="rounded-none border border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">
                {copy.refresh}...
              </div>
            ) : (
              renderAssessments(visibleActive, copy.emptyActive, copy.activeBadge)
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-5">
            <h2 className="text-2xl">{copy.completedTitle}</h2>
            {isLoading ? (
              <div className="rounded-none border border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">
                {copy.refresh}...
              </div>
            ) : (
              renderAssessments(visibleCompleted, copy.emptyCompleted, copy.completedBadge)
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
