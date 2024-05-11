import { z } from "zod"
import OpenAI from "openai"
import { quizSystemContent } from "@/ai/systemConfig/quizConfig"

const openai = new OpenAI()

const VideoRequest = z.object({
  videoId: z.string(),
})

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

async function fetchQuizContent(script: string): Promise<any> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content: quizSystemContent,
      },
      { role: "user", content: script },
    ],

    response_format: { type: "json_object" },
    logit_bias: {
      "5061": -100, // \t token
      "1734": -100, // \n token
    },
  })

  return { quizContent: completion.choices[0].message.content }
}

export async function POST(request: Request) {
  const data = await request.json()

  try {
    VideoRequest.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      })
    }
  }

  const { script } = await fetchCaptions(data.videoId)

  const { quizContent } = await fetchQuizContent(script)

  let quizContentJson = {}
  try {
    quizContentJson = JSON.parse(quizContent as string)
  } catch (err) {
    return Response.json({
      error: err,
    })
  }

  return Response.json({
    quizContent: quizContentJson,
  })
}
