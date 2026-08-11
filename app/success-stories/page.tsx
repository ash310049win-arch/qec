"use client"

import { useEffect, useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Star, Users, Globe, CheckCircle2, ArrowLeft, ArrowRight, Plane } from "lucide-react"

const stats = [
  { icon: Users, value: "5,000+", label: "Students Guided" },
  { icon: Globe, value: "15+", label: "Countries" },
  { icon: CheckCircle2, value: "98%", label: "Visa Success Rate" },
  { icon: Star, value: "4.9/5", label: "Student Rating" },
]

const stories = [
  {
    name: "Anjali Nair",
    initials: "AN",
    university: "University of Limerick",
    country: "Ireland",
    program: "Nursing",
    quote:
      "Quilon walked me through the nursing program details and the visa process step by step. I arrived in Limerick knowing exactly what to expect.",
  },
  {
    name: "Rahul Menon",
    initials: "RM",
    university: "University of Toronto",
    country: "Canada",
    program: "Computer Science",
    quote:
      "They helped me compare a few Canadian programs and settle on Toronto. The paperwork after that was straightforward.",
  },
  {
    name: "Fathima Rasheed",
    initials: "FR",
    university: "RWTH Aachen University",
    country: "Germany",
    program: "Mechanical Engineering",
    quote:
      "The blocked account, APS, and university applications were all new to me. They handled each one in order, without rushing.",
  },
  {
    name: "Arjun Pillai",
    initials: "AP",
    university: "University of Melbourne",
    country: "Australia",
    program: "Data Science",
    quote:
      "I knew I wanted data science, but not where to study it. They helped me shortlist, and it worked out.",
  },
  {
    name: "Sreelakshmi S. Kumar",
    initials: "SK",
    university: "Coventry University",
    country: "UK",
    program: "Business Analytics",
    quote:
      "Every step, from course choice to flight booking, was planned in advance. I never had to wonder what came next.",
  },
  {
    name: "Muhammed Sinan",
    initials: "MS",
    university: "Trinity College Dublin",
    country: "Ireland",
    program: "Pharmacy",
    quote:
      "The application timelines were managed well and the documents stayed in order. It all went the way they said it would.",
  },
  {
    name: "Devika Warrier",
    initials: "DW",
    university: "University of Auckland",
    country: "New Zealand",
    program: "Civil Engineering",
    quote:
      "They gave me a realistic picture of costs and timelines before I committed. That clarity made the process easier.",
  },
  {
    name: "Akhil Krishnan",
    initials: "AK",
    university: "TU Munich",
    country: "Germany",
    program: "Automotive Engineering",
    quote:
      "German applications can feel complicated from outside. Their team kept everything organized and the deadlines clear.",
  },
  {
    name: "Nandana Suresh",
    initials: "NS",
    university: "National University of Singapore",
    country: "Singapore",
    program: "Business Analytics",
    quote:
      "I had a long list of questions about NUS before applying. They answered each one and helped me prepare a focused application.",
  },
  {
    name: "Vishnu Prasad",
    initials: "VP",
    university: "Technical University of Munich",
    country: "Germany",
    program: "Renewable Energy",
    quote:
      "Two universities in Germany appealed to me. They helped me weigh both and apply where my profile fit best.",
  },
  {
    name: "Aiswarya Mohan",
    initials: "AM",
    university: "University College Dublin",
    country: "Ireland",
    program: "Data Science",
    quote:
      "They listened to what I actually wanted to study instead of pushing a program. The university they suggested suited me.",
  },
  {
    name: "Mohammed Shafi",
    initials: "MSh",
    university: "University of Malaya",
    country: "Malaysia",
    program: "Engineering",
    quote:
      "Malaysia was not on my list at first. They explained the quality and cost, and it turned out to be the right fit.",
  },
  {
    name: "Parvathy Anilkumar",
    initials: "PA",
    university: "University of Manchester",
    country: "UK",
    program: "Finance",
    quote:
      "The whole timeline, from IELTS to visa, was mapped out on day one. I followed it and everything went smoothly.",
  },
  {
    name: "Nithin Raj",
    initials: "NR",
    university: "University of Waterloo",
    country: "Canada",
    program: "Software Engineering",
    quote:
      "Co-op programs were unfamiliar to me. They explained how Waterloo works and shaped my application around it.",
  },
  {
    name: "Athira Balakrishnan",
    initials: "AB",
    university: "Wageningen University",
    country: "Netherlands",
    program: "Environmental Science",
    quote:
      "Choosing a niche program felt like a risk. Their research on the university made me confident in the choice.",
  },
  {
    name: "Sachin Dev",
    initials: "SD",
    university: "Waseda University",
    country: "Japan",
    program: "Robotics",
    quote:
      "Studying in Japan means meeting specific language and application expectations. They made that clear from the start.",
  },
]

const flagCodes: Record<string, string> = {
  Ireland: "ie",
  Canada: "ca",
  Germany: "de",
  Australia: "au",
  UK: "gb",
  "New Zealand": "nz",
  Singapore: "sg",
  Malaysia: "my",
  Netherlands: "nl",
  Japan: "jp",
}

const flagUrl = (country: string) =>
  `https://flagcdn.com/${flagCodes[country] ?? "xx"}.svg`

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Success Stories
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          Real stories from real students who achieved their study-abroad dreams with Quilon.
        </p>
      </div>
    </section>
  )
}

function StatsBar() {
  const ref = useScrollAnimation()

  return (
    <section className="bg-primary py-12" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`animate-on-scroll stagger-${i + 1} flex flex-col items-center text-center`}
            >
              <stat.icon className="mb-2 h-6 w-6 text-primary-foreground/80" />
              <p className="font-heading text-3xl font-extrabold text-primary-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StoriesCarousel() {
  const ref = useScrollAnimation()
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
    <section className="overflow-hidden bg-background py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Hear From Our Students"
            subtitle="Short accounts from students who made the journey abroad."
          />
          <p className="mt-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
            Placeholder profiles for review before launch
          </p>
        </div>

        <div className="mt-14">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {stories.map((story) => (
                <div
                  key={story.name}
                  className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_33.3333%]"
                >
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-[0_0_24px_-12px_rgba(214,38,42,0.25)] transition-shadow duration-300 hover:shadow-[0_0_48px_-10px_rgba(214,38,42,0.45)] md:p-8">
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.04] via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]">
                      <div className="relative h-40 w-64">
                        <Image
                          src={flagUrl(story.country)}
                          alt=""
                          fill
                          unoptimized
                          draggable={false}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="relative flex flex-1 flex-col">
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">
                          Kerala
                        </span>
                        <div className="flex flex-1 items-center gap-2">
                          <div className="h-px flex-1 border-t border-dashed border-primary/40" aria-hidden="true" />
                          <Plane
                            className="h-4 w-4 shrink-0 rotate-45 text-primary animate-float-gentle"
                            aria-hidden="true"
                          />
                          <div className="h-px flex-1 border-t border-dashed border-primary/40" aria-hidden="true" />
                        </div>
                        <span className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">
                          {story.country}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-center py-8">
                        <p className="max-w-sm text-base leading-relaxed md:text-lg">
                          <span className="font-display text-lg font-medium text-foreground md:text-xl">
                            {story.quote.split(" ").slice(0, 3).join(" ")}
                          </span>
                          <span className="text-muted-foreground">
                            {` ${story.quote.split(" ").slice(3).join(" ")}`}
                          </span>
                        </p>
                        <div className="mt-6 h-px w-16 bg-border" aria-hidden="true" />
                        <p className="mt-6 font-heading text-lg font-semibold text-foreground">
                          {story.name}
                        </p>
                        <span className="mt-3 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {story.university}, {story.country}
                        </span>
                      </div>
                    </div>
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
              aria-label="Previous story"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground md:flex"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="h-1 w-44 overflow-hidden rounded-full bg-border sm:w-64" role="progressbar" aria-valuemin={0} aria-valuemax={1} aria-valuenow={scrollProgress}>
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next story"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground md:flex"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SuccessStoriesPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <StatsBar />
      <StoriesCarousel />
    </PageWrapper>
  )
}
