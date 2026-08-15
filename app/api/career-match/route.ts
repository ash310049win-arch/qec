import { NextRequest, NextResponse } from "next/server"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { countEligible, matchStudent, buildMatchExplanation, type MatchAnswers, type University } from "@/lib/matcher"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

let databaseCache: University[] | null = null

function loadDatabase(): University[] {
  if (databaseCache) return databaseCache
  const raw = readFileSync(
    join(process.cwd(), "dataset", "universities.compiled.json"),
    "utf8"
  )
  databaseCache = JSON.parse(raw) as University[]
  return databaseCache
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const answers = body.answers as MatchAnswers
    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Missing answers payload." }, { status: 400 })
    }
    const database = loadDatabase()
    const results = matchStudent(answers, database)
    const eligible = countEligible(answers, database)
    const explanation = buildMatchExplanation(answers, database, results)
    return NextResponse.json({ results, eligible, total: database.length, explanation })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    )
  }
}
