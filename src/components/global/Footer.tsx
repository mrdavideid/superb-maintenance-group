'use client'

import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { NAV_LINKS } from '@/data/navigation'
import { services } from '@/data/services'
import GoldLineDraw from '@/components/animation/GoldLineDraw'
import StaggerReveal from '@/components/animation/StaggerReveal'

export function Footer() {
  // Show first 6 services in footer
  const footerServices = services.slice(0, 6)

  return (
    <footer className="relative bg-bg-pure pt-0 pb-8 overflow-hidden">
      {/* Decorative watermark */}
      <div className="watermark bottom-8 left-1/2 -translate-x-1/2">
        SUPERB
      </div>

      {/* Gold line draw animation */}
      <GoldLineDraw width="100%" origin="center" />

      <div className="container-wide pt-20 lg:pt-28 relative z-10">
        <StaggerReveal stagger={0.15} y={25}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <img
                  src="/images/logo/logo-02-white.png"
                  alt="Superb Maintenance Group"
                  className="h-7 w-7"
                />
                <span className="text-text text-[0.7rem] font-medium tracking-[0.12em] uppercase">
                  Superb Maintenance Group
                </span>
              </Link>
              <p className="mt-5 text-sm text-text-secondary leading-relaxed max-w-xs">
                Family-owned property maintenance trusted by Sydney&apos;s leading real estate agencies and strata managers.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-overline mb-6">Navigation</h4>
              <nav className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-overline mb-6">Services</h4>
              <nav className="flex flex-col gap-3">
                {footerServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services#${service.slug}`}
                    className="text-sm text-text-secondary hover:text-text transition-colors duration-300"
                  >
                    {service.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-overline mb-6">Contact</h4>
              <div className="flex flex-col gap-3 text-sm text-text-secondary">
                <a
                  href={SITE.phoneTel}
                  className="hover:text-gold transition-colors duration-300"
                >
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-gold transition-colors duration-300 break-all"
                >
                  {SITE.email}
                </a>
                <p className="text-text-muted">{SITE.location}</p>
                <p className="text-text-muted">{SITE.hours}</p>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-300"
                >
                  {SITE.instagram}
                </a>
              </div>
            </div>
          </div>
        </StaggerReveal>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Superb Maintenance Group. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Sydney, NSW, Australia
          </p>
        </div>
      </div>
    </footer>
  )
}
