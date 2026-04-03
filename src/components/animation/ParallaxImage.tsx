'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  aspect?: string
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.2,
  className = '',
  aspect = '4/3',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    gsap.to(imageRef.current, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill()
      })
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div
        ref={imageRef}
        className="w-full h-[120%] -mt-[10%] bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
    </div>
  )
}
