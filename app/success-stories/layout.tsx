import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Student Success Stories & Visa Results",
  description:
    "Real student journeys from Kerala who studied abroad with Quilon — from visa approval to landing on campus across the world.",
  alternates: {
    canonical: "/success-stories",
  },
  openGraph: {
    title: "Student Success Stories & Visa Results | Quilon Educational Consultancy",
    description:
      "Real student journeys from Kerala who studied abroad with Quilon — from visa approval to landing on campus across the world.",
    url: "/success-stories",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function SuccessStoriesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
