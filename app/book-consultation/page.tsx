"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ALL_COUNTRIES } from "@/lib/countries"
import {
  CalendarCheck,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  GraduationCap,
  Globe,
  Landmark,
  BookOpen,
  Search,
} from "lucide-react"

const STUDY_LEVELS = [
  "12th Grade (Higher Secondary)",
  "Bachelor's Degree",
  "Master's Degree",
  "Working Professional",
]

const COURSE_INTERESTS = [
  "Engineering",
  "Business & Management",
  "Nursing & Healthcare",
  "IT & Computer Science",
  "Data Science & AI",
  "Medicine",
  "Arts & Humanities",
  "Hospitality & Tourism",
  "Law",
  "Architecture & Design",
  "Media & Communication",
  "Agriculture & Life Sciences",
]

type Status = "idle" | "submitting" | "success" | "error"

function Toggle({
  id,
  value,
  onChange,
}: {
  id: string
  value: "Yes" | "No"
  onChange: (value: "Yes" | "No") => void
}) {
  const options: ["Yes", "No"] = ["Yes", "No"]
  return (
    <div role="radiogroup" aria-label={id} className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            value === option
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-input bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  )
}

function MultiSelectChips({
  id,
  options,
  selected,
  onToggle,
}: {
  id: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  const toggle = (value: string) => {
    onToggle(value)
  }

  return (
    <div
      role="group"
      aria-labelledby={`${id}-label`}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const isSelected = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            aria-label={option}
            onClick={() => toggle(option)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              isSelected
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-input bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {isSelected && <Check className="h-3.5 w-3.5" />}
            {option}
          </button>
        )
      })}
    </div>
  )
}

function MultiSelectDropdown({
  id,
  options,
  selected,
  onChange,
  placeholder,
  hasError,
}: {
  id: string
  options: string[]
  selected: string[]
  onChange: (next: string[]) => void
  placeholder: string
  hasError?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((option) => option.toLowerCase().includes(q))
  }, [options, query])

  const toggle = (value: string) =>
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    )

  const summary =
    selected.length === 0
      ? placeholder
      : selected.length <= 2
        ? selected.join(", ")
        : `${selected.slice(0, 2).join(", ")} +${selected.length - 2} more`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            hasError ? "border-destructive" : "border-input"
          }`}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className={selected.length === 0 ? "truncate text-muted-foreground" : "truncate font-medium"}>
            {summary}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="max-h-96 w-[var(--radix-popover-trigger-width)] overflow-hidden p-0"
      >
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            id={`${id}-search`}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries..."
            className="h-8 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
        </div>
        <ul role="listbox" aria-multiselectable="true" className="max-h-64 overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No countries match your search.
            </li>
          ) : (
            filtered.map((option) => {
              const isSelected = selected.includes(option)
              return (
                <li key={option} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => toggle(option)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input"
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                    {option}
                  </button>
                </li>
              )
            })
          )}
        </ul>
        {selected.length > 0 && (
          <div className="flex items-center justify-between border-t border-border px-3 py-2">
            <span className="text-xs text-muted-foreground">
              {selected.length} selected
            </span>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                onChange([])
              }}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

function BookingForm() {
  const searchParams = useSearchParams()
  const initialCountry = searchParams.get("country")

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [studyLevel, setStudyLevel] = useState("")
  const [address, setAddress] = useState("")
  const [destinations, setDestinations] = useState<string[]>(() =>
    initialCountry && ALL_COUNTRIES.includes(initialCountry) ? [initialCountry] : []
  )
  const [courseInterests, setCourseInterests] = useState<string[]>([])
  const [educationLoan, setEducationLoan] = useState<"Yes" | "No">("No")
  const [coaching, setCoaching] = useState<"Yes" | "No">("No")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const toggleInList = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!name.trim()) errors.name = "Please enter your name."
    if (!phone.trim()) errors.phone = "Please enter your phone number."
    else if (phone.replace(/\D/g, "").length < 10)
      errors.phone = "Please enter a valid phone number."
    if (!email.trim()) errors.email = "Please enter your email address."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.email = "Please enter a valid email address."
    if (!studyLevel) errors.studyLevel = "Please select your current study level."
    if (!address.trim()) errors.address = "Please enter your address."
    if (destinations.length === 0)
      errors.destinations = "Please select at least one destination country."
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus("submitting")
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          studyLevel,
          address: address.trim(),
          destinations,
          courseInterests,
          educationLoan,
          coaching,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        setStatus("error")
        return
      }
      setStatus("success")
    } catch {
      setError("Network error. Please check your connection and try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-white/95 p-8 text-center shadow-2xl backdrop-blur sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <h2 className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Consultation Request Received!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Thank you, {name.trim().split(" ")[0] || "friend"}. Our team has received
          your details and will call you shortly on{" "}
          <span className="font-semibold text-foreground">{phone}</span> to schedule
          your free consultation.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setStatus("idle")
            setName("")
            setPhone("")
            setEmail("")
            setStudyLevel("")
            setAddress("")
            setDestinations([])
            setCourseInterests([])
            setEducationLoan("No")
            setCoaching("No")
          }}
        >
          Submit another request
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-10"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <CalendarCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Book a Free Consultation
          </h2>
          <p className="text-sm text-muted-foreground">
            Fill in your details and we'll call you back within 24 hours.
          </p>
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">
            Full Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            className="mt-2"
          />
          {fieldErrors.name && <FieldError message={fieldErrors.name} />}
        </div>

        <div>
          <Label htmlFor="phone">
            Phone / WhatsApp <span className="text-primary">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            className="mt-2"
          />
          {fieldErrors.phone && <FieldError message={fieldErrors.phone} />}
        </div>

        <div>
          <Label htmlFor="email">
            Email Address <span className="text-primary">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            className="mt-2"
          />
          {fieldErrors.email && <FieldError message={fieldErrors.email} />}
        </div>

        <div>
          <Label htmlFor="studyLevel">
            <GraduationCap className="mr-1.5 inline h-4 w-4 text-primary" />
            Current Study Level <span className="text-primary">*</span>
          </Label>
          <Select value={studyLevel} onValueChange={setStudyLevel}>
            <SelectTrigger id="studyLevel" className="mt-2" aria-invalid={Boolean(fieldErrors.studyLevel)}>
              <SelectValue placeholder="Select your study level" />
            </SelectTrigger>
            <SelectContent>
              {STUDY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldErrors.studyLevel && <FieldError message={fieldErrors.studyLevel} />}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="address">
            <Landmark className="mr-1.5 inline h-4 w-4 text-primary" />
            Where Do You Live? <span className="text-primary">*</span>
          </Label>
          <Input
            id="address"
            name="address"
            autoComplete="street-address"
            placeholder="Enter your full address (house name, street, town, district, PIN)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            aria-invalid={Boolean(fieldErrors.address)}
            className="mt-2"
          />
          {fieldErrors.address && <FieldError message={fieldErrors.address} />}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="destinations">
            <Globe className="mr-1.5 inline h-4 w-4 text-primary" />
            Where Do You Want to Study? <span className="text-primary">*</span>
          </Label>
          <div className="mt-2">
            <MultiSelectDropdown
              id="destinations"
              options={ALL_COUNTRIES}
              selected={destinations}
              onChange={setDestinations}
              placeholder="Search and select countries..."
              hasError={Boolean(fieldErrors.destinations)}
            />
          </div>
          {fieldErrors.destinations && (
            <FieldError message={fieldErrors.destinations} />
          )}
        </div>

        <div className="sm:col-span-2">
          <Label id="courseInterests-label">
            <BookOpen className="mr-1.5 inline h-4 w-4 text-primary" />
            Field of Study / Course Interest
          </Label>
          <div className="mt-2">
            <MultiSelectChips
              id="courseInterests"
              options={COURSE_INTERESTS}
              selected={courseInterests}
              onToggle={(value) =>
                setCourseInterests((prev) => toggleInList(prev, value))
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="educationLoan">
            <Landmark className="mr-1.5 inline h-4 w-4 text-primary" />
            Interested in an Education Loan?
          </Label>
          <div className="mt-2">
            <Toggle id="educationLoan" value={educationLoan} onChange={setEducationLoan} />
          </div>
        </div>

        <div>
          <Label htmlFor="coaching">
            <BookOpen className="mr-1.5 inline h-4 w-4 text-primary" />
            Interested in Coaching Services?
          </Label>
          <div className="mt-2">
            <Toggle id="coaching" value={coaching} onChange={setCoaching} />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full text-base"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Free Consultation"
        )}
      </Button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted by our counseling team. We never
        share your details.
      </p>
    </form>
  )
}

export default function BookConsultationPage() {
  return (
    <PageWrapper>
      <section className="relative isolate min-h-screen overflow-hidden">
        {/* Full-bleed background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-students.jpg)" }}
        />
        {/* Red gradient overlay: more transparent at top, semi-transparent red at bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-brand/20 to-brand/85"
        />

        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              <GraduationCap className="h-4 w-4" />
              Free 1-on-1 Guidance
            </span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-white text-balance md:text-5xl">
              Your Study Abroad Journey
              <span className="block text-white/90">Starts With a Conversation</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Tell us a little about yourself and our counselors will reach out to
              plan your path to universities across the world.
            </p>
          </div>

          <div className="mt-12 w-full">
            <Suspense fallback={null}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
