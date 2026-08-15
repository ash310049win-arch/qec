import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { JsonLd } from "@/components/json-ld"
import { HeroSection } from "@/components/home/hero-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { ServicesPreviewSection } from "@/components/home/services-preview-section"
import { DestinationsPreviewSection } from "@/components/home/destinations-preview-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CtaSection } from "@/components/home/cta-section"
import { DEFAULT_OG_IMAGE, localBusinessSchema } from "@/lib/site-config"

export const metadata: Metadata = {
  title: {
    absolute: "Quilon Educational Consultancy | Study Abroad & Admissions Guidance Kerala",
  },
  description:
    "Kerala's trusted study abroad consultancy in Kollam. University admissions, visa guidance, IELTS coaching, and scholarships for students across Kerala.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Quilon Educational Consultancy | Study Abroad & Admissions Guidance Kerala",
    description:
      "Kerala's trusted study abroad consultancy in Kollam. University admissions, visa guidance, IELTS coaching, and scholarships for students across Kerala.",
    url: "/",
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
    title: "Quilon Educational Consultancy | Study Abroad & Admissions Guidance Kerala",
    description:
      "Kerala's trusted study abroad consultancy in Kollam. University admissions, visa guidance, IELTS coaching, and scholarships for students across Kerala.",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageWrapper>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <ServicesPreviewSection />
        <DestinationsPreviewSection />
        <TestimonialsSection />
        <CtaSection />
      </PageWrapper>
    </>
  )
}
