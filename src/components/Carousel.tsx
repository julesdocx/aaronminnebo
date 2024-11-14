import { useState } from 'react';
import Video from './Video';

export default function Carousel() {
  // Static array of video objects with titles and URLs
  const videos = [
    {
      title: "Soundtrack to Coup D'etat",
      videoUrl: './video/Soundtrack to coup detat website.mp4',
    },
    { title: 'The Invasion', videoUrl: './video/THEINVASION_WEBSITE.mp4' },
    {
      title: 'Songs of Love and Hate',
      videoUrl: './video/Songs of love and hate website.mov',
    },
    { title: "Vader's Huis", videoUrl: './video/vadershuis.mov' },
  ]

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Function to change the current video index
  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index)
  }

  // Function to advance to the next video automatically
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const currentVideo = videos[currentVideoIndex]

  return (
    <div className="carousel">
      {/* Directly render Video component here */}
      <Video videoUrl={currentVideo.videoUrl} onVideoEnd={handleNextVideo} />

      <div className="carousel__interface">
        <div className="carousel__controls">
          <button
            onClick={() =>
              handleVideoChange(
                (currentVideoIndex - 1 + videos.length) % videos.length,
              )
            }
          ></button>
          <div className="carousel__pagination">
            {videos.map((_, index) => (
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
              handleVideoChange((currentVideoIndex + 1) % videos.length)
            }
          ></button>
        </div>

        <div className="carousel__title">{currentVideo.title}</div>
      </div>
    </div>
  )
}
