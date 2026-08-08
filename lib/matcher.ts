export type InterestTag =
  | "technology"
  | "engineering"
  | "business"
  | "creative"
  | "healthcare"
  | "science"
  | "law"
  | "media"
  | "sustainability"
  | "education"
  | "hospitality"
  | "agriculture"

export type BudgetTier = "budget" | "mid" | "premium" | "unknown"

export type University = {
  id: string
  name: string
  country: string
  state?: string | null
  city?: string | null
  type: string
  pathway: "domestic" | "abroad"
  tier: BudgetTier
  tests: boolean | null
  est?: number | null
  tags: InterestTag[]
  sites?: string[]
  parent?: string | null
}

export type PathwayAnswer = "domestic" | "abroad" | "not-sure"

export type MatchAnswers = {
  interests: InterestTag[]
  pathway: PathwayAnswer
  destinations: string[]
  stream: string
  gradeBand: string
  budget: number
  timeline: string
  testReadiness: string
  careerGoal: string
}

export type ScoreBreakdown = {
  interest: number
  destination: number
  careerGoal: number
  testReadiness: number
  total: number
}

export type RankedMatch = {
  university: University
  score: number
  breakdown: ScoreBreakdown
  reasons: string[]
  whyFits: string
}

export const INTEREST_OPTIONS: { value: InterestTag; label: string; description: string }[] = [
  { value: "technology", label: "Technology & Software", description: "Computers, AI, data, IT" },
  { value: "engineering", label: "Engineering & Manufacturing", description: "Mechanical, civil, electrical, marine" },
  { value: "business", label: "Business & Management", description: "Finance, marketing, entrepreneurship" },
  { value: "creative", label: "Creative Arts & Design", description: "Design, fashion, fine arts, music" },
  { value: "healthcare", label: "Healthcare & Medicine", description: "Medicine, nursing, pharmacy, allied health" },
  { value: "science", label: "Science & Research", description: "Physics, chemistry, biology, lab science" },
  { value: "law", label: "Law & Policy", description: "Legal studies, advocacy" },
  { value: "media", label: "Media & Communication", description: "Journalism, film, mass communication" },
  { value: "sustainability", label: "Sustainability & Environment", description: "Environment, forestry, renewable energy" },
  { value: "education", label: "Education & Teaching", description: "Teaching, curriculum, training" },
  { value: "hospitality", label: "Hospitality & Tourism", description: "Hotels, catering, travel" },
  { value: "agriculture", label: "Agriculture & Food", description: "Farming, fisheries, food science" },
]

export const TAG_LABELS: Record<InterestTag, string> = {
  technology: "technology & software",
  engineering: "engineering",
  business: "business & management",
  creative: "creative arts",
  healthcare: "healthcare",
  science: "science & research",
  law: "law & policy",
  media: "media & communication",
  sustainability: "sustainability",
  education: "education & teaching",
  hospitality: "hospitality & tourism",
  agriculture: "agriculture",
}

const WEIGHTS = {
  interest: 40,
  destination: 25,
  careerGoal: 20,
  testReadiness: 15,
} as const

const ABROAD_FLOOR: Record<BudgetTier, number> = {
  premium: 25000,
  mid: 18000,
  budget: 0,
  unknown: Infinity,
}

const DOMESTIC_FLOOR: Record<BudgetTier, number> = {
  premium: 12000,
  mid: 6000,
  budget: 0,
  unknown: Infinity,
}

const STREAM_TAGS: Record<string, InterestTag[]> = {
  science: ["science", "technology", "agriculture"],
  commerce: ["business"],
  arts: ["creative", "media", "law", "education"],
  engineering: ["engineering", "technology"],
  medicine: ["healthcare"],
}

const FAST_TRACK_COUNTRIES = new Set(["United States", "Canada", "Germany"])

function norm(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

function passesHardFilters(u: University, a: MatchAnswers): boolean {
  if (a.pathway === "domestic" && u.pathway !== "domestic") return false
  if (a.pathway === "abroad" && u.pathway !== "abroad") return false

  const floor = (u.pathway === "domestic" ? DOMESTIC_FLOOR : ABROAD_FLOOR)[u.tier]
  if (a.budget > 0 && Number.isFinite(floor) && a.budget < floor) return false

  const destinations = a.destinations.map(norm)
  if (destinations.length > 0) {
    if (u.pathway === "abroad") {
      if (u.country && !destinations.includes(norm(u.country))) return false
    } else if (
      u.state &&
      !destinations.includes(norm(u.state)) &&
      !destinations.includes("india")
    ) {
      return false
    }
  }

  return true
}

function interestScore(u: University, a: MatchAnswers): number {
  if (a.interests.length === 0) return 0.5
  if (u.tags.length === 0) return 0.5
  const overlap = u.tags.filter((t) => a.interests.includes(t)).length
  const base = overlap / Math.min(u.tags.length, a.interests.length)
  const streamTags = STREAM_TAGS[a.stream] ?? []
  const boost = streamTags.some((t) => u.tags.includes(t)) ? 0.1 : 0
  return Math.min(1, base + boost)
}

function destinationScore(u: University, a: MatchAnswers): number {
  if (a.destinations.length === 0) return 0.7
  const destinations = a.destinations.map(norm)
  if (u.pathway === "abroad") {
    if (!u.country) return 0.5
    return destinations.includes(norm(u.country)) ? 1 : 0.2
  }
  if (!u.state) return 0.5
  return destinations.includes(norm(u.state)) ? 1 : 0.2
}

function careerGoalScore(u: University, a: MatchAnswers): number {
  switch (a.careerGoal) {
    case "work-abroad":
      return u.pathway === "abroad" ? 1 : 0.25
    case "return-india":
      return u.pathway === "domestic" ? 1 : 0.6
    case "postgrad-research": {
      let score = u.type === "University" ? 0.9 : u.type === "Standalone" ? 0.7 : 0.5
      if (u.tags.some((t) => t === "science" || t === "agriculture" || t === "engineering")) {
        score += 0.15
      }
      return Math.min(1, score)
    }
    default:
      return 0.7
  }
}

function testReadinessScore(u: University, a: MatchAnswers): number {
  const required = u.tests
  switch (a.testReadiness) {
    case "have-scores":
      return required === false ? 0.8 : 0.9
    case "planning":
      return required === true ? 0.9 : required === false ? 0.7 : 0.8
    case "need-guidance":
      return required === true ? 0.45 : required === false ? 0.9 : 0.65
    case "not-applicable":
      return required === false ? 1 : required === true ? 0.55 : 0.8
    default:
      return 0.75
  }
}

function gradeAdjustment(u: University, a: MatchAnswers): number {
  if (a.gradeBand === "high") return u.type === "University" ? 0.3 : 0
  if (a.gradeBand === "low") return u.type === "College" || u.type === "Standalone" ? 0.3 : 0
  return 0
}

function timelineAdjustment(u: University, a: MatchAnswers): number {
  if (a.timeline !== "this-year") return 0
  if (u.pathway === "domestic") return 0.2
  return FAST_TRACK_COUNTRIES.has(u.country) ? 0.2 : 0
}

function scoreUniversity(u: University, a: MatchAnswers): ScoreBreakdown {
  const interest = interestScore(u, a)
  const destination = destinationScore(u, a)
  const careerGoal = careerGoalScore(u, a)
  const testReadiness = testReadinessScore(u, a)
  const weighted =
    interest * WEIGHTS.interest +
    destination * WEIGHTS.destination +
    careerGoal * WEIGHTS.careerGoal +
    testReadiness * WEIGHTS.testReadiness
  const prestige = (u.type === "University" ? 0.5 : 0) + (u.est && u.est <= 1990 ? 0.5 : 0)
  const total = weighted + prestige + gradeAdjustment(u, a) + timelineAdjustment(u, a)
  return { interest, destination, careerGoal, testReadiness, total }
}

function formatTags(tags: InterestTag[]): string {
  const labels = tags.map((t) => TAG_LABELS[t])
  if (labels.length === 0) return ""
  if (labels.length === 1) return labels[0]
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`
}

function shortName(name: string): string {
  return name.length > 46 ? `${name.slice(0, 44)}...` : name
}

function articleize(type: string): string {
  return `a ${type}`
}

const ARTICLED_COUNTRIES = new Set([
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Netherlands",
  "Czech Republic",
])

function countryPhrase(country: string): string {
  return ARTICLED_COUNTRIES.has(country) ? `the ${country}` : country
}

function locationPhrase(u: University): string {
  if (u.pathway === "abroad") return countryPhrase(u.country)
  if (u.state && u.city) return `${u.city}, ${u.state}, India`
  if (u.state) return `${u.state}, India`
  return "India"
}

function interestReason(u: University, a: MatchAnswers): string | null {
  if (a.interests.length === 0 || u.tags.length === 0) return null
  const overlap = u.tags.filter((t) => a.interests.includes(t))
  if (overlap.length === 0) return null
  return `Your interest in ${formatTags(overlap)} aligns directly with ${shortName(u.name)}.`
}

function destinationReason(u: University, a: MatchAnswers): string | null {
  if (a.destinations.length === 0) return null
  const destinations = a.destinations.map(norm)
  const place = u.pathway === "abroad" ? u.country : u.state
  if (!place) return null
  if (!destinations.includes(norm(place))) return null
  const display = u.pathway === "abroad" ? countryPhrase(u.country) : place
  return `Located in ${display}${u.pathway === "domestic" ? ", India" : ""} — one of the destinations you selected.`
}

function pathwayReason(u: University, a: MatchAnswers): string | null {
  if (a.pathway === "domestic" && u.pathway === "domestic") {
    return "Matches your plan to study in India."
  }
  if (a.pathway === "abroad" && u.pathway === "abroad") {
    return "Matches your plan to study abroad."
  }
  return null
}

function careerReason(u: University, a: MatchAnswers): string | null {
  switch (a.careerGoal) {
    case "work-abroad":
      return u.pathway === "abroad"
        ? "A strong fit for your goal to work abroad after graduation."
        : null
    case "return-india":
      return u.pathway === "domestic"
        ? "Supports your goal of building a career in India."
        : "A good option even if you plan to return to India after graduating."
    case "postgrad-research":
      return u.tags.some((t) => t === "science" || t === "agriculture" || t === "engineering")
        ? "A good springboard for research and higher studies."
        : "A solid base for postgraduate studies."
    default:
      return null
  }
}

function budgetReason(u: University, a: MatchAnswers): string | null {
  if (u.tier === "unknown") return null
  const fits =
    u.pathway === "domestic" ? a.budget >= DOMESTIC_FLOOR[u.tier] : a.budget >= ABROAD_FLOOR[u.tier]
  if (!fits) return null
  return "Sits comfortably within your annual budget."
}

function testReason(u: University, a: MatchAnswers): string | null {
  if (a.testReadiness === "have-scores") {
    return u.tests === false ? null : "Your existing test scores will be an asset for admissions."
  }
  if (a.testReadiness === "need-guidance" && u.tests === false) {
    return "No separate entrance test required, so test prep won't hold you up."
  }
  if (a.testReadiness === "not-applicable" && u.tests === false) {
    return "No separate entrance test required — you can apply directly."
  }
  return null
}

function gradeReason(u: University, a: MatchAnswers): string | null {
  if (a.gradeBand === "high" && u.type === "University") {
    return "Strong academics open the door to competitive university programs."
  }
  if (a.gradeBand === "low" && (u.type === "College" || u.type === "Standalone")) {
    return "This institution type stays accessible with your current grade profile."
  }
  return null
}

function buildWhyFits(
  u: University,
  a: MatchAnswers,
  breakdown: ScoreBreakdown
): { whyFits: string; reasons: string[] } {
  const contributors = [
    { text: interestReason(u, a), contribution: breakdown.interest * WEIGHTS.interest },
    { text: destinationReason(u, a), contribution: breakdown.destination * WEIGHTS.destination },
    { text: careerReason(u, a), contribution: breakdown.careerGoal * WEIGHTS.careerGoal },
    { text: testReason(u, a), contribution: breakdown.testReadiness * WEIGHTS.testReadiness },
  ]
    .filter((entry): entry is { text: string; contribution: number } => Boolean(entry.text))
    .sort((x, y) => y.contribution - x.contribution)

  const extras = [pathwayReason(u, a), budgetReason(u, a), gradeReason(u, a)].filter(
    (text): text is string => Boolean(text)
  )

  const reasons = [...contributors.slice(0, 3).map((entry) => entry.text), ...extras].slice(0, 4)
  const whyFits = `${u.name} is ${articleize(u.type.toLowerCase())} in ${locationPhrase(u)}. ${reasons.join(" ")}`
  return { whyFits, reasons }
}

export function matchStudent(
  answers: MatchAnswers,
  universityDatabase: University[]
): RankedMatch[] {
  return universityDatabase
    .filter((u) => passesHardFilters(u, answers))
    .map((u) => {
      const breakdown = scoreUniversity(u, answers)
      const { whyFits, reasons } = buildWhyFits(u, answers, breakdown)
      return { university: u, score: breakdown.total, breakdown, reasons, whyFits }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export function countEligible(answers: MatchAnswers, universityDatabase: University[]): number {
  return universityDatabase.reduce((total, u) => total + (passesHardFilters(u, answers) ? 1 : 0), 0)
}
