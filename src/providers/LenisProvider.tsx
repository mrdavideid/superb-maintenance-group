'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    setLenis(instance)

    // Connect Lenis scroll to GSAP ScrollTrigger
    instance.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Use GSAP ticker for Lenis RAF
    const rafCallback = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after everything mounts — multiple refreshes for late-mounting components
    const refreshTimer1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const refreshTimer2 = setTimeout(() => ScrollTrigger.refresh(), 1000)

    return () => {
      clearTimeout(refreshTimer1)
      clearTimeout(refreshTimer2)
      gsap.ticker.remove(rafCallback)
      instance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
