import { quizSystemContent } from "@/ai/systemConfig/quizConfig";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI();

const ScriptRequest = z.object({
  captions: z.string(),
});

export async function POST(request: Request) {
  const data = await request.json();

  try {
    ScriptRequest.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({
        error: err.errors,
      });
    }
  }

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    stream: true,
    messages: [
      {
        role: "system",
        content: quizSystemContent,
      },
      { role: "user", content: data.captions },
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
  });
  let chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk.choices[0]?.delta?.content || "");
  }
  return Response.json({
    data: chunks,
  });
}
