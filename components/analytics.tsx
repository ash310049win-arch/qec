"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const GA4_ID = "G-H6NPSWXJ8G"
const META_PIXEL_ID = "933012199842284"

export default function AnalyticsRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")

    if (typeof window.gtag === "function") {
      window.gtag("config", GA4_ID, { page_path: url })
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}
