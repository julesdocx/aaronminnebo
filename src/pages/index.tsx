import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Banner from '~/components/Banner'
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
  return (
    <Container>
      <section> 
        <Banner post={posts[posts.length - 1]}/>

        {/* <p className='padding-left'>Projects</p> */}
        {/* <hr /> */}
        <Card key={posts[1]._id} post={posts[1]} />

          {/* {posts.length ? (
            posts.reverse().map((post) => <Card key={post._id} post={post} />)
          ) : (
            <div>error Missing posts, or sanity error</div>
          )} */}
        {/* <Video/> */}
      </section>
    </Container>
  )
}
