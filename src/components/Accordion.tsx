import React, { useState } from 'react';

import { type Post } from '~/lib/sanity.queries';

import AccordionItem from './AccordionItem';

export default function Accordeon({ posts }: { posts: Post[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle current index
  };

  return (
    <div className="accordion">
      {posts.length ? (
        posts
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
