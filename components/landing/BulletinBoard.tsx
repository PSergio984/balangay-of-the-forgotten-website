"use client";

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface NewsItem {
  id: number;
  date: string;
  title: string;
  summary: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    date: "742 AE",
    title: "Vessel Sighted",
    summary: "A large balangay was seen drifting near the edge of the forgotten reefs. No survivors reported."
  },
  {
    id: 2,
    date: "743 AE",
    title: "The Great Drought",
    summary: "The spirits of the waters have retreated. Tribes gather at the monolith to offer chants."
  },
  {
    id: 3,
    date: "745 AE",
    title: "Shadows in the Mist",
    summary: "Hunters speak of shifting shapes in the mangrove shadows. Keep the torches burning."
  }
];

const BulletinBoard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      '[data-type="note"]',
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-pixel text-[#0C4A6E] mb-12 text-center uppercase tracking-widest">
        The Town Bulletin
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {NEWS_DATA.map((item) => (
          <div 
            key={item.id}
            data-type="note"
            className="border-4 border-[#0C4A6E] p-6 bg-white shadow-[8px_8px_0px_0px_rgba(12,74,110,1)] relative opacity-0"
          >
            <div className="text-xs font-pixel text-[#F97316] mb-2">{item.date}</div>
            <h3 className="text-lg font-pixel text-[#0C4A6E] mb-4 leading-tight uppercase">
              {item.title}
            </h3>
            <p className="text-base font-serif text-[#0C4A6E]">
              {item.summary}
            </p>
            {/* Thumbtack effect */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#F97316] border-2 border-[#0C4A6E]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BulletinBoard;
