"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useSWR from "swr"
import { postFetcher } from "@/app/api/utils"
import { Skeleton } from "../ui/skeleton"

interface EvaluationProps {
  question: string
  userAnswer: string
  correctAnswer: string
}

interface cardStyle {
  cardStyle: string
  textStyle: string
  separatorStyle: string
}

export default function Evaluation({
  question,
  userAnswer,
  correctAnswer,
}: EvaluationProps) {
  const [score, setScore] = React.useState()
  const { data, error, isLoading } = useSWR(
    { url: "/api/quizExaminer", args: { question, userAnswer, correctAnswer } },
    postFetcher,
  )

  useEffect(() => {
    if (!isLoading) setScore(data.response.evaluation.score)
  }, [data])

  const getCardStyle = (): cardStyle => {
    if (!score) return { cardStyle: "", textStyle: "", separatorStyle: "" }

    if (score <= 50)
      return {
        cardStyle:
          "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-900",
        textStyle: "text-red-800 dark:text-red-400",
        separatorStyle: "bg-red-300 dark:bg-red-900",
      }
    else if (score > 50 && score < 76)
      return {
        cardStyle:
          "bg-amber-50 border-amber-300 dark:bg-yellow-950 dark:border-amber-900",
        textStyle: "text-amber-900 dark:text-amber-400",
        separatorStyle: "bg-amber-300 dark:bg-amber-900",
      }
    else
      return {
        cardStyle:
          "bg-green-50 border-green-500 dark:bg-green-950 dark:border-green-900",
        textStyle: "text-green-800 dark:text-green-400",
        separatorStyle: "bg-green-500 dark:bg-green-900",
      }
  }

  return (
    <>
      {isLoading ? (
        <Card className="w-11/12 bg-slate-100">
          <CardHeader>
            <h4 className="animate-pulse">Grading...</h4>
          </CardHeader>
        </Card>
      ) : (
        <Card className={`w-11/12 ${getCardStyle().cardStyle}`}>
          <CardHeader>
            {/* TODO: spice up by giving score colors based on score */}
            <CardTitle className={getCardStyle().textStyle}>
              {!isLoading && <h4>Score: {data.response.evaluation.score}</h4>}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-y-3">
              <div className="grid grid-cols-subgrid gap-y-1">
                <h4>Correct answer</h4>
                <p>{correctAnswer}</p>
              </div>

              <div className="grid grid-cols-subgrid gap-y-1">
                <h4>Your answer</h4>
                <p>{userAnswer}</p>
              </div>

              <Separator className={getCardStyle().separatorStyle} />
              <div>
                <p>
                  {isLoading ? (
                    <h4>Loading...</h4>
                  ) : (
                    <>{data.response.evaluation.reasoning}</>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
