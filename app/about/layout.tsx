import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About Us | Study Abroad Consultants in Kerala",
  description:
    "10+ years guiding 5,000+ Kerala students to universities worldwide. Meet the Quilon team — senior admission and visa counselors in Kottarakara, Kollam.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Quilon Educational Consultancy | Study Abroad Consultants in Kerala",
    description:
      "10+ years guiding 5,000+ Kerala students to universities worldwide. Meet the Quilon team — senior admission and visa counselors in Kottarakara, Kollam.",
    url: "/about",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
