'use client'

import { useState } from 'react'
import { projects, projectCategories, type Project } from '@/data/projects'
import SplitTextReveal from '@/components/animation/SplitText'
import StaggerReveal from '@/components/animation/StaggerReveal'
import GoldLineDraw from '@/components/animation/GoldLineDraw'
import { CTASection } from '@/components/home/CTASection'
import { ProjectDetailModal } from '@/components/projects/ProjectDetailModal'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-bg-pure">
        <div className="container-wide">
          <p className="text-overline mb-6">Our Work</p>
          <SplitTextReveal
            as="h1"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-text"
            scroll={false}
          >
            Projects that speak for themselves.
          </SplitTextReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-bg-pure pb-16 lg:pb-24">
        <div className="container-wide">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
            {(projectCategories as readonly string[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs sm:text-sm tracking-widest uppercase px-3 py-1.5 sm:px-5 sm:py-2 border transition-all duration-300 ${
                  activeFilter === cat
                    ? 'border-gold bg-gold text-bg-pure'
                    : 'border-border text-text-secondary hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6" stagger={0.08}>
            {filtered.map((project) => (
              <div
                key={project.slug}
                className="card group cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="img-scale-container aspect-[4/3]">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase">
                    {project.category}
                  </span>
                  <h3 className="font-display text-lg text-text mt-2 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm mt-1">{project.location}</p>
                  <div className="mt-3 text-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Project →
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <GoldLineDraw width="60%" />
      <CTASection />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
