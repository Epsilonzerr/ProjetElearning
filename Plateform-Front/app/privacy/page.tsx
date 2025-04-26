"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"

export default function PrivacyPage() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <SiteHeader />

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            {language === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="lead dark:text-gray-300">
              {language === "fr" ? "Dernière mise à jour : 22 avril 2025" : "Last updated: April 22, 2025"}
            </p>

            <h2 className="dark:text-white">{language === "fr" ? "1. Introduction" : "1. Introduction"}</h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? 'Cette Politique de Confidentialité explique comment l\'Institut supérieur du Génie Appliqué ("nous", "notre", "nos") collecte, utilise et protège vos informations personnelles lorsque vous utilisez la plateforme d\'évaluation Evalyo ("la Plateforme").'
                : 'This Privacy Policy explains how the Institut supérieur du Génie Appliqué ("we", "our", "us") collects, uses, and protects your personal information when you use the Evalyo assessment platform ("the Platform").'}
            </p>

            <h2 className="dark:text-white">
              {language === "fr" ? "2. Informations que nous collectons" : "2. Information We Collect"}
            </h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? "Nous collectons les types d'informations suivants:"
                : "We collect the following types of information:"}
            </p>
            <ul className="dark:text-gray-300">
              <li>
                <strong>{language === "fr" ? "Informations de compte" : "Account Information"}</strong>:
                {language === "fr"
                  ? " Nom, adresse email, mot de passe, rôle (étudiant ou professeur), et établissement d'enseignement."
                  : " Name, email address, password, role (student or professor), and educational institution."}
              </li>
              <li>
                <strong>{language === "fr" ? "Données d'évaluation" : "Assessment Data"}</strong>:
                {language === "fr"
                  ? " Réponses aux évaluations, notes, commentaires, et temps passé sur les évaluations."
                  : " Assessment responses, grades, comments, and time spent on assessments."}
              </li>
              <li>
                <strong>{language === "fr" ? "Données d'utilisation" : "Usage Data"}</strong>:
                {language === "fr"
                  ? " Informations sur la façon dont vous interagissez avec la Plateforme, y compris les pages visitées, les fonctionnalités utilisées, et les actions effectuées."
                  : " Information about how you interact with the Platform, including pages visited, features used, and actions taken."}
              </li>
              <li>
                <strong>{language === "fr" ? "Informations techniques" : "Technical Information"}</strong>:
                {language === "fr"
                  ? " Adresse IP, type d'appareil, navigateur, et système d'exploitation."
                  : " IP address, device type, browser, and operating system."}
              </li>
            </ul>

            <h2 className="dark:text-white">
              {language === "fr" ? "3. Comment nous utilisons vos informations" : "3. How We Use Your Information"}
            </h2>
            <p className="dark:text-gray-300">
              {language === "fr" ? "Nous utilisons vos informations pour:" : "We use your information to:"}
            </p>
            <ul className="dark:text-gray-300">
              <li>
                {language === "fr"
                  ? "Fournir, maintenir et améliorer la Plateforme"
                  : "Provide, maintain, and improve the Platform"}
              </li>
              <li>{language === "fr" ? "Créer et gérer votre compte" : "Create and manage your account"}</li>
              <li>
                {language === "fr"
                  ? "Faciliter les évaluations et fournir des résultats et des analyses"
                  : "Facilitate assessments and provide results and analytics"}
              </li>
              <li>
                {language === "fr"
                  ? "Communiquer avec vous concernant la Plateforme"
                  : "Communicate with you about the Platform"}
              </li>
              <li>
                {language === "fr"
                  ? "Détecter et prévenir les activités frauduleuses ou non autorisées"
                  : "Detect and prevent fraudulent or unauthorized activities"}
              </li>
              <li>{language === "fr" ? "Se conformer aux obligations légales" : "Comply with legal obligations"}</li>
            </ul>

            <h2 className="dark:text-white">
              {language === "fr" ? "4. Partage de vos informations" : "4. Sharing Your Information"}
            </h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? "Nous pouvons partager vos informations avec:"
                : "We may share your information with:"}
            </p>
            <ul className="dark:text-gray-300">
              <li>
                <strong>
                  {language === "fr" ? "Votre établissement d'enseignement" : "Your Educational Institution"}
                </strong>
                :
                {language === "fr"
                  ? " Les professeurs et administrateurs de votre établissement peuvent accéder à vos données d'évaluation et à certaines informations de compte."
                  : " Professors and administrators at your institution may access your assessment data and certain account information."}
              </li>
              <li>
                <strong>{language === "fr" ? "Prestataires de services" : "Service Providers"}</strong>:
                {language === "fr"
                  ? " Nous travaillons avec des tiers qui nous aident à fournir et à améliorer la Plateforme."
                  : " We work with third parties that help us provide and improve the Platform."}
              </li>
              <li>
                <strong>{language === "fr" ? "Conformité légale" : "Legal Compliance"}</strong>:
                {language === "fr"
                  ? " Nous pouvons divulguer des informations si nous croyons de bonne foi que cela est nécessaire pour se conformer à la loi, protéger nos droits, ou prévenir la fraude ou l'abus."
                  : " We may disclose information if we believe in good faith that it is necessary to comply with the law, protect our rights, or prevent fraud or abuse."}
              </li>
            </ul>

            <h2 className="dark:text-white">{language === "fr" ? "5. Sécurité des données" : "5. Data Security"}</h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation ou la modification. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée."
                : "We implement appropriate technical and organizational security measures to protect your personal information against loss, misuse, unauthorized access, disclosure, or alteration. However, no method of transmission over the Internet or electronic storage is completely secure."}
            </p>

            <h2 className="dark:text-white">
              {language === "fr" ? "6. Conservation des données" : "6. Data Retention"}
            </h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? "Nous conservons vos informations personnelles aussi longtemps que nécessaire pour fournir la Plateforme et atteindre les objectifs décrits dans cette Politique de Confidentialité, ou aussi longtemps que requis par la loi."
                : "We retain your personal information for as long as necessary to provide the Platform and fulfill the purposes outlined in this Privacy Policy, or as required by law."}
            </p>

            <h2 className="dark:text-white">{language === "fr" ? "7. Vos droits" : "7. Your Rights"}</h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? "Selon votre lieu de résidence, vous pouvez avoir certains droits concernant vos informations personnelles, y compris le droit d'accéder, de corriger, de supprimer ou de limiter l'utilisation de vos informations. Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée ci-dessous."
                : "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or limit the use of your information. To exercise these rights, please contact us at the address provided below."}
            </p>

            <h2 className="dark:text-white">
              {language === "fr" ? "8. Modifications de cette politique" : "8. Changes to This Policy"}
            </h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? 'Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur la Plateforme et en mettant à jour la date de "dernière mise à jour".'
                : 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on the Platform and updating the "last updated" date.'}
            </p>

            <h2 className="dark:text-white">{language === "fr" ? "9. Contact" : "9. Contact"}</h2>
            <p className="dark:text-gray-300">
              {language === "fr"
                ? "Si vous avez des questions ou des préoccupations concernant cette Politique de Confidentialité, veuillez nous contacter à:"
                : "If you have any questions or concerns about this Privacy Policy, please contact us at:"}
            </p>
            <p className="dark:text-gray-300">
              Institut supérieur du Génie Appliqué
              <br />
              123 Avenue Hassan II
              <br />
              Casablanca, 20000
              <br />
              Maroc
              <br />
              privacy@iga-platform.ma
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Link href="/">{language === "fr" ? "Retour à l'accueil" : "Back to Home"}</Link>
            </Button>
          </div>
        </div>
      </main>

      <FooterWithLanguage />
    </div>
  )
}
