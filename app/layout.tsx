import React, { Suspense } from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/site-config"
import AnalyticsRouteTracker from "@/components/analytics"
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WBXNS5S6');`,
        }}
      />

      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H6NPSWXJ8G"
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-H6NPSWXJ8G');`,
      }} />

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '933012199842284');
fbq('track', 'PageView');`,
      }} />

      <body className="font-sans antialiased">
        {/* GTM noscript (must be immediately after <body>) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WBXNS5S6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=933012199842284&ev=PageView&noscript=1"
          />
        </noscript>

        <Suspense fallback={null}>
          <AnalyticsRouteTracker />
        </Suspense>
        {children}
      </body>
      <Script src="/scripts/agentive-widget.js" strategy="afterInteractive" />
    </html>
  )
}
