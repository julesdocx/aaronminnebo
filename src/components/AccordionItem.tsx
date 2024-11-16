import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '~/lib/sanity.image';
import { type Post } from '~/lib/sanity.queries';

export default function AccordionItem({
  post,
  isOpen,
  onToggle,
}: {
  post: Post;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div onClick={onToggle} className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
      <div className="accordion-item__header" >
        <h3 className="accordion-item__title">
            {post.title}
        </h3>
        <p className="accordion-item__excerpt">{post.function}</p>
        <p className="accordion-item__caption">{post.director}</p>
      </div>

      <motion.div
        className="accordion-item__content"
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 3, easing: 'ease-in-out' }}
        style={{ overflow: 'hidden' }}
      >
        <div>
          <h4 className="accordion__description">{post.description}</h4>
          <div className="accordion__body">
            <PortableText value={post.body} />
          </div>
          {post.mainImage ? (
            <Image
              className="accordion-item__cover"
              src={urlForImage(post.mainImage).width(500).height(300).url()}
              height={300}
              width={500}
              quality={60}
              alt={post.title}
            />
          ) : (
            <div className="accordion-item__cover--none" />
          )}
        </div>
      </motion.div>
    </div>
  );
}