'use client'

interface ProjectFilterProps {
  categories: string[]
  activeFilter: string
  onChange: (filter: string) => void
}

export function ProjectFilter({ categories, activeFilter, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 lg:gap-6 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-label-sm py-2 pb-1 border-b transition-all duration-300 ${
            activeFilter === cat
              ? 'text-gold border-gold'
              : 'text-white-dim border-transparent hover:text-white-muted hover:border-white-muted/30'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
