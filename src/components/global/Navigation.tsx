'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/data/navigation'
import { MobileMenu } from './MobileMenu'
import MagneticButton from '@/components/animation/MagneticButton'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      // Hide on scroll down (past 200px), show on scroll up
      if (currentY > 200) {
        setHidden(currentY > lastScrollY && currentY > 400)
      } else {
        setHidden(false)
      }
      setScrolled(currentY > 80)
      setLastScrollY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled || !isHome
            ? 'bg-bg-pure/85 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0 flex items-center gap-2.5">
              <img
                src="/images/logo/logo-02-white.png"
                alt="Superb Maintenance Group"
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="hidden lg:block text-text text-[0.8rem] font-medium tracking-[0.12em] uppercase">
                Superb Maintenance Group
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <MagneticButton key={link.href} strength={2} className="inline-block">
                  <Link
                    href={link.href}
                    className={`text-[0.8rem] font-normal tracking-[0.08em] uppercase relative group ${
                      pathname === link.href
                        ? 'text-gold'
                        : 'text-text-secondary hover:text-text'
                    } transition-colors duration-300`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 origin-left ${
                        pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </MagneticButton>
              ))}
            </div>

            {/* Desktop CTA */}
            <MagneticButton strength={3} className="hidden lg:block">
              <Link
                href="/contact"
                className="btn-outline text-[0.75rem] !py-3 !px-7 btn-shimmer"
              >
                Enquire
              </Link>
            </MagneticButton>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 flex flex-col items-center justify-center w-11 h-11 gap-1.5"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className={`block w-6 h-px bg-text transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-text transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Gold line under nav when scrolled */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gold/15 transition-opacity duration-500 ${
            scrolled || !isHome ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
