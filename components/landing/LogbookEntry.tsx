"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center gap-8 py-12 ${
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

      <div className="w-full md:w-2/3 space-y-4">
        <h3 className="text-xl font-pixel text-[#0C4A6E] uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-lg font-serif text-[#0C4A6E] leading-relaxed">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default LogbookEntry;
