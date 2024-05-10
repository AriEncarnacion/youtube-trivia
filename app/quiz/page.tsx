import React from "react"
import MultipleChoice from "@/components/Quiz/MultipleChoice"

const placeholderAnswers = ["answer 1", "answer 2", "answer 3", "answer 4"]

export default function Quiz() {
  return (
    <div className="grid place-items-center gap-10">
      <h1>Quiz Page</h1>
      <MultipleChoice
        question="placeholder question"
        answerOptions={placeholderAnswers}
      />
    </div>
  )
}
