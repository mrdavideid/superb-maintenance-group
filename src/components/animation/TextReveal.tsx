'use client'

import { useEffect, useRef, useState } from 'react'

interface TextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  splitBy?: 'chars' | 'words'
  className?: string
  delay?: number
}

export function TextReveal({
  text,
  as: Tag = 'h2',
  splitBy = 'words',
  className = '',
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

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

  const units = splitBy === 'chars' ? text.split('') : text.split(' ')
  const stagger = splitBy === 'chars' ? 0.03 : 0.06

  return (
    <Tag
      ref={containerRef as any}
      className={`${className} overflow-hidden`}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(30px)',
            transition: `opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + i * stagger}s, transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + i * stagger}s`,
          }}
        >
          {unit}
          {splitBy === 'words' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
