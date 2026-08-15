import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowDown } from "lucide-react"
import type { CountryData } from "@/lib/destinations-data"
import { CountryMotif } from "./country-motif"

/**
 * Hero for a destination page: oversized display headline (country name is
 * the dominant element), faint cultural motif behind it, a row of tall photo
 * cards with brand-red blocks, and a primary CTA.
 */
export function CountryHero({ country }: { country: CountryData }) {
  return (
    <section className="relative overflow-hidden bg-cream text-ink">
      {/* faint cultural line-art */}
      <CountryMotif motif={country.motif} />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 md:pb-20 md:pt-36 lg:pb-24">
        <p className="animate-fade-up text-xs font-heading font-semibold uppercase tracking-[0.22em] text-brand">
          {country.eyebrow}
        </p>

        <h1 className="animate-fade-up-delay-1 mt-4 font-display text-[15vw] font-black leading-[0.92] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          {country.headline}
        </h1>

        <div className="mt-6 flex max-w-2xl flex-col gap-6">
          <p className="animate-fade-up-delay-2 text-base leading-relaxed text-ink/70 md:text-lg">
            {country.tagline}
          </p>
        </div>

        {/* Tall photo cards with brand-red blocks */}
        <div className="mt-12 grid snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-14 md:grid-cols-2 md:snap-none md:overflow-visible lg:grid-cols-4">
          {country.heroCards.map((card, i) => (
            <figure
              key={card.label}
              className="relative h-[380px] w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl bg-brand shadow-lg md:w-auto"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/25 via-transparent to-transparent" />
              <figcaption
                className={`absolute z-10 bg-brand px-3 text-white ${
                  card.vertical
                    ? "writing-vertical right-0 top-0 flex h-full flex-col items-center justify-center text-[11px] font-heading font-semibold uppercase tracking-[0.22em]"
                    : "bottom-0 left-0 right-0 py-2.5 text-center text-xs font-heading font-semibold uppercase tracking-[0.18em]"
                }`}
              >
                <span>{card.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Primary CTA below the card row */}
        <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-4 md:mt-12">
          <Link
            href="/book-consultation"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-7 font-heading text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-brand-dark"
          >
            Get Your Free Consultation Plan
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#why"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-ink/15 px-6 font-heading text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Explore {country.name}
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
