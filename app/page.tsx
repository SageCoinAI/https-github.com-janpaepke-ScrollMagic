'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start', 'end']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  
  // Preload images for better performance
  useEffect(() => {
    const imageUrls = [
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    ]
    
    imageUrls.forEach(url => {
      const img = new Image()
      img.src = url
    })
  }, [])

  return (
    <main ref={mainRef} className="min-h-screen">
      <Header />
      <HeroSection />
      
      <motion.div style={{ opacity }}>
        <FeaturesSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </motion.div>
      
      <Footer />
    </main>
  )
}