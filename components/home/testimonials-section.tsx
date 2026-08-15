"use client"

import { Star } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { OrganicBlob, FloatingLine, FloatingDots } from "@/components/decorative-elements"

const testimonials = [
  {
    name: "Anjali Nair",
    university: "University of Limerick",
    country: "Ireland",
    avatar: "AN",
    quote:
      "Quilon walked me through the nursing program details and the visa process step by step. I arrived in Limerick knowing exactly what to expect.",
  },
  {
    name: "Rahul Menon",
    university: "University of Toronto",
    country: "Canada",
    avatar: "RM",
    quote:
      "They helped me compare a few Canadian programs and settle on Toronto. The paperwork after that was straightforward.",
  },
  {
    name: "Fathima Rasheed",
    university: "RWTH Aachen University",
    country: "Germany",
    avatar: "FR",
    quote:
      "The blocked account, APS, and university applications were all new to me. They handled each one in order, without rushing.",
  },
  {
    name: "Arjun Pillai",
    university: "University of Melbourne",
    country: "Australia",
    avatar: "AP",
    quote:
      "I knew I wanted data science, but not where to study it. They helped me shortlist, and it worked out.",
  },
]

export function TestimonialsSection() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave-dark relative overflow-hidden bg-tint-red py-20 lg:py-28" ref={ref}>
      {/* Organic shapes */}
      <OrganicBlob className="top-0 left-10" size="md" color="red" />
      <OrganicBlob className="bottom-0 right-0" size="sm" color="gray" />
      <FloatingDots className="top-20 right-16 hidden md:block" />
      <FloatingLine className="bottom-16 left-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Student Success Stories"
            subtitle="Hear from students who turned their study-abroad dreams into reality with Quilon."
            decorativeIcon="speech"
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`animate-on-scroll stagger-${(i % 4) + 1} card-enhanced rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                {`"${t.quote}"`}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.university}, {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
