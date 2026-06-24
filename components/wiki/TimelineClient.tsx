"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

interface TimelineClientProps {
  events: any[]
}

const categoryColors: Record<string, { border: string, text: string, bg: string, hoverBg: string }> = {
  bosses: {
    border: 'border-red-600',
    text: 'text-red-700',
    bg: 'bg-red-50/70',
    hoverBg: 'hover:bg-red-600'
  },
  characters: {
    border: 'border-blue-600',
    text: 'text-blue-700',
    bg: 'bg-blue-50/70',
    hoverBg: 'hover:bg-blue-600'
  },
  locations: {
    border: 'border-green-600',
    text: 'text-green-700',
    bg: 'bg-green-50/70',
    hoverBg: 'hover:bg-green-600'
  }
}

const cardVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -250 : 250,
    rotateY: isEven ? -20 : 20,
    transformPerspective: 1200
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 18,
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    }
  }
}

const visualVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? 250 : -250,
    rotateY: isEven ? 20 : -20,
    scale: 0.85,
    transformPerspective: 1200
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 85,
      damping: 18
    }
  }
}

export default function TimelineClient({ events }: TimelineClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position inside container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Smooth out the scroll animation for progress line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="relative mt-20 px-4 md:px-0">
      {/* Central Progress Line Underlay */}
      <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-black/10 -translate-x-1/2 hidden md:block" />
      
      {/* Animated Foreground Line (Thick glowing path) */}
      <motion.div 
        className="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-[#F97316] via-[#FB923C] to-[#EA580C] origin-top -translate-x-1/2 hidden md:block shadow-[0_0_15px_rgba(249,115,22,0.8)]"
        style={{ scaleY }}
        animate={{
          boxShadow: [
            "0 0 12px rgba(249,115,22,0.6)",
            "0 0 24px rgba(249,115,22,0.9)",
            "0 0 12px rgba(249,115,22,0.6)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated Glowing Orb/Diamond sliding along the timeline */}
      <motion.div 
        className="absolute left-1/2 w-6 h-6 bg-[#EA580C] border-4 border-black rotate-45 -translate-x-1/2 hidden md:block z-20 shadow-[0_0_15px_#F97316]"
        style={{ 
          top: useTransform(scaleY, [0, 1], ['0%', '100%']),
          y: '-50%'
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [45, 225, 45]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="space-y-32">
        {events.map((event, index) => {
          const isEven = index % 2 === 0
          
          return (
            <div 
              key={event.id}
              className={`relative flex flex-col md:flex-row gap-12 items-center group ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Center Node (Rotating glowing diamond) */}
              <motion.div 
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1.2, rotate: 225 }}
                viewport={{ once: false, margin: '-120px' }}
                transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                whileHover={{ scale: 1.4, rotate: 315, backgroundColor: '#0C4A6E' }}
                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-[#F97316] border-4 border-black rotate-45 z-10 hidden md:block cursor-pointer shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-colors duration-300" 
              />

              {/* Content Card (Slides in with a 3D rotational twist) */}
              <motion.div 
                custom={isEven}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-100px' }}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  rotateY: isEven ? -3 : 3,
                  boxShadow: '16px 16px 0px 0px rgba(249,115,22,1)'
                }}
                className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] origin-center"
              >
                <motion.div variants={itemVariants} className="bg-black text-white px-4 py-1 font-pixel text-xs mb-6 inline-block">
                  YEAR {event.year} • {event.era}
                </motion.div>
                
                <motion.h2 variants={itemVariants} className="text-3xl font-bold uppercase tracking-tighter mb-4 text-[#0C4A6E] font-pixel text-lg leading-normal md:text-2xl">
                  {event.title}
                </motion.h2>
                
                <motion.div variants={itemVariants} className="prose prose-lg text-gray-600 font-serif mb-6 leading-relaxed">
                  <RichText data={event.description as any} />
                </motion.div>

                {/* Related Lore */}
                {event.relatedLore && event.relatedLore.length > 0 && (
                  <motion.div variants={itemVariants} className="w-full mt-4 pt-6 border-t-4 border-double border-gray-200 text-left">
                    <span className="font-pixel text-[8px] uppercase text-gray-400 block mb-3">Related Legends</span>
                    <div className="flex flex-wrap gap-2.5">
                      {event.relatedLore.map((rel: any, rIdx: number) => {
                        if (!rel || !rel.value || typeof rel.value === 'string') return null;
                        
                        const val = rel.value;
                        const collectionPath = rel.relationTo; // bosses, characters, locations
                        const name = val.name || val.title;
                        const colors = categoryColors[collectionPath] || { border: 'border-black', text: 'text-black', bg: 'bg-gray-50', hoverBg: 'hover:bg-black' }
                        
                        return (
                          <motion.div
                            key={rIdx}
                            whileHover={{ y: -2, scale: 1.05 }}
                            className="inline-block"
                          >
                            <Link
                              href={`/wiki/${collectionPath}/${val.slug}`}
                              className={`px-3 py-1.5 ${colors.bg} ${colors.text} ${colors.border} border-2 font-pixel text-[7px] uppercase transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${colors.hoverBg} hover:text-white cursor-pointer block`}
                            >
                              {name}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Image/Visual Area (Zooms in and slides from the opposite side) */}
              <motion.div 
                custom={isEven}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-100px' }}
                variants={visualVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  rotateY: isEven ? 3 : -3,
                  boxShadow: '16px 16px 0px 0px rgba(249,115,22,1)'
                }}
                className="w-full md:w-1/2 relative aspect-video bg-gray-200 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                {event.image ? (
                  <Image
                    src={typeof event.image === 'string' ? event.image : (event.image as any).url.replace('/api/media/file/', '/media/')}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover pixelated transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-pixel text-xs text-gray-400 p-8 text-center uppercase bg-slate-900">
                    VISUAL RECORD LOST
                  </div>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
