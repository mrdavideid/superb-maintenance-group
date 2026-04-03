// Site-wide constants

export const SITE = {
  name: 'Superb Maintenance Group',
  tagline: "Sydney's most trusted 5 star property maintenance company",
  phone: '0452 588 638',
  phoneTel: 'tel:+61452588638',
  email: 'info@superbmaintenancegroup.com.au',
  emailSecondary: 'superbmaintenancegroup@gmail.com',
  location: 'Sydney, NSW, Australia',
  hours: '7am — 7pm, Monday — Sunday',
  instagram: '@superbmaintenancegroup',
  instagramUrl: 'https://www.instagram.com/superbmaintenancegroup',
  url: 'https://superbmaintenancegroup.com.au',
} as const

export const STATS = [
  { value: 6, suffix: 'hr', label: 'Quote Turnaround' },
  { value: 24, suffix: 'hr', label: 'Emergency Response' },
  { value: 7, suffix: '', label: 'Days a Week' },
  { value: 5, suffix: '', label: 'Star Rated' },
] as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const
