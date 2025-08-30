import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Schedule({ content, selectedDays, setSelectedDays }) {
  const [scheduledJobs, setscheduledJobs] = useState([]);
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    if (scheduledJobs.length === 0) return;

    const interval = setInterval(async () => {
      const updatedStatusList = await Promise.all(
        scheduledJobs.map(async (jobId) => {
          try {
            const res = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/v1/task-status/${jobId}`
            );
            return {
              jobId,
              status: res.data.status,
              result: res.data.result,
            };
          } catch (err) {
            console.error(err);
            return { jobId, status: "ERROR" };
          }
        })
      );
      setStatusList(updatedStatusList);
    }, 10000);

    return () => clearInterval(interval);
  }, [scheduledJobs]);

  const schedulePosts = async () => {
    const jobIds = [];

    for (let day = 0; day < selectedDays; day++) {
      const delayMinutes = day * 1440;
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/post-linkedin`,
          {
            generated_content: content,
            image_path: "generated_image.png",
            delay: delayMinutes,
          }
        );
        jobIds.push(res.data.job_id);
      } catch (err) {
        console.error(`Error scheduling the posts for ${day}`);
        toast.error("Error scheduling post");
      }
    }
    setscheduledJobs(jobIds);
    if (jobIds.length > 0) {
      toast.success(`${selectedDays} post(s) scheduled`);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
            type="number"
            value={selectedDays === 0 ? "" : selectedDays}
            onChange={(e) => setSelectedDays(Number(e.target.value))}
            placeholder="Enter the days for the content to be automated"
            className="flex-1 p-3 border border-gray-300 rounded-xl font-plex text-sm"
          />

        <button
            onClick={schedulePosts}
            disabled={selectedDays < 1}
            className={`flex items-center justify-center p-3 rounded-xl font-plex text-sm font-medium shadow-md transition-colors duration-200
              ${
                selectedDays < 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-700 text-white hover:bg-blue-900"
              }`}
        >
          Automate Post
          <FontAwesomeIcon icon={faPaperPlane} className="ml-2 text-white" />
        </button>

      </div>

      {statusList.length > 0 && (
        <div className="mt-6 space-y-2">
          {statusList.map((job, index) => (
            <p key={job.jobId} className="font-plex text-gray-700">
              Day {index + 1}: {job.status}
              {job.status === "SUCCESS" &&
                ` - Posted (LinkedIn ID: ${job.result?.linkedin_response?.id})`}
              {job.status === "FAILURE" && ` - Failed (${job.error})`}
              {job.status === "ERROR" && " - Error checking status"}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
