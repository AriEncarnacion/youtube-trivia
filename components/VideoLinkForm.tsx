"use client"
import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { postMethod } from "@/app/api/utils"
import { v4 as uuidv4 } from "uuid"

const formSchema = z.object({
  videoLink: z.string(),
})

const VideoLinkForm: React.FC = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoLink: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //TODO: validation/formatting for you.tube and m.youtube links
    const url = new URL(values.videoLink)
    const videoId = url.searchParams.get("v")
    if (!videoId) {
      return alert("Invalid YouTube link!")
    } else {
      const sessionQuizKey = uuidv4().toString()

      postMethod("/api/add-cookie", {
        cookieKey: "sessionQuizId",
        cookieValue: sessionQuizKey,
      })
        .then(() => {
          return postMethod("/api/add-quiz", {
            uniqueId: sessionQuizKey,
            // TODO: use actual user key from cookies
            userKey: "ari",
          })
        })
        .then(() => {
          return postMethod("/api/captionScraper", { videoId })
        })
        .then((captionsResponse) => {
          // TODO: use actual user key from cookies
          return postMethod("/api/add-script", {
            quizId: sessionQuizKey,
            userKey: "ari",
            script: captionsResponse.script,
          })
        })
        .then(() => {
          router.push("/quiz")
          console.log("done")
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="videoLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube Video Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Must be in youtube.com format, not youtu.be
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default VideoLinkForm
