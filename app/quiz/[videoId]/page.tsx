"use server";
import { fetchCaptions, fetchQuiz } from "@/app/api/handlers/handler";
import Quiz from "@/components/Quiz/Quiz";

import React from "react";

export default async function QuizPage({
  params,
}: {
  params: { videoId: string };
}) {
  const { captions } = await fetchCaptions(params.videoId);

  return (
    <div>
      <Quiz captions={captions} />
    </div>
  );
}
