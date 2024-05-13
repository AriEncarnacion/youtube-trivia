"use server";
import React from "react";
import QuizContent from "./quizContent/page";
import { postMethod } from "../../api/utils";

export default async function QuizPage({
  params,
}: {
  params: { sessionQuizId: string };
}) {
  const { script } = await postMethod("/api/get-script", {
    sessionQuizId: params.sessionQuizId,
  });
  const captions = script.rows[0].script;

  return (
    <>
      <QuizContent captions={captions} />
    </>
  );
}
