import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import { type Post } from '~/lib/sanity.queries';

export default function Accordeon({ posts }: { posts: Post[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle current index
  };

  return (
    <div className="Accordion">
      {posts.length ? (
        posts
          .reverse()
          .map((post, index) => <AccordionItem 
            key={post._id} 
            post={post}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)} />)
      ) : (
        <div>error Missing posts, or sanity error</div>
      )}
    </div>
  )
}
