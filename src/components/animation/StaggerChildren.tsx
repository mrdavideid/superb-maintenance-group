'use client'

import { useEffect, useRef, useState, type ReactNode, Children, cloneElement, isValidElement } from 'react'

interface StaggerChildrenProps {
  children: ReactNode
  stagger?: number
  className?: string
}

export function StaggerChildren({
  children,
  stagger = 0.08,
  className = '',
}: StaggerChildrenProps) {
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

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        const existingStyle = (child.props as any)?.style || {}
        return cloneElement(child as React.ReactElement<any>, {
          style: {
            ...existingStyle,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(40px)',
            transition: `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * stagger}s, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * stagger}s`,
          },
        })
      })}
    </div>
  )
}
