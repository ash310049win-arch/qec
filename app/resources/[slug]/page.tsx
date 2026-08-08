import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowLeft, Calendar } from "lucide-react"
import { articles } from "../articles"
import type { ArticleBlock } from "../articles"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return { title: "Article Not Found | Quilon Educational Consultancy" }
  return {
    title: `${article.title} | Quilon Educational Consultancy`,
    description: article.excerpt,
  }
}

function ArticleBlock({ block }: { block: ArticleBlock }) {
  if (block.type === "heading") {
    return <h2 className="mt-10 font-heading text-2xl font-bold text-foreground">{block.text}</h2>
  }
  if (block.type === "list") {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )
  }
  return <p className="mt-4 leading-relaxed text-muted-foreground">{block.text}</p>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <PageWrapper>
      <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-xs font-semibold text-accent-foreground/80">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-accent-foreground/60">
              <Calendar className="h-3 w-3" />
              {article.date}
            </span>
          </div>
          <h1 className="animate-fade-up mt-4 font-heading text-3xl font-extrabold tracking-tight text-accent-foreground md:text-4xl text-balance">
            {article.title}
          </h1>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            {article.excerpt}
          </p>
          <div className="mt-2">
            {article.body.map((block, i) => (
              <ArticleBlock key={i} block={block} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
