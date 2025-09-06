'use client'
import { Wand2, CalendarClock } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import Markdown from "react-markdown"
export default function Generate(){

    const [query, setQuery] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")


    const handleGeneration = async () =>{
    try {
       const contentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/generate-content`,
        { query }
      );
      const generatedContent = contentResponse.data.content;
      setContent(generatedContent);
    
      const imageResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/generate-image`,
        { query },
        { responseType: 'blob' }
      );
      const imageURL = URL.createObjectURL(imageResponse.data);
      setImage(imageURL);
    
    } catch (error) {
    
      console.error('Error generating content/image:', error);
    }
    };

    return(
        <>
        <div className="max-w-5xl mx-auto relative mt-5 font-funnel">
            <textarea
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Enter prompt for LinkedIn content & image"
            rows={4}
            className="w-full p-5 border border-zinc-300 rounded-xl resize-none font-funnel text-base"
            />
            <button
            disabled={!query}
            className={`absolute bottom-4 right-5 flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                !query ? "cursor-not-allowed" : "cursor-pointer" 
            }`
                
            } onClick={handleGeneration}>
                <Wand2 size={16} className="mr-2" />
                Generate
            </button>

            <button
            disabled={!content || !image}
            className={`absolute bottom-4 right-37 flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 px-4 py-2 rounded-full transition-colors text-sm duration-200 ${
                !content && !image ? "cursor-not-allowed":"cursor-pointer"
            }`}>
                <CalendarClock size={16} className="mr-2" />
                Schedule Post
            </button>

            
        </div>

        <div className="max-w-5xl mx-auto">
            
        {(content || image) && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {content && (
            <div className="flex flex-col h-full">
              <h4 className="text-md font-funnel font-semibold">
                Generated Content:
              </h4>
              <div className="mt-3 p-5 bg-zinc-100 rounded-xl font-funnel prose flex-1">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}

          {image && (
            <div className="flex flex-col h-full">
              <h4 className="text-md font-funnel font-semibold">
                Generated Image:
              </h4>
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