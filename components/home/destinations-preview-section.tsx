"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { OrganicBlob, FloatingDots, FloatingTriangle } from "@/components/decorative-elements"

const destinations = [
  {
    country: "United States",
    image: "/images/dest-usa.jpg",
    description:
      "World-class universities, diverse campuses, and unmatched research opportunities.",
    href: "/destinations",
  },
  {
    country: "Canada",
    image: "/images/dest-canada.jpg",
    description:
      "Affordable quality education with strong post-study work opportunities.",
    href: "/destinations",
  },
  {
    country: "United Kingdom",
    image: "/images/dest-uk.jpg",
    description:
      "Prestigious institutions with globally recognized degrees and rich culture.",
    href: "/destinations",
  },
  {
    country: "Australia",
    image: "/images/dest-australia.jpg",
    description:
      "Excellent student life, innovative courses, and welcoming immigration policies.",
    href: "/destinations",
  },
  {
    country: "Germany",
    image: "/images/dest-germany.jpg",
    description:
      "Tuition-free public universities and a booming economy for engineering and STEM.",
    href: "/destinations",
  },
  {
    country: "Ireland",
    image: "/images/dest-ireland.jpg",
    description:
      "English-speaking, strong tech industry ties, and a friendly student community.",
    href: "/destinations",
  },
]

export function DestinationsPreviewSection() {
  const ref = useScrollAnimation()
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const maxIndex = destinations.length - 1

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  return (
    <section className="section-divider-wave-tint relative overflow-hidden bg-secondary py-20 lg:py-28" ref={ref}>
      {/* Organic background shapes */}
      <OrganicBlob className="top-0 right-10" size="md" color="red" />
      <OrganicBlob className="bottom-0 left-0" size="sm" color="gray" />
      <FloatingDots className="top-16 left-12 hidden md:block" />
      <FloatingTriangle className="bottom-20 right-20 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Study Destinations"
            subtitle="Explore top countries where thousands of students are building their global futures."
            decorativeIcon="globe"
          />
        </div>

        {/* Carousel */}
        <div
          className="animate-on-scroll stagger-2 relative mt-14"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-2.5 text-foreground shadow-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary lg:-left-5"
            aria-label="Previous destination"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-2.5 text-foreground shadow-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary lg:-right-5"
            aria-label="Next destination"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / 3)}%)`,
              }}
            >
              {destinations.map((dest) => (
                <div
                  key={dest.country}
                  className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
                >
                  <Link
                    href={dest.href}
                    className="card-enhanced group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={dest.image || "/placeholder.svg"}
                        alt={`Study in ${dest.country}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <h3 className="absolute bottom-4 left-5 font-heading text-xl font-bold text-white drop-shadow-md">
                        {dest.country}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-3 p-5">
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {dest.description}
                      </p>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {destinations.map((dest, i) => (
              <button
                key={dest.country}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to ${dest.country}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
