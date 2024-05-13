import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const addScriptRequest = z.object({
  uniqueId: z.string().uuid(),
  userKey: z.string(),
  questions: z.any(),
});

export async function POST(request: Request) {
  const data = await request.json();

  try {
    addScriptRequest.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      });
    }
  }

  try {
    await sql`INSERT INTO quizzes (uniqueId, userKey, questions) VALUES (${data.uniqueId}, ${data.userKey}, ${data.questions});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const res: any = NextResponse.json({ status: 200 });

  return res;
}

export const OPTIONS = async (request: Request) => {
  return new NextResponse("", {
    status: 200,
  });
};
