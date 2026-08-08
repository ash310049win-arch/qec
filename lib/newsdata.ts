import { format } from "date-fns"

export type NewsArticle = {
  id: string
  title: string
  description: string
  link: string
  source: string
  date: string
  sortDate: string
  category: string
  section: string
}

export type NewsSection = {
  id: "countries" | "visas" | "scholarships" | "tests"
  label: string
  query: string
  fallbackQuery?: string
}

export type SectionResult = {
  articles: NewsArticle[]
  error?: string
}

type RawNewsArticle = {
  article_id?: unknown
  title?: unknown
  link?: unknown
  description?: unknown
  source_name?: unknown
  source_id?: unknown
  pubDate?: unknown
}

const NEWS_API_ENDPOINT = "https://newsdata.io/api/1/latest"

// Free plan gives 200 requests/day, so we cache results in-memory and only
// hit the API once every 6 hours per section (~16 requests/day worst case).
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

// Targeted queries per section, tuned for Indian students planning to study
// abroad. All stay under the free plan's 100-character query limit.
export const newsSections: NewsSection[] = [
  {
    id: "countries",
    label: "Countries",
    query: '("study abroad" OR "international students") AND India',
  },
  {
    id: "visas",
    label: "Visas",
    query: '("student visa" OR "study permit") AND India',
  },
  {
    id: "scholarships",
    label: "Scholarships",
    query: '("scholarship" AND "international students") AND India',
    fallbackQuery: "scholarship AND India",
  },
  {
    id: "tests",
    label: "Tests",
    query: '("IELTS" OR "TOEFL" OR "SAT") AND (India OR "test prep")',
  },
]

// Safety net in case API-level filtering still lets non-education news through.
// Word-boundary matching avoids false positives on words like "factor".
const BLOCKLIST_TERMS = ["actor", "election", "minister", "box office"]

const cache = new Map<string, { data: SectionResult; fetchedAt: number }>()

export async function getSectionResults(
  sectionId: NewsSection["id"]
): Promise<SectionResult> {
  const section = newsSections.find((s) => s.id === sectionId)
  if (!section) return { articles: [], error: "Unknown section." }

  const now = Date.now()
  const cached = cache.get(sectionId)
  if (cached && now - cached.fetchedAt < CACHE_TTL_MS) return cached.data

  const fresh = await fetchSection(section)

  if (!fresh.error) {
    cache.set(sectionId, { data: fresh, fetchedAt: now })
    return fresh
  }

  if (cached) {
    console.warn(`[newsdata] ${sectionId}: falling back to cached data. ${fresh.error}`)
    return cached.data
  }

  return fresh
}

async function fetchSection(section: NewsSection): Promise<SectionResult> {
  const primary = await fetchQuery(section, section.query)

  if (!primary.error && primary.articles.length === 0 && section.fallbackQuery) {
    console.warn(
      `[newsdata] ${section.id}: primary query returned 0 articles, retrying with fallback query.`
    )
    return fetchQuery(section, section.fallbackQuery)
  }

  return primary
}

async function fetchQuery(
  section: NewsSection,
  query: string
): Promise<SectionResult> {
  const apiKey = process.env.NEWSDATA_API_KEY?.trim()
  if (!apiKey) {
    console.warn("[newsdata] NEWSDATA_API_KEY is not set. News feed is disabled.")
    return { articles: [], error: "NEWSDATA_API_KEY is not configured." }
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    q: query,
    country: "in",
    category: "education",
    language: "en",
    size: "10",
    sort: "relevancy",
  })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`${NEWS_API_ENDPOINT}?${params.toString()}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    })

    if (!response.ok) {
      const error = describeError(response.status)
      console.error(`[newsdata] ${section.id}: ${error}`)
      return { articles: [], error }
    }

    const payload: unknown = await response.json()
    if (!isSuccessPayload(payload)) {
      const message = "NewsData.io returned an unexpected response."
      console.error(`[newsdata] ${section.id}: ${message}`)
      return { articles: [], error: message }
    }

    const seen = new Set<string>()
    const articles: NewsArticle[] = []

    for (const raw of payload.results ?? []) {
      const article = normalizeArticle(raw, section)
      if (!article) continue
      if (isBlocklisted(article)) continue
      if (seen.has(article.link)) continue
      seen.add(article.link)
      articles.push(article)
    }

    return { articles }
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "NewsData.io request timed out."
        : "Failed to reach NewsData.io."
    console.error(`[newsdata] ${section.id}: ${message}`, error)
    return { articles: [], error: message }
  } finally {
    clearTimeout(timeout)
  }
}

function describeError(status: number): string {
  if (status === 401 || status === 403) return "NewsData.io rejected the API key (401/403)."
  if (status === 429) return "NewsData.io rate limit reached (429)."
  if (status >= 500) return `NewsData.io server error (${status}).`
  return `NewsData.io responded with status ${status}.`
}

function isSuccessPayload(
  payload: unknown
): payload is { status: string; results?: RawNewsArticle[] } {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "status" in payload &&
    (payload as { status: unknown }).status === "success"
  )
}

function isBlocklisted(article: NewsArticle): boolean {
  const haystack = `${article.title} ${article.description}`
  return BLOCKLIST_TERMS.some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    return new RegExp(`\\b${escaped}`, "i").test(haystack)
  })
}

function normalizeArticle(
  raw: RawNewsArticle,
  section: NewsSection
): NewsArticle | null {
  const title = typeof raw.title === "string" ? raw.title.trim() : ""
  const link = typeof raw.link === "string" ? raw.link.trim() : ""
  if (!title || !link) return null

  const source =
    typeof raw.source_name === "string" && raw.source_name.trim()
      ? raw.source_name.trim()
      : typeof raw.source_id === "string" && raw.source_id.trim()
        ? raw.source_id.trim()
        : "News"

  const description =
    typeof raw.description === "string" && raw.description.trim()
      ? raw.description.trim()
      : ""

  const { date, sortDate } = formatPubDate(raw.pubDate)

  return {
    id: typeof raw.article_id === "string" && raw.article_id ? raw.article_id : link,
    title,
    description,
    link,
    source,
    date,
    sortDate,
    category: section.label,
    section: section.id,
  }
}

function formatPubDate(value: unknown): { date: string; sortDate: string } {
  if (typeof value !== "string") return { date: "", sortDate: "" }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return { date: "", sortDate: "" }
  return {
    date: format(parsed, "MMMM d, yyyy"),
    sortDate: parsed.toISOString(),
  }
}
