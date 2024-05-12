import VideoLinkForm from "@/components/VideoLinkForm"
import Image from "next/image"

export default function Home() {
  //TODO: add userkey to db and grab for session

  return (
    <div className="grid place-items-center gap-10">
      <div className="">
        <h1 className="text-4xl">YouTube Trivia</h1>
      </div>

      <VideoLinkForm />
    </div>
  )
}
