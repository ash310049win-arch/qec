"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  FileText,
  Stamp,
  PencilLine,
  Award,
  Luggage,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { OrganicBlob, FloatingDots, FloatingTriangle, FloatingLine, FloatingCircle } from "@/components/decorative-elements"

const audiences = [
  "High school leavers seeking undergraduate programs",
  "Bachelor's graduates pursuing master's or MBA programs",
  "Working professionals looking to upskill with global degrees",
  "Students needing test preparation for IELTS, TOEFL, GRE, or GMAT",
]

const services = [
  {
    icon: BookOpen,
    title: "Study-Abroad Counseling & University Selection",
    description:
      "Our expert counselors work closely with you to understand your academic profile, career ambitions, and personal preferences. We then recommend the best-fit countries, universities, and programs tailored to your goals.",
    features: [
      "In-depth profile evaluation",
      "Country and university shortlisting",
      "Course and program matching",
      "Admission probability assessment",
    ],
  },
  {
    icon: FileText,
    title: "Application Development & Documentation Support",
    description:
      "Crafting a compelling application is key to securing admission at top universities. Our team guides you through every detail, from writing powerful statements of purpose to organizing all required documents.",
    features: [
      "Statement of Purpose (SOP) drafting",
      "Resume and CV preparation",
      "Recommendation letter guidance",
      "Document verification and submission",
    ],
  },
  {
    icon: Stamp,
    title: "Visa Counseling & Interview Preparation",
    description:
      "Navigating visa requirements can be stressful. We simplify the process with thorough documentation support, mock interviews, and step-by-step guidance to maximize your chances of approval.",
    features: [
      "Visa document checklist and review",
      "Mock visa interviews",
      "Embassy appointment scheduling",
      "Post-decision support and follow-up",
    ],
  },
  {
    icon: PencilLine,
    title: "Test Preparation Guidance",
    description:
      "Standardized tests are a critical part of your application. We provide structured study plans, practice materials, and expert tips to help you achieve your target scores.",
    features: [
      "IELTS & TOEFL preparation",
      "GRE & GMAT strategies",
      "Practice tests and feedback",
      "Score improvement workshops",
    ],
  },
  {
    icon: Award,
    title: "Scholarship & Funding Guidance",
    description:
      "Education abroad is an investment, and we help you find ways to reduce the financial burden. From merit-based scholarships to need-based grants, we identify opportunities that match your profile.",
    features: [
      "Scholarship search and matching",
      "Application assistance for funding",
      "Financial planning advice",
      "Education loan guidance",
    ],
  },
  {
    icon: Luggage,
    title: "Pre-Departure & Post-Arrival Support",
    description:
      "Your journey doesn't end with an admission letter. We prepare you for life abroad with travel planning, accommodation guidance, and orientation to help you settle in smoothly.",
    features: [
      "Travel and accommodation arrangements",
      "Pre-departure orientation sessions",
      "Airport pickup coordination",
      "Ongoing post-arrival assistance",
    ],
  },
]

function PageBanner() {
  return (
    <section className="section-divider-wave-white relative overflow-hidden bg-[#1A1A1A] pt-28 pb-20 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] animate-breathe" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary/8 blur-[60px] animate-breathe-slow" aria-hidden="true" />
      <FloatingDots className="top-16 right-20 hidden md:block" />
      <FloatingLine className="bottom-20 left-16" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl text-balance">
          Our Services
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-white/60 leading-relaxed text-pretty">
          Comprehensive, end-to-end support designed to make your study-abroad journey smooth,
          stress-free, and successful.
        </p>
      </div>
    </section>
  )
}

function AudienceSection() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave blob-bg relative overflow-hidden bg-background py-16" ref={ref}>
      <FloatingTriangle className="top-6 right-10 hidden md:block" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="animate-on-scroll card-enhanced rounded-xl border border-border bg-card p-8">
          <h2 className="font-heading text-xl font-bold text-card-foreground">
            Who We Help
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {audiences.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ServicesGrid() {
  const ref = useScrollAnimation()

  return (
    <section className="relative overflow-hidden bg-secondary py-20 lg:py-28" ref={ref}>
      <OrganicBlob className="top-0 right-0" size="lg" color="red" />
      <OrganicBlob className="bottom-0 left-0" size="md" color="gray" />
      <FloatingDots className="top-20 left-8 hidden md:block" />
      <FloatingCircle className="bottom-20 right-10 hidden lg:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="What We Offer"
            subtitle="Every service is designed to address a specific stage of your study-abroad journey."
            decorativeIcon="cap"
          />
        </div>

        <div className="mt-14 flex flex-col gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`animate-on-scroll stagger-${(i % 4) + 1} card-enhanced group rounded-xl border border-border bg-card p-8 transition-all duration-300`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                  <service.icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Button asChild variant="outline" size="sm" className="bg-transparent text-foreground hover:text-foreground border-foreground/20 hover:bg-foreground/5">
                      <Link href="/contact">
                        Get help with this
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <AudienceSection />
      <ServicesGrid />
    </PageWrapper>
  )
}
