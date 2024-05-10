import OpenAI from "openai"
import { z } from "zod"
import { evaluationSystemContent } from "@/ai/systemConfig/quizConfig"

const openai = new OpenAI()

const evaluationRequest = z.object({
  question: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
})

async function getEvaluation() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content: evaluationSystemContent,
      },
      {
        role: "user",
        content:
          "Question: What is the capital of France?\nUser Answer: Paris\nCorrect Answer: Paris",
      },
    ],
    response_format: { type: "json_object" },
  })
}

export async function POST(request: Request) {}
