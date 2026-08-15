import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  buildMatchExplanation,
  matchStudent,
  type MatchAnswers,
  type University,
} from "../lib/matcher.ts"

const database = JSON.parse(
  readFileSync(join(process.cwd(), "dataset", "universities.compiled.json"), "utf8")
) as University[]

const profiles: { name: string; answers: MatchAnswers }[] = [
  {
    name: "A. Tech student, tight budget, wants to work abroad",
    answers: {
      interests: ["technology"],
      pathway: "abroad",
      destinations: [],
      stream: "science",
      gradeBand: "mid",
      budget: 800000,
      timeline: "next-year",
      testReadiness: "planning",
      careerGoal: "work-abroad",
    },
  },
  {
    name: "B. Medicine student, high budget, research goal, starting this year",
    answers: {
      interests: ["healthcare", "science"],
      pathway: "abroad",
      destinations: ["United States", "United Kingdom"],
      stream: "medicine",
      gradeBand: "high",
      budget: 5000000,
      timeline: "this-year",
      testReadiness: "have-scores",
      careerGoal: "postgrad-research",
    },
  },
  {
    name: "C. Creative student, study in India, lower grades, returning to India",
    answers: {
      interests: ["creative", "media"],
      pathway: "domestic",
      destinations: ["Maharashtra", "Karnataka"],
      stream: "arts",
      gradeBand: "low",
      budget: 800000,
      timeline: "exploring",
      testReadiness: "not-applicable",
      careerGoal: "return-india",
    },
  },
  {
    name: "D. Law student, mid budget, US shortlisted but out of reach",
    answers: {
      interests: ["law"],
      pathway: "abroad",
      destinations: ["United States", "Germany"],
      stream: "arts",
      gradeBand: "mid",
budget: 1800000,
      timeline: "next-year",
      testReadiness: "need-guidance",
      careerGoal: "undecided",
    },
  },
  {
    name: "E. Business student, this-year start, tests planned",
    answers: {
      interests: ["business"],
      pathway: "abroad",
      destinations: [],
      stream: "commerce",
      gradeBand: "high",
      budget: 2500000,
      timeline: "this-year",
      testReadiness: "planning",
      careerGoal: "undecided",
    },
  },
  {
    name: "F. Engineering student, Japan only, mid budget",
    answers: {
      interests: ["engineering", "technology"],
      pathway: "abroad",
      destinations: ["Japan"],
      stream: "engineering",
      gradeBand: "mid",
      budget: 1600000,
      timeline: "next-year",
      testReadiness: "planning",
      careerGoal: "work-abroad",
    },
  },
]

for (const profile of profiles) {
  const results = matchStudent(profile.answers, database)
  const explanation = buildMatchExplanation(profile.answers, database, results)
  console.log("\n" + "=".repeat(78))
  console.log(profile.name)
  console.log("-".repeat(78))
  console.log(
    `Top matches: ${results
      .map((r) => `${r.university.name} (${r.university.country})`)
      .join(" | ")}`
  )
  console.log("  [ruled out]")
  for (const s of explanation.ruledOut) console.log(`    - ${s}`)
  console.log("  [prioritized]")
  for (const s of explanation.prioritized) console.log(`    - ${s}`)
  console.log("  [pointed to]")
  console.log(`    - ${explanation.pointedTo ?? "(none)"}`)
}
