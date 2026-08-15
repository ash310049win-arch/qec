import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileSearch,
  GraduationCap,
  Luggage,
  Plane,
  Stamp,
  UserSearch,
} from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"
import { CountryMotif } from "@/components/destinations/country-motif"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Our Admission Process | How We Guide Students",
  description:
    "Free consultation, university shortlisting, applications, visa filing, and arrival support — see how Quilon guides Kerala students.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Our Admission Process | Quilon Educational Consultancy",
    description:
      "Free consultation, university shortlisting, applications, visa filing, and arrival support — see how Quilon guides Kerala students.",
    url: "/process",
    images: [DEFAULT_OG_IMAGE],
  },
}

const steps = [
  {
    icon: UserSearch,
    step: "01",
    title: "Free Consultation & Profile Evaluation",
    text: "Sit down with a Quilon counselor to map your academics, budget, career goals, and preferred countries. We assess your admission probability across your shortlist.",
  },
  {
    icon: GraduationCap,
    step: "02",
    title: "University & Course Shortlisting",
    text: "We match you with universities and programs from our compiled database — comparing fees, intakes, rankings, and post-study work options for each country.",
  },
  {
    icon: FileSearch,
    step: "03",
    title: "Application & Documentation",
    text: "We craft your Statement of Purpose, prepare resumes and recommendation letters, verify documents, and submit applications on time for every intake.",
  },
  {
    icon: Stamp,
    step: "04",
    title: "Offer, Scholarship & Loan Guidance",
    text: "We negotiate offer letters, help you apply for scholarships and education loans, and review financial documents so nothing stalls your admission.",
  },
  {
    icon: Plane,
    step: "05",
    title: "Visa Filing & Interview Prep",
    text: "Country-specific visa checklists, embassy appointment scheduling, mock interviews, and funds documentation — all handled end to end.",
  },
  {
    icon: Luggage,
    step: "06",
    title: "Pre-departure & Arrival Support",
    text: "Flight booking, accommodation, forex, airport pickup coordination, and a pre-departure briefing so you land ready for day one.",
  },
]

function PageBanner() {
  return (
    <section className="relative overflow-hidden bg-cream text-ink">
      <CountryMotif motif="stars-stripes" className="opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <p className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-brand">
          How it works
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight text-ink md:text-7xl">
          Your Study Abroad, Step by Step
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
          From your first counseling call to landing day, Quilon walks beside you
          through six clear stages. No guesswork, no hidden detours — just a
          proven path to studying in your chosen country.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-7 font-heading text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-brand-dark"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-ink/15 px-6 font-heading text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProcessSteps() {
  return (
    <section className="relative overflow-hidden bg-white py-16 text-ink md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, text }) => (
            <div
              key={step}
              className="group relative rounded-2xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="absolute right-6 top-5 font-display text-5xl font-bold text-ink/5 transition-colors group-hover:text-brand/10">
                {step}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-heading text-lg font-bold text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessAssurance() {
  const items = [
    "Free first consultation — no obligation",
    "Dedicated counselor from day one",
    "End-to-end visa filing and interview prep",
    "Scholarship and loan assistance",
    "Live updates at every application stage",
  ]
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-cream md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-gold">
              Why students trust the process
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              A guided path, backed by a team that answers
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Every country has its own visa rules, document norms, and intake
              cycles. Our counselors keep you on track with checklists and
              deadlines so you never miss a window.
            </p>
            <Link
              href="/career-matcher"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg border border-cream/25 px-6 font-heading text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Not sure where to start? Try the Course Finder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-8">
            <div className="flex items-center gap-2 text-gold">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em]">
                What you get with Quilon
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-cream/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessCta() {
  return (
    <section className="relative overflow-hidden bg-brand py-16 text-white md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-white/80">
          Ready when you are
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Book a Free Consultation
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">
          Tell us where you want to go and what you want to study. We'll map the
          steps and timelines for your exact profile — free.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-7 font-heading text-sm font-semibold uppercase tracking-wide text-brand shadow-md transition-transform hover:scale-[1.03]"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/40 px-6 font-heading text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Compare Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function ProcessPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <ProcessSteps />
      <ProcessAssurance />
      <ProcessCta />
    </PageWrapper>
  )
}
