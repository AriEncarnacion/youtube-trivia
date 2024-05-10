"use client"
import React from "react"
import MultipleChoice from "@/components/Quiz/MultipleChoice"
import FreeAnswer from "@/components/Quiz/FreeAnswer"

interface QuizProps {
  // Define your props here
}

const placeholderMultipleChoiceAnswers = [
  "anslankfds swer 1",
  "anssdflmksdf sdfkdk d kds wer 2",
  "answelksdvklnzlx ds faa sdf fsdsfsdfsf ds fr 3",
  "answer 4",
]
const placeholderMultipleChoiceQuestion =
  "Who is often credited with popularizing the Electronic Dance Music (EDM) genre in the early 2010s and is known for hits like 'Levels' and 'Wake Me Up'?"

const placeholderFreeAnswerQuestion =
  "For what reason did EDM become popular in America?"

export default function Quiz() {
  // Add your component logic here

  return (
    <>
      <div className="grid gap-10 border rounded-lg p-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Quiz Page
        </h1>

        <MultipleChoice
          question={placeholderMultipleChoiceQuestion}
          answerOptions={placeholderMultipleChoiceAnswers}
        />

        <MultipleChoice
          question={placeholderMultipleChoiceQuestion}
          answerOptions={placeholderMultipleChoiceAnswers}
        />

        <FreeAnswer question={placeholderFreeAnswerQuestion} />
        <FreeAnswer question={placeholderFreeAnswerQuestion} />
      </div>
    </>
  )
}
