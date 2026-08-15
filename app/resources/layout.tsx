import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Study Abroad Resources, Visa Updates & Guides",
  description:
    "Visa updates, scholarship news, IELTS and test-prep guides, and country insights for students planning to study abroad from India.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Study Abroad Resources & Guides | Quilon Educational Consultancy",
    description:
      "Visa updates, scholarship news, IELTS and test-prep guides, and country insights for students planning to study abroad from India.",
    url: "/resources",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
