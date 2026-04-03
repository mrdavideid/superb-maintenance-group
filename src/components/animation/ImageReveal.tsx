'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ImageRevealProps {
  children: ReactNode
  direction?: 'up' | 'center' | 'left'
  duration?: number
  delay?: number
  className?: string
}

export function ImageReveal({
  children,
  direction = 'up',
  duration = 1.2,
  delay = 0,
  className = '',
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const clipPaths = {
    up: 'inset(100% 0 0 0)',
    center: 'inset(50% 50% 50% 50%)',
    left: 'inset(0 100% 0 0)',
  }

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        clipPath: isVisible ? 'inset(0)' : clipPaths[direction],
        transition: `clip-path ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
