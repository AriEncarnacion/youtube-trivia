import OpenAI from "openai"
import { z } from "zod"
import { buildEvalSystemContent } from "@/ai/systemConfig/quizConfig"

const openai = new OpenAI()

const EvaluationRequest = z.object({
  question: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
})

async function getEvaluation(modelSystemContent: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content: modelSystemContent,
      },
    ],
    tool_choice: "required",
    tools: [
      {
        type: "function",
        function: {
          name: "eval_dummy_func",
          parameters: {
            type: "object",
            properties: {
              evaluation: {
                type: "object",
                properties: {
                  score: {
                    type: "number",
                    description: "The score of the evaluation, between 0-100.",
                  },
                  reasoning: {
                    type: "string",
                    description: "The reasoning behind the evaluation.",
                  },
                },
              },
            },
          },
        },
      },
    ],
  })

  return completion.choices[0].message.tool_calls?.[0].function.arguments
}

export async function POST(request: Request) {
  const data = await request.json()

  try {
    EvaluationRequest.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      })
    }
  }

  const modelSystemContent = buildEvalSystemContent(
    data.question,
    data.userAnswer,
    data.correctAnswer,
  )

  const completion: string | undefined = await getEvaluation(modelSystemContent)

  let response = {}
  try {
    response = JSON.parse(completion as string)
  } catch (err) {
    return Response.json({
      error: err,
    })
  }

  return Response.json({
    response,
  })
}
