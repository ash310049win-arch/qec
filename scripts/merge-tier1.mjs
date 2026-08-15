// Merges dataset/tier1_all_curated_universities.json into
// dataset/universities.compiled.json. Replaces any previously merged "T-" records
// (idempotent re-run: the tier1 file is always the source of truth for T-* ids).
//
// Country names in the tier1 file that differ from the canonical dataset names are
// normalized so records match the quiz's destination ids and the global-countries
// generator. Richer subject tags are mapped onto the 12 canonical matcher tags
// (the only ones the compiled schema and the Career Finder understand).
//
// Run: node scripts/merge-tier1.mjs

import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const COMPILED = join(process.cwd(), "dataset", "universities.compiled.json")
const TIER1 = join(process.cwd(), "dataset", "tier1_all_curated_universities.json")

const COUNTRY_ALIASES = {
  USA: "United States",
  UK: "United Kingdom",
  "South Korea": "Korea, Republic of",
  UAE: "United Arab Emirates",
}

const CANONICAL_TAGS = [
  "technology",
  "engineering",
  "business",
  "creative",
  "healthcare",
  "science",
  "law",
  "media",
  "sustainability",
  "education",
  "hospitality",
  "agriculture",
]

const TAG_MAP = {
  technology: "technology",
  "computer-science": "technology",
  robotics: "technology",
  engineering: "engineering",
  automotive: "engineering",
  architecture: "engineering",
  business: "business",
  finance: "business",
  economics: "business",
  creative: "creative",
  arts: "creative",
  design: "creative",
  healthcare: "healthcare",
  medicine: "healthcare",
  nursing: "healthcare",
  pharmacy: "healthcare",
  science: "science",
  "environmental-science": "sustainability",
  law: "law",
  "international-relations": "law",
  education: "education",
  hospitality: "hospitality",
  agriculture: "agriculture",
}

const TIER_VALUES = ["budget", "mid", "premium", "unknown"]

const db = JSON.parse(readFileSync(COMPILED, "utf8"))

const before = db.length
const replaced = db.filter((r) => r.id.startsWith("T-"))
const base = db.filter((r) => !r.id.startsWith("T-"))

const tier1 = JSON.parse(readFileSync(TIER1, "utf8"))
if (!Array.isArray(tier1)) throw new Error("tier1 file must be a JSON array of records")

const errors = []
const records = tier1.map((raw, index) => {
  const { id, name, country, state, city, type, pathway, tier, tests, est, tags, sites, hasVerifiedTags } = raw

  if (typeof id !== "string" || !/^T-\d+$/.test(id)) {
    errors.push(`[${index}] invalid id: ${JSON.stringify(id)}`)
  }
  if (typeof name !== "string" || name.trim().length === 0) {
    errors.push(`[${index}] missing name`)
  }
  if (typeof country !== "string" || country.trim().length === 0) {
    errors.push(`[${index}] missing country`)
  }
  if (type !== "University") errors.push(`[${index}] unsupported type: ${JSON.stringify(type)}`)
  if (pathway !== "abroad") errors.push(`[${index}] unsupported pathway: ${JSON.stringify(pathway)}`)
  if (!TIER_VALUES.includes(tier)) errors.push(`[${index}] invalid tier: ${JSON.stringify(tier)}`)
  if (typeof tests !== "boolean") errors.push(`[${index}] tests must be boolean`)
  if (!Array.isArray(tags)) errors.push(`[${index}] tags must be an array`)
  if (!Array.isArray(sites)) errors.push(`[${index}] sites must be an array`)
  if (hasVerifiedTags !== true) errors.push(`[${index}] hasVerifiedTags must be true for curated records`)

  return { id, name, country, state, city, type, pathway, tier, tests, est, tags, sites, hasVerifiedTags }
})

if (errors.length > 0) {
  console.error("Tier 1 validation failed:")
  for (const e of errors) console.error("  - " + e)
  process.exit(1)
}

const idCounts = new Map()
for (const r of records) idCounts.set(r.id, (idCounts.get(r.id) || 0) + 1)
for (const [id, count] of idCounts) {
  if (count > 1) throw new Error(`Duplicate id inside tier1 file: ${id} (x${count})`)
}
const clash = records.filter((r) => base.some((b) => b.id === r.id))
if (clash.length > 0) throw new Error(`Id clash with existing dataset: ${clash.map((r) => r.id).join(", ")}`)

const mapped = records.map((r) => {
  const normalizedCountry = COUNTRY_ALIASES[r.country] ?? r.country
  const normalizedTags = [...new Set(r.tags.map((t) => TAG_MAP[t]).filter(Boolean))]
  return { ...r, country: normalizedCountry, tags: normalizedTags }
})

const out = [...base, ...mapped]
writeFileSync(COMPILED, JSON.stringify(out), "utf8")

// ---- Audit ---------------------------------------------------------------

const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ")
const sourceOf = (id) => (id.match(/^[A-Z]+-/) ? id.slice(0, id.indexOf("-")) : "other")

const SOURCE_LABELS = {
  U: "India universities (AISHE/UGC)",
  C: "India colleges (AISHE/UGC)",
  S: "India standalone institutes (AISHE/UGC)",
  H: "Hipolabs global import (raw)",
  M: "Mauritius curated (M-)",
  T: "Tier 1 curated (T-)",
}

console.log("=".repeat(72))
console.log("TIER 1 MERGE COMPLETE")
console.log("=".repeat(72))
console.log(`records before: ${before} (replaced ${replaced.length} prior T- records)`)
console.log(`tier1 merged:   ${mapped.length}`)
console.log(`records after:  ${out.length}`)
console.log(`tier1 countries: ${[...new Set(mapped.map((r) => r.country))].sort().join(", ")}`)
console.log(`tag normalization: tier1 used ${new Set(tier1.flatMap((r) => r.tags)).size} distinct tags -> ${CANONICAL_TAGS.length} canonical matcher tags`)

const notMapped = new Set()
for (const r of tier1) for (const t of r.tags) if (!TAG_MAP[t]) notMapped.add(t)
if (notMapped.size > 0) console.log(`WARNING: unmapped tags: ${[...notMapped].join(", ")}`)

console.log("\nVERIFIED vs UNVERIFIED BY SOURCE:")
const bySource = new Map()
for (const r of out) {
  const key = `${sourceOf(r.id)}|${r.hasVerifiedTags ? "verified" : "unverified"}`
  bySource.set(key, (bySource.get(key) || 0) + 1)
}
const sourceTotal = new Map()
for (const r of out) sourceTotal.set(sourceOf(r.id), (sourceTotal.get(sourceOf(r.id)) || 0) + 1)
for (const [src, total] of [...sourceTotal.entries()].sort((a, b) => b[1] - a[1])) {
  const verified = bySource.get(`${src}|verified`) || 0
  const unverified = bySource.get(`${src}|unverified`) || 0
  const label = SOURCE_LABELS[src] ?? src
  console.log(`  ${src} (${label}): ${total} total | ${verified} verified | ${unverified} unverified`)
}

console.log("\nVERIFIED vs UNVERIFIED BY COUNTRY (abroad only):")
const abroadByCountry = new Map()
for (const r of out) {
  if (r.pathway !== "abroad") continue
  const key = r.country
  const entry = abroadByCountry.get(key) || { total: 0, verified: 0 }
  entry.total++
  if (r.hasVerifiedTags) entry.verified++
  abroadByCountry.set(key, entry)
}
for (const [country, e] of [...abroadByCountry.entries()].sort((a, b) => b[1].total - a[1].total)) {
  console.log(`  ${country}: ${e.total} total | ${e.verified} verified | ${e.total - e.verified} unverified`)
}
