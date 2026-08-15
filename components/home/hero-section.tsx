"use client"

import Link from "next/link"
import Image from "next/image"
import { Sparkles, Shield, Globe, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="section-divider-wave relative overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/images/hero-students-new.jpg"
        alt="Group of diverse college students enjoying a modern university campus"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark-to-red gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-foreground/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/60" />

      <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-6 pt-32 pb-16 lg:min-h-[720px] lg:pt-40 lg:pb-20">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="animate-fade-up font-heading text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl text-balance">
            Study Abroad with{" "}
            <span className="text-primary">Confidence.</span>
          </h1>
          <p className="animate-fade-up-delay-1 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 lg:mx-0 text-pretty md:text-xl">
            Quilon Educational Consultancy guides you from choosing the right
            country to landing on campus. Your dream education, our expert
            guidance.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-2 mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/book-consultation">Book a Free Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8 border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/60"
            >
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
          </div>

          {/* Trust Indicator Pills */}
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {[
              { icon: Sparkles, text: "Personalized guidance" },
              { icon: Shield, text: "Visa support" },
              { icon: Globe, text: "Top global destinations" },
            ].map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur"
              >
                <badge.icon className="h-3.5 w-3.5 text-primary" />
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating stats badge overlay on the image */}
      <div className="absolute bottom-10 right-6 hidden rounded-xl bg-background px-5 py-3 shadow-xl sm:block lg:bottom-14 lg:right-10">
        <p className="text-xs text-muted-foreground">Students Guided</p>
        <p className="flex items-center gap-1.5 font-heading text-2xl font-bold text-foreground">
          <GraduationCap className="h-5 w-5 text-primary" />
          5,000+
        </p>
      </div>
    </section>
  )
}
