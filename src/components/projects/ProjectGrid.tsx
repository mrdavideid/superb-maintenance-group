'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/data/projects'
import { ProjectDetailModal } from './ProjectDetailModal'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
      >
        <AnimatePresence>
          {projects.map((project, i) => {
            const isLarge = i % 5 === 0
            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={isLarge ? 'sm:col-span-2 sm:row-span-2' : ''}
              >
                <button
                  onClick={() => setSelectedProject(project)}
                  className="group relative block w-full overflow-hidden text-left"
                  style={{ minHeight: isLarge ? '500px' : '300px' }}
                >
                  {/* Project image */}
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black-pure/50 group-hover:bg-black-pure/20 transition-all duration-700" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black-pure/90 to-transparent">
                    <span className="text-label-sm text-gold">{project.category}</span>
                    <h3 className="font-display text-xl lg:text-2xl font-medium text-white-pure mt-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white-muted mt-1">{project.location}</p>
                  </div>

                  {/* Hover description */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-label text-white-pure bg-black-pure/60 px-4 py-2">
                      View Project
                    </span>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
