"use client"

import React from "react"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Send,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "Ireland",
  "New Zealand",
  "Other",
]

const educationLevels = [
  "High School / 12th Grade",
  "Bachelor's Degree",
  "Master's Degree",
  "Working Professional",
  "Other",
]

const intakes = [
  "Spring 2026",
  "Fall 2026",
  "Spring 2027",
  "Fall 2027",
  "Not sure yet",
]

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Contact Us
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          Ready to take the first step? Get in touch with our team for a free consultation
          and let us help you plan your study abroad journey.
        </p>
      </div>
    </section>
  )
}

function ContactForm() {
  const ref = useScrollAnimation()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    educationLevel: "",
    country: "",
    intake: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const updateField = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    if (!form.name.trim()) return "Please enter your full name."
    if (!form.email.trim()) return "Please enter your email address."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Please enter a valid email address."
    if (!form.phone.trim()) return "Please enter your phone number."
    if (!form.educationLevel) return "Please select your current education level."
    if (!form.country) return "Please select your desired country."
    if (!form.message.trim()) return "Please write a short message."
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      setStatus("error")
      return
    }

    setStatus("submitting")
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.")
      }
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )
    }
  }

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      educationLevel: "",
      country: "",
      intake: "",
      message: "",
    })
    setStatus("idle")
    setError("")
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold text-card-foreground">
          Thank You!
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Your message has been sent successfully. Our team will get back to you
          within 24 hours to schedule your free consultation.
        </p>
        <Button className="mt-6" onClick={resetForm}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div ref={ref}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-border bg-card p-6 lg:p-8"
      >
        <h2 className="font-heading text-xl font-bold text-card-foreground">
          Book a Free Consultation
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in your details and we will reach out to you shortly.
        </p>

        <div className="mt-6 flex flex-col gap-5">
          {/* Name */}
          <div className="animate-on-scroll">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Your full name"
              required
              value={form.name}
              onChange={(e) => updateField("name")(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Email & Phone */}
          <div className="animate-on-scroll grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={(e) => updateField("email")(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone / WhatsApp *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={form.phone}
                onChange={(e) => updateField("phone")(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Education & Country */}
          <div className="animate-on-scroll grid gap-5 sm:grid-cols-2">
            <div>
              <Label>Current Education Level *</Label>
              <Select
                value={form.educationLevel}
                onValueChange={updateField("educationLevel")}
                required
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Desired Country *</Label>
              <Select value={form.country} onValueChange={updateField("country")} required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Target Intake */}
          <div className="animate-on-scroll">
            <Label>Target Intake</Label>
            <Select value={form.intake} onValueChange={updateField("intake")}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select intake" />
              </SelectTrigger>
              <SelectContent>
                {intakes.map((intake) => (
                  <SelectItem key={intake} value={intake}>
                    {intake}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="animate-on-scroll">
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your study abroad goals, questions, or anything else you'd like to share..."
              rows={4}
              required
              value={form.message}
              onChange={(e) => updateField("message")(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Error */}
          {status === "error" && error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <div className="animate-on-scroll">
            <Button
              type="submit"
              size="lg"
              className="w-full text-base"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Inquiry
                </>
              )}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              We normally respond within 24 hours.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

function ContactInfo() {
  const ref = useScrollAnimation()

  return (
    <div className="flex flex-col gap-6" ref={ref}>
      {/* Info Card */}
      <div className="animate-on-scroll rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-card-foreground">
          Get in Touch
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Have questions? Reach out to us directly through any of the channels below,
          or fill out the form and we will get back to you.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <a
            href="tel:+919497771392"
            className="flex items-start gap-3 rounded-lg border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">Phone / WhatsApp</p>
              <p className="text-sm text-muted-foreground">+91 94977 71392</p>
              <p className="text-sm text-muted-foreground">+91 92077 74401</p>
            </div>
          </a>

          <a
            href="mailto:quilonconsultancy@gmail.com"
            className="flex items-start gap-3 rounded-lg border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">Email</p>
              <p className="text-sm text-muted-foreground">quilonconsultancy@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/919497771392"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-lg border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">WhatsApp</p>
              <p className="text-sm text-muted-foreground">Chat with us on WhatsApp</p>
            </div>
          </a>

          <div className="flex items-start gap-3 rounded-lg border border-border p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">Office</p>
              <p className="text-sm text-muted-foreground">
                Opp. Swayamvara Silks, Pulamon Junction
                <br />
                Kottarakara, Kollam, Kerala - 691531
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="animate-on-scroll stagger-2 rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-card-foreground">
          Office Hours
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          <li className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span className="font-medium text-card-foreground">9:00 AM - 6:00 PM</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Saturday</span>
            <span className="font-medium text-card-foreground">10:00 AM - 4:00 PM</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sunday</span>
            <span className="font-medium text-card-foreground">Closed</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
