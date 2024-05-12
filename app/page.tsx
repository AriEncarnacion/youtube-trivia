"use client"

import { useChat } from "ai/react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}

// import VideoLinkForm from "@/components/VideoLinkForm"
// import Image from "next/image"

// export default function Home() {
//   return (
//     <div className="grid place-items-center gap-10">
//       <div className="">
//         <h1 className="text-4xl">YouTube Trivia</h1>
//       </div>

//       <VideoLinkForm />
//     </div>
//   )
// }
