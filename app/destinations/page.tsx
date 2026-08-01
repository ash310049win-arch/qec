"use client"

import Link from "next/link"
import Image from "next/image"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BookOpen,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react"
import { OrganicBlob, FloatingDots, FloatingTriangle, FloatingLine } from "@/components/decorative-elements"

const destinations = [
  {
    country: "United States",
    image: "/images/dest-usa.jpg",
    tagline: "Home to the world's most prestigious universities",
    reasons: [
      "World-ranked universities like MIT, Stanford, and Harvard",
      "Optional Practical Training (OPT) for work experience after graduation",
      "Vast range of courses and flexible degree structures",
    ],
    fields: ["Computer Science", "Business & MBA", "Engineering", "Medicine", "Data Science"],
    universities: ["MIT", "Stanford University", "University of California", "Georgia Tech"],
    intakes: ["Fall (August-September)", "Spring (January)"],
  },
  {
    country: "Canada",
    image: "/images/dest-canada.jpg",
    tagline: "Quality education with strong immigration pathways",
    reasons: [
      "Post-Graduation Work Permit (PGWP) of up to 3 years",
      "Affordable tuition compared to US and UK",
      "Multicultural, safe, and student-friendly cities",
    ],
    fields: ["Engineering", "IT & Computer Science", "Business Analytics", "Healthcare", "Environmental Science"],
    universities: ["University of Toronto", "McGill University", "University of British Columbia", "University of Waterloo"],
    intakes: ["Fall (September)", "Winter (January)", "Summer (May)"],
  },
  {
    country: "United Kingdom",
    image: "/images/dest-uk.jpg",
    tagline: "Prestigious degrees with a rich academic tradition",
    reasons: [
      "One-year master's programs that save time and money",
      "Global recognition of UK degrees from Russell Group universities",
      "Graduate Route visa allows 2 years of post-study work",
    ],
    fields: ["Law", "Finance & Accounting", "Arts & Humanities", "Medicine", "International Relations"],
    universities: ["University of Oxford", "University of Cambridge", "Imperial College London", "University of Edinburgh"],
    intakes: ["September", "January"],
  },
  {
    country: "Australia",
    image: "/images/dest-australia.jpg",
    tagline: "Innovative education in a vibrant, welcoming environment",
    reasons: [
      "Post-Study Work visa for 2-4 years depending on degree level",
      "High quality of life and excellent student support services",
      "Strong research output and industry connections",
    ],
    fields: ["Nursing & Healthcare", "Engineering", "IT & Cybersecurity", "Marine Biology", "Architecture"],
    universities: ["University of Melbourne", "University of Sydney", "Australian National University", "Monash University"],
    intakes: ["February", "July"],
  },
  {
    country: "Germany",
    image: "/images/dest-germany.jpg",
    tagline: "Tuition-free education in the heart of Europe",
    reasons: [
      "Most public universities charge zero tuition fees",
      "Europe's largest economy with strong engineering sector",
      "18-month post-study work visa for graduates",
    ],
    fields: ["Mechanical Engineering", "Automotive Engineering", "Computer Science", "Physics", "Economics"],
    universities: ["TU Munich", "RWTH Aachen", "Heidelberg University", "Humboldt University of Berlin"],
    intakes: ["Winter (October)", "Summer (April)"],
  },
  {
    country: "Ireland",
    image: "/images/dest-ireland.jpg",
    tagline: "English-speaking, tech hub of Europe",
    reasons: [
      "Major tech companies headquartered here (Google, Meta, Apple)",
      "Stay Back option of 1-2 years after graduation",
      "Friendly culture and affordable compared to the UK",
    ],
    fields: ["Data Analytics", "Pharmaceutical Science", "Computer Science", "Business", "Biotechnology"],
    universities: ["Trinity College Dublin", "University College Dublin", "NUI Galway", "Dublin City University"],
    intakes: ["September", "January"],
  },
]

function PageBanner() {
  return (
    <section className="section-divider-wave-white relative overflow-hidden bg-[#1A1A1A] pt-28 pb-20 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] animate-breathe" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary/8 blur-[60px] animate-breathe-slow" aria-hidden="true" />
      <FloatingDots className="top-16 right-20 hidden md:block" />
      <FloatingTriangle className="bottom-20 left-12 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl text-balance">
          Study Destinations
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-white/60 leading-relaxed text-pretty">
          Discover the best countries for your international education. Each
          destination offers unique advantages for your academic and career
          growth.
        </p>
      </div>
    </section>
  )
}

function DestinationCard({
  destination,
  index,
}: {
  destination: (typeof destinations)[0]
  index: number
}) {
  return (
    <div
      className={`animate-on-scroll stagger-${(index % 4) + 1} card-enhanced rounded-xl border border-border bg-card overflow-hidden transition-all duration-300`}
    >
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={`Study in ${destination.country}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h3 className="font-heading text-xl font-bold text-white drop-shadow-md">
            {destination.country}
          </h3>
          <p className="text-sm text-white/80 drop-shadow-sm">
            {destination.tagline}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Why choose */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <MapPin className="h-3.5 w-3.5" />
            Why Students Choose This Country
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {destination.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Fields */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            Popular Fields
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {destination.fields.map((field) => (
              <span key={field} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Universities */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <GraduationCap className="h-3.5 w-3.5" />
            Top Universities
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {destination.universities.map((uni, uniIdx) => (
              <span key={uni} className="text-xs text-muted-foreground">
                {uni}{uniIdx < destination.universities.length - 1 ? " \u2022" : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Intakes */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Calendar className="h-3.5 w-3.5" />
            Typical Intakes
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {destination.intakes.map((intake) => (
              <span key={intake} className="rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                {intake}
              </span>
            ))}
          </div>
        </div>

        <Button asChild size="sm" className="mt-2 w-full">
          <Link href="/contact">
            Get Guidance for {destination.country}
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function DestinationsGrid() {
  const ref = useScrollAnimation()

  return (
    <section className="blob-bg relative overflow-hidden bg-background py-20 lg:py-28" ref={ref}>
      <OrganicBlob className="top-0 right-0" size="lg" color="red" />
      <OrganicBlob className="bottom-0 left-0" size="md" color="gray" />
      <FloatingLine className="top-20 left-10" />
      <FloatingDots className="bottom-20 right-16 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Explore Your Options"
            subtitle="Click on any destination to learn more and get started with your application."
            decorativeIcon="globe"
          />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.country} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function DestinationsPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <DestinationsGrid />
    </PageWrapper>
  )
}
