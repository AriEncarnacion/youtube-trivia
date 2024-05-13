"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  evaluationSchemaType,
} from "@/app/quiz/[sessionQuizId]/quizSchema";
import { generateEvaluation } from "@/app/quiz/[sessionQuizId]/actions";
import { buildEvaluationPrompt } from "@/ai/systemConfig/quizConfig";

interface EvaluationProps {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

interface cardStyle {
  cardStyle: string;
  textStyle: string;
  separatorStyle: string;
}

export default function Evaluation({
  question,
  userAnswer,
  correctAnswer,
}: EvaluationProps) {
  // const [score, setScore] = React.useState();
  // const { data, error, isLoading } = useSWR(
  //   { url: "/api/quizExaminer", args: { question, userAnswer, correctAnswer } },
  //   postFetcher,
  // );

  // React.useEffect(() => {
  //   if (!isLoading) setScore(data.response.evaluation.score);
  // }, [data]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [generation, setGeneration] = React.useState<evaluationSchemaType>();

  async function getGeneratedEvaluation() {
    const { evaluation } = await generateEvaluation(
      buildEvaluationPrompt(question, userAnswer, correctAnswer),
    );
    setGeneration(evaluation);
  }

  React.useEffect(() => {
    setIsLoading(true);
    getGeneratedEvaluation().then(() => setIsLoading(false));
  }, [userAnswer]); //I know i'm not supposed to do this lol

  const getCardStyle = (): cardStyle => {
    if (!generation || isLoading)
      return { cardStyle: "", textStyle: "", separatorStyle: "" };

    if (generation.evaluation.score <= 50)
      return {
        cardStyle:
          "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-900",
        textStyle: "text-red-800 dark:text-red-400",
        separatorStyle: "bg-red-300 dark:bg-red-900",
      };
    else if (
      generation.evaluation.score > 50 &&
      generation.evaluation.score < 76
    )
      return {
        cardStyle:
          "bg-amber-50 border-amber-300 dark:bg-yellow-950 dark:border-amber-900",
        textStyle: "text-amber-900 dark:text-amber-400",
        separatorStyle: "bg-amber-300 dark:bg-amber-900",
      };
    else
      return {
        cardStyle:
          "bg-green-50 border-green-500 dark:bg-green-950 dark:border-green-900",
        textStyle: "text-green-800 dark:text-green-400",
        separatorStyle: "bg-green-500 dark:bg-green-900",
      };
  };

  return (
    <>
      {!isLoading ? (
        <Card className={`w-9/12 ${getCardStyle().cardStyle}`}>
          <CardHeader>
            <CardTitle className={getCardStyle().textStyle}>
              {!isLoading && generation && (
                <h4>Score: {generation.evaluation.score}</h4>
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

              <Separator className={getCardStyle().separatorStyle} />
              <div>
                {!isLoading && generation && (
                  <p>{generation.evaluation.reasoning}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-9/12 bg-slate-100 dark:bg-slate-950 dark:border-slate-900">
          <CardHeader>
            <h4 className="animate-pulse text-slate-500 dark:text-slate-700">
              Grading...
            </h4>
          </CardHeader>
        </Card>
      )}
    </>
  );
}
