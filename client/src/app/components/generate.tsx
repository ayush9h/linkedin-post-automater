'use client'
import { Wand2, CalendarClock } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import Markdown from "react-markdown"
import { useSession } from "next-auth/react"
export default function Generate() {

  const {data:session} = useSession()

  const [query, setQuery] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
 

  const handleGeneration = async () => {
    try {
      const contentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/generate-content`,
        { query }
      )
      setContent(contentResponse.data.content)
    } catch (error) {
      console.log(error)
    }
  }

  const schedulePosts = async () => {
    try {
      

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post-linkedin`, {
        generated_content: content,
        delay: 0,
        access_token: session?.accessToken
      })

      alert("Post scheduled successfully")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
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
