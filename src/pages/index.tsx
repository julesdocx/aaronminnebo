import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import Card from '~/components/Card'
import Container from '~/components/Container'
import Video from '~/components/Video'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import post from '~/schemas/post'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const [isWorkExpanded, setIsWorkExpanded] = useState(true)
  const [isPersonalExpanded, setIsPersonalExpanded] = useState(true)

  const toggleWork = () => {
    setIsWorkExpanded(!isWorkExpanded)
  }

  const togglePersonal = () => {
    setIsPersonalExpanded(!isPersonalExpanded)
  }

  const getMainClasses = () => {
    if (!isWorkExpanded && !isPersonalExpanded) return 'both-collapsed'
    if (!isWorkExpanded) return 'work-collapsed'
    if (!isPersonalExpanded) return 'personal-collapsed'
    return ''
  }

  return (
    <Container>
      <div id='mainDiv' className={getMainClasses()}>
      <section> 
        <div 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', cursor: 'pointer' }}
          onClick={toggleWork}
        >
          <h2>Work</h2>
          {/* Toggle Slider */}
          <div 
            className="toggle-slider"
            style={{
              width: '20px',
              height: '10px',
              backgroundColor: 'white',
              border: isWorkExpanded ? '1px solid black' : '1px solid grey',
              opacity: '30%',
              borderRadius: '10px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
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
                left: isWorkExpanded ? '11px' : '1px',
                transition: 'left 0.3s ease'
              }}
              variants={{
                hover: {
                  backgroundColor: 'black',
                  transition: { duration: 0.2, ease: "easeOut" }
                }
              }}
              animate={{
                backgroundColor: isWorkExpanded ? 'black' : 'grey'
              }}
              whileHover="hover"
            />
          </div>
        </div>
        
        <AnimatePresence>
          {isWorkExpanded && (
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
                {posts.length ? (
                  posts.reverse().map((post) => <Card key={post._id} post={post} />)
                ) : (
                  <div>error Missing posts, or sanity error</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <section>
        <div 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', cursor: 'pointer' }}
          onClick={togglePersonal}
        >
          <h2>Personal</h2>
          {/* Toggle Slider */}
          <div 
            className="toggle-slider"
            style={{
              width: '20px',
              height: '10px',
              backgroundColor: 'white',
              border: isPersonalExpanded ? '1px solid black' : '1px solid grey',
              opacity: '30%',
              borderRadius: '10px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
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
                left: isPersonalExpanded ? '11px' : '1px',
                transition: 'left 0.3s ease'
              }}
              variants={{
                hover: {
                  backgroundColor: 'black',
                  transition: { duration: 0.2, ease: "easeOut" }
                }
              }}
              animate={{
                backgroundColor: isPersonalExpanded ? 'black' : 'grey'
              }}
              whileHover="hover"
            />
          </div>
        </div>
        
        <AnimatePresence>
          {isPersonalExpanded && (
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
                {posts.length ? (
                  posts.reverse().map((post) => <Card key={post._id} post={post} />)
                ) : (
                  <div>error Missing posts, or sanity error</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      </div>
    </Container>
  )
}