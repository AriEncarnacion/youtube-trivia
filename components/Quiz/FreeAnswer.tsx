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
}

const FormSchema = z.object({
  answer: z.string(),
})

export default function FreeAnswer({ question }: FreeAnswerProps) {
  const [submittedAnswer, setSubmittedAnswer] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2))
    setSubmittedAnswer(data.answer)
    setIsSubmitted(true)
  }

  return (
    <div className="grid gap-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="answer"
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {isSubmitted && (
        <Evaluation
          score={9999}
          userAnswer={submittedAnswer}
          correctAnswer={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
          evaluationReason={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec tortor lacinia, venenatis elit sed, feugiat tellus. Fusce vel lacinia nisl, quis tempus nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec convallis a nulla vitae vehicula. "
          }
        />
      )}
    </div>
  )
}
