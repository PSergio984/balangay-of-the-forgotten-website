"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ACCOLADES = [
  {
    title: "Best Booth",
    event: "Gamecon 2026",
    organization: "Pamantasan Lungsod ng Valenzuela",
    icon: "🏆"
  },
  {
    title: "3rd Place",
    event: "Hybrid Tabletop Category",
    organization: "Gamecon 2026 PLV",
    icon: "🥉"
  }
];

export default function AccoladesSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t-8 border-[#0C4A6E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'url("/videos/animations/logo.png")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-pixel text-[#F97316] mb-6 tracking-widest uppercase drop-shadow-[4px_4px_0_rgba(12,74,110,1)]"
          >
            Honors & Accolades
          </motion.h2>
          <div className="w-32 h-2 bg-[#0EA5E9] mx-auto mb-6" />
          <p className="font-serif text-gray-300 text-lg md:text-xl italic max-w-2xl mx-auto">
            "The strength of the Balangay is recognized not just by the deities, but by the realms beyond the mist."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {ACCOLADES.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/50 border-4 border-[#0EA5E9] p-8 text-center relative group hover:border-[#F97316] transition-colors shadow-[8px_8px_0px_0px_rgba(12,74,110,0.8)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none duration-300"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-[2px_2px_0_rgba(249,115,22,1)]">
                {award.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-white mb-2 font-pixel leading-relaxed">
                {award.title}
              </h3>
              <p className="text-[#0EA5E9] font-bold uppercase tracking-widest text-sm mb-1">
                {award.event}
              </p>
              <p className="text-gray-400 text-xs uppercase font-pixel tracking-widest">
                {award.organization}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-pixel text-[10px] text-gray-500 uppercase tracking-widest">
            GameCon 2026 Official Selection
          </p>
        </motion.div>
      </div>
    </section>
  );
}
