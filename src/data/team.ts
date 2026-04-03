export interface TeamMember {
  name: string
  role: string
  qualifications: string[]
  bio: string
  image: string
}

export const team: TeamMember[] = [
  {
    name: 'Marcus Pencarinha',
    role: 'Director / Head of Residential Repairs & Maintenance',
    qualifications: [
      'Bachelor of Laws (UTS)',
      'Bachelor of Business (UTS)',
      'Cement Renderer',
      'Certified CEMHER Microcement Applicator',
    ],
    bio: 'Learned trades from his father at age 13, emphasising precision and high standards. Combines rendering expertise with formal business and law education to manage both practical and strategic operations. Known for building strong client relationships based on trust and integrity.',
    image: '/images/team/team-01.jpg',
  },
  {
    name: 'Michael Pencarinha',
    role: 'Director / Head of Strata Repairs & Maintenance',
    qualifications: [
      'Cert IV in Building and Construction',
      'Cert IV in Swimming Pool and Spa Building',
      'Licenced Plasterer',
      'Certified CEMHER Microcement Applicator',
    ],
    bio: 'Director of Prime Pools Pty Ltd since 1998. Recognised for consistent service excellence and referred to as the best in the business by clients. Demonstrates unwavering commitment to exceeding expectations.',
    image: '/images/team/team-02.jpg',
  },
  {
    name: 'James Pencarinha',
    role: 'Head of Project Management & Quality Control',
    qualifications: [
      'Bachelor of Construction Project Management (UTS)',
      'Licenced Renderer',
      'Certified CEMHER Microcement Applicator',
    ],
    bio: 'Brings formal project management qualifications to ensure every job is delivered on time, on budget, and to the highest standard of quality.',
    image: '/images/team/team-03.jpg',
  },
  {
    name: 'Thomas Pencarinha',
    role: 'Construction Manager Residential & Strata',
    qualifications: [
      'Cert IV in Building & Construction (TAFE)',
      'Diploma of Building & Construction (TAFE)',
      'Certified CEMHER Microcement Applicator',
    ],
    bio: 'Versatile and detail-oriented. Frequently recommended by satisfied customers. Pursues perfection with immense love and enthusiasm, investing fully in each project to achieve excellence.',
    image: '/images/team/team-04.jpg',
  },
]
