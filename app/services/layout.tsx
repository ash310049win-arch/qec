import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Study Abroad Services & IELTS Coaching | Quilon",
  description:
    "University selection, applications, visa guidance, IELTS prep, scholarships, and pre-departure support — complete study abroad services.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Study Abroad Services & IELTS Coaching | Quilon Educational Consultancy",
    description:
      "University selection, applications, visa guidance, IELTS prep, scholarships, and pre-departure support — complete study abroad services.",
    url: "/services",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
