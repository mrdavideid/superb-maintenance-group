'use client'

import Link from 'next/link'
import SplitTextReveal from '@/components/animation/SplitText'
import ClipReveal from '@/components/animation/ClipReveal'
import GoldLineDraw from '@/components/animation/GoldLineDraw'

export function AboutPreview() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background watermark */}
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        SUPERB
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image — asymmetric offset */}
          <ClipReveal direction="left" duration={1.2}>
            <div className="relative">
              <div className="img-scale-container aspect-[4/5] lg:aspect-[3/4]">
                <img
                  src="/images/team/team-01.jpg"
                  alt="Superb Maintenance Group team"
                  className="w-full h-full object-cover img-dark"
                />
              </div>
            </div>
          </ClipReveal>

          {/* Text content */}
          <div className="lg:pl-4">
            <p className="text-overline mb-6">About Us</p>

            <SplitTextReveal
              as="h2"
              className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-tight text-text"
              stagger={0.03}
              delay={0.2}
            >
              Built on Family. Driven by Craft.
            </SplitTextReveal>

            <ClipReveal direction="up" delay={0.4} duration={0.8}>
              <p className="text-text-secondary text-lg leading-relaxed mt-8 max-w-lg">
                The Pencarinha family has been maintaining Sydney properties for over 15 years.
                From remedial facade work to luxury microcement finishes, we bring old-world
                craftsmanship to modern construction.
              </p>
            </ClipReveal>

            <ClipReveal direction="up" delay={0.6} duration={0.8}>
              <div className="mt-10">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-gold text-sm font-medium tracking-widest uppercase"
                >
                  <span>Our Story</span>
                  <span className="w-8 h-px bg-gold transition-all duration-300 group-hover:w-12" />
                </Link>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>

      {/* Section closer */}
      <div className="mt-24 lg:mt-32">
        <GoldLineDraw width="50%" />
      </div>
    </section>
  )
}
