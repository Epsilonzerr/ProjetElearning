"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, Clock, FileText, Info } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"
import { joinEvaluation } from "@/lib/apiConfig"
import { clearSession, getSession } from "@/lib/auth"

type JoinedAssessment = {
  duration?: number | string
  title?: string
  description?: string
  dateStart?: string
  status?: string
  code?: string
}

const pageCopy = {
  fr: {
    title: "Rejoindre une evaluation",
    subtitle: "Entrez le code fourni par votre professeur pour lier la session a votre compte.",
    practice: "Entrainement",
    summative: "Sommatif",
    practiceDescription: "Un mode plus souple pour s'exercer et verifier ses acquis.",
    summativeDescription: "Un mode encadre pour les evaluations reelles et suivies.",
    codeLabel: "Code d'evaluation",
    codePlaceholder: "Ex: JAVA2026",
    verify: "Verifier le code",
    verifying: "Verification...",
    duration: "Duree",
    code: "Code",
    startAt: "Ouverture",
    restrictions: "Points d'attention",
    terms: "J'accepte les conditions de l'evaluation",
    monitoring: "Je comprends que cette evaluation peut etre surveillee.",
    start: "Commencer l'evaluation",
    loginExpired: "Session invalide. Merci de vous reconnecter.",
    missingCode: "Merci de saisir un code d'evaluation.",
    helper: "Le mode choisi sert a preparer l'entree dans l'evaluation.",
    joinedTitle: "Evaluation reconnue",
    joinedText: "Votre compte est maintenant lie a cette evaluation.",
    practiceInfo: "Aucune restriction forte. Vous pouvez l'utiliser comme espace d'entrainement.",
    summativeInfo: "Verifiez votre environnement avant de lancer une evaluation notee.",
    restriction1: "Copier-coller potentiellement limite",
    restriction2: "Surveillance de session possible",
    restriction3: "Une seule tentative selon le parametrage enseignant",
  },
  en: {
    title: "Join an assessment",
    subtitle: "Enter the code shared by your professor to link the session to your account.",
    practice: "Practice",
    summative: "Summative",
    practiceDescription: "A flexible mode for training and checking progress.",
    summativeDescription: "A controlled mode for real graded sessions.",
    codeLabel: "Assessment code",
    codePlaceholder: "Ex: JAVA2026",
    verify: "Verify code",
    verifying: "Checking...",
    duration: "Duration",
    code: "Code",
    startAt: "Opens",
    restrictions: "Attention points",
    terms: "I accept the assessment conditions",
    monitoring: "I understand this assessment may be monitored.",
    start: "Start assessment",
    loginExpired: "Invalid session. Please sign in again.",
    missingCode: "Please enter an assessment code.",
    helper: "The selected mode prepares the way this assessment will be entered.",
    joinedTitle: "Assessment found",
    joinedText: "Your account is now linked to this assessment.",
    practiceInfo: "No heavy restrictions. You can use it as a training space.",
    summativeInfo: "Check your environment before starting a graded assessment.",
    restriction1: "Copy-paste may be limited",
    restriction2: "Session monitoring may be enabled",
    restriction3: "Single attempt depending on teacher settings",
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

export default function JoinAssessment() {
  const router = useRouter()
  const { language } = useLanguage()
  const copy = pageCopy[language] ?? pageCopy.en

  const [assessmentType, setAssessmentType] = useState("practice")
  const [assessmentCode, setAssessmentCode] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [userName, setUserName] = useState("Student")
  const [joinedAssessment, setJoinedAssessment] = useState<JoinedAssessment | null>(null)

  useEffect(() => {
    const session = getSession()

    if (!session?.accessToken || !session.userId) {
      clearSession()
      router.replace("/login")
      return
    }

    const name =
      [session.profile?.first_name, session.profile?.last_name].filter(Boolean).join(" ") ||
      session.profile?.email ||
      "Student"
    setUserName(name)
  }, [router])

  const handleCodeSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")

    if (!assessmentCode.trim()) {
      setError(copy.missingCode)
      return
    }

    const session = getSession()
    if (!session?.accessToken || !session.userId) {
      clearSession()
      router.replace("/login")
      return
    }

    try {
      setIsLoading(true)
      const response = await joinEvaluation(session.userId, session.accessToken, assessmentCode.trim())
      setJoinedAssessment(response.eval_data || null)
    } catch (err) {
      setJoinedAssessment(null)
      setError(err instanceof Error ? err.message : copy.loginExpired)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartAssessment = () => {
    if (assessmentType === "summative" && !agreedToTerms) return

    const code = joinedAssessment?.code || assessmentCode.trim()
    router.push(`/student/assessment?type=${assessmentType}&code=${encodeURIComponent(code)}`)
  }

  const restrictions = [copy.restriction1, copy.restriction2, copy.restriction3]

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <DashboardHeader userType="student" userName={userName} showSearch={false} />

      <main className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 border-b border-[hsl(var(--line-soft))] pb-8">
          <Button variant="outline" size="icon" asChild className="rounded-none">
            <Link href="/student/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl">{copy.title}</h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[hsl(var(--ink-muted))]">{copy.subtitle}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.8fr)]">
          <div className="space-y-6">
            <Tabs value={assessmentType} onValueChange={setAssessmentType} className="space-y-4">
              <TabsList className="rounded-none bg-[hsl(var(--paper-muted))]">
                <TabsTrigger value="practice">{copy.practice}</TabsTrigger>
                <TabsTrigger value="summative">{copy.summative}</TabsTrigger>
              </TabsList>

              <TabsContent value="practice">
                <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
                  <CardHeader>
                    <CardTitle>{copy.practice}</CardTitle>
                    <CardDescription>{copy.practiceDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="rounded-none border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))]">
                      <Info className="h-4 w-4" />
                      <AlertTitle>{copy.joinedTitle}</AlertTitle>
                      <AlertDescription>{copy.practiceInfo}</AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summative">
                <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
                  <CardHeader>
                    <CardTitle>{copy.summative}</CardTitle>
                    <CardDescription>{copy.summativeDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="rounded-none border-amber-200 bg-amber-50 text-amber-700">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>{copy.restrictions}</AlertTitle>
                      <AlertDescription>{copy.summativeInfo}</AlertDescription>
                    </Alert>
                    <div className="space-y-3">
                      {restrictions.map((restriction) => (
                        <div key={restriction} className="flex items-center gap-2 text-sm text-[hsl(var(--ink-muted))]">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <span>{restriction}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
              <CardHeader>
                <CardTitle>{copy.codeLabel}</CardTitle>
                <CardDescription>{copy.helper}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="assessment-code">{copy.codeLabel}</Label>
                    <Input
                      id="assessment-code"
                      placeholder={copy.codePlaceholder}
                      value={assessmentCode}
                      onChange={(event) => setAssessmentCode(event.target.value.toUpperCase())}
                      disabled={isLoading}
                      className="rounded-none text-center text-lg font-mono"
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full rounded-none">
                    {isLoading ? copy.verifying : copy.verify}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-none border-[hsl(var(--line-soft))] shadow-none">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{joinedAssessment?.title || copy.joinedTitle}</CardTitle>
                  <CardDescription>
                    {joinedAssessment ? copy.joinedText : copy.subtitle}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="rounded-none">
                  {assessmentType === "summative" ? copy.summative : copy.practice}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="rounded-none">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!joinedAssessment ? (
                <div className="rounded-none border border-dashed border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))] px-6 py-12 text-center text-sm text-[hsl(var(--ink-muted))]">
                  {copy.helper}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[hsl(var(--ink-faint))]">{copy.duration}</div>
                      <div className="mt-1 font-medium text-[hsl(var(--ink-deep))]">
                        {joinedAssessment.duration || "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[hsl(var(--ink-faint))]">{copy.code}</div>
                      <div className="mt-1 font-medium text-[hsl(var(--ink-deep))]">
                        {joinedAssessment.code || "-"}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4 text-sm text-[hsl(var(--ink-muted))]">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {copy.startAt}: {formatDate(joinedAssessment.dateStart, language)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{joinedAssessment.description || "-"}</span>
                    </div>
                  </div>

                  {assessmentType === "summative" && (
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="terms" className="text-sm font-medium">
                          {copy.terms}
                        </Label>
                        <p className="text-sm text-[hsl(var(--ink-muted))]">{copy.monitoring}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>

            <CardFooter>
              <Button
                className="w-full rounded-none"
                onClick={handleStartAssessment}
                disabled={!joinedAssessment || (assessmentType === "summative" && !agreedToTerms)}
              >
                {copy.start}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
