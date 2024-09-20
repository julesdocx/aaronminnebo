import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'

export default function Banner({ post }: { post: Post }) {
  return (
    <div>
        <div className="banner">
            <div className='banner__background'>
                {post.mainImage ? (
                    <Image
                    loading = 'lazy'
                    className="banner__cover"
                    src={urlForImage(post.mainImage).url()}
                    alt={post.title}
                    fill
                    priority={false} 
                    />
                ) : (
                    <div className="banner__cover--none" />
                )}
            </div>
        </div>
        <div className="banner__container">
            <p className="banner__subtitle">Antwerp</p>
            <h3 className="banner__title">
                Film editor
            </h3>
            {/* <p className="banner__description">{post.description}</p> */}
        </div>
    </div>
  )
}
