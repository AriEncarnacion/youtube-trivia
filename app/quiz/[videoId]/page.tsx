import Quiz from "@/components/Quiz/Quiz"
import React from "react"

async function getQuizContent(script: string): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quizGenerator`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ script: script }),
    },
  )

  return response.json()
}

async function fetchCaptions(videoId: string): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/captionScraper`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ videoId: videoId }),
    },
  )

  return response.json()
}

export default async function QuizPage({
  params,
}: {
  params: { videoId: string }
}) {
  const { script } = await fetchCaptions(params.videoId)
  const { stream } = await getQuizContent(script)

  return (
    <Quiz
      multipleChoiceQuestions={quizContent.multipleChoiceQuestions}
      freeAnswerQuestions={quizContent.freeAnswerQuestions}
    />
  )
}
