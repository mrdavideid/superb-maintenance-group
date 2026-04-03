'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 500, suffix: '+', label: 'Projects Completed', stars: false },
  { value: 15, suffix: '+', label: 'Years Experience', stars: false },
  { value: 24, suffix: '/7', label: 'Available', stars: false },
  { value: 5, suffix: '', label: 'Star Rated', stars: true },
]

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const numbers = el.querySelectorAll('[data-count]')
    const items = el.querySelectorAll('[data-item]')

    // Stagger items in
    gsap.set(items, { opacity: 0, y: 20 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    // Count up numbers
    numbers.forEach((numEl) => {
      const target = parseInt(numEl.getAttribute('data-count') || '0', 10)
      const obj = { val: 0 }

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          numEl.textContent = Math.round(obj.val).toString()
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [])

  return (
    <section ref={ref} className="relative py-12 sm:py-16 lg:py-20 border-y border-border/40">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-item
              className={`text-center ${
                i < STATS.length - 1 ? 'md:border-r md:border-border/20' : ''
              }`}
            >
              <div className="text-gold text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-tight">
                {stat.stars ? (
                  <div className="flex items-center justify-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#C6A962">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                ) : (
                  <>
                    <span data-count={stat.value}>0</span>
                    <span>{stat.suffix}</span>
                  </>
                )}
              </div>
              <p className="text-text-secondary text-[0.675rem] sm:text-xs font-medium tracking-[0.1em] sm:tracking-[0.12em] uppercase mt-2 sm:mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
