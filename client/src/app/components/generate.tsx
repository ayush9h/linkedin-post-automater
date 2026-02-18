"use client";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import WebSearchToggle from "./web-search/web-search";
import ToneSelector from "./tone-selector/tone-selector";
import TemperatureSelector from "./temperature-selector/temperature-selector";
import Preview from "./preview/preview";
import { Session } from "next-auth";

export default function Generate({ session }: { session: Session }) {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isWebSearch, setIsWebSearch] = useState(false)

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

              <button className="w-full rounded-md bg-stone-900 text-sm font-semibold text-stone-100 p-3">
                Schedule Post
              </button>
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
