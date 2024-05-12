import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const tokenRequest = z.object({
  cookieKey: z.string(),
  cookieValue: z.string(),
})

export async function POST(request: Request) {
  const data = await request.json()
  const cookieStore = cookies()

  try {
    tokenRequest.parse(data)
    cookieStore.set(data.cookieKey, data.cookieValue)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      })
    }
  }

  return NextResponse.json({ status: 200 })
}
