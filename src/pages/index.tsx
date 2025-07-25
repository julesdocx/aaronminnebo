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

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    tags: string[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  // ✅ Extract unique tags from post tags (strings)
  const tagSet = new Set<string>()
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag))
  })
  const tags = Array.from(tagSet)

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
  const [expandAll, setExpandAll] = useState(false)

  // ✅ All tags (as strings)
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || [])))

  const toggleExpandAll = () => {
    setExpandAll((prev) => !prev)
  }

  useEffect(() => {
    const urlTags = router.query.tags
    if (typeof urlTags === 'string') {
      const tagsFromUrl = urlTags.split(',').filter(Boolean)
      setActiveTags(tagsFromUrl)
    }
  }, [router.query.tags])

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

  const sortedPosts = filteredPosts
  .slice() // clone to avoid mutating original
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse()

  return (
    <Container>
      <div id="mainDiv">
        <section>
          <AnimatePresence mode="popLayout">
            <div className="posts__container">
              {sortedPosts.length ? (
                sortedPosts
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
                      <Card post={post} expandAll={expandAll} />
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
                className="tags_container"
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginTop: '12px',
                  fontFamily: 'Arial, sans-serif',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                     { (
                       <div
                      onClick={toggleExpandAll}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                      }}
                    >
                     <div
                        className="toggle-slider"
                        style={{
                          width: '20px',
                          height: '10px',
                          backgroundColor: 'white',
                          border: expandAll
                            ? '1px solid black'
                            : '1px solid grey',
                          opacity: '30%',
                          borderRadius: '10px',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
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
                            left: expandAll ? '11px' : '1px',
                            transition: 'left 0.3s ease',
                          }}
                          animate={{
                            backgroundColor: expandAll ? 'black' : 'grey',
                          }}
                        />
                      </div>
                      <span style={{ color: expandAll ? 'black' : 'grey' }}>
                        Collapse All
                      </span>
                    </div>
                    )}
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
                      <div
                        className="toggle-slider"
                        style={{
                          width: '20px',
                          height: '10px',
                          backgroundColor: 'white',
                          border: isActive
                            ? '1px solid black'
                            : '1px solid grey',
                          opacity: '30%',
                          borderRadius: '10px',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
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
                            transition: 'left 0.3s ease',
                          }}
                          animate={{
                            backgroundColor: isActive ? 'black' : 'grey',
                          }}
                        />
                      </div>
                      <span style={{ color: isActive ? 'black' : 'grey' }}>
                        {tag}
                      </span>
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
