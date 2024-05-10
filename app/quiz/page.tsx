import React from "react"
import MultipleChoice from "@/components/Quiz/MultipleChoice"

const placeholderAnswers = [
  "anslankfds swer 1",
  "anssdflmksdf sdfkdk d kds wer 2",
  "answelksdvklnzlx ds faa sdf fsdsfsdfsf ds fr 3",
  "answer 4",
]
const placeholderQuestion =
  "Who is often credited with popularizing the Electronic Dance Music (EDM) genre in the early 2010s and is known for hits like 'Levels' and 'Wake Me Up'?"

export default function Quiz() {
  return (
    <div className="grid place-items-center gap-10">
      <h1>Quiz Page</h1>
      <MultipleChoice
        question={placeholderQuestion}
        answerOptions={placeholderAnswers}
      />
    </div>
  )
}
