'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GoldLineDDrawProps {
  className?: string
  /** Width of the line relative to container. Default '60%'. */
  width?: string
  duration?: number
  delay?: number
  start?: string
  /** 'center' draws from centre outward, 'left' from left to right */
  origin?: 'center' | 'left' | 'right'
}

export default function GoldLineDraw({
  className = '',
  width = '60%',
  duration = 1.2,
  delay = 0,
  start = 'top 85%',
  origin = 'center',
}: GoldLineDDrawProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const transformOrigin = origin === 'center' ? 'center center'
      : origin === 'left' ? 'left center'
      : 'right center'

    gsap.set(el, { scaleX: 0, transformOrigin })

    const tween = gsap.to(el, {
      scaleX: 1,
      duration,
      delay,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [duration, delay, start, origin])

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        ref={ref}
        style={{ width }}
        className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
    </div>
  )
}
