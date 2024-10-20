import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [contentQuery, setContentQuery] = useState('');
  const [imageQuery, setImageQuery] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const handleGenerateContent = async () => {
    try {
      const contentResponse = await axios.post('http://localhost:5000/api/v1/generate-content', {
        query: contentQuery
      });
      const generatedContent = contentResponse.data.content;
      setContent(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const imageResponse = await axios.post('http://localhost:5000/api/v1/generate-image', {
        query: imageQuery
      }, { responseType: 'blob' });

      const imageURL = URL.createObjectURL(imageResponse.data);
      setImage(imageURL);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handlePostToLinkedIn = async () => {
    try {
      const postResponse = await axios.post('http://localhost:5000/api/v1/post-linkedin', {
        generated_content: content,
        image_path: 'generated_image.png'
      });

      setStatus(postResponse.data.status);
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center max-w-3xl m-auto mt-10 h-96 text-center">
        <h2 className="px-4 py-2 text-sm bg-white border border-blue-300 rounded-full shadow-md font-ubuntu">Beta version now live</h2>
        <h2 className="mt-5 text-6xl font-semibold text-slate-800 font-ubuntu">Automate your LinkedIn <span className="text-blue-500">posts</span> in seconds.</h2>
        <p className="mt-5 text-2xl text-slate-600 font-ubuntu">Improve your post quality by AI-powered content and image generation</p>
      </div>

      <div className="relative max-width">
        <button
          onClick={handlePostToLinkedIn}
          disabled={!content || !image}
          className="absolute top-0 right-0 flex items-center justify-center px-4 py-2 text-white bg-slate-700 hover:bg-black rounded-md font-ubuntu"
        >
          Post to Linkedin <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
        </button>
      </div>

      {status && (
        <div className='max-width'>
          {status === 'success'? (
            <h4 className="text-md w-40 bg-green-200 border border-green-300 px-4 py-2 rounded-md font-ubuntu">Status: {status}</h4>
          ):(
            <h4 className="text-md w-40 bg-red-200 border border-red-300 px-4 py-2 rounded-md font-ubuntu">Status: {status}</h4>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-20 max-width mb-20">
        <div className="p-6 bg-white border border-zinc-300 rounded-md shadow-xl">
          <h3 className="text-2xl font-ubuntu">Content Generation</h3>
          <textarea
            value={contentQuery}
            onChange={(e) => setContentQuery(e.target.value)}
            placeholder="Enter prompt for LinkedIn post content"
            className="w-full h-32 px-4 py-2 mt-2 bg-gray-100 border border-zinc-400 rounded-md resize-none"
          />
          <button
            onClick={handleGenerateContent}
            className="flex items-center justify-center px-4 py-2 mt-2 text-white bg-slate-700 hover:bg-black rounded-md font-ubuntu"
          >
            Generate Content <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />
          </button>
          {content && (
            <div>
              <h4 className="mt-4 text-lg font-semibold">Generated Content:</h4>
              <Markdown className="mt-4 bg-zinc-100 border border-zinc-200 rounded-md p-6">{content}</Markdown>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border border-zinc-300 rounded-md shadow-xl">
          <h3 className="text-2xl font-ubuntu">Image Generation</h3>
          <textarea
            value={imageQuery}
            onChange={(e) => setImageQuery(e.target.value)}
            placeholder="Enter prompt for LinkedIn image"
            className="w-full h-32 px-4 py-2 mt-2 bg-gray-100 border border-zinc-400 rounded-md resize-none"
          />
          <button
            onClick={handleGenerateImage}
            className="flex items-center justify-center px-4 py-2 mt-2 text-white bg-slate-700 hover:bg-black rounded-md font-ubuntu"
          >
            Generate Image <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />
          </button>
          {image && (
            <div>
              <h4 className="mt-4 text-lg font-semibold">Generated Image:</h4>
              <img src={image} alt="Generated" className="mt-2 rounded-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
