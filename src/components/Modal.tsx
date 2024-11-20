import { motion } from 'motion/react';
import { useEffect,useState } from 'react';

import { type Post } from '~/lib/sanity.queries';
import { filterItemsByVideoExistence } from '~/utils';
import { SpotlightItem } from '~/utils/types';

import Spotlight from '../../public/spotlight_videos.json';
import Accordion from './Accordion';
import Carousel from './Carousel';
import Video from './Video';

export default function Modal({ posts }: { posts: Post[] }) {
  const [showAccordion, setShowAccordion] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoList, setVideoList] = useState<SpotlightItem[]>([]);
  const [dragProgress, setDragProgress] = useState(0) // Track drag amount for arrow morphing

  // Load video data and filter them
  useEffect(() => {
    const spotlightItems = Spotlight.videos;
    (async () => {
      const files = await filterItemsByVideoExistence(spotlightItems, true);
      setVideoList(files);
    })();
  }, []);

  // Current video details
  const currentVideo = videoList.length > 0 ? videoList[currentVideoIndex] : null;

  // Advance to the next video
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  // Change video by index
  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index);
  };


  // Handle drag progress
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const dragAmount = info.offset.y // Vertical drag distance
    const viewportHeight = window.innerHeight
    const progress = Math.min(Math.max(dragAmount / viewportHeight, 0), 1) // Normalize to [0, 1]
    setDragProgress(progress)
  }

  // Handle drag end
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const dragThreshold = 0.25 // Percentage of viewport height to toggle
    if (dragProgress > dragThreshold) {
      setShowAccordion(true)
    } else if (dragProgress < -dragThreshold) {
      setShowAccordion(false)
    }
    setDragProgress(0) // Reset progress after drag ends
  }

  return (
    <div>
      {/* Pass video-related props to Video */}
      {currentVideo ? (
        <Video videoUrl={currentVideo.videoUrl} onVideoEnd={handleNextVideo} />
      ) : (
        <p>No videos available.</p>
      )}
      <motion.div
        className="modal"
        drag="y" // Enable vertical dragging
        dragConstraints={{ top: 0, bottom: 0 }} // Restrict to vertical drag
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={showAccordion ? { y: `calc(100vh - 200px)` } : { y: '0' }}
        transition={{type: "spring", damping: 300, stiffness: 50, duration: 0.2}}
      >
        {/* Pass handlers and current state to Carousel */}
        <Carousel
          currentVideoIndex={currentVideoIndex}
          videoList={videoList}
          onVideoChange={handleVideoChange}
          showAccordion={showAccordion}
        />

        {/* Arrow button with morphing */}
        <motion.div
          className="arrow-button"
          onClick={() => setShowAccordion(!showAccordion)} // Toggle accordion on click
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              rotate: showAccordion ? 180 : 0,
              scaleY: 1 - dragProgress, // Morph from triangle to line
              scaleX: 1,
            }}
            transition={{duration: 0.2}}
            style={{ width: '24px', height: '24px' }}
          >
            <path d="M12 5l-7 7h14l-7-7z" />
          </motion.svg>
        </motion.div>
        <Accordion posts={posts} />
      </motion.div>
    </div>
  );
}
