import { readFileSync, writeFileSync } from "node:fs"

const raw = readFileSync("dataset/universities.compiled.json", "utf8")
const db = JSON.parse(raw)

const datasetCountries = new Map()
for (const u of db) {
  if (u.pathway !== "abroad" || !u.country) continue
  datasetCountries.set(u.country, (datasetCountries.get(u.country) || 0) + 1)
}

const REGIONS = ["Europe", "Asia", "Middle East", "North America", "South America", "Africa", "Oceania"]

const REGION_OF = {
  // Europe
  Albania: "Europe", Andorra: "Europe", Austria: "Europe", Belarus: "Europe",
  Belgium: "Europe", "Bosnia and Herzegovina": "Europe", Bulgaria: "Europe",
  Croatia: "Europe", Cyprus: "Europe", "Czech Republic": "Europe", Denmark: "Europe",
  Estonia: "Europe", "Faroe Islands": "Europe", Finland: "Europe", France: "Europe",
  Germany: "Europe", Greece: "Europe", "Holy See (Vatican City State)": "Europe",
  Hungary: "Europe", Iceland: "Europe", Ireland: "Europe", Italy: "Europe", Kosovo: "Europe",
  Latvia: "Europe", Liechtenstein: "Europe", Lithuania: "Europe", Luxembourg: "Europe",
  Malta: "Europe", "Moldova, Republic of": "Europe", Montenegro: "Europe",
  Netherlands: "Europe", "North Macedonia": "Europe", Norway: "Europe", Poland: "Europe",
  Portugal: "Europe", Romania: "Europe", "Russian Federation": "Europe", "San Marino": "Europe",
  Serbia: "Europe", Slovakia: "Europe", Slovenia: "Europe", Spain: "Europe", Sweden: "Europe",
  Switzerland: "Europe", Ukraine: "Europe", "United Kingdom": "Europe",
  // Asia
  Afghanistan: "Asia", Armenia: "Asia", Azerbaijan: "Asia", Bangladesh: "Asia",
  Bhutan: "Asia", "Brunei Darussalam": "Asia", Cambodia: "Asia", China: "Asia",
  Georgia: "Asia", "Hong Kong": "Asia", India: "Asia", Indonesia: "Asia", Japan: "Asia",
  Kazakhstan: "Asia", "Korea, Democratic People's Republic of": "Asia",
  "Korea, Republic of": "Asia", Kyrgyzstan: "Asia", "Lao People's Democratic Republic": "Asia",
  Macao: "Asia", Malaysia: "Asia", Maldives: "Asia", Mongolia: "Asia", Myanmar: "Asia",
  Nepal: "Asia", Pakistan: "Asia", Philippines: "Asia", Singapore: "Asia",
  "Sri Lanka": "Asia", "Taiwan, Province of China": "Asia", Tajikistan: "Asia",
  Thailand: "Asia", Turkmenistan: "Asia", Uzbekistan: "Asia", "Viet Nam": "Asia",
  Vietnam: "Asia",
  // Middle East
  Bahrain: "Middle East", Iran: "Middle East", Iraq: "Middle East", Israel: "Middle East",
  Jordan: "Middle East", Kuwait: "Middle East", Lebanon: "Middle East", Oman: "Middle East",
  "Palestine, State of": "Middle East", Qatar: "Middle East", "Saudi Arabia": "Middle East",
  "Syrian Arab Republic": "Middle East", Turkiye: "Middle East",
  "United Arab Emirates": "Middle East", Yemen: "Middle East",
  // North America
  "Antigua and Barbuda": "North America", Bahamas: "North America", Barbados: "North America",
  Belize: "North America", Bermuda: "North America", Canada: "North America",
  "Cayman Islands": "North America", "Costa Rica": "North America", Cuba: "North America",
  Dominica: "North America", "Dominican Republic": "North America", "El Salvador": "North America",
  Greenland: "North America", Grenada: "North America", Guadeloupe: "North America",
  Guatemala: "North America", Haiti: "North America", Honduras: "North America",
  Jamaica: "North America", Mexico: "North America", Montserrat: "North America",
  Nicaragua: "North America", Panama: "North America", "Puerto Rico": "North America",
  "Saint Kitts and Nevis": "North America", "Saint Lucia": "North America",
  "Saint Vincent and the Grenadines": "North America", "Trinidad and Tobago": "North America",
  "Turks and Caicos Islands": "North America", "United States": "North America",
  "Virgin Islands, British": "North America",
  // South America
  Argentina: "South America", "Bolivia, Plurinational State of": "South America",
  Brazil: "South America", Chile: "South America", Colombia: "South America",
  Ecuador: "South America", "French Guiana": "South America", Guyana: "South America",
  Paraguay: "South America", Peru: "South America", Suriname: "South America",
  Uruguay: "South America", "Venezuela, Bolivarian Republic of": "South America",
  // Africa
  Algeria: "Africa", Angola: "Africa", Benin: "Africa", Botswana: "Africa",
  "Burkina Faso": "Africa", Burundi: "Africa", Cameroon: "Africa", "Cape Verde": "Africa",
  "Central African Republic": "Africa", Chad: "Africa", Congo: "Africa",
  "Congo, the Democratic Republic of the": "Africa", "Côte d'Ivoire": "Africa",
  Djibouti: "Africa", Egypt: "Africa", "Equatorial Guinea": "Africa", Eritrea: "Africa",
  Ethiopia: "Africa", Gabon: "Africa", Gambia: "Africa", Ghana: "Africa", Guinea: "Africa",
  Kenya: "Africa", Lesotho: "Africa", Liberia: "Africa", Libya: "Africa",
  Madagascar: "Africa", Malawi: "Africa", Mali: "Africa", Mauritania: "Africa",
  Mauritius: "Africa", Morocco: "Africa", Mozambique: "Africa", Namibia: "Africa",
  Niger: "Africa", Nigeria: "Africa", "Réunion": "Africa", Rwanda: "Africa",
  Senegal: "Africa", Seychelles: "Africa", "Sierra Leone": "Africa", Somalia: "Africa",
  "South Africa": "Africa", "South Sudan": "Africa", Sudan: "Africa", Swaziland: "Africa",
  "Tanzania, United Republic of": "Africa", Togo: "Africa", Tunisia: "Africa",
  Uganda: "Africa", Zambia: "Africa", Zimbabwe: "Africa",
  // Oceania
  Australia: "Oceania", Fiji: "Oceania", "French Polynesia": "Oceania", Guam: "Oceania",
  "New Caledonia": "Oceania", "New Zealand": "Oceania", Niue: "Oceania",
  "Papua New Guinea": "Oceania", Samoa: "Oceania",
}

const DISPLAY_NAMES = {
  "Korea, Republic of": "South Korea",
  "Russian Federation": "Russia",
  Turkiye: "Turkey",
  "Taiwan, Province of China": "Taiwan",
  "Viet Nam": "Vietnam",
  "Tanzania, United Republic of": "Tanzania",
  "Moldova, Republic of": "Moldova",
  "Bolivia, Plurinational State of": "Bolivia",
  "Venezuela, Bolivarian Republic of": "Venezuela",
  "Congo, the Democratic Republic of the": "DR Congo",
  "Holy See (Vatican City State)": "Vatican City",
  "Palestine, State of": "Palestine",
  "Lao People's Democratic Republic": "Laos",
  "Syrian Arab Republic": "Syria",
  "Korea, Democratic People's Republic of": "North Korea",
  Swaziland: "Eswatini",
  "Brunei Darussalam": "Brunei",
  Macao: "Macau",
  "Virgin Islands, British": "British Virgin Islands",
}

const MERGE_INTO = { Vietnam: ["Viet Nam", "Vietnam"] }

const CORE_BUDGET_INR = {
  Japan: 1020000,
  "United States": 2380000,
  Canada: 1700000,
  "United Kingdom": 2125000,
  Australia: 1870000,
  Germany: 680000,
  Ireland: 1530000,
  "New Zealand": 1530000,
  France: 1020000,
  Netherlands: 1360000,
  "United Arab Emirates": 1700000,
  "Korea, Republic of": 1190000,
  Singapore: 2125000,
  Poland: 850000,
  Malaysia: 680000,
  Mauritius: 595000,
}

const unassigned = [...datasetCountries.keys()].filter((c) => !REGION_OF[c])
if (unassigned.length > 0) {
  console.error("Unassigned regions:", unassigned.join(", "))
  process.exit(1)
}

const merged = new Map()
for (const datasetCountry of datasetCountries.keys()) {
  const target = MERGE_INTO.Vietnam.includes(datasetCountry) ? "Vietnam" : datasetCountry
  const entry = merged.get(target) || {
    id: target,
    datasetCountries: [],
    region: REGION_OF[datasetCountry],
    core: target in CORE_BUDGET_INR,
    minBudgetInr: CORE_BUDGET_INR[target] ?? null,
  }
  if (!entry.datasetCountries.includes(datasetCountry)) entry.datasetCountries.push(datasetCountry)
  merged.set(target, entry)
}

for (const entry of merged.values()) {
  if (!entry.core) entry.minBudgetInr = null
  entry.datasetCountries.sort()
}

const countries = [...merged.values()].sort((a, b) =>
  (DISPLAY_NAMES[a.id] ?? a.id)
    .toLowerCase()
    .localeCompare((DISPLAY_NAMES[b.id] ?? b.id).toLowerCase())
)

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
]

const CANADA_REGIONS = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
  "Quebec", "Saskatchewan", "Yukon",
]

const AUSTRALIA_REGIONS = [
  "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland",
  "South Australia", "Tasmania", "Victoria", "Western Australia",
]

function emitCountry(entry) {
  const name = DISPLAY_NAMES[entry.id] ?? entry.id
  return {
    id: entry.id,
    name,
    region: entry.region,
    datasetCountries: entry.datasetCountries,
    core: entry.core,
    minBudgetInr: entry.minBudgetInr,
  }
}

const lines = []
lines.push(`// AUTO-GENERATED from dataset/universities.compiled.json by scripts/build-global-countries.mjs`)
lines.push(`// Do not edit by hand — regenerate with: node scripts/build-global-countries.mjs`)
lines.push(``)
lines.push(`export type RegionName =`)
for (const region of REGIONS) lines.push(`  | "${region}"`)
lines.push(``)
lines.push(`export type GlobalCountry = {`)
lines.push(`  /** Canonical dataset country name — used as the quiz selection id. */`)
lines.push(`  id: string`)
lines.push(`  /** Friendly name shown to students. */`)
lines.push(`  name: string`)
lines.push(`  region: RegionName`)
lines.push(`  /** All names under which this country appears in universities.compiled.json. */`)
lines.push(`  datasetCountries: string[]`)
lines.push(`  /** One of the 16 priority destinations with full destination-page data. */`)
lines.push(`  core: boolean`)
lines.push(`  /** Annual budget starting point in INR (core destinations only). */`)
lines.push(`  minBudgetInr: number | null`)
lines.push(`}`)
lines.push(``)
lines.push(`export const REGIONS: RegionName[] = [`)
for (const region of REGIONS) lines.push(`  "${region}",`)
lines.push(`]`)
lines.push(``)
lines.push(`export const GLOBAL_COUNTRIES: GlobalCountry[] = [`)
for (const entry of countries) {
  const c = emitCountry(entry)
  lines.push(`  {`)
  lines.push(`    id: ${JSON.stringify(c.id)},`)
  lines.push(`    name: ${JSON.stringify(c.name)},`)
  lines.push(`    region: "${c.region}",`)
  lines.push(`    datasetCountries: ${JSON.stringify(c.datasetCountries)},`)
  lines.push(`    core: ${c.core},`)
  lines.push(`    minBudgetInr: ${c.minBudgetInr},`)
  lines.push(`  },`)
}
lines.push(`]`)
lines.push(``)
lines.push(`export const COUNTRY_BY_ID = new Map(GLOBAL_COUNTRIES.map((c) => [c.id, c]))`)
lines.push(``)
lines.push(`export const CORE_COUNTRY_IDS = new Set(GLOBAL_COUNTRIES.filter((c) => c.core).map((c) => c.id))`)
lines.push(``)
lines.push(`export type StateOption = {`)
lines.push(`  id: string`)
lines.push(`  label: string`)
lines.push(`}`)
lines.push(``)
lines.push(`/** State/province-level options shown for countries where it is relevant to studying there. */`)
lines.push(`export const STATE_OPTIONS: Record<string, StateOption[]> = {`)
lines.push(`  "United States": [`)
for (const s of US_STATES) lines.push(`    { id: ${JSON.stringify(s)}, label: ${JSON.stringify(s)} },`)
lines.push(`  ],`)
lines.push(`  Canada: [`)
for (const s of CANADA_REGIONS) lines.push(`    { id: ${JSON.stringify(s)}, label: ${JSON.stringify(s)} },`)
lines.push(`  ],`)
lines.push(`  Australia: [`)
for (const s of AUSTRALIA_REGIONS) lines.push(`    { id: ${JSON.stringify(s)}, label: ${JSON.stringify(s)} },`)
lines.push(`  ],`)
lines.push(`}`)
lines.push(``)
lines.push(`export const STATE_OPTION_COUNTRIES = Object.keys(STATE_OPTIONS)`)
lines.push(``)

writeFileSync("lib/global-countries.ts", lines.join("\n"), "utf8")
console.log(`Generated lib/global-countries.ts with ${countries.length} countries (${Object.keys(CORE_BUDGET_INR).length} core).`)
console.log(`Core countries present: ${countries.filter((c) => c.core).map((c) => c.id).join(", ")}`)