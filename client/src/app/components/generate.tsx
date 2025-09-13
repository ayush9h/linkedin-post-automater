'use client'
import { Wand2, CalendarClock } from "lucide-react"
import { useState } from "react"
import Markdown from "react-markdown"
import { useSession } from "next-auth/react"
import { toast, Toaster } from "sonner"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

export default function Generate() {
  const { data: session } = useSession()
  const [query, setQuery] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [open, setOpen] = useState(true)
  const [days, setDays] = useState(1)

  const handleGeneration = async () => {
    try {
      toast.info("Content generation started")
      const contentResponse = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      })
      const data = await contentResponse.json()
      setContent(data.content)
      toast.success("Content Generated Successfully")

      toast.info("Image Generation started")
      const imageResponse = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({ query })
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
    const blob = await fetch(image).then(res => res.blob())
    const reader = new FileReader()
    reader.onloadend = async () => {
      if (typeof reader.result === "string") {
        const base64data = reader.result.split(",")[1]
        const res = await fetch("/api/schedule-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            image_base64: base64data,
            delay:days,
            accessToken: session?.accessToken,
          }),
        })
        if (!res.ok) throw new Error("Failed to schedule post")
        toast.success("Post scheduled successfully. It would starting after mentioned days.")
      } else {
        toast.error("Image encoding failed")
      }
    }
    reader.readAsDataURL(blob)
  } catch (err) {
    console.log(err)
    toast.error("Failed to schedule post")
  }
}


  return (
    <>
      <Toaster position="bottom-center" expand={true} />
      <div className="max-w-5xl mx-auto mt-10 font-funnel">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter prompt"
            rows={5}
            className="w-full p-5 border border-zinc-300 rounded-xl resize-none font-funnel text-base pr-36"
          />
          <div className="absolute bottom-4 right-3 flex gap-2">
            <button
              disabled={!query}
              className={`flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 text-sm rounded-full transition-colors duration-200 ${!query ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              onClick={handleGeneration}
            >
              <Wand2 size={16} className="mr-2" />
              Generate
            </button>
            
             <button
                  onClick={() => setOpen(true)}
                  disabled={!content || !image}
                  className={`flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 text-sm rounded-full transition-colors duration-200 ${!content ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                >
                  <CalendarClock size={16} className="mr-2" />
                  Schedule Settings
             </button>
          </div>
        </div>
      </div>

     
      <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-zinc-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <DialogPanel
                transition
                className="relative outline-none transform overflow-hidden rounded-lg bg-zinc-300 text-left shadow-xl outline -outline-offset-1 outline-zinc/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >

                <div className="bg-zinc-300 px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <h1 className="font-funnel text-md text-zinc-800 flex items-center gap-2 flex-wrap">
                      The post would be published on Linkedin after every
                      <input
                        type="number"
                        min={1}
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="w-16 px-2 py-1 rounded-md border border-zinc-300 bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      days.
                    </h1>
                  </div>
                </div>

                <div className="px-6 py-3 flex justify-end">
                  <button
                    onClick={schedulePosts}
                    disabled={!content || !image}
                    className={`flex items-center justify-center bg-zinc-800 text-zinc-200 font-funnel hover:bg-zinc-900 px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                      !content ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    }`}
                  >
                    <CalendarClock size={16} className="mr-2" />
                    Schedule Post
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
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
