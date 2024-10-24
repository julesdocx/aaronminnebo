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
            <div className="back-button">&larr; AaronMinnebo</div>
          )}
        </Link>

        <nav className="header__nav">
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
