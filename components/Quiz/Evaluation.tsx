"use client"
import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useSWR from "swr"
import { quizFetcher } from "./api/quizHandler"

interface EvaluationProps {
  question: string
  userAnswer: string
  correctAnswer: string
}

export default function Evaluation({
  question,
  userAnswer,
  correctAnswer,
}: EvaluationProps) {
  const { data, error, isLoading } = useSWR(
    { url: "/api/quizExaminer", args: { question, userAnswer, correctAnswer } },
    quizFetcher,
  )

  return (
    <Card>
      <CardHeader>
        {/* TODO: spice up by giving score colors based on score */}
        <CardTitle>
          Score:{" "}
          {isLoading ? (
            <h4>Loading...</h4>
          ) : (
            <>{data.response.evaluation.score}</>
          )}
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

          <Separator />
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
  )
}
