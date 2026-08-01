"use client"

import Link from "next/link"
import {
  BookOpen,
  FileText,
  Stamp,
  PencilLine,
  Award,
  Luggage,
  ArrowRight,
} from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { OrganicBlob, FloatingLine, FloatingCircle } from "@/components/decorative-elements"

const services = [
  {
    icon: BookOpen,
    title: "Study-Abroad Counseling",
    description:
      "Expert guidance to select the right country, course, and university for your profile.",
  },
  {
    icon: FileText,
    title: "Application Support",
    description:
      "End-to-end help with applications, SOPs, essays, recommendation letters, and more.",
  },
  {
    icon: Stamp,
    title: "Visa Counseling",
    description:
      "Comprehensive visa documentation, interview preparation, and application tracking.",
  },
  {
    icon: PencilLine,
    title: "Test Preparation",
    description:
      "Structured guidance for IELTS, TOEFL, GRE, GMAT, and other required standardized tests.",
  },
  {
    icon: Award,
    title: "Scholarship Guidance",
    description:
      "Identify and apply for scholarships and funding opportunities to reduce your education costs.",
  },
  {
    icon: Luggage,
    title: "Pre-Departure Support",
    description:
      "Travel arrangements, accommodation guidance, and orientation for a smooth transition abroad.",
  },
]

export function ServicesPreviewSection() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave-white blob-bg relative overflow-hidden bg-background py-20 lg:py-28" ref={ref}>
      {/* Decorative elements */}
      <FloatingCircle className="-top-12 -right-12 hidden lg:block" />
      <FloatingLine className="top-20 left-10" />
      <OrganicBlob className="bottom-0 right-0" size="sm" color="gray" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive support at every step of your study-abroad journey."
            decorativeIcon="cap"
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`animate-on-scroll stagger-${(i % 4) + 1} card-enhanced group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                <service.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center animate-on-scroll">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
