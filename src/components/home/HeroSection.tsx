'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const HeroCityscape = dynamic(
  () => import('./HeroCityscape').then((mod) => ({ default: mod.HeroCityscape })),
  { ssr: false }
)

export function HeroSection() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const HERO_HEIGHT = window.innerHeight * 4

    const handleScroll = () => {
      if (!overlayRef.current) return
      const y = window.scrollY
      const t = Math.min(1, y / HERO_HEIGHT)

      const textEl = overlayRef.current.querySelector('[data-hero-text]') as HTMLElement
      const scrollEl = overlayRef.current.querySelector('[data-hero-scroll]') as HTMLElement

      // Text fades out in first 20% of scroll
      const textOpacity = Math.max(0, 1 - t * 5)
      if (textEl) textEl.style.opacity = String(textOpacity)
      if (scrollEl) scrollEl.style.opacity = String(textOpacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ height: '400vh' }} className="relative">
      {/* Sticky container holds both canvas and overlay */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Three.js canvas */}
        <HeroCityscape />

        {/* Overlays */}
        <div ref={overlayRef} className="absolute inset-0 z-[1] pointer-events-none">
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Hero text */}
          <div
            data-hero-text
            className="absolute inset-0 flex justify-center items-center"
          >
            <div className="text-center px-6">
              <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] tracking-[0.04em] leading-[1.02] text-text uppercase">
                Maintaining<br />
                Excellence<span className="text-gold">.</span>
              </h1>
              <p className="text-overline mt-8 text-text-secondary/60 tracking-[0.4em]">
                Residential &amp; Commercial Maintenance
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            data-hero-scroll
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-px h-10 bg-gradient-to-b from-text-secondary/50 to-transparent animate-pulse" />
            <span className="text-[0.7rem] font-normal tracking-[0.3em] uppercase text-text-muted/40">Scroll</span>
          </div>
        </div>

        {/* Gradient transition to content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-pure to-transparent" />
      </div>
    </div>
  )
}
