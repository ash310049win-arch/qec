"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ResultCard } from "@/components/career-matcher/result-card"
import type { RankedMatch } from "@/lib/matcher"

export function ResultCarousel({
  matches,
  services,
}: {
  matches: RankedMatch[]
  services: string[]
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  useEffect(() => {
    if (!emblaApi) return
    const onScroll = () => {
      setScrollProgress(emblaApi.scrollProgress())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    onScroll()
    emblaApi.on("scroll", onScroll)
    emblaApi.on("reInit", onScroll)
    return () => {
      emblaApi.off("scroll", onScroll)
      emblaApi.off("reInit", onScroll)
    }
  }, [emblaApi])

  return (
    <div className="mt-8">
      <div ref={emblaRef} className="-mx-3 overflow-hidden">
        <div className="flex touch-pan-y">
          {matches.map((match, i) => (
            <div
              key={match.university.id}
              className="min-w-0 flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
            >
              <div className="h-full">
                <ResultCard match={match} index={i} services={services} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Previous matches"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground md:flex"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div
          className="h-1 w-44 overflow-hidden rounded-full bg-border sm:w-64"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={scrollProgress}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Next matches"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground md:flex"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}