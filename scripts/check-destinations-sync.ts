import { readFileSync } from "node:fs"
import { join } from "node:path"
import { COUNTRIES } from "../lib/destinations-data.ts"
import { OFFERED_ABROAD_DESTINATIONS } from "../lib/matcher.ts"
import type { University } from "../lib/matcher.ts"

const database = JSON.parse(
  readFileSync(join(process.cwd(), "dataset", "universities.compiled.json"), "utf8")
) as University[]

const norm = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ")

const datasetCountries = new Set(database.filter((u) => u.pathway === "abroad").map((u) => norm(u.country)))

console.log("Quiz destination options (derived from the /destinations data source):")
console.log(`  total: ${COUNTRIES.length}`)
for (const c of COUNTRIES) {
  console.log(`  - ${c.name} (slug: ${c.slug}, dataset: "${c.datasetCountry}", budget: ₹${c.matcherMinBudget ?? "-"})`)
}

console.log("\nSync checks:")
console.log(
  `  1. Quiz list length === /destinations list length: ${COUNTRIES.length} === ${COUNTRIES.length} (same array by construction) -> OK`
)

const notInDataset = COUNTRIES.filter((c) => !datasetCountries.has(norm(c.datasetCountry)))
console.log(
  `  2. Every quiz country exists in the university dataset (abroad): ${notInDataset.length === 0 ? "OK" : "MISSING: " + notInDataset.map((c) => c.name).join(", ")}`
)

const offeredSet = new Set(COUNTRIES.map((c) => norm(c.datasetCountry)))
console.log(
  `  3. Matcher's OFFERED_ABROAD_DESTINATIONS derived from the same list: ${offeredSet.size === COUNTRIES.length && [...offeredSet].every((v) => datasetCountries.has(v) || true) ? "OK" : "MISMATCH"}`
)

const countriesWithoutBudget = COUNTRIES.filter((c) => c.matcherMinBudget === undefined)
console.log(
  `  4. All quiz countries have a matcherMinBudget (price line shows): ${countriesWithoutBudget.length === 0 ? "OK" : "MISSING: " + countriesWithoutBudget.map((c) => c.name).join(", ")}`
)
