import { useRef,useState } from 'react'

export default function Video() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Array of self-hosted video URLs
  const videos = [
    "./video/Soundtrack to coup detat website.mp4",
    "./video/THEINVASION_WEBSITE.mp4",
    "./video/Songs of love and hate website.mov",
    // Add more video URLs as needed
  ]

  // Function to go to the next video
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  // Function to go to the previous video
  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    )
  }

  // Play next video automatically when the current one ends
  const handleVideoEnd = () => {
    handleNextVideo()
    videoRef.current?.load() // Reload the new video
    videoRef.current?.play()  // Autoplay the next video
  }

  return (
    <div className="video__container">
      <video
        ref={videoRef}
        autoPlay
        loop={false}
        muted
        preload="auto"
        onEnded={handleVideoEnd}
        className="banner__cover"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Buttons to manually switch videos */}
      <div className="video__controls">
        <button onClick={handlePrevVideo}>Previous</button>
        <button onClick={handleNextVideo}>Next</button>
      </div>
    </div>
  )
}

