'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/services'
import ClipReveal from '@/components/animation/ClipReveal'
import StaggerReveal from '@/components/animation/StaggerReveal'
import TapScale from '@/components/animation/TapScale'

gsap.registerPlugin(ScrollTrigger)

const FEATURED_SERVICES = services.slice(0, 6)

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop pinned scroll
  useEffect(() => {
    if (isMobile || !sectionRef.current) return

    const section = sectionRef.current
    const totalServices = FEATURED_SERVICES.length

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalServices * 100}%`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        const activeIndex = Math.min(
          Math.floor(progress * totalServices),
          totalServices - 1
        )

        imageRefs.current.forEach((img, i) => {
          if (!img) return
          if (i === activeIndex) {
            gsap.to(img, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.5, overwrite: true })
          } else {
            gsap.to(img, { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0, duration: 0.5, overwrite: true })
          }
        })

        textRefs.current.forEach((text, i) => {
          if (!text) return
          if (i === activeIndex) {
            gsap.to(text, { opacity: 1, y: 0, duration: 0.4, overwrite: true })
          } else {
            gsap.to(text, { opacity: 0, y: i < activeIndex ? -20 : 20, duration: 0.3, overwrite: true })
          }
        })

        if (progressRef.current) {
          gsap.to(progressRef.current, { scaleX: (activeIndex + 1) / totalServices, duration: 0.3, overwrite: true })
        }
        if (counterRef.current) {
          counterRef.current.textContent = String(activeIndex + 1).padStart(2, '0')
        }
      },
    })

    // Set initial states
    imageRefs.current.forEach((img, i) => {
      if (!img) return
      gsap.set(img, i === 0 ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 })
    })
    textRefs.current.forEach((text, i) => {
      if (!text) return
      gsap.set(text, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })
    })

    return () => { pinTrigger.kill() }
  }, [isMobile])

  // Header (shared)
  const Header = () => (
    <div className="container-wide pt-16 sm:pt-20 lg:pt-28 pb-6 sm:pb-8 flex items-end justify-between">
      <div>
        <p className="text-overline mb-4">Our Services</p>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-text">
          Complete Property<br />Maintenance Solutions
        </h2>
      </div>
      <Link
        href="/services"
        className="hidden sm:inline-flex items-center gap-3 text-gold text-sm font-medium tracking-widest uppercase group"
      >
        <span>All Services</span>
        <span className="w-6 h-px bg-gold transition-all duration-300 group-hover:w-10" />
      </Link>
    </div>
  )

  // Mobile: simple vertical card list
  if (isMobile) {
    return (
      <section className="bg-bg">
        <Header />
        <div className="container-wide pb-12">
          <StaggerReveal className="flex flex-col gap-4 sm:gap-6" stagger={0.1}>
            {FEATURED_SERVICES.map((service) => (
              <TapScale key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex gap-4 items-center"
                >
                  <ClipReveal direction="left" duration={0.8} className="flex-shrink-0 w-28 h-28 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </ClipReveal>
                <div className="flex-1 min-w-0">
                  <span className="text-gold text-[0.65rem] font-medium tracking-widest uppercase">
                    {service.category}
                  </span>
                  <h3 className="font-display text-base text-text mt-1 tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed mt-1 line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>
                </Link>
              </TapScale>
            ))}
          </StaggerReveal>
          <div className="mt-8 text-center">
            <Link href="/services" className="btn-outline text-xs">
              All Services
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Desktop: pinned scroll showcase
  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] lg:h-screen w-full bg-bg overflow-hidden"
    >
      <div className="container-wide h-full flex flex-col">
        <Header />

        <div className="flex-1 grid grid-cols-2 gap-8 lg:gap-12 min-h-0 pb-20 lg:pb-24">
          {/* Image stack */}
          <div className="relative overflow-hidden h-full">
            {FEATURED_SERVICES.map((service, i) => (
              <div
                key={service.slug}
                ref={el => { imageRefs.current[i] = el }}
                className="absolute inset-0"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
              </div>
            ))}
          </div>

          {/* Text stack */}
          <div className="relative flex flex-col justify-center">
            {FEATURED_SERVICES.map((service, i) => (
              <div
                key={service.slug}
                ref={el => { textRefs.current[i] = el }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
                  {service.category}
                </span>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-text mb-5">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-md mb-8">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services#${service.slug}`}
                  className="group inline-flex items-center gap-3 text-gold text-sm font-medium tracking-widest uppercase"
                >
                  <span>Learn More</span>
                  <span className="w-6 h-px bg-gold transition-all duration-300 group-hover:w-10" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="pb-8 lg:pb-10">
          <div className="flex items-center gap-4">
            <span ref={counterRef} className="text-gold text-sm font-medium tracking-wider">01</span>
            <div className="flex-1 h-px bg-border relative">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full bg-gold origin-left"
                style={{ width: '100%', transform: 'scaleX(0.166)' }}
              />
            </div>
            <span className="text-text-muted text-sm font-medium tracking-wider">
              {String(FEATURED_SERVICES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
