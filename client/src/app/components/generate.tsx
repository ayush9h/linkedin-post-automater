import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { toast, Toaster } from "sonner"
import LanguageSelector from "./language-selector/language-selector"
import ToneSelector from "./tone-selector/tone-selector"
import TemperatureSelector from "./temperature-selector/temperature-selector"
import Preview from "./preview/preview"

export default function Generate() {
  const session = getServerSession(authOptions);


  return (
    <>
      <Toaster position="top-center" expand={true} />
      <div className="flex max-w-[88rem] mx-auto font-funnel gap-4 justify-center mt-6">

        <div className="w-[30%]">
          <div className="w-full rounded-md bg-white border border-stone-300 p-6">
          
            <div>
              <label className="text-sm font-semibold text-stone-900">
                Text Prompt
              </label>
              <textarea
                placeholder="Write your LinkedIn post idea or keyword"
                rows={7}
                className="w-full resize-none rounded-md border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400"
              />
            </div>
          

            <LanguageSelector/>
            <ToneSelector/>
            
            <TemperatureSelector/>

            <div className="flex gap-2 mt-6">
              <button className="w-full rounded-md bg-stone-900 text-sm font-semibold text-stone-100 p-3">
                Generate Post
              </button>
              <button className="w-full rounded-md bg-stone-900 text-sm font-semibold text-stone-100 p-3">
                Schedule Post
              </button>
            </div>
        </div>
      </div>

        {/* Image and Content Previews */}
        <Preview/>
    </div>
  </>
)}