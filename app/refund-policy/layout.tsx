import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "The refund policy for payments made to Quilon Educational Consultancy Private Limited, including refund eligibility, process, method, and non-refundable services.",
  alternates: {
    canonical: "/refund-policy",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RefundPolicyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
