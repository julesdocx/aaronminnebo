import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Accordion from './Accordion';
import Carousel from './Carousel';
import Video from './Video';
import { type Post } from '~/lib/sanity.queries';
import { SpotlightItem } from '~/utils/types';
import Spotlight from '../../public/spotlight_videos.json';
import { filterItemsByVideoExistence } from '~/utils';

export default function Modal({ posts }: { posts: Post[] }) {
  const [showAccordion, setShowAccordion] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoList, setVideoList] = useState<SpotlightItem[]>([]);

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
        animate={showAccordion ? { y: `calc(100vh - 200px)` } : { y: '0' }}
      >
        {/* Pass handlers and current state to Carousel */}
        <Carousel
          currentVideoIndex={currentVideoIndex}
          videoList={videoList}
          onVideoChange={handleVideoChange}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAccordion(!showAccordion)}
        >
          {showAccordion ? 'projects' : 'hide'}
        </motion.button>
        <Accordion posts={posts} />
      </motion.div>
    </div>
  );
}
