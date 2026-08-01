"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { HeroSection } from "@/components/home/hero-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { ServicesPreviewSection } from "@/components/home/services-preview-section"
import { DestinationsPreviewSection } from "@/components/home/destinations-preview-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <ServicesPreviewSection />
      <DestinationsPreviewSection />
      <TestimonialsSection />
      <CtaSection />
    </PageWrapper>
  )
}
