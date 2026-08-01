interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
  decorativeIcon?: "globe" | "cap" | "speech" | "checklist" | "book" | "star"
}

const decorativeIcons: Record<string, string> = {
  globe:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  cap: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
  speech:
    "M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
  checklist:
    "M22 2H2v20l4-4h16V2zM9 11H7V9h2v2zm0-3H7V6h2v2zm0 6H7v-2h2v2zm8-6h-6v2h6V8zm0 3h-6v2h6v-2z",
  book: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
  decorativeIcon,
}: SectionHeadingProps) {
  return (
    <div
      className={`relative ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {/* Decorative background icon */}
      {decorativeIcon && decorativeIcons[decorativeIcon] && (
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 animate-breathe-slow md:h-44 md:w-44"
          fill="currentColor"
          style={{ color: "rgba(224, 36, 36, 0.07)" }}
          aria-hidden="true"
        >
          <path d={decorativeIcons[decorativeIcon]} />
        </svg>
      )}

      <h2 className="relative font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="relative mt-3 text-muted-foreground leading-relaxed max-w-2xl text-pretty mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`relative mt-4 h-1 w-12 rounded-full bg-primary ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  )
}
