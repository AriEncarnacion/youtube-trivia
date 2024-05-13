"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import Evaluation from "./Evaluation"
import { useState } from "react"

interface FreeAnswerProps {
  question: string
  correctAnswer: string
}

const FormSchema = z.object({
  userAnswer: z.string(),
})

export default function FreeAnswer({
  question,
  correctAnswer,
}: FreeAnswerProps) {
  const [submittedAnswer, setSubmittedAnswer] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmittedAnswer(data.userAnswer)
    setIsSubmitted(true)
  }

  return (
    <div className="grid gap-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="userAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your answer here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"

          >
            Submit
          </Button>
        </form>
      </Form>

      {isSubmitted && (
        <Evaluation
          question={question}
          userAnswer={submittedAnswer}
          correctAnswer={correctAnswer}
        />
      )}
    </div>
  )
}
