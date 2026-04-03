'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Direction = 'up' | 'down' | 'left' | 'right' | 'center'

interface ClipRevealProps {
  children: ReactNode
  className?: string
  direction?: Direction
  duration?: number
  delay?: number
  ease?: string
  start?: string
  once?: boolean
  scale?: number
}

function getClipPath(direction: Direction): string {
  switch (direction) {
    case 'up': return 'inset(100% 0% 0% 0%)'
    case 'down': return 'inset(0% 0% 100% 0%)'
    case 'left': return 'inset(0% 100% 0% 0%)'
    case 'right': return 'inset(0% 0% 0% 100%)'
    case 'center': return 'inset(50% 50% 50% 50%)'
  }
}

export default function ClipReveal({
  children,
  className = '',
  direction = 'up',
  duration = 1,
  delay = 0,
  ease = 'power3.inOut',
  start = 'top 95%',
  once = true,
  scale,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const fromClip = getClipPath(direction)

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect()
    const alreadyInView = rect.top < window.innerHeight * 0.95

    if (alreadyInView) {
      // Already visible — animate immediately without ScrollTrigger
      gsap.set(el, { clipPath: fromClip, ...(scale ? { scale } : {}) })
      gsap.to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ...(scale ? { scale: 1 } : {}),
        duration,
        delay,
        ease,
      })
      return
    }

    // Not yet in view — use ScrollTrigger
    gsap.set(el, { clipPath: fromClip, ...(scale ? { scale } : {}) })

    const tween = gsap.to(el, {
      clipPath: 'inset(0% 0% 0% 0%)',
      ...(scale ? { scale: 1 } : {}),
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [direction, duration, delay, ease, start, once, scale])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
