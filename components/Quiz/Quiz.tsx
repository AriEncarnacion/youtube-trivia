"use client";
import React from "react";
import MultipleChoice from "@/components/Quiz/MultipleChoice";
import FreeAnswer from "@/components/Quiz/FreeAnswer";

interface MultipleChoiceQuestion {
  question: string;
  choices: string[];
  correctChoice: string;
  correctChoiceLetter: string;
}

interface FreeAnswerQuestion {
  question: string;
  answer: string;
}

interface QuizQuestions {
  freeAnswerQuestions: FreeAnswerQuestion[];
  multipleChoiceQuestions: MultipleChoiceQuestion[];
}

interface QuizProps {
  captions: string;
}

export default function Quiz({ captions }: QuizProps) {
  return (
    <div>
      <p>{captions}</p>
    </div>
  );
  // console.log(
  //   "QUIZ PAGE Quiz Component :: MC QUESTIONS",
  //   multipleChoiceQuestions,
  // );
  // console.log("QUIZ PAGE Quiz Component :: FA QUESTIONS", freeAnswerQuestions);

  // return (
  //   <div className="grid gap-10 border rounded-lg p-10">
  //     <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  //       Quiz Page
  //     </h1>
  //     {multipleChoiceQuestions.map((question: MultipleChoiceQuestion, idx) => (
  //       <MultipleChoice
  //         key={`mc-question-component-${question}-${idx}`}
  //         question={question.question}
  //         answerOptions={question.choices}
  //         correctAnswer={question.correctChoice}
  //       />
  //     ))}
  //     {freeAnswerQuestions.map((question: FreeAnswerQuestion, idx) => (
  //       <FreeAnswer
  //         key={`fa-question-component-${question}-${idx}`}
  //         question={question.question}
  //         correctAnswer={question.answer}
  //       />
  //     ))}
  //   </div>
  // );
}
