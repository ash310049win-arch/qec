"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import { CtaSection } from "@/components/home/cta-section"
import { ResultCard } from "@/components/career-matcher/result-card"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  MapPin,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react"
import { OrganicBlob, FloatingDots, FloatingTriangle, FloatingLine } from "@/components/decorative-elements"
import {
  INTEREST_OPTIONS,
  type InterestTag,
  type MatchAnswers,
  type PathwayAnswer,
  type RankedMatch,
} from "@/lib/matcher"

type Answers = {
  interests: InterestTag[]
  pathway: PathwayAnswer | ""
  destinations: string[]
  stream: string
  gradeBand: string
  budget: number
  timeline: string
  testReadiness: string
  careerGoal: string
}

const destinationOptions = [
  {
    id: "usa",
    country: "United States",
    image: "/images/dest-usa.jpg",
    tagline: "Home to the world's most prestigious universities",
    minBudget: 28000,
  },
  {
    id: "canada",
    country: "Canada",
    image: "/images/dest-canada.jpg",
    tagline: "Quality education with strong immigration pathways",
    minBudget: 20000,
  },
  {
    id: "uk",
    country: "United Kingdom",
    image: "/images/dest-uk.jpg",
    tagline: "Prestigious degrees with a rich academic tradition",
    minBudget: 25000,
  },
  {
    id: "australia",
    country: "Australia",
    image: "/images/dest-australia.jpg",
    tagline: "Innovative education in a vibrant, welcoming environment",
    minBudget: 22000,
  },
  {
    id: "germany",
    country: "Germany",
    image: "/images/dest-germany.jpg",
    tagline: "Tuition-free education in the heart of Europe",
    minBudget: 8000,
  },
  {
    id: "ireland",
    country: "Ireland",
    image: "/images/dest-ireland.jpg",
    tagline: "English-speaking, tech hub of Europe",
    minBudget: 18000,
  },
]

const indiaDestinationOption = {
  id: "india",
  country: "India",
  image: "",
  tagline: "Institutions in every state and stream",
  minBudget: 6000,
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
    subtitle: "Pick as many as you like, or tell us you're still exploring.",
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

function budgetBand(budget: number): string {
  if (budget < 15000) return "budget-friendly"
  if (budget < 30000) return "mid-range"
  if (budget < 45000) return "higher-range"
  return "premium"
}

function buildServiceTags(answers: Answers): string[] {
  const abroad = answers.pathway === "abroad" || answers.pathway === "not-sure"
  const tags = ["University Shortlisting", "Application & SOP Support"]
  if (abroad) tags.push("Visa Assistance")
  if (answers.testReadiness === "planning" || answers.testReadiness === "need-guidance") {
    tags.push("Test Prep Coaching")
  }
  if (answers.budget < 15000) {
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
    const country = destinationOptions.find((d) => d.id === id)
    if (country) {
      out.push(country.country)
      continue
    }
    if (id === "india") {
      out.push("india")
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
          Career Matcher
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
    stream: "",
    gradeBand: "",
    budget: 25000,
    timeline: "",
    testReadiness: "",
    careerGoal: "",
  })
  const [step, setStep] = useState(0)
  const [results, setResults] = useState<RankedMatch[] | null>(null)
  const [eligible, setEligible] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: "smooth" })
  }, [showResults])

  const runMatch = useCallback(async () => {
    setLoading(true)
    setError(null)
    setResults(null)
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
      setResults(data.results as RankedMatch[])
      setEligible(data.eligible as number)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while matching.")
    } finally {
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
    setAnswers((prev) => ({ ...prev, pathway: value as Answers["pathway"], destinations: [] }))
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
        return { ...prev, destinations: withoutNotSure.filter((d) => d !== id) }
      }
      return { ...prev, destinations: [...withoutNotSure, id] }
    })
  }

  const handleNext = () => {
    if (!canProceed) return
    if (step < stepMeta.length - 1) {
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
    setAnswers({
      interests: [],
      pathway: "",
      destinations: [],
      stream: "",
      gradeBand: "",
      budget: 25000,
      timeline: "",
      testReadiness: "",
      careerGoal: "",
    })
    setResults(null)
    setEligible(0)
    setError(null)
    setLoading(false)
    setStep(0)
    setShowResults(false)
  }

  const meta = stepMeta[step]

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
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>
                  Step {step + 1} of {stepMeta.length}: {meta.title}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {stepAnswered.filter(Boolean).length} completed
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${((step + (canProceed ? 1 : 0)) / stepMeta.length) * 100}%` }}
                />
              </div>

              <h2 className="mt-6 font-heading text-xl font-bold text-card-foreground md:text-2xl">
                {meta.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{meta.subtitle}</p>

              <div className="mt-5">
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
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {(answers.pathway === "not-sure"
                          ? [...destinationOptions, indiaDestinationOption]
                          : destinationOptions
                        ).map((dest) => {
                          const selected = answers.destinations.includes(dest.id)
                          return (
                            <button
                              key={dest.id}
                              type="button"
                              onClick={() => toggleDestination(dest.id)}
                              className={`group relative overflow-hidden rounded-xl border bg-card text-left transition-all duration-300 ${
                                selected
                                  ? "border-primary ring-1 ring-primary"
                                  : "border-border hover:-translate-y-1 hover:shadow-lg"
                              }`}
                            >
                              <div className="relative h-36 w-full overflow-hidden">
                                {dest.image ? (
                                  <>
                                    <Image
                                      src={dest.image}
                                      alt={`Study in ${dest.country}`}
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                                  </>
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40">
                                    <span className="font-heading text-2xl font-extrabold tracking-tight text-white/90">
                                      IN
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                                  </div>
                                )}
                                <div className="absolute bottom-3 left-4 pr-10">
                                  <h3 className="font-heading text-base font-bold text-white drop-shadow-md">
                                    {dest.country}
                                  </h3>
                                  <p className="text-xs text-white/80 drop-shadow-sm leading-snug">
                                    {dest.tagline}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between gap-2 px-4 py-3">
                                <span className="text-xs font-medium text-muted-foreground">
                                  <MapPin className="mr-1 inline h-3.5 w-3.5 text-primary" />
                                  From ${dest.minBudget.toLocaleString("en-US")}/yr
                                </span>
                                <span
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                    selected ? "border-primary bg-primary" : "border-muted-foreground/40"
                                  }`}
                                >
                                  {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                                </span>
                              </div>
                            </button>
                          )
                        })}
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
                        ${answers.budget.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="mt-6 px-1">
                      <Slider
                        value={[answers.budget]}
                        onValueChange={(value) =>
                          setAnswers((prev) => ({ ...prev, budget: value[0] }))
                        }
                        min={5000}
                        max={60000}
                        step={5000}
                      />
                    </div>
                    <div className="mt-3 flex justify-between text-xs font-medium text-muted-foreground">
                      <span>$5,000</span>
                      <span className="text-primary">${budgetBand(answers.budget).toUpperCase()}</span>
                      <span>$60,000</span>
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
                        Your Top 3 Matched Institutions
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {loading
                          ? "Matching your profile across the database..."
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
                  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                      <Skeleton key={i} className="h-[420px] rounded-xl" />
                    ))}
                  </div>
                ) : results && results.length > 0 ? (
                  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {results.map((match, i) => (
                      <ResultCard
                        key={match.university.id}
                        match={match}
                        index={i}
                        services={buildServiceTags(answers)}
                      />
                    ))}
                  </div>
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
