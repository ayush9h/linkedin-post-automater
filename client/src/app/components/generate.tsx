"use client";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import WebSearchToggle from "./web-search/web-search";
import ToneSelector from "./tone-selector/tone-selector";
import TemperatureSelector from "./temperature-selector/temperature-selector";
import Preview from "./preview/preview";
import { Session } from "next-auth";
import {Calendar} from '@/components/ui/calendar'
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function Generate({ session }: { session: Session }) {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isWebSearch, setIsWebSearch] = useState(false)

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })


  const [visible, setIsvisible] = useState(false);

  const handleGeneratePost = async () => {
    if (!query.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      setLoadingContent(true);
      setContent("");

      // Hits the NextJs endpoint to generate content
      toast.info('Post generation started')
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query:query, is_web_search: isWebSearch }),
      });

      if (!res.ok) throw new Error("Failed to generate content");

      const data = await res.json();

      setContent(data.content); 
      toast.success("Post generated!");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoadingContent(false);
    }
  };





  return (
    <>
      <Toaster position="top-center" expand={true} />

      <div className="flex max-w-[90rem] mx-auto font-funnel gap-4 justify-center mt-10">
        <div className="w-[30%] self-start">
          <div className="w-full rounded-md bg-white border border-stone-300 p-6">
            <div>
              <label className="text-sm font-semibold text-stone-900">
                Text Prompt
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write your LinkedIn post idea or keyword"
                rows={7}
                className="w-full resize-none rounded-md border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400"
              />
            </div>

            <ToneSelector />
            <WebSearchToggle enabled={isWebSearch} onChange={setIsWebSearch} />
            <TemperatureSelector />

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleGeneratePost}
                disabled={loadingContent}
                className="w-full rounded-md bg-stone-900 text-sm font-semibold text-stone-100 p-3 disabled:opacity-60"
              >
                {loadingContent ? "Generating..." : "Generate Post"}
              </button>

            
              {/* Schedule Post with Calendar Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full rounded-md bg-stone-900 text-sm font-semibold text-stone-100 p-3">
                    Schedule Post
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md font-funnel">
                  <DialogHeader>
                    <DialogTitle>Select Schedule Range</DialogTitle>
                  </DialogHeader>

                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    className="w-full"
                    
                    />

                  {/* <p>{dateRange?.from}</p> */}

                  <div className="flex justify-end mt-4">
                    <button
                      className="rounded-md bg-stone-900 text-sm font-semibold text-white px-4 py-2"
                      onClick={() => console.log(dateRange)}
                    >
                      Confirm Selection
                    </button>
                  </div>
                </DialogContent>
              </Dialog>

            </div>
          </div>
        </div>

        <Preview
          content={content}
          image={image}
          loadingContent={loadingContent}
          loadingImage={loadingImage}
        />
      </div>
    </>
  );
}
