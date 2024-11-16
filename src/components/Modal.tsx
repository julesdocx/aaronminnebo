import { useState } from 'react'
import { motion } from 'motion/react';
import Accordion from './Accordion'
import Carousel from './Carousel'
import { type Post } from '~/lib/sanity.queries'


export default function Modal({ posts }: { posts: Post[] }) {
  const [showAccordion, setShowAccordion] = useState(false)

  return (
    <motion.div className="modal"
      animate={showAccordion ? {y: `calc(100vh - 200px)`} : {y: "0"}}>
        <Carousel />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAccordion(!showAccordion)}
        >
          {showAccordion ? "projects" : "hide"}
        </motion.button>
        <Accordion posts={posts} />
    </motion.div>
  )
}

