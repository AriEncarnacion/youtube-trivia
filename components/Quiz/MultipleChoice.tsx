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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useMemo } from "react"

interface MultipleChoiceProps {
  question: string
  answerOptions: string[]
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  answerOptions,
}) => {
  const FormSchema = useMemo(() => {
    return z.object({
      answer: z.string().refine((value) => answerOptions.includes(value), {
        message: "You need to select a valid option.",
      }),
    })
  }, [answerOptions])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel>{question}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {answerOptions.map((option, idx) => (
                    <FormItem
                      key={`formItem-${option}-${idx}`}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl key={`formControl-${option}-${idx}`}>
                        <RadioGroupItem
                          key={`radioGroupItem-${option}-${idx}`}
                          value={option}
                        />
                      </FormControl>
                      <FormLabel
                        key={`formLabel-${option}-${idx}`}
                        className="font-normal"
                      >
                        {option}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default MultipleChoice
