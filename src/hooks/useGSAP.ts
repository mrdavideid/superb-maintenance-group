'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook for GSAP animations with automatic cleanup.
 * Pass a callback that creates your GSAP animations.
 * They will be automatically killed on unmount.
 */
export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: any[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      callback(ctx as unknown as gsap.Context)
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
