'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/data/navigation'
import { SITE } from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-40 bg-bg-pure flex flex-col justify-center items-center"
        >
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`font-display text-2xl sm:text-3xl md:text-4xl tracking-[-0.01em] transition-colors duration-300 ${
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-text hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12"
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="btn-primary btn-shimmer"
            >
              Enquire
            </Link>
          </motion.div>

          {/* Contact info at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-12 text-center"
          >
            <a
              href={SITE.phoneTel}
              className="text-sm tracking-widest uppercase text-text-secondary hover:text-gold transition-colors block"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors block mt-3"
            >
              {SITE.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
