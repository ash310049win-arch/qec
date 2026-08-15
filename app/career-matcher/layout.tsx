import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Free Career Matcher & Course Finder | Quilon Study Abroad",
  description:
    "Answer 8 quick questions for a personalized university shortlist matched to interests, budget, and destination. Free career matcher.",
  alternates: {
    canonical: "/career-matcher",
  },
  openGraph: {
    title: "Free AI Course Finder & Career Matcher | Quilon Educational Consultancy",
    description:
      "Answer 8 quick questions for a personalized university shortlist matched to interests, budget, and destination. Free career matcher.",
    url: "/career-matcher",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function CareerMatcherLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
