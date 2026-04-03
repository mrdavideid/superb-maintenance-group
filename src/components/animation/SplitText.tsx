'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitTextPlugin from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitTextPlugin)

interface SplitTextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  type?: 'words' | 'lines' | 'chars'
  stagger?: number
  duration?: number
  delay?: number
  y?: number
  scroll?: boolean
  start?: string
  once?: boolean
}

export default function SplitTextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  type = 'words',
  stagger = 0.04,
  duration = 0.8,
  delay = 0,
  y = 40,
  scroll = true,
  start = 'top 95%',
  once = true,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current

    const split = new SplitTextPlugin(el, {
      type: type === 'lines' ? 'lines' : type === 'chars' ? 'chars,words' : 'words',
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
    })

    const targets = type === 'lines'
      ? split.lines
      : type === 'chars'
        ? split.chars
        : split.words

    if (targets) {
      targets.forEach((t) => {
        const el = t as HTMLElement
        el.style.display = 'inline-block'
        el.style.overflow = 'hidden'
        el.style.verticalAlign = 'top'
      })
    }

    gsap.set(targets, { y, opacity: 0 })

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect()
    const alreadyInView = rect.top < window.innerHeight * 0.95

    if (!scroll || alreadyInView) {
      // Already visible or no scroll trigger — animate immediately
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out',
        delay,
      })
    } else {
      // Use ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      })

      tl.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out',
        delay,
      })
    }

    return () => {
      gsap.killTweensOf(targets)
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
      split.revert()
    }
  }, [children, type, stagger, duration, delay, y, scroll, start, once])

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  )
}
