import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import { z } from "zod"

const addScriptRequest = z.object({
  uniqueId: z.string().uuid(),
  userKey: z.string(),
  questions: z.any(),
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
    await sql`INSERT INTO quizzes (uniqueId, userKey, questions) VALUES (${data.uniqueId}, ${data.userKey}, ${data.questions});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  const quizzes = await sql`SELECT * FROM quizzes;`
  return NextResponse.json({ quizzes }, { status: 200 })
}
