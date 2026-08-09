import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { CountryData, FeaturedUniversity } from "@/lib/destinations-data"

type CompactUniversity = { name: string; type: string }
type CountryEntry = { country: string; universities: CompactUniversity[] }

let database: CountryEntry[] | null = null

function loadDatabase(): CountryEntry[] {
  if (database) return database
  const raw = readFileSync(
    join(process.cwd(), "dataset", "destinations-universities.json"),
    "utf8"
  )
  database = JSON.parse(raw) as CountryEntry[]
  return database
}

export type UniversityRow = {
  name: string
  city: string
  type: string
  fromFeatured: boolean
}

/**
 * Returns universities for a country, drawn from the live dataset and ordered
 * by the curated featured list first (city supplied where the dataset lacks it).
 */
export function getUniversitiesForCountry(country: CountryData): UniversityRow[] {
  const entries = loadDatabase()
  const entry = entries.find((e) => e.country === country.datasetCountry)
  const all = entry?.universities ?? []

  const byName = new Map(all.map((u) => [u.name.toLowerCase(), u]))

  const featured: UniversityRow[] = country.featuredUniversities
    .map((f: FeaturedUniversity) => {
      const match = byName.get(f.name.toLowerCase())
      if (!match) {
        return {
          name: f.name,
          city: f.city,
          type: "University",
          fromFeatured: true,
        }
      }
      return {
        name: match.name,
        city: f.city || "",
        type: match.type || "University",
        fromFeatured: true,
      }
    })
    .filter(Boolean)

  const featuredNames = new Set(featured.map((f) => f.name.toLowerCase()))
  const rest: UniversityRow[] = all
    .filter((u) => !featuredNames.has(u.name.toLowerCase()))
    .slice(0, 30)
    .map((u) => ({
      name: u.name,
      city: "",
      type: u.type || "University",
      fromFeatured: false,
    }))

  return [...featured, ...rest]
}

export function getFeaturedUniversitiesForCountry(
  country: CountryData
): UniversityRow[] {
  return getUniversitiesForCountry(country).filter((u) => u.fromFeatured)
}

export function getCountryUniversityTotal(country: CountryData): number {
  const entries = loadDatabase()
  const entry = entries.find((e) => e.country === country.datasetCountry)
  return entry?.universities.length ?? 0
}
