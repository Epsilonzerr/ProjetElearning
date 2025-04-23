"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Veuillez saisir votre adresse email")
      return
    }

    // Validate email domain
    if (!email.endsWith("@iga.ac.ma") && !email.endsWith("@etud.iga.ac.ma")) {
      setError("Veuillez utiliser votre adresse email IGA (@iga.ac.ma ou @etud.iga.ac.ma)")
      return
    }

    // Simulate API call
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-gray-600">Récupération de mot de passe</p>
        </div>

        <Card className="iga-shadow">
          <CardHeader>
            <CardTitle>Mot de passe oublié</CardTitle>
            <CardDescription>Saisissez votre adresse email pour recevoir un lien de réinitialisation</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">
                    Un email de réinitialisation a été envoyé à {email}. Veuillez vérifier votre boîte de réception.
                  </AlertDescription>
                </Alert>

                <div className="text-sm text-muted-foreground">
                  <p>Si vous ne recevez pas l'email dans les prochaines minutes :</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Vérifiez votre dossier de spam ou courrier indésirable</li>
                    <li>Assurez-vous que l'adresse email saisie est correcte</li>
                    <li>Contactez le support technique si le problème persiste</li>
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nom@iga.ac.ma ou nom@etud.iga.ac.ma"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Envoyer le lien de réinitialisation
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/login" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Retour à la page de connexion
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

