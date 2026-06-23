"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
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

export default function TimelineClient({ events }: TimelineClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position inside container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Smooth out the scroll animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="relative mt-20">
      {/* Central Progress Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black/10 -translate-x-1/2 hidden md:block" />
      
      {/* Animated Foreground Line */}
      <motion.div 
        className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#F97316] origin-top -translate-x-1/2 hidden md:block"
        style={{ scaleY }}
      />

      <div className="space-y-24">
        {events.map((event, index) => {
          const isEven = index % 2 === 0
          
          return (
            <div 
              key={event.id}
              className={`relative flex flex-col md:flex-row gap-8 items-center group ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Center Node */}
              <motion.div 
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#F97316] border-4 border-black rotate-45 z-10 hidden md:block transition-all duration-300 group-hover:scale-125 group-hover:bg-[#0c4a6e] group-hover:rotate-90" 
              />

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 80, damping: 16 }}
                className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="bg-black text-white px-4 py-1 font-pixel text-xs mb-4 inline-block">
                  YEAR {event.year} • {event.era}
                </div>
                
                <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-[#0C4A6E]">
                  {event.title}
                </h2>
                
                <div className="prose prose-lg text-gray-600 font-serif mb-4">
                  <RichText data={event.description as any} />
                </div>

                {/* Related Lore */}
                {event.relatedLore && event.relatedLore.length > 0 && (
                  <div className="w-full mt-4 pt-4 border-t-2 border-dashed border-gray-200 text-left">
                    <span className="font-pixel text-[8px] uppercase text-gray-400 block mb-2">Related Legends</span>
                    <div className="flex flex-wrap gap-2">
                      {event.relatedLore.map((rel: any, rIdx: number) => {
                        if (!rel || !rel.value || typeof rel.value === 'string') return null;
                        
                        const val = rel.value;
                        const collectionPath = rel.relationTo; // bosses, characters, locations
                        const name = val.name || val.title;
                        const colors = categoryColors[collectionPath] || { border: 'border-black', text: 'text-black', bg: 'bg-gray-50', hoverBg: 'hover:bg-black' }
                        
                        return (
                          <Link
                            key={rIdx}
                            href={`/wiki/${collectionPath}/${val.slug}`}
                            className={`px-2.5 py-1 ${colors.bg} ${colors.text} ${colors.border} border-2 font-pixel text-[7px] uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${colors.hoverBg} hover:text-white cursor-pointer`}
                          >
                            {name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Image/Visual Area */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full md:w-1/2"
              >
                <div className="relative aspect-video bg-gray-200 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  {event.image ? (
                    <Image
                      src={typeof event.image === 'string' ? event.image : (event.image as any).url.replace('/api/media/file/', '/media/')}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover pixelated transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-pixel text-xs text-gray-400 p-8 text-center uppercase">
                      VISUAL RECORD LOST
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
