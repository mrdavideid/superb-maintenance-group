'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import ClipReveal from '@/components/animation/ClipReveal'
import SplitTextReveal from '@/components/animation/SplitText'

const PROJECTS = [
  {
    title: 'Arncliffe Bedroom Renovation',
    location: 'Arncliffe',
    duration: '8 Days',
    scope: 'Full Renovation',
    before: '/images/projects/arncliffe-renovation/arncliffe-renovation-08.webp',
    after: '/images/projects/arncliffe-renovation/arncliffe-renovation-01.webp',
  },
  {
    title: 'Arncliffe Wardrobe Build',
    location: 'Arncliffe',
    duration: '3 Days',
    scope: 'Custom Joinery',
    before: '/images/projects/arncliffe-renovation/arncliffe-renovation-05.webp',
    after: '/images/projects/arncliffe-renovation/arncliffe-renovation-16.webp',
  },
  {
    title: 'Pyrmont Facade Remediation',
    location: 'Pyrmont',
    duration: '2 Weeks',
    scope: 'Exterior Remedial',
    before: '/images/projects/pyrmont-remedial/pyrmont-remedial-03.webp',
    after: '/images/projects/pyrmont-remedial/pyrmont-remedial-17.webp',
  },
]

export function BeforeAfter() {
  const [active, setActive] = useState(0)

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % PROJECTS.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const project = PROJECTS[active]

  return (
    <section className="py-16 lg:py-24 bg-bg">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-overline mb-4">The Difference</p>
          <SplitTextReveal
            as="h2"
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-text"
          >
            See the Transformation
          </SplitTextReveal>
        </div>

        {/* Slider */}
        <ClipReveal direction="center" duration={1.2}>
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={project.before}
                      alt={`${project.title} — Before`}
                      style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={project.after}
                      alt={`${project.title} — After`}
                      style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                    />
                  }
                  handle={
                    <div className="flex flex-col items-center h-full">
                      <div className="w-px h-full bg-gold" />
                      <div className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-gold bg-bg-pure/80 backdrop-blur-sm flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 8H12M4 8L6 6M4 8L6 10M12 8L10 6M12 8L10 10" stroke="#C6A962" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  }
                  style={{ aspectRatio: '16/10' }}
                  className="rounded-none"
                />

                {/* Labels */}
                <div className="flex justify-between mt-4">
                  <span className="text-text-muted text-xs font-medium tracking-[0.15em] uppercase">Before</span>
                  <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase">After</span>
                </div>

                {/* Project stats */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 lg:gap-20 mt-8">
                  {[
                    { value: project.location, label: 'Location' },
                    { value: project.duration, label: 'Duration' },
                    { value: project.scope, label: 'Scope' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-text font-semibold text-lg">{stat.value}</p>
                      <p className="text-text-muted text-xs tracking-[0.12em] uppercase mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-10">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-gold w-8' : 'w-2 bg-text-secondary/30 hover:bg-text-secondary/60'
                  }`}
                  aria-label={`View project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
