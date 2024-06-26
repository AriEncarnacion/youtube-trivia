"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { postMethod } from "@/app/api/utils";
import { v4 as uuidv4 } from "uuid";
import SkeletonQuiz from "./Quiz/SkeletonQuiz";

const formSchema = z.object({
  videoLink: z.string().url("Please enter a valid URL"),
});

const VideoLinkForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const router = useRouter();
  const quizId = uuidv4().toString();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //TODO: validation/formatting for you.tube and m.youtube links
    setIsSubmitted(true);

    const url = new URL(values.videoLink);
    const videoId = url.searchParams.get("v");
    if (!videoId) {
      return alert("Invalid YouTube link!");
    } else {
      postMethod("/api/add-quiz", {
        uniqueId: quizId,
        // TODO: implement user key and use actual user key from session
        userKey: "ari",
      })
        .then(() => {
          return postMethod("/api/captionScraper", { videoId });
        })
        .then((captionsResponse) => {
          return postMethod("/api/add-script", {
            quizId: quizId,
            userKey: "ari",
            script: captionsResponse.script,
          });
        })
        .then(() => {
          router.push(`/quiz/${quizId}`);
        });
    }
  }

  return (
    <>
      {isSubmitted ? (
        <SkeletonQuiz />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="videoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submit your video link here!</FormLabel>
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
            <Button
              type="submit"
              // className="bg-slate-900 dark:text-slate-50 dark:bg-blue-900"
            >
              Submit
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default VideoLinkForm;
