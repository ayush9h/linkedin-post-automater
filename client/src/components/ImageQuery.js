import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import {SyncLoader} from 'react-spinners'

export default function ImageQuery({image, setImage}){
    const [imageQuery, setImageQuery] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleGenerateImage = async () => {
        setLoading(true);
        try {
          const imageResponse = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/generate-image`,
            {
              query: imageQuery,
            },
            { responseType: 'blob' }
          );
    
          const imageURL = URL.createObjectURL(imageResponse.data);
          setImage(imageURL);
          setLoading(false);
        } catch (error) {
          setLoading(false)
          console.error('Error generating image:', error);
        }
      };
    return(
        <>
         <h3 className="text-2xl font-bebas">Image Generation</h3>
         <p className="text-md font-montserrat mt-3 text-gray-500">Generate post image for LinkedIn.</p>
        <div className="gap-5  mt-3">
          
          <input
            value={imageQuery}
            onChange={(e) => setImageQuery(e.target.value)}
            placeholder="Enter prompt for LinkedIn Image"
            className="w-full p-4 mt-2 bg-zinc-100 border-2 border-gray-300 rounded-xl resize-none font-montserrat"
          />
          <button
            onClick={handleGenerateImage}
            className={`w-1/3 flex items-center justify-center px-3 py-4 mt-2 text-white rounded-xl font-montserrat text-md ${loading ? 'bg-gray-400 cursor-not-allowed' :' bg-blue-600 hover:bg-blue-700'}`}
          >
           {loading ? (<> Generating Image <SyncLoader className='ml-2' size={5} color='#ffffff' /></>): (<>Generate Image <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />'</>)}
          </button>
         
        </div>
        {image && (
            <div>
              <h4 className="mt-10 text-md font-montserrat font-semibold">Generated Image:</h4>
              <img src={image} alt="Generated" className="max-width mt-2 rounded-xl" />
            </div>
          )}
        </>
    )
}
