import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const TARGET_COUNTRIES = [
  "Japan",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "Ireland",
  "New Zealand",
  "France",
  "Netherlands",
  "United Arab Emirates",
  "Korea, Republic of",
  "Singapore",
  "Poland",
  "Malaysia",
  "Mauritius",
]

const db = JSON.parse(readFileSync(join(process.cwd(), "dataset", "universities.compiled.json"), "utf8"))

const output = TARGET_COUNTRIES.map((country) => {
  const seen = new Set()
  const universities = db
    .filter((u) => u.country === country && u.pathway === "abroad")
    .map((u) => ({ name: u.name, type: u.type }))
    .filter((u) => {
      const key = u.name.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => a.name.localeCompare(b.name))
  return { country, count: universities.length, universities }
})

writeFileSync(
  join(process.cwd(), "dataset", "destinations-universities.json"),
  JSON.stringify(output)
)
console.log(output.map((o) => `${o.country}: ${o.count}`).join("\n"))
