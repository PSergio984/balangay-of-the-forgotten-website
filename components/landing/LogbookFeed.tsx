"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import LogbookEntry from './LogbookEntry';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: 'Lore' | 'Game Update' | 'Event' | 'Milestone';
  content: any;
  publishedDate: string;
  image?: any;
}

interface LogbookFeedProps {
  news: NewsItem[];
}

// Category mappings for display
const categories: { key: string; label: string; color: string }[] = [
  { key: 'all', label: 'All Chronicles', color: 'border-[#0C4A6E] text-[#0C4A6E] bg-white' },
  { key: 'Lore', label: 'Lore Legends', color: 'border-amber-600 text-amber-700 bg-amber-50' },
  { key: 'Game Update', label: 'Game Updates', color: 'border-emerald-600 text-emerald-700 bg-emerald-50' },
  { key: 'Event', label: 'Events', color: 'border-sky-600 text-sky-700 bg-sky-50' },
  { key: 'Milestone', label: 'Milestones', color: 'border-rose-600 text-rose-700 bg-rose-50' },
];

// Beautiful inline pixelated SVGs representing each category
const LoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M4 19.5V15a2 2 0 0 1 2-2h14" />
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-3.5" />
    <path d="M6 2c2.5 0 4 1.5 4 4v13.5" />
    <path d="M20 2v16.5" />
    <path d="M10 6h10" />
    <path d="M10 10h10" />
    <path d="M14 14h6" />
  </svg>
);

const GameUpdateIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 0-7.94-7.94L9.8 1.4a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l1.9-1.9" />
    <path d="M2 22l7-7" />
    <path d="M7.5 12.5L12 8" />
    <circle cx="17.5" cy="6.5" r="2.5" />
  </svg>
);

const EventIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const MilestoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const DefaultIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// Helper to recursively normalize Lexical RichText nodes ensuring they have explicit type="text"
const normalizeLexicalContent = (node: any): any => {
  if (!node) return node;
  
  const copy = { ...node };

  if (copy.children && Array.isArray(copy.children)) {
    copy.children = copy.children.map((child: any) => {
      if (child && typeof child === 'object') {
        if ('text' in child && !child.type) {
          return {
            ...child,
            type: 'text',
            version: 1
          };
        }
        return normalizeLexicalContent(child);
      }
      return child;
    });
  }
  
  return copy;
};

export default function LogbookFeed({ news }: LogbookFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedEntries);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedEntries(newSet);
  };

  // Helper to extract a clean teaser text from Lexical rich text structure
  const getTeaserText = (content: any): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (content.root && content.root.children) {
      const firstP = content.root.children.find((child: any) => child.type === 'paragraph');
      if (firstP && firstP.children && firstP.children[0]) {
        const text = firstP.children[0].text || '';
        return text.length > 150 ? text.slice(0, 150) + '...' : text;
      }
    }
    return 'Seek the archives to uncover details of this entry.';
  };

  // Helper to render the matching category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Lore':
        return <LoreIcon />;
      case 'Game Update':
        return <GameUpdateIcon />;
      case 'Event':
        return <EventIcon />;
      case 'Milestone':
        return <MilestoneIcon />;
      default:
        return <DefaultIcon />;
    }
  };

  // Filter items
  const filteredNews = news.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full space-y-12">
      {/* Category Selection Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 py-4 border-b-4 border-double border-[#0C4A6E]/30 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <motion.button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 border-4 border-black font-pixel text-xs uppercase transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                isActive
                  ? 'bg-[#F97316] text-white shadow-[6px_6px_0px_0px_rgba(12,74,110,1)]'
                  : 'bg-white text-[#0C4A6E] hover:bg-[#F0F9FF]'
              }`}
            >
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      {/* Main Feed Container */}
      <div className="max-w-4xl mx-auto px-4">
        {filteredNews.length === 0 ? (
          <div className="text-center py-20 border-4 border-dashed border-[#0C4A6E]/30 bg-white/20 p-8">
            <p className="font-pixel text-sm text-gray-500 uppercase">No chronicles found in this logbook category.</p>
          </div>
        ) : (
          <motion.div 
            layout="position"
            className="space-y-12 relative"
          >
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item, index) => {
                const isExpanded = expandedEntries.has(item.id);
                const isEven = index % 2 === 0;
                
                // Format image URL similar to timeline and wiki
                const imageUrl = typeof item.image === 'object' && item.image && 'url' in item.image
                  ? (item.image.url as string).startsWith('/api/media/file/')
                    ? (item.image.url as string).replace('/api/media/file/', '/media/')
                    : (item.image.url as string)
                  : typeof item.image === 'string'
                    ? item.image
                    : undefined;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                    className={`border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(12,74,110,1)] relative transition-all duration-300 ${
                      isExpanded ? 'shadow-[12px_12px_0px_0px_rgba(249,115,22,1)]' : ''
                    }`}
                  >
                    {/* Header: Date, Category badge, Title */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b-2 border-dashed border-gray-200 pb-4">
                      <span className="font-pixel text-[10px] text-[#F97316]">
                        {item.publishedDate ? new Date(item.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date'}
                      </span>
                      <span className="font-pixel text-[8px] bg-black text-white px-2 py-1 uppercase">
                        {item.category}
                      </span>
                    </div>

                    {/* Unrolled / Collapsed view toggle rendering */}
                    <AnimatePresence initial={false} mode="wait">
                      {isExpanded ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <LogbookEntry
                            title={item.title}
                            content={
                              <div className="prose prose-lg text-gray-700 font-serif leading-relaxed mt-2 wiki-lore-content">
                                <RichText data={normalizeLexicalContent(item.content)} />
                              </div>
                            }
                            imageSrc={imageUrl}
                            imageAlt={item.title}
                            reversed={!isEven}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col md:flex-row items-center gap-6 py-4"
                        >
                          {/* Left: Pixel Category Art Frame */}
                          <div className="w-full md:w-1/4 flex justify-center">
                            <div className="w-24 h-24 border-4 border-black p-2 bg-gray-50 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                              {getCategoryIcon(item.category)}
                            </div>
                          </div>

                          {/* Right: Teaser and Title */}
                          <div className="w-full md:w-3/4 space-y-2">
                            <h3 className="text-xl font-pixel text-[#0C4A6E] uppercase tracking-wide">
                              {item.title}
                            </h3>
                            <p className="text-base font-serif text-gray-600 italic">
                              "{getTeaserText(item.content)}"
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Unroll control button */}
                    <div className="mt-4 flex justify-end">
                      <motion.button
                        onClick={() => toggleExpand(item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 border-2 border-black font-pixel text-[9px] uppercase cursor-pointer transition-colors duration-200 ${
                          isExpanded 
                            ? 'bg-[#0C4A6E] text-white hover:bg-black' 
                            : 'bg-[#F97316] text-white hover:bg-[#EA580C]'
                        }`}
                      >
                        {isExpanded ? 'ROLL UP LEDGER ▲' : 'UNROLL LEDGER ▼'}
                      </motion.button>
                    </div>

                    {/* Ledger Ribbon indicator (absolute side element) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-12 bg-red-700 border-l border-black hidden md:block" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
