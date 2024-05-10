import type { NextApiRequest, NextApiResponse } from "next"
import { getSubtitles } from "youtube-captions-scraper"

interface Caption {
  start: string
  dur: string
  text: string
}

async function fetchCaptions(videoId: string) {
  const captions = await getSubtitles({ videoID: videoId })
  return captions
}

function assembleScript(captions: Caption[]) {
  let script = ""

  captions.forEach((entry) => {
    script += `${entry.text} `
  })

  return script
}

export async function POST(request: Request) {
  const data = await request.json()

  const captions = await fetchCaptions(data.videoId)

  const script = assembleScript(captions)

  console.log(script)

  return Response.json({
    script,
  })
}
