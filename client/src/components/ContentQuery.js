import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import {SyncLoader} from 'react-spinners'

export default function ContentQuery({ content, setContent }) {

    const [contentQuery, setContentQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateContent = async () => {
        setLoading(true);
        try {
          const contentResponse = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/generate-content`,
            {
              query: contentQuery,
            }
          );
          const generatedContent = contentResponse.data.content;
          setContent(generatedContent);
          setLoading(false);
        } catch (error) {
          console.error('Error generating content:', error);
        }
    };

    return (
        <>
            <h3 className="text-2xl font-bebas">Content Generation</h3>
            <p className="text-md font-montserrat mt-3 text-gray-500">Generate post content for LinkedIn.</p>
            <div className="gap-5  mt-3">

                <input
                    value={contentQuery}
                    onChange={(e) => setContentQuery(e.target.value)}
                    placeholder="Enter prompt for LinkedIn post content"
                    className="w-full p-4 mt-2 bg-zinc-100 border-2 border-gray-300 rounded-xl resize-none font-montserrat"
                />
                <button
                    onClick={handleGenerateContent}
                    className={`w-1/3 flex items-center justify-center px-3 py-4 mt-2 text-white rounded-xl font-montserrat text-md ${loading ? 'bg-gray-400 cursor-not-allowed' :' bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? (<> Generating Content <SyncLoader className='ml-2' size={5} color='#ffffff' /></>): (<>Generate Content <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />'</>)}
                    
                </button>
              
            </div>
            {content && (
                    <div>
                        <h4 className="mt-10 text-md font-montserrat font-semibold">Generated Content:</h4>
                        <Markdown className="mt-4 bg-zinc-100 border border-zinc-300 rounded-xl p-6">
                            {content}
                        </Markdown>
                    </div>
                )}
        </>
    )
}
