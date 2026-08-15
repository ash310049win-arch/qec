import { COUNTRIES } from "./destinations-data.ts"
import { STATE_OPTIONS } from "./global-countries.ts"

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
  /** True when the entry carries real, curated subject/interest tag data (the
   *  original curated dataset and AISHE/UGC records). False for raw Hipolabs
   *  imports, which only carry name/country/domain — those are excluded from
   *  course-specific matching and scoring. */
  hasVerifiedTags: boolean
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
  /** Preferred states/provinces keyed by dataset country name (soft preference). */
  destinationStates?: Record<string, string[]>
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

/** Reference rate used to express budget figures in INR across the quiz and matcher. */
export const USD_TO_INR = 85

const ABROAD_FLOOR: Record<BudgetTier, number> = {
  premium: 2100000,
  mid: 1500000,
  budget: 0,
  unknown: Infinity,
}

const DOMESTIC_FLOOR: Record<BudgetTier, number> = {
  premium: 1000000,
  mid: 500000,
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

/** Narrowly specialized institutions whose focus doesn't fit general academic,
 *  technical, or business matching (e.g. police academies, military academies,
 *  religious seminaries, art-only conservatories). They are excluded unless the
 *  student's selected interests align with the specialization.
 *
 *  `alignsWith` lists the InterestTags that make the specialization relevant to a
 *  student. An empty list means no quiz interest aligns, so the institution is
 *  never surfaced in general matching. */
const NARROW_SPECIALIZATIONS: {
  pattern: RegExp
  alignsWith: InterestTag[]
}[] = [
  {
    pattern: /\bPOLICE\b|\bLAW ENFORCEMENT\b/i,
    alignsWith: ["law"],
  },
  {
    pattern: /\bMILITARY\b|\bDEFENCE\b|\bDEFENSE\b|\bARMY\b|\bAIR FORCE\b|\bNAVAL\b/i,
    alignsWith: [],
  },
  {
    pattern: /\bSEMINARY\b|\bTHEOLOG\w*\b|\bKIRCHLICH\w*\b|\bBIBLE\b/i,
    alignsWith: [],
  },
  {
    pattern: /\bCONSERVATOR\w*\b|\bACADEMY OF MUSIC\b|\bMUSIC ACADEMY\b|\bACADEMY OF (?:FINE )?ART\w*\b/i,
    alignsWith: ["creative"],
  },
]

function passesSpecializationFilter(u: University, a: MatchAnswers): boolean {
  const spec = NARROW_SPECIALIZATIONS.find((s) => s.pattern.test(u.name))
  if (!spec) return true
  if (spec.alignsWith.length === 0) return false
  return a.interests.some((i) => spec.alignsWith.includes(i))
}

/** Records sourced from the Hipolabs global import only carry name/country/domain —
 *  they have no verified subject or tag data and are flagged hasVerifiedTags:false.
 *  Their name-derived tags are therefore unreliable for subject-fit matching, so
 *  they are treated as untagged (country / general availability only) and excluded
 *  from course-specific matching entirely (see courseSpecificCandidate). */
function subjectTags(u: University): InterestTag[] {
  return u.hasVerifiedTags ? u.tags : []
}

/** Destinations offered in the quiz, derived from the shared destinations data
 *  used by /destinations (stays in sync automatically when countries are added). */
export const OFFERED_ABROAD_DESTINATIONS = new Set(COUNTRIES.map((c) => norm(c.datasetCountry)))

/** Dataset country names that differ from the display name used on the site. */
const COUNTRY_DISPLAY_NAMES: Record<string, string> = {
  "Korea, Republic of": "South Korea",
}

function norm(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

const US_STATE_ABBREV: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
}

/** Normalizes a raw record state value (abbreviations, "New York, NY", etc.) to a canonical state name. */
function normalizeState(country: string, value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim().replace(/\s+/g, " ")
  const options = STATE_OPTIONS[country]
  if (!options) return trimmed.length > 0 ? trimmed : null

  const canonicalById = new Map(options.map((o) => [o.id.toLowerCase(), o.id]))
  const candidates = [trimmed, ...trimmed.split(",").map((part) => part.trim())]

  for (const candidate of candidates) {
    if (!candidate) continue
    if (canonicalById.has(candidate.toLowerCase())) return canonicalById.get(candidate.toLowerCase())!
    const expanded = US_STATE_ABBREV[candidate.toUpperCase()]
    if (expanded) return expanded
    const match = candidate.match(/\b([A-Za-z]{2})\b$/)
    if (match && US_STATE_ABBREV[match[1].toUpperCase()]) {
      return US_STATE_ABBREV[match[1].toUpperCase()]
    }
  }
  for (const state of options) {
    if (new RegExp(`\\b${state.id}\\b`, "i").test(trimmed)) return state.id
  }
  return null
}

/** When the student filters by course/field of study (interests selected), only
 *  universities with verified subject data may be matched and scored — untagged
 *  (Hipolabs-only) imports have no real course records to justify a subject match
 *  and must never surface as a course-specific result. Without an interest filter
 *  they remain eligible on country / general availability grounds. */
function courseSpecificCandidate(u: University, a: MatchAnswers): boolean {
  return a.interests.length === 0 || u.hasVerifiedTags
}

function passesHardFilters(u: University, a: MatchAnswers): boolean {
  if (a.pathway === "domestic" && u.pathway !== "domestic") return false
  if (a.pathway === "abroad" && u.pathway !== "abroad") return false

  if (!passesSpecializationFilter(u, a)) return false

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
  const tags = subjectTags(u)
  if (a.interests.length === 0) return 0.5
  if (tags.length === 0) return 0.5
  const overlap = tags.filter((t) => a.interests.includes(t)).length
  const base = overlap / Math.min(tags.length, a.interests.length)
  const streamTags = STREAM_TAGS[a.stream] ?? []
  const boost = streamTags.some((t) => tags.includes(t)) ? 0.1 : 0
  return Math.min(1, base + boost)
}

function destinationScore(u: University, a: MatchAnswers): number {
  if (a.destinations.length === 0) return 0.7
  const destinations = a.destinations.map(norm)
  if (u.pathway === "abroad") {
    if (!u.country) return 0.5
    if (!destinations.includes(norm(u.country))) return 0.2
    const states = a.destinationStates?.[u.country] ?? []
    if (states.length === 0) return 1
    const recordState = normalizeState(u.country, u.state)
    if (!recordState) return 0.85
    return states.some((s) => norm(s) === norm(recordState)) ? 1 : 0.3
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
      if (subjectTags(u).some((t) => t === "science" || t === "agriculture" || t === "engineering")) {
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
  const display = COUNTRY_DISPLAY_NAMES[country] ?? country
  return ARTICLED_COUNTRIES.has(country) ? `the ${display}` : display
}

function locationPhrase(u: University): string {
  if (u.pathway === "abroad") return countryPhrase(u.country)
  if (u.state && u.city) return `${u.city}, ${u.state}, India`
  if (u.state) return `${u.state}, India`
  return "India"
}

function interestReason(u: University, a: MatchAnswers): string | null {
  const tags = subjectTags(u)
  if (a.interests.length === 0 || tags.length === 0) return null
  const overlap = tags.filter((t) => a.interests.includes(t))
  if (overlap.length === 0) return null
  return `Your interest in ${formatTags(overlap)} aligns directly with ${shortName(u.name)}.`
}

function destinationReason(u: University, a: MatchAnswers): string | null {
  if (a.destinations.length === 0) return null
  const destinations = a.destinations.map(norm)
  if (u.pathway === "abroad") {
    if (!u.country || !destinations.includes(norm(u.country))) return null
    const states = a.destinationStates?.[u.country] ?? []
    if (states.length > 0) {
      const recordState = normalizeState(u.country, u.state)
      if (recordState && states.some((s) => norm(s) === norm(recordState))) {
        return `Located in ${recordState}, ${countryPhrase(u.country)} — one of the states you selected.`
      }
    }
    return `Located in ${countryPhrase(u.country)} — one of the destinations you selected.`
  }
  const place = u.state
  if (!place) return null
  if (!destinations.includes(norm(place))) return null
  return `Located in ${place}, India — one of the destinations you selected.`
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
      return subjectTags(u).some((t) => t === "science" || t === "agriculture" || t === "engineering")
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
  const scored = universityDatabase
    .filter((u) => passesHardFilters(u, answers))
    .filter((u) => courseSpecificCandidate(u, answers))
    .map((u) => {
      const breakdown = scoreUniversity(u, answers)
      const { whyFits, reasons } = buildWhyFits(u, answers, breakdown)
      return { university: u, score: breakdown.total, breakdown, reasons, whyFits }
    })
    .sort((a, b) => b.score - a.score)
  return pickBalanced(scored, 12)
}

function pickCountryKey(r: RankedMatch): string {
  return r.university.pathway === "abroad"
    ? r.university.country
    : (r.university.state ?? r.university.country)
}

/** Keeps the shortlist from being dominated by whichever destination happens to
 *  sort first in the raw dataset when several institutions tie on score (common
 *  with Hipolabs records, which are subject-neutral). Within each score tier,
 *  picks round-robin across countries, so the top results spread across every
 *  selected destination. Scores are never altered — this only orders ties. */
function pickBalanced(sorted: RankedMatch[], limit: number): RankedMatch[] {
  const pickedByCountry = new Map<string, number>()
  const out: RankedMatch[] = []
  let cursor = 0
  while (out.length < limit && cursor < sorted.length) {
    const tierScore = sorted[cursor].score
    let tierEnd = cursor
    while (tierEnd < sorted.length && sorted[tierEnd].score === tierScore) tierEnd++
    const tier = sorted.slice(cursor, tierEnd)
    cursor = tierEnd

    while (tier.length > 0 && out.length < limit) {
      let minCount = Infinity
      for (const c of tier) {
        const count = pickedByCountry.get(pickCountryKey(c)) ?? 0
        if (count < minCount) minCount = count
      }
      const pickIndex = tier.findIndex(
        (c) => (pickedByCountry.get(pickCountryKey(c)) ?? 0) === minCount
      )
      const pick = tier.splice(pickIndex, 1)[0]
      out.push(pick)
      const key = pickCountryKey(pick)
      pickedByCountry.set(key, (pickedByCountry.get(key) ?? 0) + 1)
    }
  }
  return out
}

export function countEligible(answers: MatchAnswers, universityDatabase: University[]): number {
  return universityDatabase.reduce(
    (total, u) =>
      total + (passesHardFilters(u, answers) && courseSpecificCandidate(u, answers) ? 1 : 0),
    0
  )
}

// ---- Transparent match explanation -------------------------------------

export type MatchExplanation = {
  /** Plain-language sentences describing what was ruled out, and why. */
  ruledOut: string[]
  /** Plain-language sentences describing what was prioritized, and why. */
  prioritized: string[]
  /** Closing sentence tying the logic to the actual top matches. */
  pointedTo: string | null
}

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`
}

function listPhrase(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ""
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`
}

function mean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

function pathwayRuleOut(answers: MatchAnswers): string | null {
  if (answers.pathway === "domestic") {
    return "Because you chose to study in India, we set aside universities abroad."
  }
  return null
}

function untaggedCourseRuleOut(answers: MatchAnswers, database: University[]): string | null {
  if (answers.interests.length === 0) return null
  const excluded = database.some((u) => !u.hasVerifiedTags)
  if (!excluded) return null
  return "Because you selected specific fields of study, we only matched universities with verified course and subject records — institutions without real subject data were set aside, so your results are shorter but accurate."
}

function analyzeBudget(
  answers: MatchAnswers,
  database: University[]
): { ruledOut: string | null; openEnded: string | null } {
  if (answers.budget <= 0) return { ruledOut: null, openEnded: null }

  if (answers.pathway === "domestic") {
    if (answers.budget >= DOMESTIC_FLOOR.premium) return { ruledOut: null, openEnded: null }
    return {
      ruledOut: `Because your annual budget is ${formatCurrency(answers.budget)}, we ruled out India's most expensive private institutions (typically ${formatCurrency(
        DOMESTIC_FLOOR.premium
      )}+/yr).`,
      openEnded: null,
    }
  }

  const minFloorByCountry = new Map<string, number>()
  for (const u of database) {
    if (u.pathway !== "abroad" || !u.country || u.tier === "unknown") continue
    const floor = ABROAD_FLOOR[u.tier]
    const current = minFloorByCountry.get(u.country)
    if (current === undefined || floor < current) minFloorByCountry.set(u.country, floor)
  }

  const ruledOut = [...minFloorByCountry.entries()]
    .filter(
      ([country, floor]) => OFFERED_ABROAD_DESTINATIONS.has(norm(country)) && answers.budget < floor
    )
    .sort((a, b) => a[1] - b[1])

  if (ruledOut.length > 0) {
    const selected = answers.destinations.map(norm)
    const shortlisted = ruledOut.filter(([country]) => selected.includes(norm(country)))
    let sentence = `Because your annual budget is ${formatCurrency(answers.budget)}, we ruled out ${listPhrase(
      ruledOut.map(([country]) => countryPhrase(country))
    )} — programs there typically start at ${formatCurrency(ruledOut[0][1])}+/yr.`
    if (shortlisted.length > 0) {
      sentence += ` That includes ${listPhrase(
        shortlisted.map(([country]) => countryPhrase(country))
      )}, ${shortlisted.length === 1 ? "a destination you selected" : "destinations you selected"}.`
    }
    return { ruledOut: sentence, openEnded: null }
  }

  if (minFloorByCountry.size > 0) {
    return {
      ruledOut: null,
      openEnded: `Because your ${formatCurrency(
        answers.budget
      )}/yr budget covered even the most expensive destinations, cost didn't narrow the field.`,
    }
  }
  return { ruledOut: null, openEnded: null }
}

function interestPrioritization(results: RankedMatch[], answers: MatchAnswers): string | null {
  if (answers.interests.length === 0) return null
  const matched = results.filter((r) =>
    subjectTags(r.university).some((t) => answers.interests.includes(t))
  )
  if (matched.length === 0) return null
  const scope =
    matched.length === results.length
      ? "every one of your top matches"
      : matched.length > 1
        ? "most of your top matches"
        : "your top match"
  return `Because you're interested in ${formatTags(
    answers.interests
  )} — the factor we weight most heavily in scoring — ${scope} specializes in that field.`
}

function careerGoalPrioritization(answers: MatchAnswers): string | null {
  switch (answers.careerGoal) {
    case "work-abroad":
      return "Because you want to work abroad after graduating, we prioritized programs with strong post-study work options."
    case "return-india":
      return "Because you plan to return to India for your career, we favored degrees with strong recognition in the Indian job market."
    case "postgrad-research":
      return "Because you're aiming at research or higher studies, universities with strong research reputations scored higher."
    default:
      return null
  }
}

function testReadinessPrioritization(answers: MatchAnswers): string | null {
  switch (answers.testReadiness) {
    case "have-scores":
      return "Because you already have test scores, programs requiring entrance tests became stronger contenders."
    case "planning":
      return "Because you're planning to take tests within 6-12 months, test-requiring programs stayed in play."
    case "need-guidance":
      return "Because you're still deciding on tests, we leaned toward programs with no entrance exam requirement."
    case "not-applicable":
      return "Because your courses don't require tests, we prioritized programs you can apply to directly."
    default:
      return null
  }
}

function timelinePrioritization(results: RankedMatch[], answers: MatchAnswers): string | null {
  if (answers.timeline !== "this-year") return null
  const boosted = results.some((r) => timelineAdjustment(r.university, answers) > 0)
  if (!boosted) return null
  if (answers.pathway === "domestic") {
    return "Because you want to start this year, we favored institutions with quicker admissions cycles."
  }
  return "Because you want to start this year, we boosted destinations with fast-track admissions — the United States, Canada, and Germany."
}

function gradePrioritization(results: RankedMatch[], answers: MatchAnswers): string | null {
  if (answers.gradeBand === "high" && results.some((r) => r.university.type === "University")) {
    return "Because your grades are 80%+, competitive research universities became realistic targets."
  }
  if (
    answers.gradeBand === "low" &&
    results.some((r) => r.university.type === "College" || r.university.type === "Standalone")
  ) {
    return "Because your grades are in the 45-60% range, we favored institutions with accessible entry criteria."
  }
  return null
}

function pointerSentence(results: RankedMatch[]): string | null {
  if (results.length === 0) return null
  const places: string[] = []
  for (const r of results) {
    const place = r.university.pathway === "abroad" ? r.university.country : r.university.state
    if (place && !places.includes(place)) places.push(place)
  }
  if (places.length === 0) return null
  const abroad = results[0].university.pathway === "abroad"
  const placeList = listPhrase(places.map((p) => (abroad ? countryPhrase(p) : p)))
  return `That combination is what put ${placeList} at the top of your list — with ${shortName(
    results[0].university.name
  )} at number one.`
}

export function buildMatchExplanation(
  answers: MatchAnswers,
  database: University[],
  results: RankedMatch[]
): MatchExplanation {
  const ruledOut: string[] = []
  const prioritized: string[] = []

  const pathway = pathwayRuleOut(answers)
  if (pathway) ruledOut.push(pathway)

  const untagged = untaggedCourseRuleOut(answers, database)
  if (untagged) ruledOut.push(untagged)

  const budget = analyzeBudget(answers, database)
  if (budget.ruledOut) ruledOut.push(budget.ruledOut)
  if (budget.openEnded) prioritized.push(budget.openEnded)

  if (results.length > 0) {
    const candidates = [
      {
        contribution: mean(results.map((r) => r.breakdown.interest)) * WEIGHTS.interest,
        text: interestPrioritization(results, answers),
      },
      {
        contribution: mean(results.map((r) => r.breakdown.careerGoal)) * WEIGHTS.careerGoal,
        text: careerGoalPrioritization(answers),
      },
      {
        contribution: mean(results.map((r) => r.breakdown.testReadiness)) * WEIGHTS.testReadiness,
        text: testReadinessPrioritization(answers),
      },
      {
        contribution: mean(results.map((r) => timelineAdjustment(r.university, answers))),
        text: timelinePrioritization(results, answers),
      },
      {
        contribution: mean(results.map((r) => gradeAdjustment(r.university, answers))),
        text: gradePrioritization(results, answers),
      },
    ]
    const topTwo = candidates
      .filter((c): c is { contribution: number; text: string } => Boolean(c.text))
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, 2)
    for (const candidate of topTwo) prioritized.push(candidate.text)
  }

  return {
    ruledOut,
    prioritized,
    pointedTo: results.length > 0 ? pointerSentence(results) : null,
  }
}
