"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { OrganicBlob, FloatingTriangle, FloatingDots } from "@/components/decorative-elements"

const steps = [
  {
    number: "01",
    title: "Profile Assessment",
    description:
      "We analyze your academic background, test scores, career aspirations, and budget to build a personalized plan.",
  },
  {
    number: "02",
    title: "Country & University Shortlisting",
    description:
      "Based on your profile, we recommend the best-fit countries and universities aligned with your goals.",
  },
  {
    number: "03",
    title: "Applications & Documentation",
    description:
      "Our team assists with crafting compelling applications, SOPs, essays, and gathering all required documents.",
  },
  {
    number: "04",
    title: "Visa & Pre-Departure Support",
    description:
      "From visa interview coaching to travel arrangements and accommodation guidance, we have you covered.",
  },
]

export function HowItWorksSection() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave relative overflow-hidden bg-secondary py-20 lg:py-28" ref={ref}>
      {/* Organic shapes */}
      <OrganicBlob className="top-0 right-0" size="md" color="red" />
      <OrganicBlob className="bottom-0 left-0" size="sm" color="gray" />
      <FloatingTriangle className="top-16 left-12 hidden md:block" />
      <FloatingDots className="bottom-12 right-16 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="How It Works"
            subtitle="Four simple steps from your first consultation to landing on campus."
            decorativeIcon="checklist"
          />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`animate-on-scroll stagger-${i + 1} relative`}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-full hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="card-enhanced relative rounded-xl border border-border bg-card p-6">
                <span className="font-heading text-4xl font-extrabold text-primary/20">
                  {step.number}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
