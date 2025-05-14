'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    quote: "TLT transformed our digital presence completely. Their team delivered a solution that exceeded our expectations in every way.",
    author: "Sarah Johnson",
    position: "CEO, TechStart Inc.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
  },
  {
    quote: "Working with Tralalero Tralala was a game-changer for our business. Their expertise and dedication are unmatched in the industry.",
    author: "Michael Chen",
    position: "CTO, Innovate Solutions",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
  },
  {
    quote: "The team at TLT doesn't just deliver projects; they build partnerships. They truly understood our vision and brought it to life.",
    author: "Emily Rodriguez",
    position: "Marketing Director, Global Brands",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
  }
]

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="testimonials" className="section py-20 md:py-32 bg-gradient-to-b from-dark-light to-dark-dark relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-primary-dark">
              Client Testimonials
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-dark-dark/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 25px -5px rgba(74, 157, 255, 0.1), 0 10px 10px -5px rgba(74, 157, 255, 0.04)'
              }}
            >
              <div className="mb-6">
                <svg className="w-10 h-10 text-primary/60" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className="text-gray-300 mb-6 flex-grow">{testimonial.quote}</p>
              
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[150px] -z-10"></div>
    </section>
  )
}

export default TestimonialsSection