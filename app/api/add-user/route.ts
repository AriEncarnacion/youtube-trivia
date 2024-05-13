import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import { z } from "zod"

const addScriptRequest = z.object({
  userKey: z.string(),
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
    await sql`INSERT INTO users (userKey) VALUES (${data.userKey});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  const users = await sql`SELECT * FROM users;`
  return NextResponse.json({ users }, { status: 200 })
}

export const OPTIONS = async (request: Request) => {
  return new NextResponse("", {
    status: 200,
  })
}