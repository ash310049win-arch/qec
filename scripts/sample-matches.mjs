import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { matchStudent, countEligible } from "../lib/matcher.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const database = JSON.parse(
  readFileSync(join(root, "dataset", "universities.compiled.json"), "utf8")
)

const profiles = [
  {
    name: "A · Tech abroad to US",
    answers: {
      interests: ["technology", "engineering"],
      pathway: "abroad",
      destinations: ["United States"],
      stream: "engineering",
      gradeBand: "high",
      budget: 45000,
      timeline: "next-year",
      testReadiness: "have-scores",
      careerGoal: "work-abroad",
    },
  },
  {
    name: "B · Nursing in Maharashtra, stay in India",
    answers: {
      interests: ["healthcare"],
      pathway: "domestic",
      destinations: ["Maharashtra"],
      stream: "medicine",
      gradeBand: "mid",
      budget: 12000,
      timeline: "next-year",
      testReadiness: "not-applicable",
      careerGoal: "return-india",
    },
  },
  {
    name: "C · Undecided business student, open to both",
    answers: {
      interests: ["business"],
      pathway: "not-sure",
      destinations: [],
      stream: "commerce",
      gradeBand: "unknown",
      budget: 20000,
      timeline: "exploring",
      testReadiness: "need-guidance",
      careerGoal: "undecided",
    },
  },
  {
    name: "D · Sustainability in Germany on a tight budget",
    answers: {
      interests: ["sustainability"],
      pathway: "abroad",
      destinations: ["Germany"],
      stream: "science",
      gradeBand: "high",
      budget: 10000,
      timeline: "this-year",
      testReadiness: "planning",
      careerGoal: "postgrad-research",
    },
  },
]

for (const profile of profiles) {
  console.log(`\n=== ${profile.name} ===`)
  const start = Date.now()
  const results = matchStudent(profile.answers, database)
  const eligible = countEligible(profile.answers, database)
  console.log(`eligible: ${eligible} / ${database.length} (${Date.now() - start}ms)`)
  for (const match of results) {
    const u = match.university
    console.log(`\n  [${Math.min(100, match.score).toFixed(1)}] ${u.name}`)
    console.log(`      ${u.country}${u.state ? " · " + u.state : ""} | ${u.type} | ${u.pathway} | tier=${u.tier} | tests=${u.tests}`)
    console.log(`      tags=${u.tags.join(",") || "-"}`)
    console.log(`      interest=${match.breakdown.interest.toFixed(2)} destination=${match.breakdown.destination.toFixed(2)} career=${match.breakdown.careerGoal.toFixed(2)} test=${match.breakdown.testReadiness.toFixed(2)}`)
    console.log(`      why: ${match.whyFits}`)
  }
}
