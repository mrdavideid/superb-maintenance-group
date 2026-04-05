'use client'

import Link from 'next/link'
import SplitTextReveal from '@/components/animation/SplitText'
import ClipReveal from '@/components/animation/ClipReveal'
import MagneticButton from '@/components/animation/MagneticButton'
import GoldLineDraw from '@/components/animation/GoldLineDraw'
import { SITE } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Subtle radial gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198, 169, 98, 0.06) 0%, transparent 70%)',
        }}
      />

      <GoldLineDraw width="40%" className="mb-16" />

      <div className="container-wide relative z-10 text-center">
        <p className="text-overline mb-6">Get in Touch</p>

        <SplitTextReveal
          as="h2"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] tracking-tight text-text max-w-2xl mx-auto"
          stagger={0.03}
        >
          Let's Maintain Excellence
        </SplitTextReveal>

        <ClipReveal direction="up" delay={0.3} duration={0.8}>
          <p className="text-text-secondary text-lg mt-6 max-w-md mx-auto">
            Speak with our team. We respond within 6 hours, 7 days a week.
          </p>
        </ClipReveal>

        <ClipReveal direction="up" delay={0.5} duration={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <MagneticButton strength={4}>
              <Link
                href="/contact"
                className="btn-primary btn-shimmer"
              >
                Enquire
              </Link>
            </MagneticButton>

            <MagneticButton strength={3}>
              <a
                href={SITE.phoneTel}
                className="btn-outline"
              >
                {SITE.phone}
              </a>
            </MagneticButton>
          </div>
        </ClipReveal>
      </div>

      <GoldLineDraw width="40%" className="mt-16" />
    </section>
  )
}
