import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import { z } from "zod"

const getScriptRequest = z.object({
  sessionQuizId: z.string().uuid(),
})

export async function POST(request: Request) {
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
  // const query = `SELECT * FROM scripts WHERE quizId='${"6567d3db-f2ec-4eba-9abd-426585f80626"}';`
  // console.log("get-script query:", query)
  try {
    const script =
      await sql`SELECT * FROM scripts WHERE quizId=${data.sessionQuizId};`
    console.log("script.rows::", script.rows)
    console.log("script.rowCount::", script.rowCount)
    console.log("script.fields::", script.fields)

    return NextResponse.json({ script }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { body: `${error}::Internal DB Error` },
      { status: 500 },
    )
  }
}
