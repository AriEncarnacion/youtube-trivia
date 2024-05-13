"use client"
import Quiz from "@/components/Quiz/Quiz"
import React from "react"
import { generate } from "../actions"
import { readStreamableValue } from "ai/rsc"
import useSWR from "swr"
import { postFetcher } from "../../../api/utils"

interface QuizContentProps {
  sessionQuizId: string
}

export default function QuizContent({ sessionQuizId }: QuizContentProps) {
  const [generation, setGeneration] = React.useState<string>("")

  async function streamData() {
    const { object } = await generate("Asd") //TODO: replace me

    for await (const partialObject of readStreamableValue(object)) {
      if (partialObject) {
        setGeneration(JSON.stringify(partialObject.notifications, null, 2))
      }
    }
  }

  React.useEffect(() => {
    streamData()
  }, [])

  return (
    <>
      <pre>{generation}</pre>
    </>
    // <Quiz
    //   multipleChoiceQuestions={quizContent.multipleChoiceQuestions}
    //   freeAnswerQuestions={quizContent.freeAnswerQuestions}
    // />
  )
}
