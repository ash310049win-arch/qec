import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of the Quilon Educational Consultancy website, course finder, and counseling services.",
  alternates: {
    canonical: "/terms-of-service",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function TermsOfServiceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
