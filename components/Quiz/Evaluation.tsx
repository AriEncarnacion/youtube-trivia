import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface EvaluationProps {
  score: number
  userAnswer: string
  correctAnswer: string
  evaluationReason: string
}

const Evaluation: React.FC<EvaluationProps> = ({
  score,
  userAnswer,
  correctAnswer,
  evaluationReason,
}: EvaluationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Score: {score}</CardTitle>
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
            <p>{evaluationReason}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Evaluation
