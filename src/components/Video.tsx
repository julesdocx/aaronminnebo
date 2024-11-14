import { useEffect, useRef } from 'react'

export default function Video({
  videoUrl,
  onVideoEnd,
}: {
  videoUrl: string
  onVideoEnd: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [videoUrl])

  return (
    <div className="banner">
      <div className="video__container">
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted
          preload="auto"
          onEnded={onVideoEnd} // Call onVideoEnd when video ends
          className="banner__cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
