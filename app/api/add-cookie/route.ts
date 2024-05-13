import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const tokenRequest = z.object({
  cookieKey: z.string(),
  cookieValue: z.string(),
});

export async function POST(request: Request) {
  const data = await request.json();
  const cookieStore = cookies();

  try {
    tokenRequest.parse(data);
    cookieStore.set(data.cookieKey, data.cookieValue, { httpOnly: false });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      });
    }
  }

  const res: any = NextResponse.json(
    { message: "Cookie added" },
    { status: 200 },
  );
  res.cookies.set({
    name: data.cookieKey,
    value: data.cookieValue,
    options: {
      httpOnly: false,
    },
  });
  return res;
}
