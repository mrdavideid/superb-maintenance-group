'use client'

import { SITE } from '@/lib/constants'
import SplitTextReveal from '@/components/animation/SplitText'
import ClipReveal from '@/components/animation/ClipReveal'
import GoldLineDraw from '@/components/animation/GoldLineDraw'
import { ContactForm } from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <section className="pt-36 lg:pt-44 pb-32 lg:pb-44 bg-bg-pure min-h-screen">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {/* Left — Form */}
          <div>
            <p className="text-overline mb-6">Contact</p>
            <SplitTextReveal
              as="h1"
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-text"
              scroll={false}
            >
              Get in touch.
            </SplitTextReveal>

            <ClipReveal direction="up" delay={0.2} duration={0.8}>
              <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 mb-8 sm:mb-12">
                <div className="text-center">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-gold">6hr</span>
                  <p className="text-text-muted text-xs tracking-[0.12em] uppercase mt-1">Quotes</p>
                </div>
                <div className="w-px bg-gold/30 h-12" />
                <div className="text-center">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-gold">24hr</span>
                  <p className="text-text-muted text-xs tracking-[0.12em] uppercase mt-1">Emergency</p>
                </div>
              </div>
            </ClipReveal>

            <ClipReveal direction="up" delay={0.3} duration={0.8}>
              <ContactForm variant="full" />
            </ClipReveal>
          </div>

          {/* Right — Image + Contact Info */}
          <div className="lg:pt-24">
            <ClipReveal direction="right" duration={1}>
              <img
                src="/images/projects/darling-point-microcement/darling-point-microcement-01.webp"
                alt="Superb Maintenance Group project"
                loading="lazy"
                className="w-full object-cover img-dark mb-12"
                style={{ aspectRatio: '4/3' }}
              />
            </ClipReveal>

            <GoldLineDraw width="100%" origin="left" className="mb-8" />

            <ClipReveal direction="up" delay={0.2} duration={0.8}>
              <div className="space-y-8">
                <div>
                  <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase block mb-2">Phone</span>
                  <a href={SITE.phoneTel} className="text-text text-lg hover:text-gold transition-colors duration-300">
                    {SITE.phone}
                  </a>
                </div>
                <div>
                  <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase block mb-2">Email</span>
                  <a href={`mailto:${SITE.email}`} className="text-text text-lg hover:text-gold transition-colors duration-300">
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase block mb-2">Hours</span>
                  <p className="text-text text-lg">{SITE.hours}</p>
                </div>
                <div>
                  <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase block mb-2">Location</span>
                  <p className="text-text text-lg">{SITE.location}</p>
                </div>
                <div>
                  <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase block mb-2">Instagram</span>
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-text text-lg hover:text-gold transition-colors duration-300">
                    {SITE.instagram}
                  </a>
                </div>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
