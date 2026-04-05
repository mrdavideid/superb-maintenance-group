import { team } from '@/data/team'
import SplitTextReveal from '@/components/animation/SplitText'
import ClipReveal from '@/components/animation/ClipReveal'
import StaggerReveal from '@/components/animation/StaggerReveal'
import GoldLineDraw from '@/components/animation/GoldLineDraw'
import { CTASection } from '@/components/home/CTASection'

export const metadata = {
  title: 'About',
  description: 'Meet the Pencarinha family behind Superb Maintenance Group. Generations of trade expertise combined with formal qualifications in construction, business, and law.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-bg-pure">
        <div className="container-wide">
          <p className="text-overline mb-6">Our Story</p>
          <SplitTextReveal
            as="h1"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-text"
            scroll={false}
          >
            A family trade. A modern standard.
          </SplitTextReveal>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-bg-pure pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <ClipReveal direction="left" duration={1.2}>
              <div className="img-scale-container">
                <img
                  src="/images/team/team-02.jpg"
                  alt="Superb Maintenance Group team"
                  loading="lazy"
                  className="w-full object-cover img-dark"
                  style={{ aspectRatio: '4/5' }}
                />
              </div>
            </ClipReveal>

            <div>
              <ClipReveal direction="up" duration={0.8}>
                <p className="text-text text-lg leading-relaxed">
                  Superb Maintenance Group was born from a simple belief: property maintenance
                  shouldn&apos;t mean compromising on quality. Founded by the Pencarinha family,
                  our roots in the building trades run deep — skills passed from father to sons,
                  refined over decades of hands-on work across Sydney.
                </p>
              </ClipReveal>
              <ClipReveal direction="up" delay={0.1} duration={0.8}>
                <p className="text-text-secondary text-base leading-relaxed mt-5">
                  What sets us apart is the combination of that trade heritage with formal
                  qualifications in construction management, business, and law. We don&apos;t just
                  fix buildings — we understand the regulatory landscape, manage projects with
                  rigour, and build relationships based on trust and accountability.
                </p>
              </ClipReveal>
              <ClipReveal direction="up" delay={0.2} duration={0.8}>
                <p className="text-text-secondary text-base leading-relaxed mt-5">
                  Today, we serve real estate agencies, strata managers, and property owners
                  across Sydney with the most comprehensive range of services under one roof.
                </p>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-elevated/50 section-padding">
        <div className="container-wide">
          <p className="text-overline text-center mb-6">What We Stand For</p>
          <SplitTextReveal
            as="h2"
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-text text-center"
          >
            Our Values
          </SplitTextReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16" stagger={0.12}>
            {[
              { title: 'Honest Pricing', desc: 'Competitive rates with no hidden costs. We quote fairly and deliver on budget.' },
              { title: 'Constant Improvement', desc: 'We invest in our skills and certifications to stay at the forefront of our trade.' },
              { title: 'Quality Craft', desc: 'Every project meets the highest standards — no shortcuts, no compromises.' },
              { title: 'Trust & Accountability', desc: 'We show up on time, communicate clearly, and stand behind our work.' },
            ].map((value) => (
              <div key={value.title} className="text-center lg:text-left">
                <h3 className="font-display text-lg sm:text-xl text-gold">{value.title}</h3>
                <p className="text-text-secondary text-sm mt-3 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <GoldLineDraw width="50%" />

      {/* Team */}
      <section className="bg-bg-pure pt-16 lg:pt-24 pb-8 lg:pb-12">
        <div className="container-wide">
          <p className="text-overline mb-6">The Team</p>
          <SplitTextReveal
            as="h2"
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-text mb-16"
          >
            Built by family. Backed by craft.
          </SplitTextReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="img-scale-container mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ aspectRatio: '3/4' }}
                  />
                </div>
                <h3 className="font-display text-xl text-text">{member.name}</h3>
                <p className="text-gold text-xs font-medium tracking-[0.12em] uppercase mt-2">{member.role}</p>
                <div className="h-px bg-gold/20 my-4" />
                <ul className="space-y-1">
                  {member.qualifications.map((q) => (
                    <li key={q} className="text-xs text-text-muted">{q}</li>
                  ))}
                </ul>
                <p className="text-sm text-text-secondary mt-4 leading-relaxed sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
