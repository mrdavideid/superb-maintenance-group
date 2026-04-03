// GSAP animation presets and utilities

export const EASINGS = {
  reveal: 'power3.out',
  exit: 'power2.in',
  transition: 'power2.inOut',
  bounce: 'back.out(1.4)',
  smooth: 'power4.out',
  text: 'power3.out',
} as const

export const DURATIONS = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  hero: 1.5,
} as const

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 90%',
  end: 'bottom 20%',
  toggleActions: 'play none none none' as const,
}

export const STAGGER = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
} as const

export const REVEAL_FROM = {
  y: 40,
  opacity: 0,
} as const

export const REVEAL_TO = {
  y: 0,
  opacity: 1,
} as const
