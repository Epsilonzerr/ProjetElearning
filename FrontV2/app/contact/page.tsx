"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Mail, MapPin, Phone, Send, Facebook, Twitter, Linkedin, Instagram, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import SiteHeader from "@/components/site-header"
import FooterWithLanguage from "@/components/footer-with-language"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function ContactPage() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Only render the component after it has mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormError(t("please_fill_required"))
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setFormError(t("invalid_email"))
      return
    }

    // Clear any errors
    setFormError("")

    // In a real application, you would send the form data to your backend here
    console.log("Form submitted:", formState)

    // Show success message
    setFormSubmitted(true)

    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12 max-w-7xl flex-grow">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("contact_us")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact_description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="lg:col-span-2 bg-card rounded-xl shadow-sm p-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">{t("message_sent")}</h2>
                <p className="text-center text-muted-foreground mb-6">{t("message_sent_description")}</p>
                <Button onClick={() => setFormSubmitted(false)}>{t("send_another_message")}</Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">{t("send_us_message")}</h2>

                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{formError}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t("full_name")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder={t("your_name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t("email_address")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder={t("your_email")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {t("subject")}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder={t("message_subject")}
                    />
                  </div>

                  <div className="space-y-2 mb-6">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("message")} <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={t("your_message")}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    {t("send_message")}
                  </Button>
                </form>
              </>
            )}
          </motion.div>

          <motion.div
            className="bg-card rounded-xl shadow-sm p-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <h2 className="text-2xl font-bold mb-6">{t("contact_information")}</h2>

            <motion.div variants={fadeIn} className="flex items-start mb-6">
              <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">{t("address")}</h3>
                <p className="text-muted-foreground">
                  Institut supérieur du Génie Appliqué
                  <br />
                  123 Avenue Hassan II
                  <br />
                  Casablanca, 20000
                  <br />
                  Maroc
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start mb-6">
              <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">{t("phone")}</h3>
                <p className="text-muted-foreground">+212 522 123 456</p>
                <p className="text-muted-foreground">+212 522 789 012</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start mb-6">
              <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">{t("email")}</h3>
                <p className="text-muted-foreground">contact@iga-platform.ma</p>
                <p className="text-muted-foreground">support@iga-platform.ma</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start mb-8">
              <Clock className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">{t("office_hours")}</h3>
                <p className="text-muted-foreground">{t("monday_friday")}: 8:30 - 17:00</p>
                <p className="text-muted-foreground">{t("saturday")}: 9:00 - 13:00</p>
                <p className="text-muted-foreground">
                  {t("sunday")}: {t("closed")}
                </p>
              </div>
            </motion.div>

            <Separator className="my-6" />

            <h3 className="font-medium mb-4">{t("follow_us")}</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-background hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="rounded-xl overflow-hidden shadow-sm h-[400px] mb-16"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846399874089!2d-7.6368899!3d33.5731591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIzLjQiTiA3wrAzOCcxMi44Ilc!5e0!3m2!1sen!2sma!4v1650000000000!5m2!1sen!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("faq_contact")}</h2>
          <p className="text-muted-foreground mb-6">{t("faq_contact_description")}</p>
          <Button variant="outline" onClick={() => (window.location.href = "/about#faq")}>
            {t("view_faq")}
          </Button>
        </motion.div>
      </div>

      <FooterWithLanguage />
    </div>
  )
}
