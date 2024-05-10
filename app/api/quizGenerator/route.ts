import { z } from "zod"

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

interface QuizRequest {
  videoId: string
}

const VideoRequest = z.object({
  videoId: z.string(),
})

export default async function POST(request: Request) {
  console.log("quizGenerator::POST::request", request)

  const reqJson = await request.json()
  try {
    VideoRequest.parse(reqJson)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      })
    }
  }

  console.log("quizGenerator::POST::reqJson", reqJson)

  // const captions = await fetchCaptions(reqData.videoId)

  return Response.json({
    message: "Hello World",
    request: request,
    reqJson: reqJson,
  })
}
