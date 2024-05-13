"use client";
import React from "react";
import { generateQuiz } from "../actions";
import Quiz from "@/components/Quiz/Quiz";
import { quizSchemaType } from "../quizSchema";
import { set, z } from "zod";
import SkeletonQuiz from "@/components/Quiz/SkeletonQuiz";

interface QuizContentProps {
  captions: string;
}

export default function QuizContent({ captions }: QuizContentProps) {
  // Unfortunately with this streaming approach there's no easy way to "grab" the generation once the stream is complete.
  // Unsure if I'm using it wrong (which would be weird I referenced the docs exactly) or if it's just not possible yet.
  // This thread seems to imply a different hook is in development right now that lets you use the streamed vlaue once complete,
  // however no timeline on when it will be complete.
  // https://github.com/vercel/ai/discussions/1104
  /*  const [generation, setGeneration] = React.useState<string>("");

  async function streamData() {
    const { object } = await generate(
      "The sun and the moon are two opposites. One is hot and the other cold. Both are important for earth.",
    ); //TODO: replace me

    for await (const partialObject of readStreamableValue(object)) {
      if (partialObject) {
        setGeneration(JSON.stringify(partialObject.quiz, null, 2));
      }
    }
  }

  React.useEffect(() => {
    streamData();
  }, []);
  */

  const [generation, setGeneration] = React.useState<quizSchemaType>();

  async function getGeneratedQuiz() {
    const { quiz } = await generateQuiz(captions);
    setGeneration(quiz);
  }

  React.useEffect(() => {
    getGeneratedQuiz();
  }, []);

  return (
    <>
      {generation ? (
        <Quiz
          multipleChoiceQuestions={generation.quiz.multipleChoiceQuestions}
          freeAnswerQuestions={generation.quiz.freeAnswerQuestions}
        />
      ) : (
        <SkeletonQuiz />
      )}
    </>
  );
}
