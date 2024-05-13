"use client";
import React from "react";
import { generate } from "../actions";
import { readStreamableValue } from "ai/rsc";

interface QuizContentProps {
  captions: string;
}

export default function QuizContent({ captions }: QuizContentProps) {
  const [generation, setGeneration] = React.useState<string>("");
  // const

  async function streamData() {
    const { object } = await generate(captions); //TODO: replace me

    for await (const partialObject of readStreamableValue(object)) {
      if (partialObject) {
        setGeneration(JSON.stringify(partialObject.notifications, null, 2));
      }
    }
  }

  React.useEffect(() => {
    streamData();
  }, []);

  return (
    <>
      <pre>{generation}</pre>
    </>
    // <Quiz
    //   multipleChoiceQuestions={quizContent.multipleChoiceQuestions}
    //   freeAnswerQuestions={quizContent.freeAnswerQuestions}
    // />
  );
}
