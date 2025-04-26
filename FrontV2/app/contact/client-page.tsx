"use client"

import { SiteHeader } from "@/components/site-header"
import { FooterWithLanguage } from "@/components/footer-with-language"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactClientPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("contact_us")}</h1>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    {t("contact_description")}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{t("address")}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        123 Rue de l'Innovation, Casablanca, Maroc
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{t("phone")}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">+212 522 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{t("email")}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">contact@iga-platform.ma</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{t("office_hours")}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("monday_friday")}: 8h30 - 17h30
                        <br />
                        {t("saturday")}: 9h00 - 13h00
                        <br />
                        {t("sunday")}: {t("closed")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{t("send_us_message")}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{t("please_fill_required")}</p>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t("full_name")}
                      </label>
                      <Input id="name" placeholder={t("your_name")} />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t("email_address")}
                      </label>
                      <Input id="email" placeholder={t("your_email")} type="email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("subject")}
                    </label>
                    <Input id="subject" placeholder={t("message_subject")} />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("message")}
                    </label>
                    <Textarea className="min-h-[150px]" id="message" placeholder={t("your_message")} />
                  </div>
                  <Button className="w-full" type="submit">
                    {t("send_message")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterWithLanguage />
    </div>
  )
}
