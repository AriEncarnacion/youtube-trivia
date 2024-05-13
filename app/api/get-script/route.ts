import { sql } from "@vercel/postgres"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const getScriptRequest = z.object({
  sessionQuizId: z.string().uuid(),
})

export async function GET(request: Request) {
  console.log("get-script request:", request)
  const data = await request.json()

  try {
    getScriptRequest.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      })
    }
  }

  const query = `SELECT FROM scripts WHERE quizId = '${data.sessionQuizId}';`
  console.log("get-script query:", query)

  try {
    const result =
      await sql`SELECT FROM scripts WHERE quizId = '${data.sessionQuizId}';`
    console.log("get-script result:", result)
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { body: `${error} ::: KIIUHASDIUHAAAAAAAAAAAAAA` },
      { status: 500 },
    )
  }
}
