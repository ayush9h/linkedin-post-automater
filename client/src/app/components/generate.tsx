'use client'
import { Wand2, CalendarClock } from "lucide-react"
import { useState } from "react"
import Markdown from "react-markdown"
import { useSession } from "next-auth/react"
import { toast,Toaster } from "sonner"

export default function Generate() {

  const {data:session} = useSession()

  const [query, setQuery] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
 

  const handleGeneration = async () => {
    try {
      const contentResponse = await fetch("/api/generate-content",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({query})
      })

      const data = await contentResponse.json()
      setContent(data.content)
      toast.success("Content Generated Successfully")
    } catch (error) {
        console.log(error)
        toast.error("Failed to generate content")
    }
  }

  const schedulePosts = async () => {
    try {
       await fetch("/api/schedule-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          accessToken: session?.accessToken,
        }),
      })
      toast.success("Post scheduled successfully.")
    } catch (err) {
      console.log(err)
      toast.error("Failed to schedule post")
    }
  }

  return (
    <>
      <Toaster position="top-center"/>
      <div className="max-w-5xl mx-auto relative mt-5 font-funnel">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter prompt"
          rows={4}
          className="w-full p-5 border border-zinc-300 rounded-xl resize-none font-funnel text-base"
        />

        <button
          disabled={!query}
          className={`absolute bottom-4 right-3 flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
            !query ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleGeneration}
        >
          <Wand2 size={16} className="mr-2" />
          Generate
        </button>

        <button
          onClick={schedulePosts}
          disabled={!content}
          className={`absolute bottom-4 right-36 flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 rounded-full transition-colors text-sm duration-200 ${
            !content ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <CalendarClock size={16} className="mr-2" />
          Schedule Post
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {(content || image) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {content && (
              <div className="flex flex-col h-full">
                <h4 className="text-md font-funnel font-semibold">Generated Content:</h4>
                <div className="mt-3 p-5 bg-zinc-100 rounded-xl font-funnel prose flex-1">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )}

            {image && (
              <div className="flex flex-col h-full">
                <h4 className="text-md font-funnel font-semibold">Generated Image:</h4>
                <div className="mt-3 flex-1">
                  <img
                    src={image}
                    alt="Generated Image"
                    className="w-full h-full object-cover rounded-xl shadow-md"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
