'use client'

import { testimonials } from '@/data/testimonials'
import SplitTextReveal from '@/components/animation/SplitText'
import ClipReveal from '@/components/animation/ClipReveal'

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#C6A962">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function TestimonialCard({ quote, author, company, rating }: typeof testimonials[number]) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-bg-elevated border border-border hover:border-gold/30 transition-all duration-400 p-6 sm:p-7 flex flex-col">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-text text-[0.8125rem] sm:text-sm leading-relaxed font-light flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 pt-3 border-t border-border/50">
        <p className="text-gold text-sm font-medium tracking-wide">{author}</p>
        {company && (
          <p className="text-text-muted text-xs mt-1">{company}</p>
        )}
      </div>
    </div>
  )
}

export function TestimonialSlider() {
  // Both rows use all testimonials but in different order for variety
  const row1 = [...testimonials, ...testimonials]
  const row2Reversed = [...testimonials].reverse()
  const row2 = [...row2Reversed, ...row2Reversed]

  return (
    <section className="py-16 lg:py-24 bg-bg-elevated/30 relative overflow-hidden">
      <div className="container-wide mb-10 lg:mb-14">
        <div className="text-center">
          <p className="text-overline mb-4">What Our Clients Say</p>
          <SplitTextReveal
            as="h2"
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-text"
          >
            Trusted Across Sydney
          </SplitTextReveal>
        </div>
      </div>

      {/* Row 1 — scrolls LEFT */}
      <ClipReveal direction="up" duration={0.8}>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg-pure to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg-pure to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
            {row1.map((t, i) => (
              <TestimonialCard key={`r1-${t.author}-${i}`} {...t} />
            ))}
          </div>
        </div>
      </ClipReveal>

      {/* Row 2 — scrolls RIGHT (reverse direction) */}
      <ClipReveal direction="up" duration={0.8} delay={0.15}>
        <div className="relative mt-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg-pure to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg-pure to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee-reverse hover:[animation-play-state:paused]">
            {row2.map((t, i) => (
              <TestimonialCard key={`r2-${t.author}-${i}`} {...t} />
            ))}
          </div>
        </div>
      </ClipReveal>

      {/* Google rating badge */}
      <div className="container-wide mt-10 lg:mt-14 text-center">
        <div className="inline-flex items-center gap-3 text-text-muted text-sm">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
          </div>
          <span>5.0 on Google &middot; {testimonials.length}+ Reviews</span>
        </div>
      </div>
    </section>
  )
}
