import '~/styles/global.css'
import '~/styles/container.css'
import '~/styles/banner.css'
import '~/styles/carousel.css'
import '~/styles/modal.css'
import '~/styles/accordion.css'

import type { AppProps } from 'next/app'
import { IBM_Plex_Mono, Inter, Libre_Baskerville } from 'next/font/google'
import { lazy } from 'react'
import { RecoilRoot } from 'recoil'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const mono = IBM_Plex_Mono({
  variable: '--font-family-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = Inter({
  variable: '--font-family-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const serif = Libre_Baskerville({
  variable: '--font-family-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-sans: ${sans.style.fontFamily};
            --font-family-serif: ${serif.style.fontFamily};
            --font-family-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
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
