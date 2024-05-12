"use server"

import { streamObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { createStreamableValue } from "ai/rsc"
import { z } from "zod"
import { quizSystemContent } from "@/ai/systemConfig/quizConfig"

export async function generate(scriptInput: string) {
  "use server"

  const stream = createStreamableValue()

  ;(async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4-turbo"),
      system: quizSystemContent,
      prompt: scriptInput,
      schema: z.object({
        quiz: z.object({
          multipleChoiceQuestions: z.array(
            z.object({
              question: z
                .string()
                .describe("The prompt for this multiple choice question."),
              choices: z
                .string()
                .describe(
                  "4 possible answers (a-d) for this single multiple choice question. Exactly 1 answer must be correct. The choice should have the letter of the question preceeding it, for example: 'a) option here.'",
                ),
              correctChoice: z
                .string()
                .describe(
                  "The letter and text of the correct answer for this question. Exactly one answer should be listed here. The choice should have the letter of the question preceeding it, for example: 'a) option here.'",
                ),
              correctChoiceLetter: z
                .string()
                .describe(
                  "The letter of the correct answer for this question. Exactly one answer should be listed here. The only possibilities for this field are a, b, c, or d.",
                ),
            }),
          ),
          freeAnswerQuestions: z.array(
            z.object({
              question: z
                .string()
                .describe("The prompt for this free answer question."),
              answer: z
                .string()
                .describe("The correct answer for this question."),
            }),
          ),
        }),
      }),
    })

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject)
    }

    stream.done()
  })()

  return { object: stream.value }
}


