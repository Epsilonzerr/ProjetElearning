"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, LineChart, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"
import { useLanguage } from "@/contexts/language-context"

const pageCopy = {
  fr: {
    eyebrow: "Evalyo for IGA",
    headline: "L'evaluation academique devient enfin lisible, fluide et credible.",
    intro:
      "Une experience React pensee pour les etudiants et les professeurs, avec une interface plus claire, un parcours plus direct et une lecture immediate des evaluations.",
    primaryCta: "Acceder a la plateforme",
    secondaryCta: "Explorer l'espace professeur",
    campusNote: "Campus connecte, sessions cadrées, suivi en temps reel",
    stat1: "Sessions actives",
    stat2: "Parcours etudiants",
    stat3: "Rendus traces",
    supportTitle: "Une base plus serieuse pour les usages quotidiens",
    supportIntro:
      "Le front prend une direction plus operationnelle: moins de bruit, plus de repères, plus de confiance dans les actions.",
    supportA: "Connexion plus directe",
    supportADesc: "Le parcours d'entree devient plus net, avec des actions visibles des le premier ecran.",
    supportB: "Vision claire des evaluations",
    supportBDesc: "Les etats actifs, les rythmes de session et les points d'attention remontent mieux.",
    supportC: "Un langage visuel plus mature",
    supportCDesc: "Typographie, contrastes et structure donnent une interface moins scolaire et plus produit.",
    detailTitle: "Concue pour piloter, pas seulement pour montrer",
    detailIntro:
      "L'interface d'accueil sert maintenant d'orientation produit: qui entre, pourquoi, et quelle action lancer en premier.",
    detail1: "Une hero section plein cadre avec vrai ancrage visuel",
    detail2: "Des bandes de contenu sans mosaique de cartes generiques",
    detail3: "Des animations courtes qui installent la hierarchie sans distraire",
    flowTitle: "Parcours mis en avant",
    flow1Label: "Etudiant",
    flow1Text: "Rejoindre une evaluation, comprendre son statut et avancer sans friction.",
    flow2Label: "Professeur",
    flow2Text: "Creer, suivre et lire les resultats depuis une interface plus calme.",
    flow3Label: "Plateforme",
    flow3Text: "Poser une base visuelle assez solide pour brancher ensuite les flux reels.",
    finalTitle: "Un front React plus propre, pret pour le vrai branchement.",
    finalText:
      "La suite logique est de connecter cette experience au backend pour que la promesse visuelle s'aligne avec les parcours reels.",
    finalPrimary: "Continuer vers la connexion",
    finalSecondary: "Voir le dashboard etudiant",
  },
  en: {
    eyebrow: "Evalyo for IGA",
    headline: "Academic assessment finally feels clear, fast, and trustworthy.",
    intro:
      "A React experience designed for students and professors, with cleaner navigation, sharper hierarchy, and faster understanding of assessments.",
    primaryCta: "Access the platform",
    secondaryCta: "Explore professor space",
    campusNote: "Connected campus, framed sessions, live progress tracking",
    stat1: "Active sessions",
    stat2: "Student journeys",
    stat3: "Tracked submissions",
    supportTitle: "A stronger foundation for daily use",
    supportIntro:
      "The frontend now moves toward a more operational direction: less noise, clearer orientation, and more confidence in each action.",
    supportA: "Cleaner sign-in entry",
    supportADesc: "The entry flow becomes sharper, with obvious actions from the first screen.",
    supportB: "Better assessment visibility",
    supportBDesc: "Active states, session tempo, and attention points surface more clearly.",
    supportC: "A more mature visual language",
    supportCDesc: "Typography, contrast, and structure make the product feel less academic-demo and more real.",
    detailTitle: "Built to guide action, not just decorate",
    detailIntro:
      "The home experience now works as product orientation: who enters, why they enter, and what to do first.",
    detail1: "A full-bleed hero with a real visual anchor",
    detail2: "Content bands instead of generic dashboard-card mosaics",
    detail3: "Short motion sequences that create hierarchy without noise",
    flowTitle: "Highlighted journeys",
    flow1Label: "Student",
    flow1Text: "Join an assessment, understand its status, and move forward without friction.",
    flow2Label: "Professor",
    flow2Text: "Create, supervise, and read outcomes through a calmer interface.",
    flow3Label: "Platform",
    flow3Text: "Set a strong visual base before connecting the real product flows.",
    finalTitle: "A cleaner React frontend, ready for real integration.",
    finalText:
      "The natural next step is connecting this experience to the backend so the visual promise matches real workflows.",
    finalPrimary: "Continue to sign in",
    finalSecondary: "Open student dashboard",
  },
}

export default function Home() {
  const { language } = useLanguage()
  const copy = pageCopy[language] ?? pageCopy.en

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <SiteHeader />

      <main>
        <section className="hero-shell relative min-h-[calc(100svh-5rem)] overflow-hidden">
          <div className="hero-media absolute inset-0">
            <img
              src="/images/campus-students.jpg"
              alt="Students using the learning platform on campus"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hero-overlay absolute inset-0" />
          <div className="hero-grid absolute inset-0 opacity-40" />

          <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1400px] items-end px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pb-14">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.65fr)] lg:items-end">
              <div className="max-w-3xl">
                <motion.p
                  className="mb-6 inline-flex items-center gap-2 border border-white/20 bg-white/[0.08] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/[0.88] backdrop-blur-md"
                  initial="hidden"
                  animate="visible"
                  custom={0.1}
                  variants={fadeUp}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {copy.eyebrow}
                </motion.p>

                <motion.h1
                  className="max-w-4xl text-5xl leading-[0.95] text-white sm:text-6xl lg:text-8xl"
                  initial="hidden"
                  animate="visible"
                  custom={0.2}
                  variants={fadeUp}
                >
                  {copy.headline}
                </motion.h1>

                <motion.p
                  className="mt-6 max-w-2xl text-base leading-7 text-white/[0.78] sm:text-lg"
                  initial="hidden"
                  animate="visible"
                  custom={0.35}
                  variants={fadeUp}
                >
                  {copy.intro}
                </motion.p>

                <motion.div
                  className="mt-8 flex flex-col gap-4 sm:flex-row"
                  initial="hidden"
                  animate="visible"
                  custom={0.5}
                  variants={fadeUp}
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-none border border-[hsl(var(--accent-strong))] bg-[hsl(var(--accent-strong))] px-7 text-[0.95rem] font-semibold text-[hsl(var(--ink-deep))] hover:bg-[hsl(var(--accent-soft))]"
                  >
                    <Link href="/login">{copy.primaryCta}</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-none border-white/35 bg-white/[0.06] px-7 text-[0.95rem] font-semibold text-white backdrop-blur-sm hover:bg-white/[0.12]"
                  >
                    <Link href="/professor/dashboard">
                      {copy.secondaryCta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="hero-aside ml-auto w-full max-w-md"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm uppercase tracking-[0.22em] text-white/70">{copy.campusNote}</p>
                <div className="mt-4 space-y-4 border-l border-white/[0.18] pl-5">
                  <div className="grid grid-cols-3 gap-3 text-white">
                    <div>
                      <div className="text-2xl font-semibold">24</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">{copy.stat1}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">1.2k</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">{copy.stat2}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">98%</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">{copy.stat3}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))]">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
              <div>
                <p className="section-kicker">Product baseline</p>
                <h2 className="mt-4 max-w-xl text-3xl leading-tight text-[hsl(var(--ink-deep))] sm:text-4xl">
                  {copy.supportTitle}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-[hsl(var(--ink-muted))]">
                  {copy.supportIntro}
                </p>
              </div>

              <div className="grid gap-0 border-y border-[hsl(var(--line-soft))] lg:grid-cols-3 lg:border-x">
                {[
                  [copy.supportA, copy.supportADesc],
                  [copy.supportB, copy.supportBDesc],
                  [copy.supportC, copy.supportCDesc],
                ].map(([title, text], index) => (
                  <motion.div
                    key={title}
                    className="border-b border-[hsl(var(--line-soft))] px-0 py-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-0 last:border-r-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                  >
                    <div className="flex h-full flex-col justify-between gap-8 py-2">
                      <div className="text-sm uppercase tracking-[0.22em] text-[hsl(var(--ink-faint))]">
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl text-[hsl(var(--ink-deep))]">{title}</h3>
                        <p className="mt-4 text-sm leading-7 text-[hsl(var(--ink-muted))]">{text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--background))]">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-24">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <p className="section-kicker">Experience direction</p>
              <h2 className="mt-4 max-w-2xl text-3xl leading-tight text-[hsl(var(--ink-deep))] sm:text-5xl">
                {copy.detailTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[hsl(var(--ink-muted))]">{copy.detailIntro}</p>

              <div className="mt-10 space-y-5">
                {[copy.detail1, copy.detail2, copy.detail3].map((item) => (
                  <div key={item} className="flex items-start gap-4 border-b border-[hsl(var(--line-soft))] pb-5">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[hsl(var(--accent-strong))]" />
                    <p className="text-base leading-7 text-[hsl(var(--ink-deep))]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden border border-[hsl(var(--line-soft))] bg-[hsl(var(--paper-muted))]"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <img
                src="/images/image.png"
                alt="Evalyo platform overview"
                className="h-full min-h-[420px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(6,17,34,0.92))] p-6 text-white sm:p-8">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-white/[0.66]">
                  <LineChart className="h-4 w-4" />
                  {copy.flowTitle}
                </div>
                <div className="mt-6 space-y-5">
                  {[
                    [copy.flow1Label, copy.flow1Text],
                    [copy.flow2Label, copy.flow2Text],
                    [copy.flow3Label, copy.flow3Text],
                  ].map(([label, text]) => (
                    <div key={label} className="border-t border-white/[0.14] pt-4 first:border-t-0 first:pt-0">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/[0.56]">{label}</div>
                      <p className="mt-2 text-sm leading-7 text-white/[0.78]">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[hsl(var(--line-soft))] bg-[hsl(var(--ink-deep))] text-white">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="section-kicker text-[hsl(var(--accent-strong))]">React frontend</p>
                <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-white sm:text-5xl">{copy.finalTitle}</h2>
              </div>
              <div>
                <p className="max-w-xl text-base leading-7 text-white/[0.72]">{copy.finalText}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-none border border-[hsl(var(--accent-strong))] bg-[hsl(var(--accent-strong))] px-7 text-[0.95rem] font-semibold text-[hsl(var(--ink-deep))] hover:bg-[hsl(var(--accent-soft))]"
                  >
                    <Link href="/login">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      {copy.finalPrimary}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-none border-white/25 bg-transparent px-7 text-[0.95rem] font-semibold text-white hover:bg-white/[0.08]"
                  >
                    <Link href="/student/dashboard">{copy.finalSecondary}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterWithLanguage />
    </div>
  )
}
