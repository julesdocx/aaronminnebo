import AccordionItem from './AccordionItem';
import { type Post } from '~/lib/sanity.queries';

export default function Accordeon({ posts }: { posts: Post[] }) {
  return (
    <div className="Accordion">
      {posts.length ? (
        posts
          .reverse()
          .map((post) => <AccordionItem key={post._id} post={post} />)
      ) : (
        <div>error Missing posts, or sanity error</div>
      )}
    </div>
  )
}
