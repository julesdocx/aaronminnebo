import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'

export default function AccordionItem({ post }: { post: Post }) {
  return (
    <div className="accordeon-item">
      <div className="accordion-item__container">
        <h3 className="accordion-item__title">
          <a
            className="accordion-item__link"
            href={`/post/${post.slug.current}`}
          >
            {post.title}
          </a>
        </h3>
        <p className="accordion-item__excerpt">{post.description}</p>
        <p className="accordion-item__caption"> {post.director}</p>
        {/* <p className="accordion-item__date">{formatDate(post._createdAt)}</p> */}
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
  )
}
