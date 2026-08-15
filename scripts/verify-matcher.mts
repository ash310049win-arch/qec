import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  buildMatchExplanation,
  matchStudent,
  countEligible,
  type MatchAnswers,
  type University,
} from "../lib/matcher.ts"

const database = JSON.parse(
  readFileSync(join(process.cwd(), "dataset", "universities.compiled.json"), "utf8")
) as University[]

function run(name: string, answers: MatchAnswers) {
  console.log(`\n=== ${name} ===`)
  const results = matchStudent(answers, database)
  const eligible = countEligible(answers, database)
  const explanation = buildMatchExplanation(answers, database, results)
  console.log(`eligible: ${eligible}  |  returned: ${results.length}`)
  if (explanation.ruledOut.length) console.log("  ruledOut:", explanation.ruledOut[0])
  for (const [i, r] of results.entries()) {
    console.log(
      `  #${String(i + 1).padStart(2)} ${r.score.toFixed(1).padStart(5)} [${r.university.country}${r.university.state ? " / " + r.university.state : ""}] ${r.university.name}`
    )
  }
  console.log("  whyFits (top):", results[0]?.whyFits)
  if (answers.interests.length > 0) {
    for (const r of results) {
      if (!r.university.hasVerifiedTags) {
        console.error(`  FAIL: untagged university surfaced in course-specific matching: ${r.university.name}`)
        process.exitCode = 1
      }
    }
  }
  return results
}

console.log(">>> REQUESTED SAMPLE: Science & Technology interest across 3 countries (Latvia, Kenya, Vietnam)")
console.log("    These countries exist only as raw Hipolabs imports (no verified subject data),")
console.log("    so a course-specific search must return nothing rather than irrelevant matches.")
const EXCLUDED_CLASS_RX = /\bPOLICE\b|\bLAW ENFORCEMENT\b|\bMILITARY\b|\bDEFENCE\b|\bDEFENSE\b|\bARMY\b|\bAIR FORCE\b|\bNAVAL\b|\bSEMINARY\b|\bTHEOLOG\w*\b|\bBIBLE\b|\bCONSERVATOR\w*\b|\bACADEMY OF MUSIC\b|\bMUSIC ACADEMY\b|\bACADEMY OF (?:FINE )?ART\w*\b/i
const scienceTechAnswers: MatchAnswers = {
  interests: ["science", "technology"],
  pathway: "abroad",
  destinations: ["Latvia", "Kenya", "Viet Nam", "Vietnam"],
  destinationStates: {},
  stream: "science",
  gradeBand: "mid",
  budget: 5000000,
  timeline: "next-year",
  testReadiness: "planning",
  careerGoal: "work-abroad",
}
const rSample = run("Science & Technology: Latvia + Kenya + Vietnam", scienceTechAnswers)
let sampleFailed = false
if (rSample.length > 0) {
  for (const r of rSample) {
    const u = r.university
    if (!["Latvia", "Kenya", "Viet Nam", "Vietnam"].includes(u.country)) {
      console.error(`  FAIL: unexpected country ${u.country} in results`)
      sampleFailed = true
    }
    if (EXCLUDED_CLASS_RX.test(u.name)) {
      console.error(`  FAIL: irrelevant institution surfaced: ${u.name} (${u.country})`)
      sampleFailed = true
    }
    if (r.whyFits.includes("aligns directly") || r.reasons.some((x) => x.includes("aligns directly"))) {
      console.error(`  FAIL: interest-fit claim made without verified subject data: ${u.name}`)
      sampleFailed = true
    }
  }
} else {
  console.log("  (no matches — correct: these countries have zero verified-tag universities)")
}
if (sampleFailed) process.exitCode = 1

console.log("\n>>> COURSE-SPECIFIC SEARCH: Canada (core) has zero verified-tag universities")
console.log("    A course search with no verified subject data anywhere in the destination")
console.log("    must return an honest empty result — never padded with untagged imports.")
const rB = run("Canada + Ontario preference (course-specific)", {
  interests: ["technology"],
  pathway: "abroad",
  destinations: ["Canada"],
  destinationStates: { Canada: ["Ontario"] },
  stream: "science",
  gradeBand: "mid",
  budget: 2500000,
  timeline: "next-year",
  testReadiness: "planning",
  careerGoal: "work-abroad",
})
if (rB.length > 0) {
  const untagged = rB.filter((r) => !r.university.hasVerifiedTags)
  if (untagged.length > 0) {
    console.error("  FAIL: untagged university surfaced in course-specific search")
    process.exitCode = 1
  }
  console.log(`  (note: ${rB.length} verified results exist in Canada)`)
} else {
  console.log("  (no matches — correct: Canada has zero verified-tag universities)")
}

console.log("\n>>> COUNTRY-ONLY SEARCH (no course filter): untagged imports still match")
console.log("    Without an interest filter, Hipolabs entries remain eligible on country")
console.log("    and budget grounds — the flag only gates course-specific matching.")
const rC = run("US + New York preference (country-only)", {
  interests: [],
  pathway: "abroad",
  destinations: ["United States"],
  destinationStates: { "United States": ["New York"] },
  stream: "science",
  gradeBand: "high",
  budget: 3000000,
  timeline: "this-year",
  testReadiness: "have-scores",
  careerGoal: "work-abroad",
})
if (rC.length === 0) {
  console.error("  FAIL: country-only US search should return results")
  process.exitCode = 1
}
if (rC.some((r) => r.university.country !== "United States")) {
  console.error("  FAIL: non-US university surfaced in US-only search")
  process.exitCode = 1
}

console.log("\n>>> INR budget floor (country-only): ₹8L excludes premium US, keeps budget-tier Germany")
const rD = run("Budget floor INR (country-only)", {
  interests: [],
  pathway: "abroad",
  destinations: ["United States", "Germany"],
  destinationStates: {},
  stream: "engineering",
  gradeBand: "low",
  budget: 800000,
  timeline: "next-year",
  testReadiness: "need-guidance",
  careerGoal: "return-india",
})
if (rD.some((r) => r.university.country === "United States")) {
  console.error("  FAIL: US premium-tier universities must be ruled out at ₹8L")
  process.exitCode = 1
}
if (rD.length === 0) {
  console.error("  FAIL: budget-tier Germany should still be reachable at ₹8L")
  process.exitCode = 1
}

console.log("\n>>> Domestic India path still works (Maharashtra, ₹8L)")
const rE = run("Domestic India", {
  interests: ["technology"],
  pathway: "domestic",
  destinations: ["Maharashtra"],
  destinationStates: {},
  stream: "science",
  gradeBand: "mid",
  budget: 800000,
  timeline: "this-year",
  testReadiness: "not-applicable",
  careerGoal: "return-india",
})
if (rE.length === 0) {
  console.error("  FAIL: domestic India should return matches")
  process.exitCode = 1
}

console.log("\nAll scenarios executed.")