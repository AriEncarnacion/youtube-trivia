import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const tokenRequest = z.object({
  cookieKey: z.string(),
});

export async function POST(request: Request) {
  const data = await request.json();

  try {
    tokenRequest.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      });
    }
  }

  const returnedValue = cookies().get(data.cookieKey);

  return NextResponse.json({ status: 200, returnedValue });
}
