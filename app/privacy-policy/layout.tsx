import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Quilon Educational Consultancy collects, uses, and protects your information when you use our website and counseling services.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
