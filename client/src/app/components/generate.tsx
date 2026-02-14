'use client'
import { Wand2, CalendarClock } from "lucide-react"
import { useState } from "react"
import Markdown from "react-markdown"
import { useSession } from "next-auth/react"
import { toast, Toaster } from "sonner"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Slider } from "@/components/ui/slider";


export default function Generate() {
  const { data: session } = useSession()
  const [query, setQuery] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [open, setOpen] = useState(true)
  const [days, setDays] = useState(1)

  const [temperature, setTemperature] = useState(0.7);


  return (
    <>
      <Toaster position="top-center" expand={true} />
      <div className="flex max-w-[88rem] mx-auto font-funnel gap-8 mt-12 items-center justify-center">

  {/* LEFT SIDE (Prompt Box) */}
  <div className="w-[35%]">
    <div className="w-full rounded-2xl bg-white border border-stone-300 p-6">

      {/* Text Prompt */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-zinc-900">
          Text Prompt
        </label>
        <textarea
          placeholder="Write your LinkedIn post idea..."
          rows={7}
          className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Language */}
      <div className="mt-5 space-y-2">
        <label className="text-sm font-semibold text-zinc-900">
          Language
        </label>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 cursor-pointer hover:bg-zinc-50 transition">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="text-base">🌍</span>
            English (US)
          </div>
          <span className="text-zinc-500">⌄</span>
        </div>
      </div>

      {/* Style & Tone */}
      <div className="mt-5 space-y-2">
        <label className="text-sm font-semibold text-zinc-900">
          Style & Tone
        </label>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 cursor-pointer hover:bg-zinc-50 transition">
          <div className="text-sm text-zinc-700">Professional</div>
          <span className="text-zinc-500">⌄</span>
        </div>
      </div>

      {/* Temperature */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-zinc-900">
            Temperature
          </label>
          <span className="text-sm font-medium text-zinc-600">
            {temperature.toFixed(2)}
          </span>
        </div>

        <Slider
          value={[temperature]}
          onValueChange={(val) => setTemperature(val[0])}
          min={0}
          max={1}
          step={0.05}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-zinc-500 font-medium">
          <span>0 (Precise)</span>
          <span>1 (Creative)</span>
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 w-full rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-95 active:scale-[0.99] transition">
        Generate Post
      </button>
    </div>
  </div>

  {/* RIGHT SIDE (Content Preview + Image Preview) */}
  <div className="flex flex-col gap-6 w-[55%]">

    {/* Content Preview */}
    <div className="h-[22rem] rounded-2xl bg-white border border-stone-300 p-6">
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">
        Generated Content
      </h2>

      <div className="h-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 overflow-y-auto">
        {content ? (
          <Markdown>{content}</Markdown>
        ) : (
          <p className="text-zinc-500 flex items-center justify-center h-full">
            Content will appear here...
          </p>
        )}
      </div>
    </div>

    {/* Image Preview */}
    <div className="h-[16rem] rounded-2xl bg-white border border-stone-300 p-6">
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">
        Generated Image
      </h2>

      <div className="h-full rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="Generated"
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <p className="text-zinc-500">
            Image will appear here...
          </p>
        )}
      </div>
    </div>

  </div>
</div>



        








     
    </>
  )
}
