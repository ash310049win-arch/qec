import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { DestinationsCarousel } from "@/components/destinations/destinations-carousel"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Study Abroad Destinations | USA, Canada, UK & More",
  description:
    "Explore study destinations with Quilon — USA, Canada, UK, Australia, Germany, Japan. Compare universities, intakes, costs, and visas.",
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    title: "Study Abroad Destinations | Quilon Educational Consultancy",
    description:
      "Explore study destinations with Quilon — USA, Canada, UK, Australia, Germany, Japan. Compare universities, intakes, costs, and visas.",
    url: "/destinations",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function DestinationsPage() {
  return (
    <PageWrapper>
      <DestinationsCarousel />
    </PageWrapper>
  )
}
