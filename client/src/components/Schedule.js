import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from "react";


export default function Schedule({ content, selectedDays, setSelectedDays }) {

  const [scheduledJobs, setscheduledJobs] = useState([])
  const [statusList, setStatusList] = useState([])

  useEffect(()=>{

    if(scheduledJobs.length === 0) return;

    const interval = setInterval(async () =>{
        const updatedStatusList = await Promise.all(
          scheduledJobs.map(async(jobId, index)=>{
            try{
              const res = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/task-status/${jobId}`
              );
              return {
                jobId,
                status: res.data.status,
                result: res.data.result
              }
            }
            catch(err){
              console.error(err)
            }
          })
        )
        setStatusList(updatedStatusList)
    }, 10000);

    return ()=> clearInterval(interval)
  },[scheduledJobs])


  const schedulePosts = async ()=>{
    const jobIds = []

    for(let day = 0; day < selectedDays; day++){
      const delayMinutes = day * 1440
      try{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post-linkedin`,{
          generated_content: content,
          image_path:"generated_image.png",
          delay: delayMinutes
        });
        jobIds.push(res.data.job_id)
      }
      catch(err){
        console.error(`Error scheudling the posts for ${day}`)
        toast.error("Error to schedule post")
      }
    }
    setscheduledJobs(jobIds)
    toast.success(`${selectedDays} posts scheduled`)
  };


  return (
    <div className="max-width">
      <Toaster position="top-center" />
      <div className="flex flex-row justify-between">
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
          onClick={schedulePosts}
          className={`w-1/5 flex items-center justify-center px-3 py-4 mt-2 text-white rounded-xl font-montserrat text-md ${
            selectedDays < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Automate Content
          <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
        </button>
      </div>

      <div className="mt-4">
        {statusList.map((job, index) => (
          <p key={job.jobId} className="font-montserrat text-gray-700">
            Day {index + 1}: {job.status}
            {job.status === 'SUCCESS' && ` - Posted (LinkedIn ID: ${job.result?.linkedin_response?.id})`}
            {job.status === 'FAILURE' && ` - Failed (${job.error})`}
          </p>
        ))}
      </div>
    </div>
  )
}