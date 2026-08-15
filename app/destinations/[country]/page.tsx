import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageWrapper } from "@/components/page-wrapper"
import { CountryHero } from "@/components/destinations/country-hero"
import { CountryContent } from "@/components/destinations/country-sections"
import { COUNTRIES, getCountryBySlug } from "@/lib/destinations-data"
import { getUniversitiesForCountry, getCountryUniversityTotal } from "@/lib/destinations-universities"

type Props = {
  params: Promise<{ country: string }>
}

const MAX_DESCRIPTION_LENGTH = 160

function buildCountryDescription(tagline: string, name: string): string {
  const suffix = ` Explore universities, costs, visas, and intakes in ${name} — free guidance from Quilon.`
  if (tagline.length + suffix.length <= MAX_DESCRIPTION_LENGTH) {
    return tagline + suffix
  }
  const taglineBudget = MAX_DESCRIPTION_LENGTH - suffix.length - 1
  return tagline.slice(0, taglineBudget).trimEnd() + "…" + suffix
}

export function generateStaticParams() {
  return COUNTRIES.map((country) => ({ country: country.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) return {}
  const description = buildCountryDescription(country.tagline, country.name)
  const canonicalUrl = `/destinations/${country.slug}`
  return {
    title: `Study in ${country.name} | Top Universities & Visa Guidance`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `study in ${country.name}`,
      `study abroad in ${country.name}`,
      `${country.name} universities for Indian students`,
      `${country.name} student visa`,
      `study ${country.name} from Kerala`,
    ],
    openGraph: {
      title: `Study in ${country.name} | Top Universities & Visa Guidance – Quilon`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: country.heroImage,
          width: 1200,
          height: 630,
          alt: `Study in ${country.name} — Quilon Educational Consultancy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Study in ${country.name} | Top Universities & Visa Guidance – Quilon`,
      description,
      images: [country.heroImage],
    },
  }
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  const universities = getUniversitiesForCountry(country)
  const total = getCountryUniversityTotal(country)

  return (
    <PageWrapper>
      <CountryHero country={country} />
      <CountryContent country={country} universities={universities} total={total} />
    </PageWrapper>
  )
}
