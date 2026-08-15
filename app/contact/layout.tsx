import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact Us | Study Abroad Consultants in Kollam, Kerala",
  description:
    "Visit us in Kottarakara, Kollam or call +91 94977 71392. Study abroad consultation, admission guidance, and visa support for Kerala students.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Quilon Educational Consultancy | Kollam, Kerala",
    description:
      "Visit us in Kottarakara, Kollam or call +91 94977 71392. Study abroad consultation, admission guidance, and visa support for Kerala students.",
    url: "/contact",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
