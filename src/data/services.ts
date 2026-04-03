export interface Service {
  slug: string
  title: string
  shortDescription: string
  image: string
  category: string
}

export const services: Service[] = [
  {
    slug: 'general-maintenance',
    title: 'General Maintenance Repairs',
    shortDescription: 'Comprehensive property repair and upkeep for residential and strata buildings across Sydney.',
    image: '/images/services/general-maintenance.webp',
    category: 'Maintenance',
  },
  {
    slug: 'end-of-lease',
    title: 'End of Lease Tidy Up / Quick Renovation',
    shortDescription: 'Fast turnaround property refresh to maximise rental returns and meet lease requirements.',
    image: '/images/services/end-of-lease.webp',
    category: 'Renovation',
  },
  {
    slug: 'renovations',
    title: 'Renovations',
    shortDescription: 'Full-scale residential renovations delivered with precision, from kitchens and bathrooms to complete property transformations.',
    image: '/images/services/renovations.webp',
    category: 'Renovation',
  },
  {
    slug: 'rendering',
    title: 'Rendering',
    shortDescription: 'Expert cement rendering and facade finishing that transforms building exteriors with lasting results.',
    image: '/images/services/rendering.webp',
    category: 'Facade',
  },
  {
    slug: 'tiling',
    title: 'Tiling',
    shortDescription: 'Precision tiling for floors, walls, bathrooms, and outdoor areas with meticulous attention to detail.',
    image: '/images/services/tiling.webp',
    category: 'Renovation',
  },
  {
    slug: 'gyprocking',
    title: 'Gyprocking',
    shortDescription: 'Professional plasterboard installation and repair for walls and ceilings to the highest standard.',
    image: '/images/services/gyprocking.webp',
    category: 'Renovation',
  },
  {
    slug: 'garden-maintenance',
    title: 'Garden Maintenance',
    shortDescription: 'Complete garden care and landscaping maintenance for strata and residential properties.',
    image: '/images/services/garden-maintenance.webp',
    category: 'Maintenance',
  },
  {
    slug: 'concreting',
    title: 'Concreting',
    shortDescription: 'Driveways, paths, slabs, and structural concrete work built to withstand the test of time.',
    image: '/images/services/concreting.webp',
    category: 'Construction',
  },
  {
    slug: 'painting',
    title: 'Painting',
    shortDescription: 'Interior and exterior painting with premium finishes that elevate any property.',
    image: '/images/services/painting.webp',
    category: 'Renovation',
  },
  {
    slug: 'caulking',
    title: 'Caulking',
    shortDescription: 'Professional sealing and waterproofing to protect buildings from moisture and weather damage.',
    image: '/images/services/caulking.webp',
    category: 'Maintenance',
  },
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing / Sandstone Specialists',
    shortDescription: 'High-pressure cleaning and specialist sandstone restoration that brings surfaces back to life.',
    image: '/images/services/pressure-washing.webp',
    category: 'Restoration',
  },
  {
    slug: 'microcement',
    title: 'CEMHER Microcement',
    shortDescription: 'Certified CEMHER microcement application for seamless, contemporary surfaces across floors, walls, and wet areas.',
    image: '/images/services/microcement.webp',
    category: 'Specialist',
  },
]

export const serviceCategories = [
  'All',
  'Renovation',
  'Maintenance',
  'Facade',
  'Restoration',
  'Construction',
  'Specialist',
] as const
