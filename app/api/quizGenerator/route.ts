import { z } from "zod"
import OpenAI from "openai"
import { quizSystemContent } from "@/ai/systemConfig/quizConfig"
import { unstable_noStore } from "next/cache"
import { OpenAIStream, StreamingTextResponse } from "ai"

const openai = new OpenAI()

const VideoRequest = z.object({
  videoId: z.string(),
})

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

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    stream: true,
    messages: [
      {
        role: "system",
        content: quizSystemContent,
      },
      { role: "user", content: data.script },
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

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}

// export async function POST(request: Request) {
//   unstable_noStore() //TODO: Remove for prod; doing to test timeout limits

//   const data = await request.json()
//   console.log("quizGenerator::entrypoint::request", data)

//   try {
//     VideoRequest.parse(data)
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return Response.json({
//         error: err.errors,
//       })
//     }
//   }

//   console.log("quizGenerator::entrypoint::script (post fetchCaptions):", script)

//   const completion: string | undefined = await fetchQuizContent(script)

//   console.log("quizGenerator::entrypoint::completion (post openAI)", completion)

//   if (!completion) {
//     console.log(
//       "quizGenerator::entrypoint::return_FAILURE::completion (in validation)",
//       completion,
//     )
//     return Response.json({
//       code: 500,
//       error: "Error parsing JSON from OpenAI.",
//     })
//   } else {
//     console.log(
//       "quizGenerator::entrypoint::return_success::completion (in validation)",
//       completion,
//     )
//     return Response.json({
//       quizContent: JSON.parse(completion),
//     })
//   }
// }

export const runtime = "edge"
