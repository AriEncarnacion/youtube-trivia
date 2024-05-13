"use client";
import React from "react";
import MultipleChoice from "@/components/Quiz/MultipleChoice";
import FreeAnswer from "@/components/Quiz/FreeAnswer";
import { Separator } from "../ui/separator";

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

export default function Quiz({
  freeAnswerQuestions,
  multipleChoiceQuestions,
}: QuizQuestions) {
  return (
    <div
      className="
        grid 
        gap-8 
        bg-slate-100 
        dark:bg-slate-900 
        border 
        border-2 
        border-slate-300 
        dark:border-slate-800 
        rounded-lg 
        p-10 
        lg:p-20 
        text-slate-900 
        dark:text-slate-200 
        w-11/12"
    >
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        Quiz
      </h1>
      {multipleChoiceQuestions.map((question: MultipleChoiceQuestion, idx) => (
        <div key={`mc-question-component-container-${question}-${idx}`}>
          <MultipleChoice
            key={`mc-question-${question}-${idx}`}
            question={question.question}
            answerOptions={question.choices}
            correctAnswer={question.correctChoice}
          />
          <Separator
            className="mt-7"
            key={`mc-question-separator-${question}-${idx}`}
          />
        </div>
      ))}
      {freeAnswerQuestions.map((question: FreeAnswerQuestion, idx) => (
        <div key={`fa-question-container-${question}-${idx}`}>
          <FreeAnswer
            key={`fa-question-${question}-${idx}`}
            question={question.question}
            correctAnswer={question.answer}
          />
          {idx !== freeAnswerQuestions.length - 1 && (
            <Separator
              className="mt-7"
              key={`fa-question-separator-${question}-${idx}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
