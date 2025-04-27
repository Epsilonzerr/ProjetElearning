"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import SiteHeader from "@/components/site-header";
import FooterWithLanguage from "@/components/footer-with-language";

export default function PrivacyPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <SiteHeader />

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 dark:text-white">
            {language === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
          </h1>

          <div className="prose dark:prose-invert max-w-none space-y-8">
            {/* Last updated */}
            <p className="text-gray-600 dark:text-gray-300">
              {language === "fr" ? "Dernière mise à jour : 22 avril 2025" : "Last updated: April 22, 2025"}
            </p>

            {/* Section 1: Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "1. Introduction" : "1. Introduction"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? 'Cette Politique de Confidentialité explique comment l\'Institut supérieur du Génie Appliqué ("nous", "notre", "nos") collecte, utilise et protège vos informations personnelles lorsque vous utilisez la plateforme d\'évaluation Evalyo ("la Plateforme").'
                  : 'This Privacy Policy explains how the Institut supérieur du Génie Appliqué ("we", "our", "us") collects, uses, and protects your personal information when you use the Evalyo assessment platform ("the Platform").'}
              </p>
            </section>

            {/* Section 2: Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "2. Informations que nous collectons" : "2. Information We Collect"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Nous collectons les types d'informations suivants:"
                  : "We collect the following types of information:"}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <strong>{language === "fr" ? "Informations de compte" : "Account Information"}</strong>:{" "}
                  {language === "fr"
                    ? "Nom, adresse email, mot de passe, rôle (étudiant ou professeur), et établissement d'enseignement."
                    : "Name, email address, password, role (student or professor), and educational institution."}
                </li>
                <li>
                  <strong>{language === "fr" ? "Données d'évaluation" : "Assessment Data"}</strong>:{" "}
                  {language === "fr"
                    ? "Réponses aux évaluations, notes, commentaires, et temps passé sur les évaluations."
                    : "Assessment responses, grades, comments, and time spent on assessments."}
                </li>
                <li>
                  <strong>{language === "fr" ? "Données d'utilisation" : "Usage Data"}</strong>:{" "}
                  {language === "fr"
                    ? "Informations sur la façon dont vous interagissez avec la Plateforme, y compris les pages visitées, les fonctionnalités utilisées, et les actions effectuées."
                    : "Information about how you interact with the Platform, including pages visited, features used, and actions taken."}
                </li>
                <li>
                  <strong>{language === "fr" ? "Informations techniques" : "Technical Information"}</strong>:{" "}
                  {language === "fr"
                    ? "Adresse IP, type d'appareil, navigateur, et système d'exploitation."
                    : "IP address, device type, browser, and operating system."}
                </li>
              </ul>
            </section>

            {/* Section 3: How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "3. Comment nous utilisons vos informations" : "3. How We Use Your Information"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr" ? "Nous utilisons vos informations pour:" : "We use your information to:"}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>{language === "fr" ? "Fournir, maintenir et améliorer la Plateforme" : "Provide, maintain, and improve the Platform"}</li>
                <li>{language === "fr" ? "Créer et gérer votre compte" : "Create and manage your account"}</li>
                <li>{language === "fr" ? "Faciliter les évaluations et fournir des résultats et des analyses" : "Facilitate assessments and provide results and analytics"}</li>
                <li>{language === "fr" ? "Communiquer avec vous concernant la Plateforme" : "Communicate with you about the Platform"}</li>
                <li>{language === "fr" ? "Détecter et prévenir les activités frauduleuses ou non autorisées" : "Detect and prevent fraudulent or unauthorized activities"}</li>
                <li>{language === "fr" ? "Se conformer aux obligations légales" : "Comply with legal obligations"}</li>
              </ul>
            </section>

            {/* Section 4: Sharing Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "4. Partage de vos informations" : "4. Sharing Your Information"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr" ? "Nous pouvons partager vos informations avec:" : "We may share your information with:"}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <strong>{language === "fr" ? "Votre établissement d'enseignement" : "Your Educational Institution"}</strong>:{" "}
                  {language === "fr" ? "Les professeurs et administrateurs de votre établissement peuvent accéder à vos données." : "Professors and administrators may access your data."}
                </li>
                <li>
                  <strong>{language === "fr" ? "Prestataires de services" : "Service Providers"}</strong>:{" "}
                  {language === "fr" ? "Tiers qui nous aident à fournir la Plateforme." : "Third parties that help us deliver the Platform."}
                </li>
                <li>
                  <strong>{language === "fr" ? "Conformité légale" : "Legal Compliance"}</strong>:{" "}
                  {language === "fr" ? "Pour respecter la loi ou protéger nos droits." : "To comply with law or protect our rights."}
                </li>
              </ul>
            </section>

            {/* Section 5: Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "5. Sécurité des données" : "5. Data Security"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Nous mettons en œuvre des mesures techniques pour protéger vos données, bien qu'aucune méthode ne soit infaillible."
                  : "We implement technical measures to protect your data, though no method is 100% secure."}
              </p>
            </section>

            {/* Section 6: Data Retention */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "6. Conservation des données" : "6. Data Retention"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Nous conservons vos données aussi longtemps que nécessaire pour atteindre les objectifs décrits."
                  : "We retain your data as long as needed to fulfill the purposes described."}
              </p>
            </section>

            {/* Section 7: Your Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "7. Vos droits" : "7. Your Rights"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Vous pouvez demander l'accès, la correction ou la suppression de vos informations personnelles."
                  : "You can request access, correction, or deletion of your personal information."}
              </p>
            </section>

            {/* Section 8: Changes to This Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "8. Modifications de cette politique" : "8. Changes to This Policy"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "fr"
                  ? "Nous pouvons mettre à jour cette politique de confidentialité, et vous en informerons via la Plateforme."
                  : "We may update this Privacy Policy and will notify you via the Platform."}
              </p>
            </section>

            {/* Section 9: Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {language === "fr" ? "9. Contact" : "9. Contact"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Institut supérieur du Génie Appliqué
                <br />
                123 Avenue Hassan II
                <br />
                Casablanca, 20000, Maroc
                <br />
                privacy@iga-platform.ma
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
