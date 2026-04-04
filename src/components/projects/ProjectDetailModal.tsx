'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/data/projects'
import { useLenis } from '@/providers/LenisProvider'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveImage(0)
  }, [project?.slug])

  const lenis = useLenis()

  useEffect(() => {
    if (!project) return

    const scrollY = window.scrollY

    // Stop Lenis smooth scroll
    lenis?.stop()

    // iOS Safari fix: prevent background scroll by making html/body non-scrollable
    // but DON'T use position:fixed (breaks iOS scroll inside overlay)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    // Prevent iOS bounce/rubber-band on background
    document.body.style.position = 'relative'

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      // Restore scroll position
      window.scrollTo(0, scrollY)
      lenis?.start()
    }
  }, [project, lenis])

  // Prevent background scroll on touch while allowing modal scroll
  useEffect(() => {
    if (!project || !overlayRef.current) return

    const overlay = overlayRef.current

    const handleTouchMove = (e: TouchEvent) => {
      // Only allow scroll if the touch is inside the overlay
      // This prevents the background page from scrolling on iOS
      const target = e.target as HTMLElement
      if (!overlay.contains(target)) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => document.removeEventListener('touchmove', handleTouchMove)
  }, [project])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100]"
          style={{ touchAction: 'none' }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg-pure/90 backdrop-blur-sm" onClick={onClose} />

          {/* Scrollable overlay — this handles all scrolling */}
          <div
            ref={overlayRef}
            className="absolute inset-0 overflow-y-scroll"
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              touchAction: 'pan-y',
            }}
          >
            <div className="min-h-full flex items-start justify-center p-4 sm:p-6 py-8 sm:py-12">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 w-full max-w-5xl bg-bg-elevated border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center text-text-secondary hover:text-text transition-colors bg-bg-pure/60 backdrop-blur-sm"
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {/* Image */}
                <div className="bg-bg-surface flex items-center justify-center max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh] overflow-hidden">
                  <img
                    src={project.images[activeImage] || project.heroImage}
                    alt={project.title}
                    className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh] object-contain"
                  />
                </div>

                {/* Thumbnails */}
                {project.images.length > 1 && (
                  <div className="flex gap-2 px-6 py-4 overflow-x-auto" style={{ touchAction: 'pan-x' }}>
                    {project.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all duration-300 ${
                          i === activeImage ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="px-6 sm:px-8 py-6 sm:py-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase">{project.category}</span>
                      <h2 className="font-display text-2xl sm:text-3xl text-text mt-2 tracking-tight">{project.title}</h2>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-text-muted text-xs tracking-[0.12em] uppercase">Location</p>
                        <p className="text-text font-medium mt-1">{project.location}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs tracking-[0.12em] uppercase">Images</p>
                        <p className="text-text font-medium mt-1">{project.images.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-gold/30 via-gold/50 to-gold/30 mb-6" />

                  <p className="text-text-secondary text-base leading-relaxed max-w-2xl">{project.description}</p>

                  {project.services.length > 0 && (
                    <div className="mt-6">
                      <p className="text-text-muted text-xs tracking-[0.12em] uppercase mb-3">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((s) => (
                          <span key={s} className="text-xs text-gold border border-gold/30 px-3 py-1 tracking-wide">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-border">
                    <a href="/contact" className="btn-primary btn-shimmer inline-flex">Enquire About This Project</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
