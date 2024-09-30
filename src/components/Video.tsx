import { useRef,useState } from 'react'

export default function Video() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Array of self-hosted video URLs
  const videos = [
    "https://cdn-cf-east.streamable.com/video/mp4/72gc1a.mp4?Expires=1727643030357&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=OfmtaRkEmj4xCrIcfmk3usIZ2gIOHvZ6PtKXRLySnUm0XXKxe3ylFG99IdIUo4YsajRcHqg5Q3MNNH8nsqoe8ezpeBXiDerKe1o3IgvDxJvJd208nXOx~YvEkOnn~x-YKxj69WHJq5pvj3Ulb1uz4sy4fTEqpTyQllpalOLM2kn-f8hl1Si-JkuFwHVuErxDquFUX~FNKGn2FRysncJEx4MZrEjEbwOifxsOVt9IKWNci6XuYc9zt~F~Wi6B7IOXGtgavdwCX1NnmB1QxCVveQaXLW1efCwQEwZdETp45OFBIq6TdUAlnWZAJjhCHWI19iGtd35uoRhhkSu-b7dGCQ__",
    "https://cdn-cf-east.streamable.com/video/mp4/3ba86h.mp4?Expires=1727685856030&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=Cptb~-urK6pqjAHoZrltVex1Jta0-TGvYz-XDxszZXJ9CqGaXgGr9zaCgNocA6BLmfQFdhMQHqJEnJWp2lWtDX5S5ENgBEc3eTja8MqM9NQFBCfhs6ayhkoWF4DGMDvcjG8L15JRebF8-GBNJbFMannnAwCq59kHNMjOdn1ekFVA-AbY1Dn~Kw2pfhd4u36A6RwywD4DRYwsTnXurJyXG8wlyDtd4Umiq2EFvGv7cShjL6w-8UzudgmuqdhSeY3wZ25jkyfQuOnaz-RL8LpAjSxElmdycEpjF2cGp2VZt5QQ6QrAmHXOZAtBUWmHHdkdxpJI7PKp9IUKVk7OVP1zXQ__",
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
        controls
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

