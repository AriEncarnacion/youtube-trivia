import { z } from "zod";

export const quizSchema = z.object({
  quiz: z.object({
    multipleChoiceQuestions: z.array(
      z.object({
        question: z
          .string()
          .describe("The prompt for this multiple choice question."),
        choices: z
          .array(z.string())
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
        answer: z.string().describe("The correct answer for this question."),
      }),
    ),
  }),
});

export type quizSchemaType = z.infer<typeof quizSchema>;

export const evaluationSchema = z.object({
  evaluation: z.object({
    score: z.number().describe("The score of the evaluation, between 0-100."),
    reasoning: z.string().describe("The reasoning behind the evaluation."),
  }),
});

export type evaluationSchemaType = z.infer<typeof evaluationSchema>;
