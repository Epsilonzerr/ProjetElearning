"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import SiteHeader from "@/components/site-header";
import FooterWithLanguage from "@/components/footer-with-language";

export default function TermsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <SiteHeader />

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 dark:text-white">
            {language === "fr" ? "Conditions d'utilisation" : "Terms of Use"}
          </h1>

          <div className="max-w-none prose dark:prose-invert space-y-8">
            <p className="text-gray-600 dark:text-gray-300">
              {language === "fr" ? "Dernière mise à jour : 22 avril 2025" : "Last updated: April 22, 2025"}
            </p>

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "1. Acceptation des conditions" : "1. Acceptance of Terms"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "En accédant à ou en utilisant la plateforme d'évaluation Evalyo (\"la Plateforme\"), vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la Plateforme."
                  : 'By accessing or using the Evalyo assessment platform ("the Platform"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Platform.'}
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "2. Description du service" : "2. Description of Service"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "La Plateforme est un outil d'évaluation en ligne destiné aux établissements d'enseignement superieur IGA, permettant aux professeurs de créer et gérer des évaluations, et aux étudiants de participer à ces évaluations."
                  : "The Platform is an online assessment tool intended for Superior educational institutions (IGA), allowing professors to create and manage assessments, and students to participate in these assessments."}
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "3. Comptes utilisateurs" : "3. User Accounts"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Pour utiliser la Plateforme, vous devez créer un compte avec une adresse email valide fournie par votre établissement. Vous êtes responsable de maintenir la confidentialité de vos informations de connexion et de toutes les activités qui se produisent sous votre compte."
                  : "To use the Platform, you must create an account with a valid email address provided by your institution. You are responsible for maintaining the confidentiality of your login information and for all activities that occur under your account."}
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "4. Conduite des utilisateurs" : "4. User Conduct"}
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  {language === "fr"
                    ? "Violer les lois applicables ou les droits d'autrui"
                    : "Violate applicable laws or the rights of others"}
                </li>
                <li>
                  {language === "fr"
                    ? "Tricher lors des évaluations ou aider d'autres à tricher"
                    : "Cheat during assessments or help others to cheat"}
                </li>
                <li>
                  {language === "fr"
                    ? "Distribuer des virus ou d'autres technologies nuisibles"
                    : "Distribute viruses or other harmful technologies"}
                </li>
                <li>
                  {language === "fr"
                    ? "Tenter d'accéder à des comptes ou des données qui ne vous appartiennent pas"
                    : "Attempt to access accounts or data that do not belong to you"}
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "5. Propriété intellectuelle" : "5. Intellectual Property"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Tout le contenu et les fonctionnalités de la Plateforme sont la propriété de l'Institut supérieur du Génie Appliqué et sont protégés par les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer, modifier ou créer des œuvres dérivées de ce contenu sans autorisation explicite."
                  : "All content and functionality on the Platform are the property of the Institut supérieur du Génie Appliqué and are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without explicit permission."}
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "6. Confidentialité" : "6. Privacy"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Votre utilisation de la Plateforme est également régie par notre Politique de Confidentialité, qui décrit comment nous collectons, utilisons et partageons vos informations personnelles."
                  : "Your use of the Platform is also governed by our Privacy Policy, which describes how we collect, use, and share your personal information."}
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "8. Modifications des conditions" : "8. Changes to Terms"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Nous nous réservons le droit de modifier ces Conditions d'Utilisation à tout moment. Les modifications entreront en vigueur dès leur publication sur la Plateforme. Votre utilisation continue de la Plateforme après de telles modifications constitue votre acceptation des nouvelles conditions."
                  : "We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Platform. Your continued use of the Platform after such modifications constitutes your acceptance of the new terms."}
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "9. Loi applicable" : "9. Governing Law"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Ces Conditions d'Utilisation sont régies par les lois du Maroc, sans égard aux principes de conflits de lois."
                  : "These Terms of Use are governed by the laws of Morocco, without regard to conflict of law principles."}
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "10. Contact" : "10. Contact"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Si vous avez des questions concernant ces Conditions d'Utilisation, veuillez nous contacter à:"
                  : "If you have any questions about these Terms of Use, please contact us at:"}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Institut supérieur du Génie Appliqué
                <br />
                123 Avenue Hassan II
                <br />
                Casablanca, 20000, Maroc
                <br />
                contact@iga-platform.ma
              </p>
            </section>
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              <Link href="/">{language === "fr" ? "Retour à l'accueil" : "Back to Home"}</Link>
            </Button>
          </div>
        </div>
      </main>

      <FooterWithLanguage />
    </div>
  );
}
