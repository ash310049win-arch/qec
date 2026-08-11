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

export function generateStaticParams() {
  return COUNTRIES.map((country) => ({ country: country.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) return {}
  return {
    title: `Study in ${country.name} | Quilon Educational Consultancy`,
    description: `${country.tagline} Explore top universities, costs, visas, and intakes in ${country.name} — with free guidance from Quilon.`,
    openGraph: {
      title: `Study in ${country.name} | Quilon Educational Consultancy`,
      description: country.tagline,
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
