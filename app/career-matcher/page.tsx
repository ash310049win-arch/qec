"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CtaSection } from "@/components/home/cta-section"
import { ResultCarousel } from "@/components/career-matcher/result-carousel"
import { HowWeGotHere } from "@/components/career-matcher/how-we-got-here"
import {
  CORE_COUNTRY_IDS,
  COUNTRY_BY_ID,
  GLOBAL_COUNTRIES,
  REGIONS,
  STATE_OPTIONS,
  STATE_OPTION_COUNTRIES,
  type GlobalCountry,
} from "@/lib/global-countries"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Database,
  Globe2,
  GraduationCap,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react"
import { OrganicBlob, FloatingDots, FloatingTriangle, FloatingLine } from "@/components/decorative-elements"
import {
  INTEREST_OPTIONS,
  type InterestTag,
  type MatchAnswers,
  type MatchExplanation,
  type PathwayAnswer,
  type RankedMatch,
} from "@/lib/matcher"

type Answers = {
  interests: InterestTag[]
  pathway: PathwayAnswer | ""
  destinations: string[]
  destinationStates: Record<string, string[]>
  stream: string
  gradeBand: string
  budget: number
  timeline: string
  testReadiness: string
  careerGoal: string
}

const indianDestinationOptions = [
  { id: "maharashtra", label: "Maharashtra", note: "Mumbai · Pune · Nagpur", states: ["Maharashtra"] },
  { id: "delhi-ncr", label: "Delhi NCR", note: "Delhi · Noida · Gurugram", states: ["Delhi", "Haryana", "Uttar Pradesh"] },
  { id: "karnataka", label: "Karnataka", note: "Bengaluru · Mysuru", states: ["Karnataka"] },
  { id: "tamil-nadu", label: "Tamil Nadu", note: "Chennai · Coimbatore", states: ["Tamil Nadu"] },
  { id: "telangana", label: "Telangana", note: "Hyderabad", states: ["Telangana"] },
  { id: "gujarat", label: "Gujarat", note: "Ahmedabad · Gandhinagar", states: ["Gujarat"] },
  { id: "west-bengal", label: "West Bengal", note: "Kolkata", states: ["West Bengal"] },
  { id: "up", label: "Uttar Pradesh", note: "Lucknow · Varanasi", states: ["Uttar Pradesh"] },
  { id: "rajasthan", label: "Rajasthan", note: "Jaipur", states: ["Rajasthan"] },
  { id: "punjab", label: "Punjab", note: "Chandigarh · Ludhiana", states: ["Punjab", "Haryana"] },
  { id: "kerala", label: "Kerala", note: "Kochi · Thiruvananthapuram", states: ["Kerala"] },
  { id: "odisha", label: "Odisha", note: "Bhubaneswar", states: ["Odisha"] },
]

const pathwayOptions = [
  { label: "Study Abroad", value: "abroad", description: "I want an international degree and experience" },
  { label: "Study in India", value: "domestic", description: "I want to study at home in India" },
  { label: "Not sure yet", value: "not-sure", description: "I'm open to both options" },
]

const streamOptions = [
  { label: "Science & Technology", value: "science" },
  { label: "Commerce & Management", value: "commerce" },
  { label: "Arts & Humanities", value: "arts" },
  { label: "Engineering", value: "engineering" },
  { label: "Medicine & Health Sciences", value: "medicine" },
]

const gradeOptions = [
  { label: "80%+ (A)", value: "high" },
  { label: "60% - 80% (B)", value: "mid" },
  { label: "45% - 60% (C)", value: "low" },
  { label: "Prefer not to say", value: "unknown" },
]

const timelineOptions = [
  { label: "This year", value: "this-year" },
  { label: "Next year", value: "next-year" },
  { label: "Just exploring", value: "exploring" },
]

const testOptions = [
  { label: "I already have test scores", value: "have-scores", description: "IELTS / SAT / TOEFL / GRE ready" },
  { label: "I'm planning to take them", value: "planning", description: "Will appear within 6-12 months" },
  { label: "I need guidance on tests", value: "need-guidance", description: "Not sure which tests I need" },
  { label: "My courses don't require tests", value: "not-applicable", description: "Or I'm studying in India" },
]

const careerGoalOptions = [
  { label: "Work abroad after graduation", value: "work-abroad", description: "International jobs and post-study work" },
  { label: "Return to India for my career", value: "return-india", description: "Indian job market and family" },
  { label: "Research / higher education", value: "postgrad-research", description: "Masters, PhD, academic path" },
  { label: "Not sure yet", value: "undecided", description: "Keeping options open" },
]

const stepMeta = [
  {
    title: "Your Interests",
    subtitle: "Select all that apply — this shapes what you'll study and where you'll thrive.",
  },
  {
    title: "Study Path",
    subtitle: "Where do you want to study? You can keep both options open.",
  },
  {
    title: "Target Destinations",
    subtitle: "Search every country in the world and pick as many as you like — or tell us you're still exploring.",
  },
  {
    title: "Academic Background",
    subtitle: "Tell us your stream and grade range so we can match realistic options.",
  },
  {
    title: "Budget Range",
    subtitle: "Estimate your annual budget for tuition and living costs.",
  },
  {
    title: "Timeline",
    subtitle: "When do you plan to start your studies?",
  },
  {
    title: "Test Readiness",
    subtitle: "Where are you in your test preparation journey?",
  },
  {
    title: "Career Goal",
    subtitle: "What do you want to do after graduation?",
  },
]

const stepMicroMessages = [
  "Great, narrowing it down...",
  "Nice, noting that down...",
  "Perfect, adding your picks...",
  "Good choice, adjusting your matches...",
  "Great, almost there...",
  "Two more to go — you're doing great!",
  "Just a few more...",
  "That's everything — finding your matches now!",
]

const loadingMessages = [
  "Comparing universities against your profile...",
  "Checking courses, campuses, and budgets...",
  "Ranking your best-fit institutions...",
  "Just a moment — almost there...",
]

function budgetBand(budget: number): string {
  if (budget < 1500000) return "budget-friendly"
  if (budget < 3000000) return "mid-range"
  if (budget < 4500000) return "higher-range"
  return "premium"
}

/** Compact INR figure, e.g. 1020000 -> "10.2L". */
function formatLakh(value: number): string {
  const lakhs = value / 100000
  const rounded = Math.round(lakhs * 10) / 10
  return `${rounded.toLocaleString("en-IN", { maximumFractionDigits: 1 })}L`
}

/** Plain-language listing, e.g. ["Brazil", "Kenya"] -> "Brazil and Kenya". */
function listNames(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ""
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`
}

function buildServiceTags(answers: Answers): string[] {
  const abroad = answers.pathway === "abroad" || answers.pathway === "not-sure"
  const tags = ["University Shortlisting", "Application & SOP Support"]
  if (abroad) tags.push("Visa Assistance")
  if (answers.testReadiness === "planning" || answers.testReadiness === "need-guidance") {
    tags.push("Test Prep Coaching")
  }
  if (answers.budget < 1500000) {
    tags.push("Scholarship & Funding Guidance")
  } else {
    tags.push("Scholarship Search")
  }
  if (answers.timeline === "this-year") {
    tags.push("Fast-Track Admissions")
  } else {
    tags.push("Step-by-Step Planning")
  }
  if (abroad) tags.push("Pre-Departure Support")
  return tags
}

function toMatcherDestinations(answers: Answers): string[] {
  if (answers.destinations.includes("not-sure")) return []
  const out: string[] = []
  for (const id of answers.destinations) {
    const entry = COUNTRY_BY_ID.get(id)
    if (entry) {
      out.push(...entry.datasetCountries)
      continue
    }
    const state = indianDestinationOptions.find((s) => s.id === id)
    if (state) out.push(...state.states)
  }
  return out
}

function toMatcherAnswers(answers: Answers): MatchAnswers {
  return {
    interests: answers.interests,
    pathway: (answers.pathway || "not-sure") as PathwayAnswer,
    destinations: toMatcherDestinations(answers),
    destinationStates: answers.destinationStates,
    stream: answers.stream,
    gradeBand: answers.gradeBand,
    budget: answers.budget,
    timeline: answers.timeline,
    testReadiness: answers.testReadiness,
    careerGoal: answers.careerGoal,
  }
}

function PageBanner() {
  return (
    <section className="section-divider-wave-white relative overflow-hidden bg-[#1A1A1A] pt-28 pb-20 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] animate-breathe" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary/8 blur-[60px] animate-breathe-slow" aria-hidden="true" />
      <FloatingDots className="top-16 right-20 hidden md:block" />
      <FloatingTriangle className="bottom-20 left-12 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Free Career Assessment
        </span>
        <h1 className="animate-fade-up mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl text-balance">
          Course Finder
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-white/60 leading-relaxed text-pretty">
          Eight quick steps. Tell us your interests, study path, destinations,
          budget, and timeline — and get a personalized plan with the institutions
          and services that fit you.
        </p>
      </div>
    </section>
  )
}

function RadioOption({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border hover:border-primary/40 hover:shadow-sm"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-primary bg-primary" : "border-muted-foreground/40"
        }`}
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
      </span>
      <span>
        <span className="block text-sm font-semibold text-card-foreground">{label}</span>
        {description && <span className="block text-xs text-muted-foreground">{description}</span>}
      </span>
    </button>
  )
}

function ProgressPath({
  step,
  total,
  completed,
}: {
  step: number
  total: number
  completed: number
}) {
  const progress = total <= 1 ? 0 : (step / (total - 1)) * 100

  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Step {step + 1} of {total}
          <span className="hidden text-muted-foreground/60 sm:inline"> · {completed} completed</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Database className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="hidden lg:inline">Our database of 80,000+ universities</span>
          <span className="lg:hidden">80,000+ universities</span>
        </span>
      </div>

      <div className="relative mt-4 h-9">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-border/70" />
        {/* Fill */}
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Milestone dots */}
        {Array.from({ length: total }).map((_, i) => {
          const reached = i <= step
          return (
            <div
              key={i}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(i / (total - 1)) * 100}%` }}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 bg-card shadow-sm transition-all duration-300 ${
                  reached ? "border-primary" : "border-border"
                }`}
              >
                {reached && <Check className="h-2.5 w-2.5 text-primary" />}
              </div>
            </div>
          )
        })}

        {/* Moving icon */}
        <div
          className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
          style={{ left: `${progress}%` }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-primary/15">
            <GraduationCap className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MatchLoading() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((m) => (m + 1) % loadingMessages.length)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mx-auto mt-8 max-w-xl rounded-xl border border-border bg-card p-8 text-center md:p-10">
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-breathe" />
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md animate-float-gentle">
          <GraduationCap className="h-7 w-7" />
        </div>
      </div>
      <h3 className="mt-6 font-heading text-xl font-bold text-card-foreground md:text-2xl">
        Finding your best matches...
      </h3>
      <p key={messageIndex} className="animate-quiz-pop mt-2 text-sm font-semibold text-primary">
        {loadingMessages[messageIndex]}
      </p>
      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary animate-loading-bar" />
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Database className="h-3.5 w-3.5 shrink-0 text-primary" />
        Matching you against our database of 80,000+ universities
      </p>
    </div>
  )
}

function QuizSection({
  showResults,
  setShowResults,
}: {
  showResults: boolean
  setShowResults: (value: boolean) => void
}) {
  const ref = useScrollAnimation()
  const [answers, setAnswers] = useState<Answers>({
    interests: [],
    pathway: "",
    destinations: [],
    destinationStates: {},
    stream: "",
    gradeBand: "",
    budget: 2500000,
    timeline: "",
    testReadiness: "",
    careerGoal: "",
  })
  const [step, setStep] = useState(0)
  const [countrySearch, setCountrySearch] = useState("")
  const [regionFilter, setRegionFilter] = useState<string | null>(null)
  const [results, setResults] = useState<RankedMatch[] | null>(null)
  const [explanation, setExplanation] = useState<MatchExplanation | null>(null)
  const [eligible, setEligible] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [microMessage, setMicroMessage] = useState<string | null>(null)
  const microTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const matchToken = useRef(0)

  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: "smooth" })
  }, [showResults])

  const flashMicroMessage = (nextStep: number) => {
    setMicroMessage(stepMicroMessages[nextStep] ?? null)
    if (microTimer.current) clearTimeout(microTimer.current)
    microTimer.current = setTimeout(() => setMicroMessage(null), 1500)
  }

  const runMatch = useCallback(async () => {
    const token = ++matchToken.current
    setLoading(true)
    setError(null)
    setResults(null)
    const startedAt = Date.now()
    try {
      const response = await fetch("/api/career-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: toMatcherAnswers(answers) }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong while matching.")
      }
      if (matchToken.current !== token) return
      setResults(data.results as RankedMatch[])
      setExplanation(data.explanation as MatchExplanation)
      setEligible(data.eligible as number)
    } catch (err) {
      if (matchToken.current !== token) return
      setError(err instanceof Error ? err.message : "Something went wrong while matching.")
    } finally {
      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, 1700 - elapsed)
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining))
      }
      if (matchToken.current !== token) return
      setLoading(false)
      setShowResults(true)
    }
  }, [answers, setShowResults])

  const stepAnswered = [
    answers.interests.length > 0,
    answers.pathway !== "",
    answers.destinations.length > 0,
    answers.stream !== "" && answers.gradeBand !== "",
    true,
    answers.timeline !== "",
    answers.testReadiness !== "",
    answers.careerGoal !== "",
  ]

  const canProceed = stepAnswered[step]

  const toggleInterest = (value: InterestTag) => {
    setAnswers((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }))
  }

  const setPathway = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      pathway: value as Answers["pathway"],
      destinations: [],
      destinationStates: {},
    }))
  }

  const toggleDestination = (id: string) => {
    setAnswers((prev) => {
      if (id === "not-sure") {
        return {
          ...prev,
          destinations: prev.destinations.includes("not-sure") ? [] : ["not-sure"],
        }
      }
      const withoutNotSure = prev.destinations.filter((d) => d !== "not-sure")
      if (withoutNotSure.includes(id)) {
        const { [id]: _removed, ...remainingStates } = prev.destinationStates
        return {
          ...prev,
          destinations: withoutNotSure.filter((d) => d !== id),
          destinationStates: remainingStates,
        }
      }
      return { ...prev, destinations: [...withoutNotSure, id] }
    })
  }

  const toggleState = (countryId: string, stateId: string) => {
    setAnswers((prev) => {
      const current = prev.destinationStates[countryId] ?? []
      const next = current.includes(stateId)
        ? current.filter((s) => s !== stateId)
        : [...current, stateId]
      return {
        ...prev,
        destinationStates: { ...prev.destinationStates, [countryId]: next },
      }
    })
  }

  const handleNext = () => {
    if (!canProceed) return
    if (step < stepMeta.length - 1) {
      flashMicroMessage(step + 1)
      setStep(step + 1)
    } else {
      runMatch()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    } else if (showResults) {
      setShowResults(false)
    }
  }

  const handleRetake = () => {
    matchToken.current++
    setMicroMessage(null)
    if (microTimer.current) clearTimeout(microTimer.current)
    setAnswers({
      interests: [],
      pathway: "",
      destinations: [],
      destinationStates: {},
      stream: "",
      gradeBand: "",
      budget: 2500000,
      timeline: "",
      testReadiness: "",
      careerGoal: "",
    })
    setResults(null)
    setExplanation(null)
    setEligible(0)
    setError(null)
    setLoading(false)
    setStep(0)
    setShowResults(false)
  }

  const meta = stepMeta[step]

  const query = countrySearch.trim().toLowerCase()
  const matchesCountryQuery = (c: GlobalCountry) =>
    query.length === 0 ||
    c.name.toLowerCase().includes(query) ||
    c.id.toLowerCase().includes(query)
  const showIndiaInCountries = answers.pathway !== "abroad"
  const selectedCountryIds = answers.destinations.filter((id) => id !== "not-sure")
  const stateCountries = selectedCountryIds.filter((id) => STATE_OPTION_COUNTRIES.includes(id))
  const nonCoreSelected = selectedCountryIds.filter((id) => !CORE_COUNTRY_IDS.has(id))
  const visibleRegions = REGIONS.filter(
    (region) => regionFilter === null || regionFilter === region
  )
  const hasVisibleCountries = visibleRegions.some((region) =>
    GLOBAL_COUNTRIES.some(
      (c) =>
        c.region === region &&
        (showIndiaInCountries || c.id !== "India") &&
        matchesCountryQuery(c)
    )
  )

  return (
    <section className="blob-bg relative overflow-hidden bg-background py-20 lg:py-28" ref={ref}>
      <OrganicBlob className="top-0 right-0" size="lg" color="red" />
      <OrganicBlob className="bottom-0 left-0" size="md" color="gray" />
      <FloatingLine className="top-20 left-10" />
      <FloatingDots className="bottom-20 right-16 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title={showResults ? "Your Personalized Plan" : "Match Your Future"}
            subtitle={
              showResults
                ? "Based on your answers, here are your best-fit institutions and the services that will get you there."
                : "Eight quick steps to a personalized study roadmap."
            }
            decorativeIcon="star"
          />
        </div>

        <div className="animate-on-scroll mt-14">
          {!showResults ? (
            <div className="card-enhanced mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 lg:p-8">
              {/* Progress */}
              <ProgressPath
                step={step}
                total={stepMeta.length}
                completed={stepAnswered.filter(Boolean).length}
              />

              <div key={step} className="animate-quiz-step">
                <h2 className="mt-6 font-heading text-xl font-bold text-card-foreground md:text-2xl">
                  {meta.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{meta.subtitle}</p>
              </div>

              <div key={`content-${step}`} className="animate-quiz-step mt-5">
                {/* Step 1: Interests (multi-select chips) */}
                {step === 0 && (
                  <div className="flex flex-wrap gap-2.5">
                    {INTEREST_OPTIONS.map((option) => {
                      const selected = answers.interests.includes(option.value)
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleInterest(option.value)}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-secondary text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {selected && <CheckCircle2 className="h-4 w-4" />}
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Step 2: Study path (radio) */}
                {step === 1 && (
                  <div className="flex flex-col gap-3">
                    {pathwayOptions.map((option) => (
                      <RadioOption
                        key={option.value}
                        label={option.label}
                        description={option.description}
                        selected={answers.pathway === option.value}
                        onClick={() => setPathway(option.value)}
                      />
                    ))}
                  </div>
                )}

                {/* Step 3: Destinations (multi-select, pathway aware) */}
                {step === 2 && (
                  <div>
                    {answers.pathway === "domestic" ? (
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {indianDestinationOptions.map((option) => {
                          const selected = answers.destinations.includes(option.id)
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => toggleDestination(option.id)}
                              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-all duration-200 ${
                                selected
                                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                                  : "border-border hover:border-primary/40 hover:shadow-sm"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                  selected ? "border-primary bg-primary" : "border-muted-foreground/40"
                                }`}
                              >
                                {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-card-foreground">
                                  {option.label}
                                </span>
                                <span className="block text-xs text-muted-foreground">{option.note}</span>
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <div>
                        <div className="relative">
                          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search all countries — type to filter..."
                            className="w-full rounded-lg border border-border bg-background py-2.5 pr-4 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        {selectedCountryIds.length > 0 && (
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {selectedCountryIds.map((id) => {
                              const country = COUNTRY_BY_ID.get(id)
                              if (!country) return null
                              return (
                                <button
                                  key={id}
                                  type="button"
                                  onClick={() => toggleDestination(id)}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                                >
                                  {country.name}
                                  <X className="h-3 w-3" />
                                </button>
                              )
                            })}
                            <button
                              type="button"
                              onClick={() =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  destinations: [],
                                  destinationStates: {},
                                }))
                              }
                              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
                            >
                              Clear all ({selectedCountryIds.length})
                            </button>
                          </div>
                        )}

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {["All", ...REGIONS].map((region) => {
                            const active =
                              region === "All"
                                ? regionFilter === null
                                : regionFilter === region
                            return (
                              <button
                                key={region}
                                type="button"
                                onClick={() => setRegionFilter(region === "All" ? null : region)}
                                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${
                                  active
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-secondary text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                }`}
                              >
                                {region}
                              </button>
                            )
                          })}
                        </div>

                        <div className="mt-4 max-h-80 overflow-y-auto rounded-xl border border-border bg-background">
                          {visibleRegions.map((region) => {
                            const countries = GLOBAL_COUNTRIES.filter(
                              (c) =>
                                c.region === region &&
                                (showIndiaInCountries || c.id !== "India") &&
                                matchesCountryQuery(c)
                            )
                            if (countries.length === 0) return null
                            return (
                              <div key={region}>
                                <p className="sticky top-0 z-10 border-b border-border bg-secondary/95 px-4 py-2 text-[11px] font-bold tracking-wider text-muted-foreground uppercase backdrop-blur">
                                  {region} · {countries.length}
                                </p>
                                <ul>
                                  {countries.map((country) => {
                                    const selected = answers.destinations.includes(country.id)
                                    return (
                                      <li
                                        key={country.id}
                                        className="border-b border-border/60 last:border-b-0"
                                      >
                                        <button
                                          type="button"
                                          onClick={() => toggleDestination(country.id)}
                                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                            selected ? "bg-primary/5" : "hover:bg-secondary/70"
                                          }`}
                                        >
                                          <span
                                            className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border-2 transition-colors ${
                                              selected
                                                ? "border-primary bg-primary"
                                                : "border-muted-foreground/40"
                                            }`}
                                          >
                                            {selected && (
                                              <Check className="h-3 w-3 text-primary-foreground" />
                                            )}
                                          </span>
                                          <span className="flex-1 text-sm font-medium text-card-foreground">
                                            {country.name}
                                          </span>
                                          {country.core && (
                                            <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary uppercase sm:inline">
                                              Full guide
                                            </span>
                                          )}
                                          {country.minBudgetInr !== null && (
                                            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
                                              From ₹{formatLakh(country.minBudgetInr)}/yr
                                            </span>
                                          )}
                                        </button>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>
                            )
                          })}
                          {query.length > 0 && !hasVisibleCountries && (
                            <p className="p-6 text-center text-sm text-muted-foreground">
                              No countries match &quot;{countrySearch}&quot;{regionFilter ? ` in ${regionFilter}` : ""}. Try a
                              different search.
                            </p>
                          )}
                        </div>

                        {stateCountries.length > 0 && (
                          <div className="mt-4 space-y-4">
                            {stateCountries.map((countryId) => {
                              const country = COUNTRY_BY_ID.get(countryId)
                              if (!country) return null
                              const stateOptions = STATE_OPTIONS[countryId] ?? []
                              const selectedStates = answers.destinationStates[countryId] ?? []
                              return (
                                <div
                                  key={countryId}
                                  className="rounded-xl border border-border bg-secondary/40 p-4"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-card-foreground">
                                      {country.name}
                                      <span className="ml-1.5 text-xs font-medium text-muted-foreground">
                                        preferred states/provinces (optional)
                                      </span>
                                    </p>
                                    {selectedStates.length > 0 && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setAnswers((prev) => ({
                                            ...prev,
                                            destinationStates: {
                                              ...prev.destinationStates,
                                              [countryId]: [],
                                            },
                                          }))
                                        }
                                        className="text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
                                      >
                                        Clear ({selectedStates.length})
                                      </button>
                                    )}
                                  </div>
                                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    We&apos;ll prioritize universities in your preferred{" "}
                                    {countryId === "Canada" ? "provinces" : "states"}. Skip this to
                                    keep the whole country in play.
                                  </p>
                                  <div className="mt-3 flex max-h-44 flex-wrap gap-2 overflow-y-auto">
                                    {stateOptions.map((state) => {
                                      const active = selectedStates.includes(state.id)
                                      return (
                                        <button
                                          key={state.id}
                                          type="button"
                                          onClick={() => toggleState(countryId, state.id)}
                                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                            active
                                              ? "border-primary bg-primary text-primary-foreground"
                                              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                          }`}
                                        >
                                          {state.label}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => toggleDestination("not-sure")}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          answers.destinations.includes("not-sure")
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-secondary text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                        {answers.destinations.includes("not-sure")
                          ? "I've decided — let me pick"
                          : "Not sure yet — show me my options"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Academic stream + grades */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">Academic stream</p>
                      <div className="mt-3 flex flex-col gap-3">
                        {streamOptions.map((option) => (
                          <RadioOption
                            key={option.value}
                            label={option.label}
                            selected={answers.stream === option.value}
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, stream: option.value }))
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">Typical grade range</p>
                      <div className="mt-3 flex flex-col gap-3">
                        {gradeOptions.map((option) => (
                          <RadioOption
                            key={option.value}
                            label={option.label}
                            selected={answers.gradeBand === option.value}
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, gradeBand: option.value }))
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Budget slider */}
                {step === 4 && (
                  <div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-5 py-4">
                      <span className="text-sm font-semibold text-muted-foreground">
                        Annual budget (tuition + living)
                      </span>
                      <span className="font-heading text-xl font-extrabold text-primary">
                        ₹{answers.budget.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="mt-6 px-1">
                      <Slider
                        value={[answers.budget]}
                        onValueChange={(value) =>
                          setAnswers((prev) => ({ ...prev, budget: value[0] }))
                        }
                        min={500000}
                        max={5000000}
                        step={250000}
                      />
                    </div>
                    <div className="mt-3 flex justify-between text-xs font-medium text-muted-foreground">
                      <span>₹5,00,000</span>
                      <span className="text-primary">
                        {budgetBand(answers.budget).toUpperCase()}
                      </span>
                      <span>₹50,00,000</span>
                    </div>
                  </div>
                )}

                {/* Steps 6, 7, 8: single-select radio cards */}
                {(step === 5 || step === 6 || step === 7) && (
                  <div className="flex flex-col gap-3">
                    {(step === 5
                      ? timelineOptions
                      : step === 6
                        ? testOptions
                        : careerGoalOptions
                    ).map((option) => {
                      const key =
                        step === 5 ? "timeline" : step === 6 ? "testReadiness" : "careerGoal"
                      const selected = answers[key as keyof Answers] === option.value
                      return (
                        <RadioOption
                          key={option.value}
                          label={option.label}
                          description={"description" in option ? (option as { description?: string }).description : undefined}
                          selected={selected}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [key]: option.value,
                            }))
                          }
                        />
                      )
                    })}
                  </div>
                )}
              </div>

              {microMessage && (
                <div className="animate-quiz-pop mt-5 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    {microMessage}
                  </span>
                </div>
              )}

              {/* Footer nav */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="bg-transparent text-foreground hover:text-foreground border-foreground/20 hover:bg-foreground/5"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
                <Button type="button" size="lg" onClick={handleNext} disabled={!canProceed}>
                  {step === stepMeta.length - 1 ? "See My Results" : "Next"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mx-auto max-w-5xl">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading text-base font-bold text-card-foreground">
                        {loading
                          ? "Finding Your Matched Institutions"
                          : `Your Top ${results ? Math.min(results.length, 12) : 12} Matched Institutions`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {loading
                          ? "Finding your best matches across 80,000+ universities..."
                          : `Ranked from ${eligible.toLocaleString("en-US")} institutions that fit your profile`}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRetake}
                    className="bg-transparent text-foreground hover:text-foreground border-foreground/20 hover:bg-foreground/5"
                  >
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Start Over
                  </Button>
                </div>

                {error && (
                  <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
                    <p className="text-sm text-destructive">{error}</p>
                    <Button className="mt-4" onClick={runMatch}>
                      <RotateCcw className="mr-1 h-4 w-4" />
                      Try Again
                    </Button>
                  </div>
                )}

                {loading ? (
                  <MatchLoading />
                ) : results && results.length > 0 ? (
                  <>
                    {nonCoreSelected.length > 0 && (
                      <div className="mt-6 rounded-xl border border-border bg-card p-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          <Globe2 className="mr-1.5 inline h-4 w-4 shrink-0 text-primary" />
                          {listNames(
                            nonCoreSelected.map((id) => COUNTRY_BY_ID.get(id)?.name ?? id)
                          )}{" "}
                          {nonCoreSelected.length === 1 ? "is" : "are"} matched from our global
                          university database. Our counselors can share detailed cost, visa, and
                          intake guidance for these destinations on request.
                        </p>
                      </div>
                    )}
                    <ResultCarousel
                      matches={results}
                      services={buildServiceTags(answers)}
                    />
                    {explanation && <HowWeGotHere explanation={explanation} />}
                  </>
                ) : !error ? (
                  <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No strong matches with the current filters. Try widening your budget or
                      destinations.
                    </p>
                    <Button className="mt-4" variant="outline" onClick={handleBack}>
                      Adjust My Answers
                    </Button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default function CareerMatcherPage() {
  const [showResults, setShowResults] = useState(false)

  return (
    <PageWrapper>
      <PageBanner />
      <QuizSection showResults={showResults} setShowResults={setShowResults} />
      {showResults && <CtaSection />}
    </PageWrapper>
  )
}
