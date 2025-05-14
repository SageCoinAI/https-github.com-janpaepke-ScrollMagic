'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: '🚀',
    title: 'Lightning Fast',
    description: 'Our optimized platform ensures blazing fast performance across all devices.',
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee for peace of mind.',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description: 'Seamless experience across desktop, tablet, and mobile devices.',
  },
  {
    icon: '🔍',
    title: 'SEO Optimized',
    description: 'Built with best practices to help your site rank higher in search results.',
  },
  {
    icon: '🔄',
    title: 'Real-time Updates',
    description: 'Stay current with instant synchronization and live data updates.',
  },
  {
    icon: '🌐',
    title: 'Global Reach',
    description: 'Connect with users worldwide through our distributed network infrastructure.',
  },
]

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="features" className="section py-20 md:py-32 bg-gradient-to-b from-dark-dark to-dark-light relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-primary-dark">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the tools and capabilities that make our platform stand out from the competition.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-dark-dark/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 10px 25px -5px rgba(74, 157, 255, 0.1), 0 8px 10px -6px rgba(74, 157, 255, 0.1)' 
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-dark/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-light/10 rounded-full blur-[100px] -z-10"></div>
    </section>
  )
}

export default FeaturesSection