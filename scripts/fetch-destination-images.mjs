import { writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const COUNTRIES = [
  {
    slug: "japan",
    queries: [
      "Tokyo skyline",
      "Osaka Dotonbori",
      "University of Tokyo Yasuda Auditorium",
      "Shibuya Crossing Tokyo",
    ],
  },
  {
    slug: "usa",
    queries: [
      "New York City Manhattan skyline",
      "Golden Gate Bridge San Francisco",
      "Harvard University campus",
      "Statue of Liberty",
    ],
  },
  {
    slug: "canada",
    queries: [
      "Toronto skyline CN Tower",
      "Lake Louise Banff",
      "University of Toronto campus",
      "Vancouver skyline",
    ],
  },
  {
    slug: "uk",
    queries: [
      "London Big Ben Westminster",
      "Radcliffe Camera Oxford",
      "King's College Cambridge",
      "London skyline Thames",
    ],
  },
  {
    slug: "australia",
    queries: [
      "Sydney Opera House",
      "University of Melbourne",
      "Sydney skyline harbour",
      "Bondi Beach Sydney",
    ],
  },
  {
    slug: "germany",
    queries: [
      "Brandenburg Gate Berlin",
      "Munich skyline Frauenkirche",
      "Heidelberg University",
      "Neuschwanstein Castle",
    ],
  },
  {
    slug: "ireland",
    queries: [
      "Trinity College Dublin Long Room",
      "Cliffs of Moher",
      "Ha'penny Bridge Dublin",
      "Dublin O'Connell Street",
    ],
  },
  {
    slug: "new-zealand",
    queries: [
      "Milford Sound",
      "University of Auckland",
      "Auckland skyline",
      "Queenstown lake",
    ],
  },
  {
    slug: "france",
    queries: [
      "Eiffel Tower Paris",
      "Louvre Pyramid",
      "Sorbonne University Paris",
      "Paris skyline Seine",
    ],
  },
  {
    slug: "netherlands",
    queries: [
      "Amsterdam canal houses",
      "Keukenhof tulips",
      "University of Amsterdam",
      "Rotterdam skyline Erasmusbrug",
    ],
  },
  {
    slug: "uae",
    queries: [
      "Burj Khalifa Dubai",
      "Sheikh Zayed Grand Mosque",
      "Dubai Marina skyline",
      "Dubai desert dunes",
    ],
  },
  {
    slug: "south-korea",
    queries: [
      "Seoul skyline",
      "Gyeongbokgung Palace Seoul",
      "Seoul National University",
      "N Seoul Tower",
    ],
  },
  {
    slug: "singapore",
    queries: [
      "Marina Bay Sands Singapore",
      "Merlion Singapore",
      "National University of Singapore",
      "Singapore skyline",
    ],
  },
  {
    slug: "poland",
    queries: [
      "Warsaw skyline",
      "Jagiellonian University Collegium Maius",
      "Wawel Castle Krakow",
      "Warsaw Old Town",
    ],
  },
  {
    slug: "malaysia",
    queries: [
      "Petronas Twin Towers Kuala Lumpur",
      "University of Malaya",
      "Kuala Lumpur skyline",
      "Batu Caves Malaysia",
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

async function searchImage(query) {
  const q = encodeURIComponent(`filetype:bitmap ${query}`)
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=6&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280&format=json&origin=*`
  const res = await fetchWithRetry(url)
  const data = await res.json()
  const pages = data.query ? Object.values(data.query.pages) : []
  const candidates = pages
    .map((p) => p.imageinfo && p.imageinfo[0])
    .filter(
      (ii) =>
        ii &&
        ii.mime === "image/jpeg" &&
        ii.thumburl &&
        ii.width >= 1200 &&
        ii.height >= 700
    )
    .sort((a, b) => {
      const aScore = Math.min(a.width / a.height, a.height / a.width)
      const bScore = Math.min(b.width / b.height, b.height / b.width)
      return bScore - aScore
    })
  return candidates[0] || null
}

async function main() {
  for (const country of COUNTRIES) {
    console.log(`\n=== ${country.slug} ===`)
    for (let i = 0; i < country.queries.length; i++) {
      const query = country.queries[i]
      const outName = `dest-${country.slug}-${i + 1}.jpg`
      const outPath = join(process.cwd(), "public", "images", outName)
      if (existsSync(outPath)) {
        console.log(`  [${i + 1}] ${query} -> ${outName} (exists, skipping)`)
        continue
      }
      const info = await searchImage(query)
      if (!info) {
        console.log(`  [${i + 1}] ${query} -> NOT FOUND`)
        continue
      }
      const cleanUrl = info.thumburl.split("?")[0]
      try {
        const img = await fetchWithRetry(cleanUrl, 6)
        const buf = Buffer.from(await img.arrayBuffer())
        writeFileSync(outPath, buf)
        console.log(`  [${i + 1}] ${query} -> ${outName} (${info.width}x${info.height})`)
      } catch (e) {
        console.log(`  [${i + 1}] ${query} -> DOWNLOAD FAILED: ${e.message}`)
      }
      await sleep(2000)
    }
  }
}

main()
