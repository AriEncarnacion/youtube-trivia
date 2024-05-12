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
import fetchCaptions from "@/app/api/handlers/handler";

const formSchema = z.object({
  videoLink: z.string(),
});

export default function VideoLinkForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //TODO: validation/formatting for you.tube and m.youtube links
    const url = new URL(values.videoLink);
    const videoId = url.searchParams.get("v");

    if (!videoId) {
      console.log("Invalid video link");
    } else {
      fetchCaptions(videoId).then(() => {
        router.push(`/quiz/${videoId}`);
      });
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
  );
}
