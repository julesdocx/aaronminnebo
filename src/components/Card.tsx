import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="card">
      <div className="card__container">
        <h3 className="card__title">
          <a className="card__link" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="card__excerpt">{post.description}</p>
        <p className='card__caption'> {post.director}</p>
        {/* <p className="card__date">{formatDate(post._createdAt)}</p> */}
      </div>
      
      {post.mainImage ? (
        <Image
          className="card__cover"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          quality={60}
          alt={post.title}
        />
      ) : (
        <div className="card__cover--none" />
      )}
    </div>
  )
}
