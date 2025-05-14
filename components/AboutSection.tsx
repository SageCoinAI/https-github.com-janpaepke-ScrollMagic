'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '250+', label: 'Projects Completed' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support' },
  ]

  return (
    <section id="about" className="section py-20 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div 
            className="relative"
            style={{ y, opacity }}
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                alt="Team collaboration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-dark/80 to-transparent"></div>
            </div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-dark-dark/80 backdrop-blur-sm p-4 rounded-lg border border-gray-800"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-primary-dark">
                About Tralalero Tralala
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-6">
              Founded in 2013, TLT has been at the forefront of digital innovation, helping businesses transform and thrive in the digital age.
            </p>
            
            <p className="text-gray-400 mb-8">
              Our mission is to empower organizations with cutting-edge technology solutions that drive growth, enhance efficiency, and create exceptional user experiences. With a team of passionate experts, we combine technical excellence with creative thinking to deliver results that exceed expectations.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">Innovative Solutions</h3>
                  <p className="text-gray-400">Cutting-edge technology for modern challenges</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">Expert Team</h3>
                  <p className="text-gray-400">Talented professionals with diverse expertise</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">Fast Delivery</h3>
                  <p className="text-gray-400">Efficient processes for timely project completion</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-primary-dark/10 rounded-full blur-[150px] -z-10"></div>
    </section>
  )
}

export default AboutSection