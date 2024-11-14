import { useEffect, useState } from 'react';

import { filterItemsByVideoExistence } from '~/utils';
import { SpotlightItem } from '~/utils/types';

import Spotlight from '../../public/spotlight_videos.json' ;
import Video from './Video';

export default function Carousel() {
  // Static array of video obj:ects with titles and URLs
  const [existingFiles, setExistingFiles] = useState<SpotlightItem[]>([]);

  useEffect(() => {
    const spotlightItems = Spotlight.videos;
    // Only call this in an async function or useEffect
    (async () => {
        const files = await filterItemsByVideoExistence(spotlightItems, true);
        setExistingFiles(files);
        console.log(files);
    })();
  }, []);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Function to change the current video index
  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index)
  }

  // Function to advance to the next video automatically
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % existingFiles.length)
  }

  // Only attempt to access `currentVideo` if `existingFiles` is non-empty
  const currentVideo = existingFiles.length > 0 ? existingFiles[currentVideoIndex] : null;
  console.log(`currentVideo: ${currentVideo}`);

  return (
    <div className="carousel">
      {/* Directly render Video component here */}
      {currentVideo ? (
        <Video videoUrl={currentVideo.videoUrl} onVideoEnd={handleNextVideo} />
      ) : (
        <p>No videos available.</p>
      )}

      <div className="carousel__interface">
        <div className="carousel__controls">
          <button
            onClick={() =>
              handleVideoChange(
                (currentVideoIndex - 1 + existingFiles.length) % existingFiles.length,
              )
            }
          ></button>
          <div className="carousel__pagination">
            {existingFiles.map((_, index) => (
              <input
                key={index}
                type="radio"
                name="carousel-pagination"
                checked={index === currentVideoIndex}
                onChange={() => handleVideoChange(index)}
              />
            ))}
          </div>
          <button
            onClick={() =>
              handleVideoChange((currentVideoIndex + 1) % existingFiles.length)
            }
          ></button>
        </div>

        {currentVideo && <div className="carousel__title">{currentVideo.title}</div>}      
        </div>
    </div>
  )
}
