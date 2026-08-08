"use client"

import { useCallback, useEffect, useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight, Calendar, Newspaper, RefreshCw } from "lucide-react"

type NewsArticle = {
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

type NewsSection = {
  id: string
  label: string
  articles: NewsArticle[]
  error?: string | null
}

type NewsResponse = {
  sections: NewsSection[]
  warning?: string | null
}

const categoryChips = [
  { label: "All", value: "all" },
  { label: "Countries", value: "countries" },
  { label: "Visas", value: "visas" },
  { label: "Scholarships", value: "scholarships" },
  { label: "Tests", value: "tests" },
]

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Resources & Blog
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          Live news and expert insights on study-abroad destinations, student
          visas, scholarships, and test prep.
        </p>
      </div>
    </section>
  )
}

function CategoryFilter({
  activeCategory,
  onChange,
}: {
  activeCategory: string
  onChange: (value: string) => void
}) {
  return (
    <section className="bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {categoryChips.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              aria-pressed={activeCategory === cat.value}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-fade-up group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ animationDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="h-1.5 w-full bg-primary" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            {article.category}
          </span>
          {article.date && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {article.date}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-heading text-base font-semibold text-card-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>

        <div className="mt-2 flex-1">
          {article.description && (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {article.description}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
          <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Newspaper className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{article.source}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
            Read more
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="h-1.5 w-full bg-primary/20" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-secondary" />
          <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
        </div>
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-secondary" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-secondary" />
        <div className="mt-4 flex-1 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-secondary" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
        </div>
        <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

function EmptyState({ label, onRetry }: { label: string; onRetry?: () => void }) {
  return (
    <div className="mt-14 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <Newspaper className="h-10 w-10 text-muted-foreground/40" />
      <h3 className="mt-4 font-heading text-lg font-semibold text-card-foreground">
        No articles available
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {label
          ? `We couldn't find any recent ${label} articles. Please check back soon.`
          : "We couldn't load the latest articles. Please check back soon."}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  )
}

function NewsGrid({
  status,
  sections,
  activeCategory,
  onRetry,
}: {
  status: "loading" | "ready" | "error"
  sections: NewsSection[]
  activeCategory: string
  onRetry: () => void
}) {
  const ref = useScrollAnimation()

  let content: React.ReactNode

  if (status === "loading") {
    content = <SkeletonGrid />
  } else if (status === "error") {
    content = <EmptyState label="" onRetry={onRetry} />
  } else {
    const allArticles = sections.flatMap((section) => section.articles)
    const uniqueByLink = (articles: NewsArticle[]) => {
      const seen = new Set<string>()
      return articles.filter((article) => {
        if (seen.has(article.link)) return false
        seen.add(article.link)
        return true
      })
    }
    const filtered =
      activeCategory === "all"
        ? uniqueByLink(allArticles)
        : allArticles.filter((article) => article.section === activeCategory)

    filtered.sort((a, b) => (b.sortDate || "").localeCompare(a.sortDate || ""))

    if (filtered.length === 0) {
      const label = categoryChips.find((c) => c.value === activeCategory)?.label.toLowerCase()
      content = <EmptyState label={activeCategory === "all" ? "" : (label ?? "")} />
    } else {
      content = (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      )
    }
  }

  return (
    <section className="bg-background py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Latest Articles"
            subtitle="Live news and updates for Indian students planning to study abroad."
          />
        </div>
        {content}
      </div>
    </section>
  )
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [reloadKey, setReloadKey] = useState(0)
  const [state, setState] = useState<
    { status: "loading" } | { status: "ready"; sections: NewsSection[] } | { status: "error" }
  >({ status: "loading" })

  useEffect(() => {
    let cancelled = false
    setState({ status: "loading" })

    fetch("/api/resources")
      .then(async (res) => {
        if (!res.ok) throw new Error(`News feed request failed (${res.status}).`)
        const data: NewsResponse = await res.json()
        if (!cancelled) {
          setState({ status: "ready", sections: data.sections ?? [] })
        }
      })
      .catch((error) => {
        console.error("Resources: failed to load news feed.", error)
        if (!cancelled) setState({ status: "error" })
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const handleRetry = useCallback(() => setReloadKey((key) => key + 1), [])

  return (
    <PageWrapper>
      <PageBanner />
      <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
      <NewsGrid
        status={state.status}
        sections={state.status === "ready" ? state.sections : []}
        activeCategory={activeCategory}
        onRetry={handleRetry}
      />
    </PageWrapper>
  )
}
