'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SharkParticles from '@/components/SharkParticles'

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + (i * 0.3),
        duration: 0.8,
        ease: "easeOut"
      }
    })
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.7,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#8A2BE2",
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="hero">
      {/* WebGL Particle Animation */}
      <div className="absolute inset-0 z-0">
        <SharkParticles />
      </div>
      
      {/* Content */}
      <div ref={containerRef} className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-dark via-primary to-primary-light"
            custom={0}
            variants={textVariants}
          >
            Tralalero Tralala
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto"
            custom={1}
            variants={textVariants}
          >
            Revolutionizing the digital experience with cutting-edge technology and innovative solutions.
          </motion.p>
          
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              href="#contact" 
              className="btn bg-gradient-to-r from-primary-dark to-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              aria-label="Get Started"
            >
              Get Started
            </Link>
            <Link 
              href="#features" 
              className="btn btn-outline rounded-full px-8 py-4 text-lg font-medium hover:shadow-lg transition-all duration-300"
              aria-label="Learn More"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            delay: 3,
            duration: 0.8,
            ease: "easeOut"
          }
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection