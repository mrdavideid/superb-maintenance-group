export interface Project {
  slug: string
  title: string
  location: string
  category: string
  description: string
  heroImage: string
  images: string[]
  services: string[]
}

function projectImages(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    `/images/projects/${folder}/${folder}-${String(i + 1).padStart(2, '0')}.webp`
  )
}

export const projects: Project[] = [
  {
    slug: 'pyrmont-remedial-facade',
    title: 'Pyrmont Remedial & Facade Project',
    location: 'Pyrmont',
    category: 'Facade',
    description: 'A large-scale remedial and facade restoration project for a multi-storey residential building in Pyrmont. Our team carried out full rendering remediation across all exterior walls, repaired structural cracking, waterproofed balcony edges, and installed new external lighting. The project was completed on schedule with strata management oversight, delivering lasting structural integrity and a dramatically refreshed building exterior.',
    heroImage: '/images/projects/pyrmont-remedial/pyrmont-remedial-01.webp',
    images: projectImages('pyrmont-remedial', 18),
    services: ['Rendering', 'General Maintenance Repairs'],
  },
  {
    slug: 'darling-point-microcement',
    title: 'Darling Point Microcement Project',
    location: 'Darling Point',
    category: 'Specialist',
    description: 'A premium CEMHER microcement application throughout a luxury Darling Point residence. We applied seamless microcement finishes across bathroom floors, walls, shower niches, and vanity surrounds — creating a cohesive, contemporary aesthetic throughout the wet areas. The European microcement system provides exceptional durability and a sophisticated matte finish that elevates the entire property.',
    heroImage: '/images/projects/darling-point-microcement/darling-point-microcement-01.webp',
    images: projectImages('darling-point-microcement', 11),
    services: ['CEMHER Microcement'],
  },
  {
    slug: 'arncliffe-renovation',
    title: 'Arncliffe Renovation',
    location: 'Arncliffe',
    category: 'Renovation',
    description: 'A complete residential renovation transforming a dated bedroom into a modern living space. Works included demolition of the existing ceiling and walls, full re-rendering, installation of new hybrid flooring, a modern ceiling fan with integrated light, built-in wardrobes with sliding doors, and a full repaint throughout. The entire project was delivered in just over one week — from stripped-back shell to move-in ready.',
    heroImage: '/images/projects/arncliffe-renovation/arncliffe-renovation-01.webp',
    images: projectImages('arncliffe-renovation', 16),
    services: ['Renovations', 'Painting', 'Gyprocking'],
  },
  {
    slug: 'surry-hills-facade',
    title: 'Surry Hills Facade Restoration',
    location: 'Surry Hills',
    category: 'Facade',
    description: 'Heritage facade restoration for a character building in Surry Hills. Our team carefully restored the exterior render, repaired deteriorating brickwork, and refreshed the shopfront facade while preserving the building\'s heritage character. The project balanced modern construction techniques with respect for the original architectural details.',
    heroImage: '/images/projects/surry-hills-facade/surry-hills-facade-01.webp',
    images: projectImages('surry-hills-facade', 3),
    services: ['Rendering'],
  },
  {
    slug: 'zetland-microcement',
    title: 'Zetland Microcement Project',
    location: 'Zetland',
    category: 'Specialist',
    description: 'Full CEMHER microcement application across a modern Zetland apartment, covering bathroom floors, walls, and wet area surfaces. The seamless microcement finish replaced traditional tiles to create a clean, contemporary look with no grout lines. Includes waterproofing integration and a polished matte finish that transforms the bathroom into a luxury hotel-style space.',
    heroImage: '/images/projects/zetland-microcement/zetland-microcement-01.webp',
    images: projectImages('zetland-microcement', 7),
    services: ['CEMHER Microcement'],
  },
  {
    slug: 'lane-cove-microcement',
    title: 'Lane Cove Microcement Project',
    location: 'Lane Cove',
    category: 'Specialist',
    description: 'Comprehensive CEMHER microcement installation for a Lane Cove residence, covering multiple rooms including the bathroom, laundry, and feature walls. The microcement was applied over existing surfaces, eliminating the need for demolition and reducing project time. The result is a seamless, modern finish with a subtle texture that adds warmth and sophistication to every room.',
    heroImage: '/images/projects/lane-cove-microcement/lane-cove-microcement-01.webp',
    images: projectImages('lane-cove-microcement', 8),
    services: ['CEMHER Microcement'],
  },
  {
    slug: 'naremburn-gate',
    title: 'Naremburn Gate Rebuild & Fence Restoration',
    location: 'Naremburn',
    category: 'Construction',
    description: 'Complete reconstruction of a front gate and full fence restoration for a Naremburn property. The old gate was demolished and rebuilt from scratch with new steel framing, timber cladding, and automated hardware. Surrounding fencing was repaired and repainted to match. The finished result provides both security and a premium street-facing aesthetic.',
    heroImage: '/images/projects/naremburn-gate/naremburn-gate-01.webp',
    images: projectImages('naremburn-gate', 6),
    services: ['General Maintenance Repairs', 'Concreting'],
  },
  {
    slug: 'erskineville-renovation',
    title: 'Erskineville Renovation',
    location: 'Erskineville',
    category: 'Renovation',
    description: 'Residential renovation in Erskineville transforming an outdated interior with modern finishes. Works included new plasterboard walls and ceilings, full repaint, updated lighting fixtures, and general repairs throughout. The project was managed end-to-end by our team, delivering a refreshed, move-in ready property for the client\'s tenant.',
    heroImage: '/images/projects/erskineville-renovation/erskineville-renovation-01.webp',
    images: projectImages('erskineville-renovation', 4),
    services: ['Renovations'],
  },
  {
    slug: 'pyrmont-ceiling',
    title: 'Pyrmont Ceiling Remediation',
    location: 'Pyrmont',
    category: 'Maintenance',
    description: 'Specialist ceiling remediation for a Pyrmont strata building, addressing both structural damage and cosmetic deterioration. Our team removed damaged plasterboard, reinforced ceiling joists where required, installed new gyprock, applied cornices, and completed a full ceiling repaint across multiple units. The work restored the ceilings to better-than-original condition.',
    heroImage: '/images/projects/pyrmont-ceiling/pyrmont-ceiling-01.webp',
    images: projectImages('pyrmont-ceiling', 8),
    services: ['Gyprocking', 'Painting'],
  },
  {
    slug: 'eastlakes-ceiling',
    title: 'Eastlakes Ceiling Repair',
    location: 'Eastlakes',
    category: 'Maintenance',
    description: 'Ceiling repair and restoration for an Eastlakes property, addressing water damage and cracking that had developed over time. Works included removal of damaged sections, moisture barrier treatment, new plasterboard installation, cornicing, sanding, and a premium ceiling paint finish. The result is a clean, flawless ceiling that looks brand new.',
    heroImage: '/images/projects/eastlakes-ceiling/eastlakes-ceiling-01.webp',
    images: projectImages('eastlakes-ceiling', 5),
    services: ['Gyprocking', 'Painting'],
  },
  {
    slug: 'artarmon-brick',
    title: 'Artarmon Brick Stitching Remediation',
    location: 'Artarmon',
    category: 'Facade',
    description: 'Specialist brick stitching remediation for an Artarmon building experiencing structural cracking along mortar joints. Our team cut slots into the brickwork at strategic intervals, inserted stainless steel helical bars, and re-grouted to restore structural integrity. The repair is invisible once complete and prevents further crack propagation — a permanent engineering solution rather than a cosmetic patch.',
    heroImage: '/images/projects/artarmon-brick/artarmon-brick-01.webp',
    images: projectImages('artarmon-brick', 4),
    services: ['General Maintenance Repairs'],
  },
]

export const projectCategories = [
  'All',
  'Renovation',
  'Facade',
  'Specialist',
  'Maintenance',
  'Construction',
] as const
