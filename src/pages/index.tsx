import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'motion/react'

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import post from '~/schemas/post'
import { getTags, tagsQuery } from '~/lib/sanity.queries'


export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    tags: { _id: string; name: string }[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  // 🔁 Extract and dedupe tags from posts
  const tagMap = new Map<string, string>()
  
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (tag && tag._id && tag.name) {
        tagMap.set(tag._id, tag.name)
      }
    })
  })
  const tags = Array.from(tagMap.entries()).map(([id, name]) => ({
    _id: id,
    name,
  }))
  
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      tags,
    },
  }
}
export default function IndexPage({
  posts: initialPosts,
}: {
  posts: Post[]
}) {
  const router = useRouter()
  const [posts] = useLiveQuery<Post[]>(initialPosts, postsQuery)
  const [activeTags, setActiveTags] = useState<string[]>([])

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  )


  // Load tags from URL on mount
  useEffect(() => {
    const urlTags = router.query.tags
    if (typeof urlTags === 'string') {
      const tagsFromUrl = urlTags.split(',').filter(Boolean)
      setActiveTags(tagsFromUrl)
    }
  }, [router.query.tags])

  // Update URL when tags change
  const updateUrlTags = (tags: string[]) => {
    const query = { ...router.query }
    if (tags.length > 0) {
      query.tags = tags.join(',')
    } else {
      delete query.tags
    }

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    )
  }

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
      updateUrlTags(next)
      return next
    })
  }

  const filteredPosts =
    activeTags.length === 0
      ? posts
      : posts.filter((post) =>
          post.tags?.some((tag) => activeTags.includes(tag))
        )

  return (
    <Container>
      <div id="mainDiv">
        <section>
          {/* === Filtered Posts === */}
          <AnimatePresence mode="popLayout">
            <div className='posts__container'>
              {filteredPosts.length ? (
                filteredPosts
                .slice()
                .reverse()
                .map((post) => (
                  <motion.div
                  key={post._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  >
                      <Card post={post} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                  key="no-posts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  >
                  No posts match the selected tags.
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </section>
        <section>
          <AnimatePresence>
            <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              cursor: 'pointer',
            }}
          >

            {/* === Tag Toggles === */}
            <div
              className='tags_container'
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '12px',
                fontFamily: 'Arial, sans-serif'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {allTags.map((tag) => {
                const isActive = activeTags.includes(tag)
                return (
                  <div
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    {/* Tag toggle switch (same style as Work toggle) */}
                    <div 
                      className="toggle-slider"
                      style={{
                        width: '20px',
                        height: '10px',
                        backgroundColor: 'white',
                        border: isActive ? '1px solid black' : '1px solid grey',
                        opacity: '30%',
                        borderRadius: '10px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        marginTop: '0px'
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
                          left: isActive ? '11px' : '1px',
                          transition: 'left 0.3s ease'
                        }}
                        variants={{
                          hover: {
                            backgroundColor: 'black',
                            transition: { duration: 0.2, ease: "easeOut" }
                          }
                        }}
                        animate={{
                          backgroundColor: isActive ? 'black' : 'grey'
                        }}
                      />
                    </div>
                    <span style={{ color: isActive ? 'black' : 'grey' }}>{tag}</span>
                  </div>
                )
              })}
            </div>
            </div>
          </AnimatePresence>
        </section>
      </div>
    </Container>
  )
}
