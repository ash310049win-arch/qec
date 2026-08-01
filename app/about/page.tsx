"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
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
    name: "Dr. Meera Nair",
    role: "Founder & Chief Counselor",
    initials: "MN",
    bio: "Over 15 years of experience in international education. Former admissions advisor at a leading UK university.",
  },
  {
    name: "Rajesh Kumar",
    role: "Senior Visa Consultant",
    initials: "RK",
    bio: "Expert in visa processes across USA, Canada, and Australia. Has assisted 2,000+ visa applications.",
  },
  {
    name: "Sarah Thompson",
    role: "Admissions Specialist",
    initials: "ST",
    bio: "Specializes in Ivy League and Russell Group university admissions with a strong track record.",
  },
  {
    name: "Anita George",
    role: "Test Prep Coordinator",
    initials: "AG",
    bio: "IELTS and TOEFL specialist with proven strategies that have helped students achieve top scores.",
  },
]

const partners = [
  "University of Oxford",
  "MIT",
  "University of Toronto",
  "University of Melbourne",
  "ETH Zurich",
  "NUS Singapore",
  "University of Edinburgh",
  "McGill University",
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

function PartnersSection() {
  const ref = useScrollAnimation()

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28" ref={ref}>
      <OrganicBlob className="top-0 right-0" size="sm" color="gray" />
      <FloatingLine className="bottom-10 left-16" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Our Partner Institutions"
            subtitle="We collaborate with leading universities and institutions worldwide."
            decorativeIcon="cap"
          />
        </div>

        <div className="animate-on-scroll mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="card-enhanced flex items-center justify-center rounded-lg border border-border bg-card px-4 py-6 text-center transition-all duration-300"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {partner}
              </span>
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
      <MissionVision />
      <StatsSection />
      <TeamSection />
      <PartnersSection />
    </PageWrapper>
  )
}
