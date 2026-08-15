import React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Quilon Educational Consultancy | Study Abroad Experts in Kerala",
    template: "%s | Quilon Educational Consultancy",
  },
  description:
    "Kerala's trusted study abroad consultancy in Kollam. University admissions, student visa guidance, IELTS coaching, and scholarships for students across Kerala.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "study abroad consultancy Kerala",
    "overseas education consultants Kollam",
    "study abroad consultants Kottarakara",
    "student visa guidance",
    "IELTS coaching Kerala",
    "admissions to universities abroad",
    "scholarships for Indian students",
    "Quilon Educational Consultancy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: "/",
    title: "Quilon Educational Consultancy | Study Abroad Experts in Kerala",
    description:
      "Kerala's trusted study abroad consultancy in Kollam. University admissions, student visa guidance, IELTS coaching, and scholarships for students across Kerala.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Quilon Educational Consultancy — Study abroad guidance for Kerala students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quilon Educational Consultancy | Study Abroad Experts in Kerala",
    description:
      "Kerala's trusted study abroad consultancy in Kollam. University admissions, student visa guidance, IELTS coaching, and scholarships for students across Kerala.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/qec-logo.png",
    apple: "/images/qec-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
      <Script src="/scripts/agentive-widget.js" strategy="afterInteractive" />
    </html>
  )
}
