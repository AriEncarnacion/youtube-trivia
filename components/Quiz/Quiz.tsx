import React from "react"
import MultipleChoice from "@/components/Quiz/MultipleChoice"
import FreeAnswer from "@/components/Quiz/FreeAnswer"
import EvaluationRSC from "./EvaluationRSC"

const MCOptions = ["Avicii", "Skrillex", "Tiesto", "Martin Garrix"]
const MCCorrect = "Avicii"
const MCQuestion =
  "Who is often credited with popularizing the Electronic Dance Music (EDM) genre in the early 2010s and is known for hits like 'Levels' and 'Wake Me Up'?"

const FAQuestion = "For what reason did EDM become popular in America?"
const FACorrect =
  "Because social media like YouTube and SoundCloud assisted in fuelling interest in electro house and Dubstep, popularizing Skrillex. EDM also became heavily influenced by live events."

//"https://www.youtube.com/watch?v=mG8UupGkbGo"

export default function Quiz({ quizContent }: any) {
  return (
    <>
      <div className="grid gap-10 border rounded-lg p-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Quiz Page
        </h1>

        <MultipleChoice
          question={MCQuestion}
          answerOptions={MCOptions}
          correctAnswer={MCCorrect}
        />
        <MultipleChoice
          question={MCQuestion}
          answerOptions={MCOptions}
          correctAnswer={MCCorrect}
        />

        <FreeAnswer question={FAQuestion} correctAnswer={FACorrect} />
        <FreeAnswer question={FAQuestion} correctAnswer={FACorrect} />
      </div>
    </>
  )
}
