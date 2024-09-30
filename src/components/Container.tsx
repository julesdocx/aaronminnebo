import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLong, setIsLong] = useState(true)

  useEffect(() => {
    // Only trigger the animation when transitioning to or from the root
    if (router.pathname === '/') {
      setIsLong(true)
    } else {
      setIsLong(false)
    }
  }, [router.pathname])


  return (
    <div className="container">
      <header className="header">
        {/* Title changes depending on whether the path is root or not */}
        <Link href="/" className={`header__title ${isLong ? 'long' : 'short'}`}>
          {isLong ? (
            "AaronMinnebo"
          ) : (
            <div className="back-button">{String.fromCharCode(8592)} AaronMinnebo</div>
          )}
        </Link>
        {/* <nav className="header__nav">
          <Link className="header__button" href="/projects">Projects</Link>
          <Link className="header__button" href="/profile">Profile</Link>
        </nav> */}
      </header>
      <main>{children}</main>
            {/* <footer className="footer">
        <p className="footer__text">
          Designed and developed with {' '}
          <svg
            datasanity-icon="heart-filled"
            width="1em"
            height="1em"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
            ></path>
          </svg>{' '}
          by Jules Docx
        </p>
      </footer> */}
    </div>
  )
}
