"use client"

import { Star } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { OrganicBlob, FloatingLine, FloatingDots } from "@/components/decorative-elements"

const testimonials = [
  {
    name: "Arjun Patel",
    university: "University of Toronto",
    country: "Canada",
    avatar: "AP",
    quote:
      "Quilon made the entire process so smooth. From university shortlisting to visa approval, they were with me every step of the way. I couldn't have done it without them!",
  },
  {
    name: "Priya Sharma",
    university: "University of Melbourne",
    country: "Australia",
    avatar: "PS",
    quote:
      "The personalized approach at Quilon is what sets them apart. They understood my goals and helped me secure a scholarship I didn't even know existed.",
  },
  {
    name: "Rahul Menon",
    university: "University College London",
    country: "United Kingdom",
    avatar: "RM",
    quote:
      "I was overwhelmed by the application process, but Quilon's team simplified everything. Their test prep guidance helped me score higher than I expected on the IELTS.",
  },
  {
    name: "Sneha Krishnan",
    university: "Georgia Institute of Technology",
    country: "USA",
    avatar: "SK",
    quote:
      "Quilon's visa counseling was exceptional. They prepared me thoroughly for my interview and I got my student visa approved on the first attempt!",
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
