"use client"

import { useState } from "react"
import { Check, ChevronDown, Lightbulb, X } from "lucide-react"
import type { MatchExplanation } from "@/lib/matcher"

export function HowWeGotHere({ explanation }: { explanation: MatchExplanation }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls="how-we-got-here-panel"
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Lightbulb className="h-4 w-4 text-muted-foreground/70 transition-colors group-hover:text-foreground" />
        {expanded ? "Hide reasoning" : "See why we recommended this"}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div
          id="how-we-got-here-panel"
          className="animate-quiz-pop mt-3 rounded-xl border border-border bg-secondary/70 p-6 md:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background border border-border">
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">How we got here</h3>
              <p className="text-xs text-muted-foreground">
                A plain-language look at the logic behind your matches.
              </p>
            </div>
          </div>

          {explanation.ruledOut.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                What we ruled out
              </p>
              <ul className="mt-2 space-y-2.5">
                {explanation.ruledOut.map((sentence) => (
                  <li key={sentence} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/5 border border-border">
                      <X className="h-3 w-3 text-muted-foreground" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{sentence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {explanation.prioritized.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                What we prioritized
              </p>
              <ul className="mt-2 space-y-2.5">
                {explanation.prioritized.map((sentence) => (
                  <li key={sentence} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background border border-border">
                      <Check className="h-3 w-3 text-foreground/70" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{sentence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {explanation.pointedTo && (
            <p className="mt-5 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium leading-relaxed text-foreground">
              {explanation.pointedTo}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
