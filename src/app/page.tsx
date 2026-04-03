'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesShowcase } from '@/components/home/ServicesShowcase'
import { ProjectGallery } from '@/components/home/ProjectGallery'
import { BeforeAfter } from '@/components/home/BeforeAfter'
import { TestimonialSlider } from '@/components/home/TestimonialSlider'
import { CTASection } from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutPreview />
      <ServicesShowcase />
      <ProjectGallery />
      <BeforeAfter />
      <TestimonialSlider />
      <CTASection />
    </>
  )
}
