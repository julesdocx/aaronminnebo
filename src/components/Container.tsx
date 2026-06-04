import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Container({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLong, setIsLong] = useState(true)
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)

  useEffect(() => {
    // Only trigger the animation when transitioning to or from the root
    if (router.pathname === '/') {
      setIsLong(true)
    } else {
      setIsLong(false)
    }
  }, [router.pathname])

  const toggleHeader = () => {
    setIsHeaderExpanded(!isHeaderExpanded)
  }

  return (
    <div className={`container ${!isHeaderExpanded ? 'header-collapsed' : ''}`}>
      <main>{children}</main>
    </div>
  )
}