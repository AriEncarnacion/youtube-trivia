import VideoLinkForm from "@/components/VideoLinkForm"
import Image from "next/image"
import SkeletonQuiz from "@/components/Quiz/SkeletonQuiz"
import { BookOpenCheck, Youtube } from "lucide-react"

export default function Home() {
  return (
    <div className="grid place-items-center text-slate-900 dark:text-slate-200">
      <h1 className="flex scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Youtube <Youtube /> Trivia <BookOpenCheck />
      </h1>
      <div className="flex space-x-10  mb-10"></div>

      <VideoLinkForm />
    </div>
  )
}
