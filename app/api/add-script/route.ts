import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import { z } from "zod"

const addScriptRequest = z.object({
  quizId: z.string().uuid(),
  userKey: z.string(),
  script: z.string(),
})

export async function POST(request: Request) {
  const data = await request.json()

  try {
    addScriptRequest.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      })
    }
  }

  try {
    await sql`INSERT INTO scripts (quizId, userKey, script) VALUES (${data.quizId}, ${data.userKey}, ${data.script});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  const scripts = await sql`SELECT * FROM scripts;`
  return NextResponse.json({ scripts }, { status: 200 })
}
