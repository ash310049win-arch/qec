import { writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

// Four education-themed image slots per country (matched to the heroCards in
// lib/destinations-data.ts). Each slot is a list of candidate queries tried in
// order so we have a good chance of finding a valid campus/student photo.
const COUNTRIES = [
  {
    slug: "japan",
    queries: [
      ["Yasuda Auditorium University of Tokyo", "University of Tokyo Hongo campus"],
      ["Waseda University campus", "Okuma Auditorium Waseda University"],
      ["Kyoto University campus", "Kyoto University Yoshida campus"],
      ["University library Japan students", "University of Tokyo students studying"],
    ],
  },
  {
    slug: "usa",
    queries: [
      ["Harvard Yard Harvard University", "Harvard University campus"],
      ["MIT Great Dome", "Massachusetts Institute of Technology campus"],
      ["Stanford University Main Quad", "Stanford University campus"],
      ["American university students classroom", "college campus students United States"],
    ],
  },
  {
    slug: "canada",
    queries: [
      ["University of Toronto Convocation Hall", "University of Toronto campus"],
      ["University of British Columbia campus", "UBC Vancouver campus"],
      ["McGill University campus", "McGill University Montreal"],
      ["Canadian university students campus", "university campus students Canada"],
    ],
  },
  {
    slug: "united-kingdom",
    outPrefix: "uk",
    queries: [
      ["King's College Chapel Cambridge", "University of Cambridge campus"],
      ["Radcliffe Camera Oxford", "University of Oxford campus"],
      ["British university college quadrangle", "historic university campus United Kingdom"],
      ["British university library students", "university students studying United Kingdom"],
    ],
  },
  {
    slug: "australia",
    queries: [
      ["University of Sydney Quadrangle", "University of Sydney campus"],
      ["University of Melbourne campus", "University of Melbourne Parkville"],
      ["Australian university campus building", "Group of Eight university campus Australia"],
      ["Australian university students campus", "university students Australia campus"],
    ],
  },
  {
    slug: "germany",
    queries: [
      ["Technical University Munich main building", "TU Munchen campus"],
      ["Heidelberg University old campus", "Universitat Heidelberg"],
      ["RWTH Aachen University campus", "RWTH Aachen"],
      ["German university students campus", "university lecture hall Germany"],
    ],
  },
  {
    slug: "ireland",
    queries: [
      ["University College Dublin campus", "UCD campus Dublin"],
      ["Trinity College Dublin Long Room", "Trinity College Dublin campus"],
      ["NUI Galway campus", "National University of Ireland Galway"],
      ["Irish university students campus", "university students Ireland"],
    ],
  },
  {
    slug: "new-zealand",
    queries: [
      ["University of Otago Clocktower", "University of Otago Dunedin"],
      ["University of Auckland campus", "University of Auckland"],
      ["Victoria University of Wellington campus", "Victoria University Wellington"],
      ["New Zealand university students", "university campus New Zealand"],
    ],
  },
  {
    slug: "france",
    queries: [
      ["Sorbonne chapel Paris", "Sorbonne university building Paris"],
      ["Sorbonne University Paris campus", "La Sorbonne Paris"],
      ["Ecole Polytechnique Palaiseau", "Ecole Polytechnique campus"],
      ["French university students campus", "university campus France students"],
    ],
  },
  {
    slug: "netherlands",
    queries: [
      ["University of Amsterdam campus", "Universiteit van Amsterdam"],
      ["TU Delft campus", "Delft University of Technology"],
      ["Leiden University academy building", "Universiteit Leiden"],
      ["Dutch university students campus", "university campus Netherlands students"],
    ],
  },
  {
    slug: "uae",
    queries: [
      ["Khalifa University Abu Dhabi campus", "Khalifa University"],
      ["United Arab Emirates University Al Ain campus", "UAE University Al Ain"],
      ["American University of Sharjah campus", "American University Sharjah"],
      ["UAE university students campus", "university campus students Dubai"],
    ],
  },
  {
    slug: "south-korea",
    queries: [
      ["Seoul National University campus", "Seoul National University"],
      ["KAIST campus Daejeon", "KAIST"],
      ["Yonsei University campus Seoul", "Yonsei University"],
      ["Korean university students campus", "university campus South Korea students"],
    ],
  },
  {
    slug: "singapore",
    queries: [
      ["National University of Singapore campus", "NUS Kent Ridge"],
      ["Nanyang Technological University campus", "NTU Singapore campus"],
      ["Singapore Management University campus", "Singapore Management University"],
      ["Singapore university students campus", "university campus Singapore"],
    ],
  },
  {
    slug: "poland",
    queries: [
      ["University of Warsaw campus", "Uniwersytet Warszawski"],
      ["Jagiellonian University Collegium Maius", "Jagiellonian University Krakow"],
      ["Warsaw University of Technology campus", "Politechnika Warszawska"],
      ["Polish university students campus", "university campus Poland students"],
    ],
  },
  {
    slug: "malaysia",
    queries: [
      ["Universiti Malaya campus", "University of Malaya"],
      ["Universiti Kebangsaan Malaysia campus", "UKM Bangi campus"],
      ["Monash University Malaysia campus", "Monash University Malaysia"],
      ["Malaysian university students campus", "university campus Malaysia students"],
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

// Reject photos of generic tourist landmarks so every download reads as
// "studying here" rather than "visiting here".
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

function scoreCandidate(ii, title) {
  const { width, height } = ii
  if (ii.mime !== "image/jpeg" || !ii.thumburl) return -1
  if (isTourist(title)) return -1
  if (width < 1200 || height < 800) return -1
  const aspect = width / height
  if (aspect < 0.6 || aspect > 2.2) return -1
  return width * height
}

async function searchImage(query) {
  await sleep(2500)
  const q = encodeURIComponent(`filetype:bitmap ${query}`)
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&format=json&origin=*`
  const res = await fetchWithRetry(url)
  const data = await res.json()
  const pages = data.query ? Object.values(data.query.pages) : []
  const candidates = pages
    .map((p) => ({ title: p.title || "", ii: p.imageinfo && p.imageinfo[0] }))
    .filter((c) => c.ii)
    .map((c) => ({ ii: c.ii, score: scoreCandidate(c.ii, c.title) }))
    .filter((c) => c.score >= 0)
    .sort((a, b) => b.score - a.score)
  return candidates[0] ? candidates[0].ii : null
}

async function main() {
  const only = process.argv.slice(2)
  const countries = COUNTRIES.filter((c) => only.length === 0 || only.includes(c.slug))
  for (const country of countries) {
    console.log(`\n=== ${country.slug} ===`)
    for (let i = 0; i < country.queries.length; i++) {
      const outName = `dest-${country.outPrefix || country.slug}-${i + 1}.jpg`
      const outPath = join(process.cwd(), "public", "images", outName)
      if (existsSync(outPath)) {
        console.log(`  [${i + 1}] ${outName} (exists, skipping)`)
        continue
      }

      let info = null
      for (const query of country.queries[i]) {
        console.log(`  [${i + 1}] searching "${query}"...`)
        info = await searchImage(query)
        if (info) {
          console.log(`    found ${info.width}x${info.height}`)
          break
        }
        await sleep(1000)
      }

      if (!info) {
        console.log(`  [${i + 1}] ${outName} -> NOT FOUND`)
        continue
      }

      const cleanUrl = info.thumburl.split("?")[0]
      try {
        const img = await fetchWithRetry(cleanUrl, 6)
        const buf = Buffer.from(await img.arrayBuffer())
        writeFileSync(outPath, buf)
        console.log(`  [${i + 1}] ${outName} downloaded (${info.width}x${info.height})`)
      } catch (e) {
        console.log(`  [${i + 1}] ${outName} -> DOWNLOAD FAILED: ${e.message}`)
      }
      await sleep(1500)
    }
  }
}

main()
