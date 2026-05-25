"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

interface LogbookEntryProps {
  title: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string;
  reversed?: boolean;
}

const LogbookEntry: React.FC<LogbookEntryProps> = ({
  title,
  content,
  imageSrc = '/next.svg', // Placeholder
  imageAlt = 'Lore illustration',
  reversed = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col md:flex-row items-center gap-8 py-12 opacity-0 ${
        reversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="w-full md:w-1/3 flex justify-center">
        <div className="relative w-48 h-48 border-4 border-[#0C4A6E] p-2 bg-white/50">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-4 pixelated"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      <div ref={contentRef} className="w-full md:w-2/3 space-y-4">
        <h3 className="text-xl font-pixel text-[#0C4A6E] uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-lg font-serif text-[#0C4A6E] leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

export default LogbookEntry;
