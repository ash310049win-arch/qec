"use client"

import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Plane, Shield, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrganicBlob, FloatingDots, FloatingTriangle, FloatingLine } from "@/components/decorative-elements"

export function HeroSection() {
  return (
    <section className="section-divider-wave relative overflow-hidden bg-secondary pt-32 pb-24 lg:pt-40 lg:pb-36">
      {/* Organic background blobs */}
      <OrganicBlob className="top-10 right-0" size="lg" color="red" />
      <OrganicBlob className="bottom-0 left-0" size="md" color="gray" />
      <OrganicBlob className="top-1/3 left-1/4" size="sm" color="red" />

      {/* Large soft red blob centered behind the left text block (mirror of the right-edge blob) */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2">
        <OrganicBlob size="xl" color="red" opacity={0.12} />
      </div>

      {/* Floating decorative elements */}
      <FloatingDots className="top-20 right-20 hidden lg:block" />
      <FloatingTriangle className="bottom-32 left-16" />
      <FloatingLine className="top-40 left-1/3" />
      <FloatingDots className="bottom-16 right-1/4 hidden lg:block" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row lg:gap-20">
        {/* Left - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="animate-fade-up font-heading text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
            Study Abroad with{" "}
            <span className="text-primary">Confidence.</span>
          </h1>
          <p className="animate-fade-up-delay-1 mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground mx-auto lg:mx-0 text-pretty md:text-xl">
            Quilon Educational Consultancy guides you from choosing the right
            country to landing on campus. Your dream education, our expert
            guidance.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-2 mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/career-matcher">Course Finder</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8 border-foreground/20 text-foreground bg-transparent hover:bg-foreground/5 hover:text-foreground"
            >
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
          </div>

          {/* Benefit Badges */}
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {[
              { icon: Sparkles, text: "Personalized guidance" },
              { icon: Shield, text: "Visa support" },
              { icon: Globe, text: "Top global destinations" },
            ].map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-medium text-foreground shadow-sm"
              >
                <badge.icon className="h-3.5 w-3.5 text-primary" />
                {badge.text}
              </span>
            ))}
          </div>
        </div>

        {/* Right - Visual */}
        <div className="relative flex-1 animate-fade-up-delay-2">
          <div className="relative mx-auto max-w-lg lg:max-w-xl">
            {/* Main image card */}
            <div className="relative overflow-hidden rounded-2xl bg-background shadow-2xl">
              <Image
                src="/images/hero-students.jpg"
                alt="International students on a university campus"
                width={600}
                height={450}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            {/* Floating graduation cap */}
            <div className="animate-float absolute -top-4 -right-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>

            {/* Floating airplane */}
            <div className="animate-float-slow absolute -bottom-3 -left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground shadow-lg">
              <Plane className="h-6 w-6 text-background" />
            </div>

            {/* Stats badge */}
            <div className="absolute -bottom-4 right-6 rounded-xl bg-background px-5 py-3 shadow-xl">
              <p className="text-xs text-muted-foreground">Students Guided</p>
              <p className="font-heading text-2xl font-bold text-foreground">
                5,000+
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
