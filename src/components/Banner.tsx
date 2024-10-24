import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'

import Video from './Video'

export default function Banner({ post }: { post: Post }) {
  return (
    <div>
        <div className="banner">
            <div className='banner__background'>
                <Video />
            </div>
        </div>
        <div className="banner__container">
        </div>
    </div>
  )
}
