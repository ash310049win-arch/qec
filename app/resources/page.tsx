"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight, Calendar } from "lucide-react"

const categories = [
  { label: "All", value: "all" },
  { label: "Countries", value: "countries" },
  { label: "Visas", value: "visas" },
  { label: "Scholarships", value: "scholarships" },
  { label: "Tests", value: "tests" },
  { label: "Applications", value: "applications" },
]

const articles = [
  {
    title: "How to Choose the Right Study Destination",
    excerpt:
      "Choosing the right country to study in is one of the most important decisions you'll make. This guide covers factors like cost, culture, career prospects, and immigration pathways to help you decide.",
    category: "Countries",
    tag: "countries",
    date: "January 15, 2026",
  },
  {
    title: "Student Visa Checklist: Everything You Need",
    excerpt:
      "A comprehensive checklist of documents, requirements, and steps to prepare your student visa application for the USA, Canada, UK, Australia, and more.",
    category: "Visas",
    tag: "visas",
    date: "January 8, 2026",
  },
  {
    title: "Scholarship Tips for International Students",
    excerpt:
      "Learn how to find, apply for, and win scholarships as an international student. From merit-based awards to need-based grants, we cover all the strategies you need.",
    category: "Scholarships",
    tag: "scholarships",
    date: "December 20, 2025",
  },
  {
    title: "Application Timeline: When to Start Preparing",
    excerpt:
      "A month-by-month breakdown of when to start your study abroad preparations, from standardized tests to university applications and visa filing.",
    category: "Applications",
    tag: "applications",
    date: "December 10, 2025",
  },
  {
    title: "IELTS vs TOEFL: Which Test Should You Take?",
    excerpt:
      "A detailed comparison of IELTS and TOEFL, including format differences, scoring, university acceptance, and tips to help you choose the right test for your target country.",
    category: "Tests",
    tag: "tests",
    date: "November 28, 2025",
  },
  {
    title: "Top 10 Affordable Countries to Study Abroad",
    excerpt:
      "Think studying abroad is too expensive? Discover 10 countries that offer world-class education at surprisingly affordable costs, including some with free tuition.",
    category: "Countries",
    tag: "countries",
    date: "November 15, 2025",
  },
  {
    title: "How to Write a Winning Statement of Purpose",
    excerpt:
      "Your SOP can make or break your application. Learn the structure, dos and don'ts, and real examples of statements that impressed admissions committees.",
    category: "Applications",
    tag: "applications",
    date: "November 5, 2025",
  },
  {
    title: "GRE Preparation: A Complete Study Guide",
    excerpt:
      "Master the GRE with this complete guide covering study plans, practice resources, test-day strategies, and score expectations for top universities.",
    category: "Tests",
    tag: "tests",
    date: "October 22, 2025",
  },
  {
    title: "Work While You Study: Part-Time Job Rules by Country",
    excerpt:
      "Understand the work regulations for international students in the USA, Canada, UK, Australia, Germany, and Ireland, including hours allowed and job types.",
    category: "Visas",
    tag: "visas",
    date: "October 10, 2025",
  },
]

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Resources & Blog
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          Helpful guides, tips, and insights to prepare you for your study-abroad journey.
        </p>
      </div>
    </section>
  )
}

function CategoryFilter() {
  return (
    <section className="bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat.value === "all"
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

function ArticlesGrid() {
  const ref = useScrollAnimation()

  return (
    <section className="bg-background py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Latest Articles"
            subtitle="Stay informed with our latest guides and expert advice."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <article
              key={article.title}
              className={`animate-on-scroll stagger-${(i % 4) + 1} group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Color bar */}
              <div className="h-1.5 w-full bg-primary" />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </span>
                </div>

                <h3 className="mt-3 font-heading text-base font-semibold text-card-foreground group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>

                <div className="mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <CategoryFilter />
      <ArticlesGrid />
    </PageWrapper>
  )
}
