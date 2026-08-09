"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { COUNTRIES, type CountryData } from "@/lib/destinations-data"

function Slide({
  country,
  isActive,
}: {
  country: CountryData
  isActive: boolean
}) {
  const router = useRouter()
  const pressStart = useRef<{ x: number; y: number } | null>(null)
  const dragged = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pressStart.current = { x: e.clientX, y: e.clientY }
    dragged.current = false
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!pressStart.current) return
    const dx = Math.abs(e.clientX - pressStart.current.x)
    const dy = Math.abs(e.clientY - pressStart.current.y)
    if (dx > 8 || dy > 8) dragged.current = true
    pressStart.current = null
  }, [])

  const handleClick = useCallback(() => {
    if (dragged.current) {
      dragged.current = false
      return
    }
    router.push(`/destinations/${country.slug}`)
  }, [country.slug, router])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        router.push(`/destinations/${country.slug}`)
      }
    },
    [country.slug, router]
  )

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Explore ${country.name}`}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="relative h-full min-w-0 flex-[0_0_100%] cursor-pointer select-none overflow-hidden"
    >
      <Image
        src={country.heroImage}
        alt={`Study in ${country.name}`}
        fill
        priority={isActive}
        sizes="100vw"
        draggable={false}
        className="object-cover"
      />

      {/* Gradient overlay for text/nav legibility over any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-white/70 md:text-sm">
            Study Destination
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl font-black leading-none tracking-tight text-white text-balance md:text-7xl lg:text-8xl">
            {country.flag} {country.name}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 text-pretty md:text-lg">
            {country.eyebrow}
          </p>
          <Link
            href={`/destinations/${country.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-7 font-heading text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/30 transition-colors hover:bg-brand-dark"
          >
            Explore {country.name}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const AUTOPLAY_INTERVAL_MS = 2500

export function DestinationsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", duration: 40 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const pause = () => setPaused(true)
    const resume = () => setPaused(false)
    emblaApi.on("pointerDown", pause)
    emblaApi.on("pointerUp", resume)
    emblaApi.on("settle", resume)
    return () => {
      emblaApi.off("pointerDown", pause)
      emblaApi.off("pointerUp", resume)
      emblaApi.off("settle", resume)
    }
  }, [emblaApi])

  useEffect(() => {
    if (paused || !emblaApi) return
    const id = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [emblaApi, paused, selectedIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        emblaApi?.scrollNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        emblaApi?.scrollPrev()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [emblaApi])

  return (
    <section
      ref={emblaRef}
      className="relative z-0 h-screen w-full overflow-hidden bg-black supports-[height:100dvh]:h-[100dvh]"
    >
      <div className="flex h-full">
        {COUNTRIES.map((country, i) => (
          <Slide key={country.slug} country={country} isActive={i === selectedIndex} />
        ))}
      </div>

      {/* Desktop arrow navigation */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous destination"
          className="pointer-events-auto absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand/90 text-white shadow-lg shadow-black/30 transition-colors hover:bg-brand"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next destination"
          className="pointer-events-auto absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand/90 text-white shadow-lg shadow-black/30 transition-colors hover:bg-brand"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center md:bottom-5">
        <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
          {COUNTRIES.map((country, i) => (
            <button
              key={country.slug}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to ${country.name}`}
              className={
                i === selectedIndex
                  ? "h-1.5 w-6 rounded-full bg-brand transition-all duration-300"
                  : "h-1.5 w-1.5 rounded-full bg-white/50 transition-all duration-300 hover:bg-white/80"
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
