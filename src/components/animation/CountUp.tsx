'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current || hasAnimated) return
    const el = ref.current

    // Check if already in viewport
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()

    function animate() {
      setHasAnimated(true)
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease out quad
        const eased = 1 - (1 - progress) * (1 - progress)
        const current = Math.round(eased * target)
        if (el) el.textContent = `${prefix}${current}${suffix}`
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }, [target, suffix, prefix, duration, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
