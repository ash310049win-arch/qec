"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { JsonLd } from "@/components/json-ld"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import {
  localBusinessSchema,
  OFFICE_LOCATIONS,
  HEAD_OFFICE,
  BRANCH_OFFICES,
} from "@/lib/site-config"

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
        <div className="animate-fade-up-delay-2 mt-8">
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/book-consultation">
              Book a Free Consultation
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function LocationMap() {
  const [activeId, setActiveId] = useState(OFFICE_LOCATIONS[0].id)
  const active = OFFICE_LOCATIONS.find((o) => o.id === activeId) ?? OFFICE_LOCATIONS[0]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-card-foreground">
                Visit Our Offices
              </h2>
              <p className="mt-1 text-sm font-medium text-primary">{active.label}</p>
              <address className="mt-0.5 text-sm not-italic leading-relaxed text-muted-foreground">
                {active.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
          <a
            href={active.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 sm:flex"
          >
            Open in Google Maps
          </a>
        </div>

        <div
          role="tablist"
          aria-label="Office locations"
          className="mt-5 flex flex-wrap gap-2 pb-4"
        >
          {OFFICE_LOCATIONS.map((office) => {
            const isActive = office.id === active.id
            return (
              <button
                key={office.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(office.id)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {office.city}
              </button>
            )
          })}
        </div>
      </div>
      <iframe
        key={active.id}
        src={active.embedUrl}
        title={`Google Maps location of Quilon Educational Consultancy — ${active.city}`}
        className="block h-[400px] w-full border-0 md:h-[500px]"
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t border-border px-6 py-4 sm:hidden">
        <a
          href={active.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  )
}

function OfficeDirectory() {
  const ref = useScrollAnimation()

  return (
    <div ref={ref} className="mt-16">
      <div className="max-w-2xl">
        <h2 className="animate-on-scroll font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Our Office Locations
        </h2>
        <p className="animate-on-scroll stagger-1 mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
          Walk in to any of our {OFFICE_LOCATIONS.length} offices across Kerala for
          in-person counseling,
          document guidance, and application support.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {OFFICE_LOCATIONS.map((office, i) => (
          <a
            key={office.id}
            href={office.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`animate-on-scroll stagger-${Math.min(i + 1, 4)} group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-sm`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {office.label}
              </span>
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold text-card-foreground">
              {office.city}
            </h3>
            <address className="mt-1.5 text-sm not-italic leading-relaxed text-muted-foreground">
              {office.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Get directions
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>
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
          or visit us at our office.
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
            href="mailto:info@quilonconsultancy.com"
            className="flex items-start gap-3 rounded-lg border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">Email</p>
              <p className="text-sm text-muted-foreground">info@quilonconsultancy.com</p>
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
              <p className="text-sm font-semibold text-card-foreground">
                Head Office — {HEAD_OFFICE.city}
              </p>
              <address className="text-sm not-italic text-muted-foreground">
                {HEAD_OFFICE.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-2 text-sm text-muted-foreground">
                Branches in {BRANCH_OFFICES.map((o) => o.city).join(", ")}
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
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageWrapper>
        <PageBanner />
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <LocationMap />
              </div>
              <div className="lg:col-span-2">
                <ContactInfo />
              </div>
            </div>
            <OfficeDirectory />
          </div>
        </section>
      </PageWrapper>
    </>
  )
}
