import Image from 'next/image'
import { useState } from 'react'
import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { motion, AnimatePresence } from 'motion/react';

export default function Card({ post }: { post: Post }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleAccordion = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      transition={{
        type: "linear"
      }}
      className={`card ${isExpanded ? "expanded": "" }`}  
      onClick={toggleAccordion}
      whileHover="hover"
      style={{ cursor: 'pointer' }}
    >
      <div className="card__container">
        <div className="card__header">
          <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
            <div 
              className="toggle-slider"
              style={{
                width: '20px',
                height: '10px',
                backgroundColor: 'white',
                border: isExpanded ? '1px solid black' : '1px solid grey',
                opacity: '30%',
                borderRadius: '10px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '6px'
              }}
            >
              <motion.div 
                className="toggle-circle"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '1px',
                  left: isExpanded ? '11px' : '1px',
                  transition: 'left 0.3s ease'
                }}
                variants={{
                  hover: {
                    backgroundColor: 'black',
                    transition: { duration: 0.2, ease: "easeOut" }
                  }
                }}
                animate={{
                  backgroundColor: isExpanded ? 'black' : 'grey'
                }}
              />
            </div>
            <h3 className="card__title">
                {post.title}
            </h3>
            {/* Toggle Slider */}
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              opacity: { duration: 0.3 }
            }}
            style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '10px 0' }}>
            <p className="card__excerpt">{post.description}</p>
                <p className='card__function'>{post.function}</p>
                <p className='card__caption'> {post.director}</p>
                {post.mainImage ? (
                  <div className="image-container">
                    <Image
                      src={urlForImage(post.mainImage).url()}
                      alt={post.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: '100%',  
                        height: 'auto',
                      }}
                    />
                  </div>
                ) : (
                  <div className="post__cover--none" />
                )}
                <div className="card__content">
                  <PortableText value={post.body} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}