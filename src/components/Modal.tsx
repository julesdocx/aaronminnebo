import { useState } from 'react'

import { type Post } from '~/lib/sanity.queries'
import { filterItemsByVideoExistence } from '~/utils'

import Spotlight from '../../public/spotlight_videos.json';
import Accordion from './Accordion'
import Carousel from './Carousel'

const videos = filterItemsByVideoExistence(Spotlight.videos); 

export default function Modal({ posts }: { posts: Post[] }) {
  // State to toggle between Carousel and Accordion view
  const [showAccordion, setShowAccordion] = useState(false)

  // Toggle function for the "All Projects" button
  const handleToggleView = () => {
    setShowAccordion((prev) => !prev)
  }

  return (
    <div className="modal">
      {/* Conditionally render Carousel or Accordion based on showAccordion */}
      {!showAccordion ? (
        <>
          <Carousel />
          <button onClick={handleToggleView} className="all-projects-button">
            All Projects
          </button>
        </>
      ) : (
        <>
          <button onClick={handleToggleView} className="back-button">
            Back to Carousel
          </button>
          <Accordion posts={posts} />
        </>
      )}
    </div>
  )
}
