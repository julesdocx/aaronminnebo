import Image from 'next/image'

import Video from './Video'
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
                {/* <Video /> */}
            </div>
        </div>
        <div className="banner__container">
            <p>I am Aaron Minnebo, a film editor based in Belgium. Since graduating from <span>RITCS</span>, the Royal Institute of Theater, Film and Sound in Brussels in 2023 with a master's degree in Editing, I have had the pleasure of editing a variety of formats, including fiction, documentary and hybrid short films. My work experience has also given me the opportunity to work for several directors as an assistant, extra editor and researcher.</p>

            {/* <p className="banner__description">{post.description}</p> */}
        </div>
    </div>
  )
}
