'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import StaggerReveal from '@/components/animation/StaggerReveal'
import TapScale from '@/components/animation/TapScale'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = projects.slice(0, 6)

export function ProjectGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop horizontal scroll
  useEffect(() => {
    if (isMobile || !sectionRef.current || !trackRef.current) return

    const section = sectionRef.current
    const track = trackRef.current
    const totalWidth = track.scrollWidth - window.innerWidth

    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalWidth}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: self.progress })
          }
        },
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill()
      })
      tween.scrollTrigger?.kill()
    }
  }, [isMobile])

  return (
    <section ref={sectionRef} className="relative bg-bg">
      {/* Header */}
      <div className="pl-6 pr-6 sm:pl-8 sm:pr-8 lg:pl-16 lg:pr-16 pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-overline mb-4">Featured Work</p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-text">
              Our Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-3 text-gold text-sm font-medium tracking-widest uppercase group flex-shrink-0"
          >
            <span>View All</span>
            <span className="w-6 h-px bg-gold transition-all duration-300 group-hover:w-10" />
          </Link>
        </div>
      </div>

      {/* Mobile: Vertical card grid */}
      {isMobile ? (
        <div className="container-wide pb-12">
          <StaggerReveal className="grid grid-cols-1 gap-4" stagger={0.08}>
            {FEATURED.map((project) => (
              <TapScale key={project.slug}>
                <Link
                  href={`/projects#${project.slug}`}
                  className="group relative block overflow-hidden aspect-[16/10]"
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-active:scale-[1.02]"
                    style={{ objectPosition: 'center 30%' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-pure/80 via-bg-pure/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-gold text-[0.65rem] font-medium tracking-[0.15em] uppercase">{project.category}</span>
                    <h3 className="font-display text-lg text-text mt-1 tracking-tight">{project.title}</h3>
                    <p className="text-text-muted text-xs mt-0.5">{project.location}</p>
                  </div>
                </Link>
              </TapScale>
            ))}
          </StaggerReveal>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="btn-outline text-xs"
            >
              View All Projects
            </Link>
          </div>
        </div>
      ) : (
        /* Desktop: Horizontal scroll */
        <div className="h-[65vh] lg:h-[75vh] flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-5 lg:gap-6 h-full items-stretch pl-6 sm:pl-8 lg:pl-16"
              style={{ width: `${FEATURED.length * 45 + 10}vw` }}
            >
              {FEATURED.map((project) => (
                <div
                  key={project.slug}
                  data-card
                  className="relative flex-shrink-0 w-[55vw] lg:w-[42vw] h-full group cursor-pointer"
                >
                  <Link href={`/projects#${project.slug}`} className="block w-full h-full relative overflow-hidden">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                      style={{ objectPosition: 'center 30%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-pure/80 via-bg-pure/20 to-transparent" />
                    <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                      <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase">{project.category}</span>
                      <h3 className="font-display text-xl lg:text-2xl text-text mt-2 tracking-tight">{project.title}</h3>
                      <p className="text-text-muted text-sm mt-1">{project.location}</p>
                      <div className="flex items-center gap-2 mt-4 text-gold text-sm tracking-widest uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                        <span>View Project</span>
                        <span className="w-4 h-px bg-gold" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="container-wide py-6">
            <div className="h-px bg-border relative">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full bg-gold origin-left"
                style={{ width: '100%', transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
