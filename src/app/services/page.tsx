import { services } from '@/data/services'
import Link from 'next/link'
import SplitTextReveal from '@/components/animation/SplitText'
import ClipReveal from '@/components/animation/ClipReveal'
import GoldLineDraw from '@/components/animation/GoldLineDraw'
import { CTASection } from '@/components/home/CTASection'

export const metadata = {
  title: 'Services',
  description: 'The most comprehensive range of property maintenance services under one roof. Renovations, rendering, tiling, microcement, painting, and more across Sydney.',
}

const serviceFallbackImages: Record<string, string> = {
  'general-maintenance': '/images/projects/pyrmont-remedial/pyrmont-remedial-01.webp',
  'end-of-lease': '/images/projects/arncliffe-renovation/arncliffe-renovation-01.webp',
  'renovations': '/images/projects/arncliffe-renovation/arncliffe-renovation-03.webp',
  'rendering': '/images/projects/surry-hills-facade/surry-hills-facade-01.webp',
  'tiling': '/images/projects/darling-point-microcement/darling-point-microcement-01.webp',
  'gyprocking': '/images/projects/pyrmont-ceiling/pyrmont-ceiling-01.webp',
  'garden-maintenance': '/images/projects/naremburn-gate/naremburn-gate-01.webp',
  'concreting': '/images/projects/naremburn-gate/naremburn-gate-03.webp',
  'painting': '/images/projects/eastlakes-ceiling/eastlakes-ceiling-01.webp',
  'caulking': '/images/projects/pyrmont-remedial/pyrmont-remedial-05.webp',
  'pressure-washing': '/images/projects/artarmon-brick/artarmon-brick-01.webp',
  'microcement': '/images/projects/zetland-microcement/zetland-microcement-01.webp',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-bg-pure">
        <div className="container-wide">
          <p className="text-overline mb-6">Our Services</p>
          <SplitTextReveal
            as="h1"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-text"
            scroll={false}
          >
            Every trade. One team.
          </SplitTextReveal>
          <ClipReveal direction="up" delay={0.3} duration={0.8}>
            <p className="text-text-secondary text-lg mt-8 max-w-2xl">
              The most comprehensive range of services under one roof. Top-tier
              workmanship at competitive rates, delivered without compromise.
            </p>
          </ClipReveal>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-bg-pure pb-16 lg:pb-24">
        <div className="container-wide">
          {services.map((service, i) => {
            const isEven = i % 2 === 0
            return (
              <div key={service.slug} id={service.slug}>
                <GoldLineDraw width="100%" origin="left" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center py-14 sm:py-20 lg:py-28">
                  {/* Image */}
                  <ClipReveal
                    direction={isEven ? 'left' : 'right'}
                    duration={1}
                    className={isEven ? 'lg:order-1' : 'lg:order-2'}
                  >
                    <div className="img-scale-container">
                      <img
                        src={service.image || serviceFallbackImages[service.slug]}
                        alt={service.title}
                        loading="lazy"
                        className="w-full object-cover"
                        style={{ aspectRatio: '3/4', objectPosition: 'center 30%' }}
                      />
                    </div>
                  </ClipReveal>

                  {/* Content */}
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <p className="text-overline mb-4">{service.category}</p>
                    <SplitTextReveal
                      as="h2"
                      className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-text"
                      delay={0.1}
                    >
                      {service.title}
                    </SplitTextReveal>
                    <ClipReveal direction="up" delay={0.2} duration={0.8}>
                      <p className="text-text-secondary text-base leading-relaxed mt-6">
                        {service.shortDescription}
                      </p>
                    </ClipReveal>
                    <ClipReveal direction="up" delay={0.3} duration={0.8}>
                      <div className="mt-6">
                        <Link href="/contact" className="btn-outline text-sm">
                          Enquire
                        </Link>
                      </div>
                    </ClipReveal>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <CTASection />
    </>
  )
}
