import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Database,
  FileCheck2,
  FileText,
  GraduationCap,
  IndianRupee,
  Landmark,
  MapPin,
  PencilLine,
  Plane,
  Stamp,
  Wallet,
} from "lucide-react"
import type { CountryData } from "@/lib/destinations-data"
import type { UniversityRow } from "@/lib/destinations-universities"
import { cn } from "@/lib/utils"

const WHY_ICONS: Record<string, typeof Briefcase> = {
  briefcase: Briefcase,
  award: Award,
  wallet: Wallet,
  alert: AlertCircle,
}

const SERVICE_ICONS = [BookOpen, FileText, Stamp, PencilLine, Award, Plane]

/* ------------------------------------------------------------------ */
/* Shared layout helpers                                               */
/* ------------------------------------------------------------------ */

function SectionShell({
  id,
  tone,
  children,
  className,
}: {
  id: string
  tone: "cream" | "white" | "ink" | "brand"
  children: React.ReactNode
  className?: string
}) {
  const bg: Record<string, string> = {
    cream: "bg-cream text-ink",
    white: "bg-white text-ink",
    ink: "bg-ink text-cream",
    brand: "bg-brand text-white",
  }
  return (
    <section id={id} className={cn("relative overflow-hidden", bg[tone], className)}>
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">{children}</div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string
  title: string
  sub?: string
  dark?: boolean
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <p
        className={cn(
          "text-xs font-heading font-semibold uppercase tracking-[0.22em]",
          dark ? "text-gold" : "text-brand"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl",
          dark ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn("mt-4 leading-relaxed", dark ? "text-cream/70" : "text-ink/65")}>{sub}</p>
      )}
      <div className={cn("mt-5 h-1 w-16 rounded-full", dark ? "bg-gold" : "bg-brand")} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 1. Why [Country]                                                    */
/* ------------------------------------------------------------------ */

function WhySection({ country }: { country: CountryData }) {
  return (
    <SectionShell id="why" tone="white">
      <SectionHeading
        eyebrow="Why students choose this country"
        title={country.whyTitle}
        sub="The four facts that matter most when weighing your options — including the honest catch."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {country.whyPoints.map((point) => {
          const Icon = WHY_ICONS[point.icon] ?? Briefcase
          return (
            <div
              key={point.title}
              className="group rounded-2xl border border-ink/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-base font-bold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{point.text}</p>
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Top Universities We Work With (live from dataset)                */
/* ------------------------------------------------------------------ */

function UniversitiesSection({
  country,
  universities,
  total,
}: {
  country: CountryData
  universities: UniversityRow[]
  total: number
}) {
  return (
    <SectionShell id="universities" tone="cream">
      <SectionHeading
        eyebrow="Live from our university dataset"
        title="Top Universities We Work With"
        sub={`A curated shortlist of ${country.name}'s best-known institutions. Every name and institution type below is pulled live from our compiled database of ${total.toLocaleString()} ${country.name} universities.`}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {universities.map((uni) => (
          <Link
            key={`${uni.name}-${uni.city}`}
            href={`/book-consultation?country=${encodeURIComponent(country.name)}`}
            aria-label={`Discuss studying at ${uni.name} in ${country.name}`}
            className={cn(
              "group flex items-start gap-4 rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
              uni.fromFeatured
                ? "border-brand/15 bg-white shadow-sm hover:border-brand/40"
                : "border-ink/5 bg-white/60 hover:border-brand/30 hover:bg-white"
            )}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading text-sm font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-brand">
                {uni.name}
              </h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink/55">
                {uni.city && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {uni.city}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {uni.type}
                </span>
              </p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              {uni.fromFeatured && <BadgeCheck className="h-4 w-4 shrink-0 text-gold" />}
              <ArrowRight className="h-4 w-4 shrink-0 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2 text-xs text-ink/45">
        <Database className="h-3.5 w-3.5 shrink-0" />
        Data: compiled university database for {country.name}. Featured institutions are highlighted.
      </p>
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Popular Courses                                                  */
/* ------------------------------------------------------------------ */

function CoursesSection({ country }: { country: CountryData }) {
  return (
    <SectionShell id="courses" tone="white">
      <SectionHeading
        eyebrow="What students actually study"
        title="Popular Courses"
        sub="Programs students from India most often pursue in this country."
      />
      <div className="flex flex-wrap gap-3">
        {country.popularCourses.map((course) => (
          <span
            key={course}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand/40 hover:bg-brand/10"
          >
            <CheckCircle2 className="h-4 w-4 text-brand" />
            {course}
          </span>
        ))}
      </div>
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* 4. What It Costs                                                    */
/* ------------------------------------------------------------------ */

function CostSection({ country }: { country: CountryData }) {
  return (
    <SectionShell id="cost" tone="cream">
      <SectionHeading
        eyebrow="Budget reality check"
        title="What It Costs"
        sub="Annual ranges for international students, tuition and living combined, based on current research."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-ink/5 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-2 text-brand">
            <IndianRupee className="h-5 w-5" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em]">
              Tuition
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-ink">{country.cost.tuition}</p>
        </div>
        <div className="rounded-2xl border border-ink/5 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-2 text-brand">
            <Wallet className="h-5 w-5" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em]">
              Living costs
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-ink">{country.cost.living}</p>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/10 p-5 text-sm leading-relaxed text-ink/80">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
        <p>{country.cost.note}</p>
      </div>
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Visa & Intake Essentials                                         */
/* ------------------------------------------------------------------ */

function VisaSection({ country }: { country: CountryData }) {
  const { visa } = country
  return (
    <SectionShell id="visa" tone="white">
      <SectionHeading
        eyebrow="The paperwork that matters"
        title="Visa & Intake Essentials"
        sub="What to plan for before you apply — visa class, financial proof, documents, and intake windows."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Visa + funds */}
        <div className="rounded-2xl border border-ink/5 bg-cream p-6">
          <div className="flex items-center gap-2 text-brand">
            <Landmark className="h-5 w-5" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em]">
              Student visa
            </span>
          </div>
          <p className="mt-3 font-heading text-sm font-bold text-ink">{visa.type}</p>
          <div className="mt-4 border-t border-ink/10 pt-4">
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-ink/55">
              Proof of funds
            </p>
            <p className="mt-1.5 text-sm text-ink/75">{visa.funds}</p>
          </div>
        </div>

        {/* Post-study + intakes */}
        <div className="rounded-2xl bg-ink p-6 text-cream">
          <div className="flex items-center gap-2 text-gold">
            <BadgeCheck className="h-5 w-5" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em]">
              Post-study work
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-cream">
            {visa.postStudyWorkName}
          </p>
          <p className="mt-1 text-sm text-cream/70">{visa.postStudyWorkDuration}</p>

          <div className="mt-5 border-t border-cream/15 pt-4">
            <p className="flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-gold">
              <CalendarDays className="h-4 w-4" /> Intakes
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {visa.intakes.map((intake) => (
                <span
                  key={intake}
                  className="rounded-full border border-cream/25 px-3 py-1 text-xs text-cream/90"
                >
                  {intake}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-2xl border border-ink/5 bg-cream p-6">
          <div className="flex items-center gap-2 text-brand">
            <FileCheck2 className="h-5 w-5" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em]">
              Typical documents
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {visa.documents.map((doc) => (
              <li key={doc} className="flex items-start gap-2 text-sm text-ink/75">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* 6. How Quilon Helps You Get There                                   */
/* ------------------------------------------------------------------ */

function ServicesSection({ country }: { country: CountryData }) {
  return (
    <SectionShell id="services" tone="ink">
      <SectionHeading
        dark
        eyebrow="Where Quilon steps in"
        title={`How Quilon Helps You Get There`}
        sub="The same six-step guidance we give every student, tuned to this country's visa rules and application cycles."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {country.services.map((service, i) => {
          const Icon = SERVICE_ICONS[i] ?? BookOpen
          return (
            <div
              key={service.title}
              className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 transition-colors hover:border-gold/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-cream">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{service.text}</p>
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* 7. Closing CTA                                                      */
/* ------------------------------------------------------------------ */

function ClosingCta({ country }: { country: CountryData }) {
  return (
    <SectionShell id="book" tone="brand">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-white/80">
          Next step
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Book a Free Consultation
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">{country.closing.text}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-consultation"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-7 font-heading text-sm font-semibold uppercase tracking-wide text-brand shadow-md transition-transform hover:scale-[1.03]"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/career-matcher"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/40 px-6 font-heading text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Try the Course Finder
          </Link>
        </div>
      </div>
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* Public: assembled content sections                                  */
/* ------------------------------------------------------------------ */

export function CountryContent({
  country,
  universities,
  total,
}: {
  country: CountryData
  universities: UniversityRow[]
  total: number
}) {
  return (
    <>
      <WhySection country={country} />
      <UniversitiesSection country={country} universities={universities} total={total} />
      <CoursesSection country={country} />
      <CostSection country={country} />
      <VisaSection country={country} />
      <ServicesSection country={country} />
      <ClosingCta country={country} />
    </>
  )
}
