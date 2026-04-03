'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  selector?: string
  stagger?: number
  duration?: number
  delay?: number
  y?: number
  start?: string
  once?: boolean
}

export default function StaggerReveal({
  children,
  className = '',
  selector = ':scope > *',
  stagger = 0.1,
  duration = 0.8,
  delay = 0,
  y = 30,
  start = 'top 95%',
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const targets = el.querySelectorAll(selector)

    gsap.set(targets, { y, opacity: 0 })

    // Check if already in viewport
    const rect = el.getBoundingClientRect()
    const alreadyInView = rect.top < window.innerHeight * 0.95

    if (alreadyInView) {
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power2.out',
      })
      return
    }

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power2.out',
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
  }, [selector, stagger, duration, delay, y, start, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
