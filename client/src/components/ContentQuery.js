import { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

export default function ContentQuery({ content, setContent, image, setImage }) {
  const [query, setQuery] = useState('');
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleGenerateContentAndImage = async () => {
    try {
      setLoadingContent(true);
      const contentResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/generate-content`,
        { query }
      );
      const generatedContent = contentResponse.data.content;
      setContent(generatedContent);
      setLoadingContent(false);

      setLoadingImage(true);
      const imageResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/generate-image`,
        { query },
        { responseType: 'blob' }
      );
      const imageURL = URL.createObjectURL(imageResponse.data);
      setImage(imageURL);
      setLoadingImage(false);
    } catch (error) {
      setLoadingContent(false);
      setLoadingImage(false);
      console.error('Error generating content/image:', error);
    }
  };

  return (
    <>  
      <div className="relative mt-5">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter prompt for LinkedIn content & image"
          rows={6}
          className="w-full p-5 pr-32 border border-gray-300 rounded-xl resize-none font-plex text-base"
        />
        <button
          onClick={handleGenerateContentAndImage}
          disabled={loadingContent || loadingImage}
          className={`absolute bottom-4 right-4 flex items-center justify-center px-5 py-3 rounded-xl font-plex text-sm font-medium shadow-md transition-colors duration-200
            ${
              loadingContent || loadingImage
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-700 text-white hover:bg-blue-900'
            }`}
        >
          {loadingContent
            ? 'Generating Content...'
            : loadingImage
            ? 'Generating Image...'
            : (
              <>
                Generate LinkedIn Post
                <FontAwesomeIcon
                  icon={faWandMagicSparkles}
                  className="ml-2 text-white"
                />
              </>
            )}
        </button>
      </div>

      {content && (
        <div className="mt-12">
          <h4 className="text-md font-plex font-semibold">
            Generated Content:
          </h4>
          <div className="mt-3 p-5 bg-zinc-100 rounded-xl font-plex prose">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      )}

      {image && (
        <div className="mt-12 h-20">
          <h4 className="text-md font-plex font-semibold">
            Generated Image:
          </h4>
          <img
            src={image}
            alt="Generated Image"
            className="mt-3 rounded-xl max-w-full shadow-md"
          />
        </div>
      )}
    </>
  );
}
