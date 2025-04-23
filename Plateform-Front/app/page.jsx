import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full border-b bg-white">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-16" />
          </Link>

          <div className="flex items-center gap-4">
            <Button asChild className="bg-[#4052a8] hover:bg-[#4052a8]/90 text-white">
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about">En savoir plus</Link>
            </Button>
            <div className="relative">
              <select
                className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                defaultValue="fr"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="iga-gradient text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Plateforme d&apos;Évaluation</h1>
              <p className="text-lg md:text-xl opacity-90">
                Une solution moderne pour créer, passer et analyser les évaluations à IGA - Institut supérieur du Génie
                Appliqué.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-primary-blue hover:bg-gray-100">
                  <Link href="/login">Se connecter</Link>
                </Button>
                <Button asChild size="lg" className="bg-white text-primary-blue hover:bg-gray-100">
                  <Link href="/about">En savoir plus</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-white/10 rounded-2xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-white/20 rounded-2xl transform -rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <img src="/images/image.png" alt="IGA Assessment Platform" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="iga-shadow hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                <GraduationCap className="text-primary-blue h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pour les enseignants</h3>
              <p className="text-muted-foreground">
                Créez des évaluations personnalisées, analysez les résultats et obtenez des recommandations basées sur
                l&apos;IA.
              </p>
            </CardContent>
          </Card>

          <Card className="iga-shadow hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-secondary-turquoise/10 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="text-secondary-turquoise h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pour les étudiants</h3>
              <p className="text-muted-foreground">
                Passez vos évaluations en ligne, consultez vos résultats et recevez des recommandations personnalisées.
              </p>
            </CardContent>
          </Card>

          <Card className="iga-shadow hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="text-primary-blue h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyse intelligente</h3>
              <p className="text-muted-foreground">
                Bénéficiez d&apos;analyses détaillées et de recommandations personnalisées grâce à notre technologie IA.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Institut supérieur du Génie Appliqué | Casablanca
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-blue">
                Conditions d&apos;utilisation
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-blue">
                Politique de confidentialité
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-blue">
                Contact
              </Link>
              <div className="relative">
                <select
                  className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  defaultValue="fr"
                >
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

