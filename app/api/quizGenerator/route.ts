import { z } from "zod"

interface QuizRequest {
  videoId: string
}

interface CaptionsResponse {
  script: string
}

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

  

  return Response.json({
    script: script,
  })
}
