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

  try {
    const script =
      await sql`SELECT * FROM scripts WHERE quizId=${data.sessionQuizId};`
    const res = NextResponse.json({ script }, { status: 200 })
    res.headers.set("Access-Control-Allow-Origin", "*")
    return res
  } catch (error) {
    const res: any = NextResponse.json(
      { body: `${error}::Internal DB Error` },
      { status: 500 },
    )
    return res
  }
}

export const OPTIONS = async (request: Request) => {
  return new NextResponse("", {
    status: 200,
  })
}