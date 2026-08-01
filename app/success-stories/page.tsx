"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Star, Users, Globe, CheckCircle2 } from "lucide-react"

const stats = [
  { icon: Users, value: "5,000+", label: "Students Guided" },
  { icon: Globe, value: "15+", label: "Countries" },
  { icon: CheckCircle2, value: "98%", label: "Visa Success Rate" },
  { icon: Star, value: "4.9/5", label: "Student Rating" },
]

const stories = [
  {
    name: "Arjun Patel",
    initials: "AP",
    university: "University of Toronto",
    country: "Canada",
    program: "MSc Computer Science",
    quote:
      "Quilon made the entire process so smooth. From university shortlisting to visa approval, they were with me every step of the way. The personalized attention I received was incredible. I was nervous about applying abroad, but their team made me feel confident at every stage.",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    university: "University of Melbourne",
    country: "Australia",
    program: "MBA",
    quote:
      "The personalized approach at Quilon is what sets them apart. They understood my goals and helped me secure a scholarship I didn't even know existed. My counselor spent hours fine-tuning my SOP, and I truly believe that made the difference in my application.",
  },
  {
    name: "Rahul Menon",
    initials: "RM",
    university: "University College London",
    country: "United Kingdom",
    program: "MA International Relations",
    quote:
      "I was overwhelmed by the application process, but Quilon's team simplified everything. Their test prep guidance helped me score higher than I expected on the IELTS. The mock visa interviews were so thorough that the actual interview felt easy.",
  },
  {
    name: "Sneha Krishnan",
    initials: "SK",
    university: "Georgia Institute of Technology",
    country: "USA",
    program: "MS Electrical Engineering",
    quote:
      "Quilon's visa counseling was exceptional. They prepared me thoroughly for my interview and I got my student visa approved on the first attempt! Their step-by-step checklist ensured I never missed a deadline.",
  },
  {
    name: "Vikram Desai",
    initials: "VD",
    university: "TU Munich",
    country: "Germany",
    program: "MSc Automotive Engineering",
    quote:
      "Studying in Germany was my dream, but the process seemed complex. Quilon navigated the blocked account, APS certificate, and university applications seamlessly. I'm now studying at one of Europe's best engineering universities tuition-free!",
  },
  {
    name: "Anjali Nair",
    initials: "AN",
    university: "Trinity College Dublin",
    country: "Ireland",
    program: "MSc Data Analytics",
    quote:
      "I wanted to study in a country with strong tech industry connections. Quilon recommended Ireland and helped me choose the perfect program. Within a month of graduating, I had a job at a major tech company in Dublin. Best decision ever.",
  },
  {
    name: "Karthik Sundaram",
    initials: "KS",
    university: "McGill University",
    country: "Canada",
    program: "MEng Civil Engineering",
    quote:
      "What I appreciated most about Quilon was their honesty. They didn't just tell me what I wanted to hear but gave realistic advice about my chances and helped me build a strong profile. The result? Admission to my top-choice university with a partial scholarship.",
  },
  {
    name: "Divya Raghavan",
    initials: "DR",
    university: "University of Edinburgh",
    country: "United Kingdom",
    program: "MSc Psychology",
    quote:
      "From my first meeting with Quilon to my arrival in Edinburgh, the experience was seamless. They helped with everything, from selecting the right course to finding accommodation. I felt fully prepared and supported throughout my journey.",
  },
]

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

function StoriesGrid() {
  const ref = useScrollAnimation()

  return (
    <section className="bg-background py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="animate-on-scroll">
          <SectionHeading
            title="Hear From Our Students"
            subtitle="Every story is unique, and every student's success is our greatest achievement."
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {stories.map((story, i) => (
            <div
              key={story.name}
              className={`animate-on-scroll stagger-${(i % 4) + 1} rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                {`"${story.quote}"`}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {story.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {story.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {story.program}
                  </p>
                  <p className="text-xs text-primary">
                    {story.university}, {story.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
      <StoriesGrid />
    </PageWrapper>
  )
}
