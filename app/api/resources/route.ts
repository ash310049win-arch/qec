import { NextResponse } from "next/server"
import { getSectionResults, newsSections } from "@/lib/newsdata"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  const results = await Promise.all(
    newsSections.map((section) => getSectionResults(section.id))
  )

  const configured = Boolean(process.env.NEWSDATA_API_KEY?.trim())

  return NextResponse.json(
    {
      sections: newsSections.map((section, index) => ({
        id: section.id,
        label: section.label,
        articles: results[index].articles,
        error: results[index].error ?? null,
      })),
      fetchedAt: new Date().toISOString(),
      warning: configured
        ? null
        : "News feed not configured. Set the NEWSDATA_API_KEY environment variable.",
    },
    { headers: { "Cache-Control": "no-store" } }
  )
}
