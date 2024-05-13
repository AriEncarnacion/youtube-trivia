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
  const result = await postMethod("/api/get-script", {
    sessionQuizId: params.sessionQuizId,
  })
  // const { rows } = await result.json()
  // console.log("QuizPage json:", rows)

  // return <QuizContent sessionQuizId={sessionQuizId} script={"asd"} />
  return (
    <>
      <pre></pre>
    </>
  )
}
