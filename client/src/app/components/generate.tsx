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
      
      toast.info("Content generation started")
      const contentResponse = await fetch("/api/generate-content",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({query})
      })

      const data = await contentResponse.json()
      setContent(data.content)
      toast.success("Content Generated Successfully")

      toast.info("Image Generation started")
      const imageResponse = await fetch("/api/generate-image",{
        method:"POST",
        body:JSON.stringify({query})
      })

      const imageUrl = URL.createObjectURL(await imageResponse.blob())
      setImage(imageUrl)
      toast.success("Image Generated Successfully")

    } catch (error) {
        console.log(error)
        toast.error("Failed to generate content and image")
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
      <Toaster position="bottom-center" expand={true}/>
      <div className="max-w-5xl mx-auto mt-10 font-funnel">
         <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter prompt"
              rows={5}
              className="w-full p-5 border border-zinc-300 rounded-xl resize-none font-funnel text-base pr-36"/>

            <div className="absolute bottom-4 right-3 flex gap-2">
              <button
                disabled={!query}
                className={`flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  !query ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
                onClick={handleGeneration}
              >
                <Wand2 size={16} className="mr-2" />
                Generate
              </button>

              <button
                onClick={schedulePosts}
                disabled={!content || !image}
                className={`flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  !content ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
              >
                <CalendarClock size={16} className="mr-2" />
                Schedule Post
              </button>
            </div>
          </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {(content || image) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {content && (
              <div className="flex flex-col h-full">
                <h4 className="text-md font-funnel font-semibold">Generated Content:</h4>
                <div className="mt-3 p-5 bg-zinc-100 border border-zinc-300 rounded-xl font-funnel prose flex-1">
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
                    className="w-full h-full object-cover rounded-xl"
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
