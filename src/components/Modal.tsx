import { useState } from 'react'
import Accordion from './Accordion'
import Carousel from './Carousel'
import { type Post } from '~/lib/sanity.queries'

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
