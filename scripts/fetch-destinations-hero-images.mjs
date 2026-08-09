import { writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const COUNTRIES = [
  {
    slug: "japan",
    queries: ["Tokyo skyline", "Mount Fuji Chureito Pagoda", "Shibuya Crossing Tokyo"],
  },
  {
    slug: "usa",
    queries: ["New York City Manhattan skyline", "Golden Gate Bridge San Francisco", "Statue of Liberty New York"],
  },
  {
    slug: "canada",
    queries: ["Toronto skyline CN Tower", "Vancouver skyline", "Lake Louise Banff"],
  },
  {
    slug: "united-kingdom",
    queries: ["London skyline Thames", "Big Ben Westminster London", "Oxford skyline"],
  },
  {
    slug: "australia",
    queries: ["Sydney Opera House harbour", "Melbourne skyline", "Bondi Beach Sydney"],
  },
  {
    slug: "germany",
    queries: ["Berlin skyline Fernsehturm", "Munich skyline Frauenkirche", "Cologne Cathedral"],
  },
  {
    slug: "ireland",
    queries: ["Cliffs of Moher", "Dublin city", "Trinity College Dublin"],
  },
  {
    slug: "new-zealand",
    queries: ["Milford Sound", "Auckland skyline", "Queenstown New Zealand"],
  },
  {
    slug: "france",
    queries: ["Paris skyline Eiffel Tower", "Paris La Defense", "Mont Saint-Michel"],
  },
  {
    slug: "netherlands",
    queries: ["Amsterdam canal houses", "Rotterdam skyline", "Keukenhof tulips"],
  },
  {
    slug: "uae",
    queries: ["Dubai skyline Burj Khalifa", "Dubai Marina", "Abu Dhabi skyline"],
  },
  {
    slug: "south-korea",
    queries: ["Seoul skyline", "Seoul night skyline Lotte World Tower", "Gyeongbokgung Palace Seoul"],
  },
  {
    slug: "singapore",
    queries: ["Singapore skyline Marina Bay", "Gardens by the Bay Singapore", "Merlion Singapore"],
  },
  {
    slug: "poland",
    queries: ["Warsaw skyline", "Warsaw Old Town", "Krakow Wawel Castle"],
  },
  {
    slug: "malaysia",
    queries: ["Kuala Lumpur skyline Petronas", "Kuala Lumpur night", "Penang George Town"],
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

// Prefer wide, high-resolution landscape photos (16:9-ish) that crop well
// into a full-bleed viewport background.
function scoreCandidate(ii) {
  const { width, height } = ii
  if (ii.mime !== "image/jpeg" || !ii.thumburl) return -1
  if (width < 2000 || height < 1000) return -1
  const aspect = width / height
  if (aspect < 1.35 || aspect > 2.6) return -1
  const aspectScore = Math.abs(aspect - 16 / 9)
  return Math.round(aspectScore * 1000)
}

async function searchBestImage(query) {
  const q = encodeURIComponent(`filetype:bitmap ${query}`)
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2560&format=json&origin=*`
  const res = await fetchWithRetry(url)
  const data = await res.json()
  const pages = data.query ? Object.values(data.query.pages) : []
  const candidates = pages
    .map((p) => p.imageinfo && p.imageinfo[0])
    .filter(Boolean)
    .map((ii) => ({ ii, score: scoreCandidate(ii) }))
    .filter((c) => c.score >= 0)
    .sort((a, b) => a.score - b.score)
  return candidates[0] ? candidates[0].ii : null
}

async function main() {
  for (const country of COUNTRIES) {
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
