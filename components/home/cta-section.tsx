"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { FloatingDots, FloatingLine, FloatingTriangle } from "@/components/decorative-elements"

export function CtaSection() {
  const ref = useScrollAnimation()

  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] py-20 lg:py-28" ref={ref}>
      {/* Decorative elements on dark background */}
      <div className="pointer-events-none absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/8 blur-[80px] animate-breathe" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-primary/6 blur-[60px] animate-breathe-slow" aria-hidden="true" />
      <FloatingDots className="top-12 right-20 hidden md:block" />
      <FloatingLine className="bottom-16 left-12" />
      <FloatingTriangle className="top-20 left-1/3 hidden md:block" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="animate-on-scroll">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl text-balance">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed text-pretty">
            Take the first step today. Book a free consultation and let our
            experts guide you to the right university and country for your
            future.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="text-base px-8"
            >
              <Link href="/career-matcher">
                Course Finder
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-base px-8 bg-primary hover:bg-primary/90"
            >
              <Link href="/book-consultation">
                Book a Free Consultation
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
