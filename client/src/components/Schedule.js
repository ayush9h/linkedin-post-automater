import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast'
import { useState } from "react";


export default function Schedule({ content, selectedDays, setSelectedDays }) {
  const [status, setStatus] = useState('');

  const handlePostToLinkedIn = async () => {
    try {
      const postResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post-linkedin`,
        {
          generated_content: content,
          image_path: 'generated_image.png',
        }
      );

      setStatus(postResponse.data.status);
      toast.success("Content successfully uploaded to LinkedIn.", { duration: 5000 })
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
      toast.error(`Error posting to LinkedIn due to ${error}`, { duration: 5000 })
    }
  };

  const handleAutomatedPosts = async () => {
    for (let day = 0; day < selectedDays; day++){
      setStatus(`Posting for day ${day + 1}`);
      await handlePostToLinkedIn();
      
      if (day < selectedDays - 1) {
        await new Promise((resolve) => setTimeout(resolve, 86400000));
      }
    }
    setStatus("All posts completed.")
  }

  return (
    <div className="max-width">
      <Toaster position="top-center" />

      <div className='flex flex-row justify-between'>
        <h1 className="text-2xl font-bebas mt-10">Choose number of days to schedule</h1>
       
        
      </div>
        <p className="text-md font-montserrat mt-3 text-gray-500">Select the number of days to be active.</p>

        <div className="flex flex-row items-center mt-3 gap-3">
        <input
          type="number"
          value={selectedDays}
          onChange={(e) => setSelectedDays(Number(e.target.value))}
          placeholder="Enter the number of days"
          className="w-full p-4 mt-2 bg-zinc-100 border-2 border-gray-300 rounded-xl resize-none font-montserrat"
        />
         <button
          onClick={handleAutomatedPosts}
          className={`w-1/5 flex items-center justify-center px-3 py-4 mt-2 text-white rounded-xl font-montserrat text-md ${selectedDays < 1
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          Automate Content
          <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
        </button>
        </div>

    </div>
  )
}