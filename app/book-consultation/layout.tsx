import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Book a Free Study Abroad Consultation | Quilon, Kollam",
  description:
    "Reserve a free 1-on-1 consultation with Quilon counselors for a personalized university shortlist, budget plan, and visa roadmap.",
  alternates: {
    canonical: "/book-consultation",
  },
  openGraph: {
    title: "Book a Free Study Abroad Consultation | Quilon Educational Consultancy",
    description:
      "Reserve a free 1-on-1 consultation with Quilon counselors for a personalized university shortlist, budget plan, and visa roadmap.",
    url: "/book-consultation",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function BookConsultationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
