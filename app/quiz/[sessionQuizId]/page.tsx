"use server"
import React from "react"
import QuizContent from "./quizContent/page"
import { cookies } from "next/headers"
import { FileJson } from "lucide-react"
import { getMethod, postMethod } from "../../api/utils"

export default async function QuizPage({
  params,
}: {
  params: { sessionQuizId: string }
}) {
  const { script } = await postMethod("/api/get-script", {
    sessionQuizId: params.sessionQuizId,
  })
  const captions = script.rows[0].script
  console.log("get-script result::", captions)

  // return <QuizContent sessionQuizId={sessionQuizId} script={"asd"} />
  return (
    <>
      <p>{captions}</p>
    </>
  )
}
