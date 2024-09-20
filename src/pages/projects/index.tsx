import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

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

export default function ProjectsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {

  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  return (
    <Container>
      <section>
        {posts.length ? (
          posts.map((post) => 
            <div className='project' key={post._id}>
              <h2 className='project__title'>{post.title}</h2>
              <p className='project__subtitle'>{post.subtitle}</p>
              <p className='project__description'>{post.description}</p>
            </div> 
          )
        ) : (
          <div>error Missing posts, or sanity error</div>
        )}
      </section>
    </Container>
  )
}
