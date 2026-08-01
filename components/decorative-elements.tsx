/**
 * Reusable decorative elements: floating shapes, organic blobs, and section accents.
 * Keep opacity low (5-15%) for a premium, non-distracting feel.
 */

export function FloatingDots({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute animate-float-gentle ${className}`}
      aria-hidden="true"
    >
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary"
            style={{ opacity: 0.12 }}
          />
        ))}
      </div>
    </div>
  )
}

export function FloatingTriangle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute animate-float-slow ${className}`}
      aria-hidden="true"
      style={{ opacity: 0.08 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 20H2L12 2Z" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      </svg>
    </div>
  )
}

export function FloatingCircle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute animate-breathe ${className}`}
      aria-hidden="true"
      style={{ opacity: 0.06 }}
    >
      <div className="h-32 w-32 rounded-full border-2 border-primary" />
    </div>
  )
}

export function FloatingLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute animate-drift-x ${className}`}
      aria-hidden="true"
      style={{ opacity: 0.1 }}
    >
      <div className="h-0.5 w-16 rounded-full bg-primary" />
    </div>
  )
}

export function OrganicBlob({
  className = "",
  size = "md",
  color = "red",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: "red" | "gray"
}) {
  const sizeClasses = {
    sm: "h-40 w-40",
    md: "h-64 w-64",
    lg: "h-96 w-96",
  }

  const bgColor = color === "red" ? "rgba(224, 36, 36, 0.06)" : "rgba(0, 0, 0, 0.04)"

  return (
    <div
      className={`pointer-events-none absolute rounded-full animate-breathe-slow ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
      style={{
        background: bgColor,
        filter: "blur(40px)",
      }}
    />
  )
}
