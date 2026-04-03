'use client'

import { useRef, useCallback, type ReactNode } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  /** Magnetic pull strength (px). Default 4. */
  strength?: number
  /** Whether to apply magnetic effect. Disabled on touch devices. */
  enabled?: boolean
  as?: 'button' | 'a' | 'div'
  onClick?: () => void
  href?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 4,
  enabled = true,
  as: Tag = 'div',
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || !enabled) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) / rect.width * strength * 2
    const deltaY = (e.clientY - centerY) / rect.height * strength * 2

    gsap.to(ref.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [strength, enabled])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current || !enabled) return

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }, [enabled])

  const props = {
    ref: ref as any,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(Tag === 'a' && href ? { href } : {}),
  }

  return <Tag {...props}>{children}</Tag>
}
