import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Markdown from "react-markdown";

export default function PostAnalysis() {
  const [postUrl, setPostUrl] = useState("");
  const [analysis, setAnalyis] = useState("");

  const handleSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/post-analysis",
        {
          params: { post_url: postUrl },
        }
      );

      setAnalyis(response.data.analysis);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center max-w-3xl m-auto mt-10 h-96 text-center'>
        <h2 className='px-4 py-2 text-sm bg-white border border-blue-300 rounded-full shadow-md font-ubuntu'>
          Beta version now live
        </h2>
        <h2 className='mt-5 text-6xl font-semibold text-slate-800 font-ubuntu'>
          Get analysis of LinkedIn <span className='text-blue-500'>posts</span>{" "}
          in seconds.
        </h2>
        <p className='mt-5 text-2xl text-slate-600 font-ubuntu'>
          Get AI generated sentiment analysis of the posts.
        </p>
      </div>
      <div className='max-width mt-10'>
        <label className='block text-lg font-ubuntu mb-2' htmlFor='postUrl'>
          Enter URN ID:
        </label>
        <div className='flex items-center space-x-2'>
          <input
            type='text'
            id='postUrl'
            value={postUrl}
            className='p-3 border border-slate-300 rounded-md flex-grow'
            onChange={(e) => setPostUrl(e.target.value)}
          />
          <button
            onClick={handleSummary}
            className='p-3 bg-white hover:bg-slate-200 font-ubuntu rounded-md border border-slate-400'>
            Get Post Analysis
          </button>
        </div>
      </div>

      <div className='max-width'>
        {" "}
        <Markdown className='mt-5'>{analysis}</Markdown>
      </div>
    </>
  );
}
