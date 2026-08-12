import { writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const COUNTRIES = [
  {
    slug: "japan",
    queries: [
      "Kyoto University campus",
      "Waseda University Okuma Auditorium",
      "Keio University Mita campus",
      "University of Tokyo Hongo campus",
    ],
  },
  {
    slug: "usa",
    queries: [
      "Harvard Yard Harvard University",
      "MIT Great Dome Massachusetts",
      "Stanford University campus",
      "Yale University campus",
    ],
  },
  {
    slug: "canada",
    queries: [
      "McGill University campus",
      "University of British Columbia campus",
      "University of Toronto Convocation Hall",
      "University of Waterloo campus",
    ],
  },
  {
    slug: "united-kingdom",
    queries: [
      "University of Oxford",
      "King's College Chapel Cambridge",
      "Bodleian Library Oxford",
      "University of Cambridge",
    ],
  },
  {
    slug: "australia",
    queries: [
      "University of Sydney Quadrangle",
      "Australian National University",
      "University of Queensland campus",
      "University of Melbourne campus",
    ],
  },
  {
    slug: "germany",
    queries: [
      "Technical University Munich",
      "RWTH Aachen University",
      "University of Freiburg",
      "Heidelberg University",
    ],
  },
  {
    slug: "ireland",
    queries: [
      "University College Dublin campus",
      "Trinity College Dublin campus",
      "Dublin City University",
      "University College Cork campus",
    ],
  },
  {
    slug: "new-zealand",
    queries: [
      "University of Otago Clocktower",
      "University of Auckland campus",
      "Victoria University of Wellington",
      "University of Canterbury",
    ],
  },
  {
    slug: "france",
    queries: [
      "La Sorbonne Paris",
      "Ecole Polytechnique Palaiseau",
      "Sciences Po Paris",
      "Sorbonne University Paris",
    ],
  },
  {
    slug: "netherlands",
    queries: [
      "Leiden University",
      "Delft University of Technology",
      "University of Amsterdam",
      "Utrecht University",
    ],
  },
  {
    slug: "uae",
    queries: [
      "Khalifa University Abu Dhabi",
      "United Arab Emirates University Al Ain",
      "American University of Sharjah",
      "Abu Dhabi University",
    ],
  },
  {
    slug: "south-korea",
    queries: [
      "Korea University campus",
      "Yonsei University campus",
      "Sungkyunkwan University campus",
      "Seoul National University campus",
    ],
  },
  {
    slug: "singapore",
    queries: [
      "Nanyang Technological University",
      "National University of Singapore",
      "Singapore Management University",
      "NUS University Town",
    ],
  },
  {
    slug: "poland",
    queries: [
      "University of Warsaw",
      "Warsaw University of Technology",
      "Jagiellonian University campus",
      "Adam Mickiewicz University Poznan",
    ],
  },
  {
    slug: "malaysia",
    queries: [
      "Universiti Teknologi Malaysia",
      "Universiti Sains Malaysia",
      "Monash University Malaysia",
      "Universiti Kebangsaan Malaysia",
    ],
  },
  {
    slug: "mauritius",
    queries: [
      "Ile aux Cerfs Mauritius beach greenery",
      "Mauritius beach palm trees vegetation",
      "University of Mauritius campus",
      "Mauritius university campus",
    ],
  },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const HEADERS = {
  "User-Agent": "QuilonEduSite/1.0 (educational consultancy website image fetch)",
  Accept: "image/avif,image/webp,image/jpeg,*/*;q=0.8",
}

async function fetchWithRetry(url, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS })
      if (res.status === 429 || res.status === 403) {
        const wait = 1500 * attempt * attempt
        console.log(`    ...HTTP ${res.status}, retrying in ${Math.round(wait / 1000)}s`)
        await sleep(wait)
        continue
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res
    } catch (e) {
      if (attempt === attempts) throw e
      const wait = 1200 * attempt * attempt
      console.log(`    ...error (${e.message}), retrying in ${Math.round(wait / 1000)}s`)
      await sleep(wait)
    }
  }
  throw new Error("fetch failed")
}

// Reject photos of generic tourist landmarks (city skylines, monuments,
// beaches, theme-park sights) so every download reads as "studying here".
const TOURIST_TOKENS = [
  "opera house",
  "golden gate",
  "statue of liberty",
  "eiffel",
  "petronas",
  "merlion",
  "marina bay sands",
  "burj",
  "mosque",
  "batu caves",
  "cliffs of moher",
  "milford sound",
  "keukenhof",
  "neuschwanstein",
  "brandenburg",
  "wawel",
  "castle",
  "waterfall",
  "dune",
  "desert",
  "big ben",
  "westminster",
  "louvre",
  "namsan",
  "seoul tower",
  "ferris wheel",
  "skyline",
]

function isTourist(title = "") {
  const t = title.toLowerCase()
  return TOURIST_TOKENS.some((token) => t.includes(token))
}

// Prefer wide, high-resolution landscape photos (16:9-ish) that crop well
// into a full-bleed viewport background.
function scoreCandidate(ii, title) {
  const { width, height } = ii
  if (ii.mime !== "image/jpeg" || !ii.thumburl) return -1
  if (isTourist(title)) return -1
  if (width < 2000 || height < 1000) return -1
  const aspect = width / height
  if (aspect < 1.35 || aspect > 2.6) return -1
  const aspectScore = Math.abs(aspect - 16 / 9)
  return Math.round(aspectScore * 1000)
}

async function searchBestImage(query) {
  await sleep(2500)
  const q = encodeURIComponent(`filetype:bitmap ${query}`)
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2560&format=json&origin=*`
  const res = await fetchWithRetry(url)
  const data = await res.json()
  const pages = data.query ? Object.values(data.query.pages) : []
  const candidates = pages
    .map((p) => ({ title: p.title || "", ii: p.imageinfo && p.imageinfo[0] }))
    .filter((c) => c.ii)
    .map((c) => ({ ii: c.ii, score: scoreCandidate(c.ii, c.title) }))
    .filter((c) => c.score >= 0)
    .sort((a, b) => a.score - b.score)
  return candidates[0] ? candidates[0].ii : null
}

async function main() {
  const only = process.argv.slice(2)
  const countries = COUNTRIES.filter((c) => only.length === 0 || only.includes(c.slug))
  for (const country of countries) {
    const outName = `dest-${country.slug}-hero.jpg`
    const outPath = join(process.cwd(), "public", "images", outName)
    if (existsSync(outPath)) {
      console.log(`=== ${country.slug} -> ${outName} (exists, skipping)`)
      continue
    }

    console.log(`\n=== ${country.slug} ===`)
    let info = null
    for (const query of country.queries) {
      console.log(`  searching "${query}"...`)
      info = await searchBestImage(query)
      if (info) {
        console.log(`    found ${info.width}x${info.height}`)
        break
      }
      console.log(`    no wide JPEG candidate, trying next query`)
      await sleep(1000)
    }

    if (!info) {
      console.log(`  ${outName} -> NOT FOUND`)
      continue
    }

    const cleanUrl = info.thumburl.split("?")[0]
    try {
      const img = await fetchWithRetry(cleanUrl, 6)
      const buf = Buffer.from(await img.arrayBuffer())
      writeFileSync(outPath, buf)
      console.log(`  ${outName} downloaded (${info.width}x${info.height})`)
    } catch (e) {
      console.log(`  ${outName} -> DOWNLOAD FAILED: ${e.message}`)
    }
    await sleep(1500)
  }
}

main()
