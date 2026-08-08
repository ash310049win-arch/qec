"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react"
import type { RankedMatch } from "@/lib/matcher"

const COUNTRY_IMAGES: Record<string, string> = {
  "United States": "/images/dest-usa.jpg",
  "United Kingdom": "/images/dest-uk.jpg",
  Canada: "/images/dest-canada.jpg",
  Australia: "/images/dest-australia.jpg",
  Germany: "/images/dest-germany.jpg",
  Ireland: "/images/dest-ireland.jpg",
}

function initials(name: string): string {
  const parts = name.split(/[\s,-]+/).filter(Boolean)
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase()
}

function rankLabel(index: number): string {
  if (index === 0) return "Top Match"
  if (index === 1) return "Match #2"
  return "Match #3"
}

function locationLabel(match: RankedMatch): string {
  const { university } = match
  if (university.state) return `${university.country} · ${university.state}`
  return university.country
}

export function ResultCard({
  match,
  index,
  services,
}: {
  match: RankedMatch
  index: number
  services: string[]
}) {
  const university = match.university
  const countryImage = COUNTRY_IMAGES[university.country]

  return (
    <article
      className={`animate-fade-up${index === 0 ? "" : `-delay-${index}`} card-enhanced group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="relative h-40 w-full overflow-hidden">
        {countryImage ? (
          <>
            <Image
              src={countryImage}
              alt={`Study in ${university.country}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40">
            <span className="font-heading text-3xl font-extrabold tracking-tight text-white/90">
              {initials(university.name)}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          </div>
        )}

        <div className="absolute bottom-3 left-5 pr-10">
          <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {rankLabel(index)}
          </span>
          <h3 className="mt-1.5 font-heading text-lg font-bold text-white drop-shadow-md leading-snug">
            {university.name}
          </h3>
          <p className="flex items-center gap-1 text-xs text-white/80 drop-shadow-sm leading-snug">
            <MapPin className="h-3 w-3" />
            {locationLabel(match)} · {university.type}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Services Included
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
            >
              {service}
            </span>
          ))}
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {match.whyFits}
        </p>

        <div className="mt-5">
          <Button asChild size="sm" className="w-full">
            <Link href="/contact">
              Get Guidance for {university.name}
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
