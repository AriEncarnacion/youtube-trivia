"use client";
import React from "react";
import { generate } from "../actions";
import { readStreamableValue } from "ai/rsc";
import { Button } from "@/components/ui/button";

interface QuizContentProps {
  captions: string;
}

export default function QuizContent({ captions }: QuizContentProps) {
  const [generation, setGeneration] = React.useState<string>("");

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
  
  },[])

  // return (
  //   <>
  //     <p>{generation}</p>
  //   </>
  // );
  return (
    <>
      {/* <Button
        onClick={async () => {
          const { object } = await generate(captions);

          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
              setGeneration(JSON.stringify(partialObject.quiz, null, 2));
            }
          }
        }}
      ></Button> */}

      <p>{generation}</p>
    </>
  );
  // TODO: Add back in.
  // <Quiz
  //   multipleChoiceQuestions={quizContent.multipleChoiceQuestions}
  //   freeAnswerQuestions={quizContent.freeAnswerQuestions}
  // />
  // );
}
