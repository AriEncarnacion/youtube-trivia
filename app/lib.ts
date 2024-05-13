import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const sessionQuizId = request.cookies.get("sessionQuizId")?.value;
  console.log("sessionQuizId::lib::", sessionQuizId);
  if (!sessionQuizId) return;

  const res = NextResponse.next();
  res.cookies.set({
    name: "sessionQuizId",
    value: sessionQuizId,
    httpOnly: false,
  });
}
