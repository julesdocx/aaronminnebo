import { useState } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Modal from '~/components/Modal';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[];
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const posts = await getPosts(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  };
};

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery);

  // State to manage the visibility of header__content
  const [isHeaderContentVisible, setHeaderContentVisible] = useState(false);

  // Toggle function for header__content
  const toggleHeaderContent = () => {
    setHeaderContentVisible((prevState) => !prevState);
  };

  return (
    <section>
      <motion.div className="header"
      animate={isHeaderContentVisible ? { width:650 } : {  width:350 }}>
        <div
          className="header__title"
          onClick={toggleHeaderContent}
          style={{ cursor: 'pointer' }}
        >
          <h1>AaronMinnebo</h1>
          <span>{isHeaderContentVisible ? '-' : '+'}</span>
        </div>

        {/* AnimatePresence wraps conditional rendering to enable exit animations */}
        <AnimatePresence>
          {isHeaderContentVisible && (
            <motion.div
              className="header__content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p>
                I am Aaron Minnebo, a film editor based in Belgium. Since
                graduating from RITCS, the Royal Institute of Theater, Film and
                Sound in Brussels in 2023 with a master's degree in Editing, I
                have had the pleasure of editing a variety of formats, including
                fiction, documentary and hybrid short films. My work experience
                has also given me the opportunity to work for several directors
                as an assistant, extra editor and researcher.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Modal posts={posts} />
    </section>
  );
}
