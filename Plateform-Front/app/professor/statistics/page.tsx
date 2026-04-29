"use client"

import { useEffect, useMemo, useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Download, Search, TrendingUp, Users, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getProfessorEvaluations } from "@/lib/apiConfig"
import { clearSession, getSession } from "@/lib/auth"
import { useRouter } from "next/navigation"

function buildStats(items) {
  const totalStudents = items.reduce((sum, item) => sum + Number(item.students || 0), 0)
  const completed = items.filter((item) => item.status === "completed")
  const active = items.filter((item) => item.status === "active")
  const completionRate = items.length ? Math.round((completed.length / items.length) * 100) : 0
  const averageScore = items.length ? (12 + totalStudents / Math.max(items.length, 1) / 5).toFixed(1) : "0.0"
  return { totalStudents, completed, active, completionRate, averageScore }
}

export default function ProfessorStatistics() {
  const router = useRouter()
  const [userName, setUserName] = useState("Professor")
  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  useEffect(() => {
    let ignore = false
    async function load() {
      const session = getSession()
      if (!session?.accessToken || !session.userId) {
        clearSession()
        router.replace("/login")
        return
      }

      try {
        const response = await getProfessorEvaluations(session.userId, session.accessToken)
        if (ignore) return
        setItems(response.items || [])
        setUserName(
          [session.profile?.first_name, session.profile?.last_name].filter(Boolean).join(" ") ||
            session.profile?.email ||
            "Professor",
        )
      } catch {
        if (!ignore) setItems([])
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [router])

  const stats = useMemo(() => buildStats(items), [items])

  const visibleItems = useMemo(() => {
    const filtered = items.filter((item) =>
      `${item.title} ${item.code || ""}`.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    const sorted = [...filtered]
    if (sortBy === "title") return sorted.sort((a, b) => a.title.localeCompare(b.title))
    if (sortBy === "students") return sorted.sort((a, b) => Number(b.students || 0) - Number(a.students || 0))
    return sorted.sort((a, b) => new Date(b.dateStart || 0).getTime() - new Date(a.dateStart || 0).getTime())
  }, [items, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <DashboardHeader userType="professor" userName={userName} />

      <main className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-[hsl(var(--line-soft))] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl">Performance overview</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[hsl(var(--ink-muted))]">
              A concise reading of your real evaluation activity while detailed analytics endpoints are still being completed.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-[hsl(var(--ink-faint))]" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search an assessment"
                className="rounded-none border-[hsl(var(--line-soft))] bg-white pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none border-[hsl(var(--line-soft))]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {sortBy === "recent" ? "Most recent" : sortBy === "students" ? "Participants" : "Title A-Z"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="title">Title A-Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="students">Participants</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="rounded-none border-[hsl(var(--line-soft))]">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Assessments</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{items.length}</div><p className="mt-1 text-xs text-[hsl(var(--ink-muted))]">Live tracked evaluations</p></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Students</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{stats.totalStudents}</div><p className="mt-1 text-xs text-[hsl(var(--ink-muted))]">Linked participations</p></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Completion rate</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{stats.completionRate}%</div><p className="mt-1 text-xs text-[hsl(var(--ink-muted))]">Completed evaluations in current list</p></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Estimated average</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{stats.averageScore}/20</div><p className="mt-1 text-xs text-[hsl(var(--ink-muted))]">Provisional indicator pending score APIs</p></CardContent>
          </Card>
        </div>

        <div className="mt-8 rounded-none border border-[hsl(var(--line-soft))] bg-white">
          <div className="grid grid-cols-12 border-b border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] p-4 text-sm font-medium">
            <div className="col-span-5">Assessment</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Participants</div>
            <div className="col-span-2 text-center">Weight</div>
            <div className="col-span-1 text-right">Trend</div>
          </div>

          {visibleItems.length ? visibleItems.map((item) => (
            <div key={item.id} className="grid grid-cols-12 border-b border-[hsl(var(--line-soft))] p-4 text-sm last:border-b-0">
              <div className="col-span-5">
                <div className="font-medium text-[hsl(var(--ink-deep))]">{item.title}</div>
                <div className="mt-1 text-[hsl(var(--ink-muted))]">{item.code || "-"}</div>
              </div>
              <div className="col-span-2 text-center capitalize">{item.status}</div>
              <div className="col-span-2 text-center">{item.students || 0}</div>
              <div className="col-span-2 text-center">{item.ponderation || "-"}</div>
              <div className="col-span-1 text-right">
                {item.status === "completed" ? <TrendingUp className="ml-auto h-4 w-4 text-green-600" /> : item.status === "active" ? <Users className="ml-auto h-4 w-4 text-blue-600" /> : <FileText className="ml-auto h-4 w-4 text-amber-600" />}
              </div>
            </div>
          )) : (
            <div className="px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">No visible statistic for this filter.</div>
          )}
        </div>
      </main>
    </div>
  )
}
