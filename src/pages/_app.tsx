import '~/styles/global.css'
import '~/styles/container.css'
import '~/styles/banner.css'
import '~/styles/carousel.css'
import '~/styles/modal.css'
import '~/styles/accordion.css'

import type { AppProps } from 'next/app'
import { lazy } from 'react'
import { RecoilRoot } from 'recoil'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {draftMode ? (
        <RecoilRoot>
          <PreviewProvider token={token}>
            <Component {...pageProps} />
          </PreviewProvider>
        </RecoilRoot>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
