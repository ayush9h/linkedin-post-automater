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
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post-analysis`,
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
      <div className='flex flex-col items-center justify-center max-w-3xl m-auto h-96 text-center'>
        <h2 className="px-4 py-2 text-xs bg-white border border-blue-400 rounded-full shadow-xl font-montserrat">
          Beta version now live
        </h2>
        <h2 className="mt-5 text-8xl font-semibold text-slate-800 font-bebas">
          Get analysis of your <span className="text-blue-500">posts</span> in
          seconds.
        </h2>
        <p className="mt-1 text-xl text-slate-600 font-montserrat">
        Get AI generated sentiment analysis of the posts.
        </p>
      </div>
      <div className='max-width mt-10'>
        <label className='flex text-md font-montserrat mb-2' htmlFor='postUrl'>
          Find URN ID of LinkedIn Post
        </label>
        <div className='flex items-center space-x-2'>
          <input
            type='text'
            id='postUrl'
            placeholder="Enter the URN ID of your LinkedIn Post"
            value={postUrl}
            className='w-full p-4 mt-2 bg-zinc-100 border-2 border-gray-300 rounded-xl resize-none font-montserrat'
            onChange={(e) => setPostUrl(e.target.value)}
          />
          <button
            onClick={handleSummary}
            className='w-1/5 flex items-center justify-center px-3 py-4 mt-2 text-white rounded-xl font-montserrat text-md bg-blue-600 hover:bg-blue-700'>
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
