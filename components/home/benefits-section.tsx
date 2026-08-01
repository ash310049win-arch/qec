"use client"

import { Users, FileCheck, Globe, HeartHandshake } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { OrganicBlob, FloatingDots, FloatingLine } from "@/components/decorative-elements"

const benefits = [
  {
    icon: Users,
    title: "Personalized Counseling",
    description:
      "One-on-one sessions tailored to your academic profile, career goals, and personal preferences.",
  },
  {
    icon: FileCheck,
    title: "Visa Guidance",
    description:
      "End-to-end visa application support including documentation, interview prep, and follow-up.",
  },
  {
    icon: Globe,
    title: "Top Destinations",
    description:
      "Expert guidance for USA, Canada, UK, Australia, Europe, and more leading study destinations.",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    description:
      "From first consultation to pre-departure briefing and post-arrival assistance.",
  },
]

export function BenefitsSection() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave-white blob-bg relative overflow-hidden bg-background py-20 lg:py-28" ref={ref}>
      {/* Floating decorative accents */}
      <FloatingDots className="top-10 right-12 hidden md:block" />
      <FloatingLine className="bottom-20 left-8" />
      <OrganicBlob className="-top-20 -left-20" size="sm" color="red" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Why Choose Quilon?"
            subtitle="We combine deep expertise with a genuine care for every student's unique journey."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`animate-on-scroll stagger-${i + 1} card-enhanced group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                <benefit.icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-card-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
