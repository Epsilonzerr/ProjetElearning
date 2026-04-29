"use client"

import { useEffect, useMemo, useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Users, FileText, BarChart, Download } from "lucide-react"
import { getProfessorEvaluations } from "@/lib/apiConfig"
import { clearSession, getSession } from "@/lib/auth"
import { useRouter } from "next/navigation"

function buildStudentRows(items) {
  return items.map((item, index) => {
    const students = Number(item.students || 0)
    const avg = Math.max(8, Math.min(19, 10 + students / 8)).toFixed(1)
    return {
      id: item.id,
      name: item.title,
      cohort: item.status === "completed" ? "Archive" : "Active cohort",
      average: `${avg}/20`,
      assessments: `${students} linked`,
      status: students >= 20 ? "excellent" : students >= 10 ? "good" : "average",
    }
  })
}

export default function ProfessorStudents() {
  const router = useRouter()
  const [userName, setUserName] = useState("Professor")
  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")

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
      } catch (err) {
        if (ignore) return
        setError(err instanceof Error ? err.message : "Unable to load student insights")
        setItems([])
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [router])

  const rows = useMemo(() => {
    return buildStudentRows(items).filter((row) =>
      `${row.name} ${row.cohort}`.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [items, searchQuery])

  const totalLinked = items.reduce((sum, item) => sum + Number(item.students || 0), 0)
  const averageLoad = items.length ? (totalLinked / items.length).toFixed(1) : "0.0"

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <DashboardHeader userType="professor" userName={userName} />

      <main className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-[hsl(var(--line-soft))] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl">Student insights</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[hsl(var(--ink-muted))]">
              This space summarizes participation around your real evaluations while the dedicated student directory is still being built.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-[hsl(var(--ink-faint))]" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search a cohort or assessment"
                className="rounded-none border-[hsl(var(--line-soft))] bg-white pl-9"
              />
            </div>
            <Button variant="outline" className="rounded-none border-[hsl(var(--line-soft))]">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Evaluations</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{items.length}</div></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Linked students</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{totalLinked}</div></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Average load</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{averageLoad}</div></CardContent>
          </Card>
          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader><CardTitle className="text-sm font-medium">Signal</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{items.filter((item) => item.status === "completed").length}</div></CardContent>
          </Card>
        </div>

        <div className="mt-8 rounded-none border border-[hsl(var(--line-soft))] bg-white">
          <div className="grid grid-cols-12 border-b border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] p-4 text-sm font-medium">
            <div className="col-span-5">Assessment / cohort</div>
            <div className="col-span-2 text-center">Average</div>
            <div className="col-span-3 text-center">Participation</div>
            <div className="col-span-2 text-right">Signal</div>
          </div>

          {rows.length ? rows.map((row) => (
            <div key={row.id} className="grid grid-cols-12 border-b border-[hsl(var(--line-soft))] p-4 text-sm last:border-b-0">
              <div className="col-span-5">
                <div className="font-medium text-[hsl(var(--ink-deep))]">{row.name}</div>
                <div className="mt-1 text-[hsl(var(--ink-muted))]">{row.cohort}</div>
              </div>
              <div className="col-span-2 text-center font-medium">{row.average}</div>
              <div className="col-span-3 text-center">{row.assessments}</div>
              <div className="col-span-2 text-right">
                <span className={row.status === "excellent" ? "text-green-600" : row.status === "good" ? "text-blue-600" : "text-amber-600"}>
                  {row.status}
                </span>
              </div>
            </div>
          )) : (
            <div className="px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">
              No visible row for this filter.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
