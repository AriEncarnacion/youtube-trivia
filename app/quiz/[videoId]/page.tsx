import Quiz from "@/components/Quiz/Quiz"
import React from "react"

async function getQuizContent(videoId: string): Promise<any> {
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
  console.log("QuizPage::videoId", params.videoId)

  const quizContent = await getQuizContent(params.videoId)

  console.log("QuizPage::quizContent", quizContent)

  return <Quiz />
}
