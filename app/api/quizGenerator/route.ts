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
    tool_choice: "required",
    tools: [
      {
        type: "function",
        function: {
          name: "generator_dummmy_func",
          parameters: {
            type: "object",
            properties: {
              multipleChoiceQuestions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: {
                      type: "string",
                      description:
                        "The prompt for this multiple choice question.",
                    },
                    choices: {
                      type: "array",
                      items: {
                        type: "string",
                        description:
                          "4 possible answers (a-d) for this single multiple choice question. Exactly 1 answer must be correct. The choice should have the letter of the question preceeding it, for example: 'a) option here.'",
                      },
                    },
                    correctChoice: {
                      type: "string",
                      description:
                        "The letter and text of the correct answer for this question. Exactly one answer should be listed here. The choice should have the letter of the question preceeding it, for example: 'a) option here.'",
                    },
                    correctChoiceLetter: {
                      type: "string",
                      description:
                        "The letter of the correct answer for this question. Exactly one answer should be listed here. The only possibilities for this field are a, b, c, or d.",
                    },
                  },
                },
              },
              freeAnswerQuestions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: {
                      type: "string",
                      description: "The prompt for this free answer question.",
                    },
                    answer: {
                      type: "string",
                      description: "The correct answer for this question.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  })

  console.log(
    "quizGenerator::entrypoint::fetchQuizContent()::completion",
    completion,
  )
  console.log(
    "quizGenerator::entrypoint::fetchQuizContent()::returnValue:",
    completion.choices[0].message.tool_calls?.[0].function.arguments,
  )

  return completion.choices[0].message.tool_calls?.[0].function.arguments
}

export async function POST(request: Request) {
  const data = await request.json()
  console.log("quizGenerator::entrypoint::request", data)

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

  console.log("quizGenerator::entrypoint::script (post fetchCaptions):", script)

  const completion: string | undefined = await fetchQuizContent(script)

  console.log("quizGenerator::entrypoint::completion (post openAI)", completion)

  if (!completion) {
    console.log(
      "quizGenerator::entrypoint::return_FAILURE::completion (in validation)",
      completion,
    )
    return Response.json({
      code: 500,
      error: "Error parsing JSON from OpenAI.",
    })
  } else {
    console.log(
      "quizGenerator::entrypoint::return_success::completion (in validation)",
      completion,
    )
    return Response.json({
      quizContent: JSON.parse(completion),
    })
  }
}

// export const runtime = "edge"
