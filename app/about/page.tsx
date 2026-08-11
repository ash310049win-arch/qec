"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"
import { Target, Eye, Award, Users, Globe, GraduationCap } from "lucide-react"
import { OrganicBlob, FloatingDots, FloatingTriangle, FloatingLine, FloatingCircle } from "@/components/decorative-elements"

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "5,000+", label: "Students Guided" },
  { value: "15+", label: "Countries Covered" },
  { value: "98%", label: "Visa Success Rate" },
]

const team = [
  {
    name: "Divya Vaman",
    role: "Senior Admission Counselor",
    initials: "DV",
    bio: "Guides students through university selection and admissions across top global destinations.",
  },
  {
    name: "Anju",
    role: "Visa Counselor",
    initials: "AN",
    bio: "Expert in student visa documentation and smooth application processes.",
  },
  {
    name: "Vipanjika",
    role: "Visa Counselor",
    initials: "VI",
    bio: "Specializes in visa interview preparation and funding guidance.",
  },
  {
    name: "Arunraj",
    role: "Marketing Head",
    initials: "AR",
    bio: "Leads our marketing and outreach, connecting students with the right programs.",
  },
]


function PageBanner() {
  return (
    <section className="section-divider-wave-white relative overflow-hidden bg-[#1A1A1A] pt-28 pb-20 lg:pt-36 lg:pb-24">
      {/* Organic blobs behind banner */}
      <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] animate-breathe" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary/8 blur-[60px] animate-breathe-slow" aria-hidden="true" />
      <FloatingDots className="top-16 right-24 hidden md:block" />
      <FloatingTriangle className="bottom-20 left-16 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl text-balance">
          About Quilon Educational Consultancy
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-white/60 leading-relaxed text-pretty">
          Empowering students to achieve their global education dreams through expert guidance,
          personalized counseling, and unwavering support.
        </p>
      </div>
    </section>
  )
}

function FounderSection() {
  const ref = useScrollAnimation()

  return (
    <section
      className="section-divider-wave-white relative overflow-hidden bg-secondary py-20 lg:py-28"
      ref={ref}
    >
      <FloatingDots className="top-14 right-10 hidden md:block" />
      <OrganicBlob className="bottom-0 left-0" size="md" color="red" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-on-scroll">
            <div className="mx-auto max-w-md">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-primary/20"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-secondary shadow-xl shadow-black/10">
                  <Image
                    src="/images/Founder.jpeg"
                    alt="P. B. Sunil, Founder of Quilon Educational Consultancy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 448px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll stagger-2">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Word from Our Founder
            </p>
            <div className="relative mt-6">
              <span
                className="pointer-events-none absolute -top-8 -left-3 select-none font-display text-8xl leading-none text-primary/10"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <h2 className="relative font-display text-3xl font-bold leading-tight text-ink text-balance md:text-4xl">
                Education is not just about degrees &mdash; it&apos;s about the
                doors they open.
              </h2>
            </div>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                For over a decade, I have watched students walk through our
                doors full of questions and leave with their dreams packed in a
                suitcase. Every one of them reminded me why we started this
                journey &mdash; to make a world-class education feel possible,
                not distant.
              </p>
              <p>
                Quilon is built on a simple promise: we treat every student the
                way we would treat our own family. From the first counseling
                session to the day you step off the plane, we stand beside you
                &mdash; honest advice, careful planning, and unwavering support
                at every step.
              </p>
              <p>Wherever you want to go, we will walk with you.</p>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              <div className="h-px w-10 bg-primary" />
              <div>
                <p className="font-display text-2xl italic text-ink">
                  P. B. Sunil
                </p>
                <p className="text-sm text-muted-foreground">
                  Founder &amp; Chief Counselor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MissionVision() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave-red blob-bg relative overflow-hidden bg-background py-20 lg:py-28" ref={ref}>
      <FloatingLine className="top-12 right-16" />
      <FloatingDots className="bottom-10 left-8 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="animate-on-scroll stagger-1 card-enhanced rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-heading text-2xl font-bold text-card-foreground">
              Our Mission
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              To make world-class education accessible to every aspiring student by providing
              transparent, personalized, and comprehensive study-abroad guidance. We believe
              that geography should never be a barrier to a great education.
            </p>
          </div>
          <div className="animate-on-scroll stagger-2 card-enhanced rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-heading text-2xl font-bold text-card-foreground">
              Our Vision
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              To be the most trusted educational consultancy globally, recognized for our
              integrity, expertise, and the life-changing impact we create in every
              student&apos;s journey toward academic and career excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave relative overflow-hidden bg-primary py-16" ref={ref}>
      {/* Subtle floating shapes */}
      <div className="pointer-events-none absolute top-4 left-10 h-2 w-2 rounded-full bg-white/10 animate-float-gentle" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-4 right-12 h-1.5 w-10 rounded-full bg-white/8 animate-drift-x" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`animate-on-scroll stagger-${i + 1} text-center`}
            >
              <p className="font-heading text-4xl font-extrabold text-primary-foreground">
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

function TeamSection() {
  const ref = useScrollAnimation()

  return (
    <section className="section-divider-wave-white blob-bg relative overflow-hidden bg-secondary py-20 lg:py-28" ref={ref}>
      <FloatingCircle className="-top-10 -right-10 hidden lg:block" />
      <FloatingTriangle className="bottom-16 left-12" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Meet Our Team"
            subtitle="Dedicated professionals who are passionate about helping you succeed."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`animate-on-scroll stagger-${i + 1} card-enhanced group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {member.initials}
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-card-foreground">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-primary">{member.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <FounderSection />
      <MissionVision />
      <StatsSection />
      <TeamSection />
    </PageWrapper>
  )
}
