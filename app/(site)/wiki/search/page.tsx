"use client";

import React, { useState, useEffect } from 'react'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  slug: string;
  collection: string;
  image?: any;
}

const collections = [
  { label: 'All Categories', value: 'all' },
  { label: 'Bosses', value: 'bosses' },
  { label: 'Characters', value: 'characters' },
  { label: 'Relics', value: 'relics' },
  { label: 'Locations', value: 'locations' },
  { label: 'Mini Bosses', value: 'minibosses' },
]

function getImageUrl(image: any): string | null {
  if (!image) return null
  if (typeof image === 'object' && image.url) {
    const url: string = image.url
    return url.startsWith('/api/media/file/')
      ? url.replace('/api/media/file/', '/media/')
      : url
  }
  if (typeof image === 'string' && image.startsWith('/')) return image
  return null
}

export default function SearchHubPage() {
  const [query, setQuery] = useState('')
  const [activeCollection, setActiveCollection] = useState('all')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const search = async () => {
      // If no query and no collection filter, clear results
      if (!query && activeCollection === 'all') {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const url = `/api/search?q=${encodeURIComponent(query)}&collection=${activeCollection}`;
        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`Search failed: ${res.statusText}`);
          return;
        }
        const data = await res.json();
        if (data.docs) {
          setResults(data.docs);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      search();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, activeCollection]);

  return (
    <div className="flex-grow bg-[#0a0a0a] pt-32 pb-24">
      <AncientScrollContainer>
        <div className="flex flex-col gap-10">
          <header className="space-y-6">
            <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-widest text-[#0C4A6E]">
              Library Search
            </h1>
            <div className="relative max-w-2xl">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for names, titles, or legends..."
                className="w-full bg-white border-4 border-black p-4 font-pixel text-lg focus:outline-none focus:ring-8 focus:ring-[#F97316] transition-all placeholder:text-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </header>

          {/* Filters Panel */}
          <div className="flex flex-col gap-6 border-y-4 border-black py-8 bg-gray-50/50 p-6 rounded-md">
            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[8px] uppercase text-gray-400">Filter by Category</span>
              <div className="flex flex-wrap gap-3">
                {collections.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => setActiveCollection(col.value)}
                    className={`px-4 py-2 font-pixel text-[9px] uppercase border-4 border-black transition-all ${
                      activeCollection === col.value 
                        ? 'bg-[#F97316] text-white -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer' 
                        : 'bg-white text-black hover:bg-gray-100 cursor-pointer'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid Area with Loading Overlay */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/85 backdrop-blur-[1px] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8"
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-12 h-12 border-4 border-[#0C4A6E] border-t-transparent rounded-full animate-spin" />
                    <p className="font-pixel text-[10px] uppercase text-[#0C4A6E] tracking-widest animate-pulse">
                      SEARCHING THE ARCHIVES...
                    </p>
                    <p className="font-mono text-[8px] text-gray-400">
                      Query: "{query}" | Sector: {activeCollection.toUpperCase()}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              layout
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}
            >
              <AnimatePresence>
                {results.map((result) => (
                  <motion.div
                    key={`${result.collection}-${result.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={`/wiki/${result.collection}/${result.slug}`}
                      className="group flex gap-4 border-4 border-black p-3 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer h-full min-h-[100px] items-center"
                    >
                      {/* Small square sprite */}
                      <div className="relative w-80 h-80 bg-[#0C4A6E] shrink-0 border-2 border-black overflow-hidden flex items-center justify-center">
                        {(() => {
                          const imgUrl = getImageUrl(result.image)
                          return imgUrl ? (
                            <Image
                              src={imgUrl}
                              alt={result.name || ''}
                              fill
                              unoptimized
                              className="object-contain"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          ) : (
                            <div className="font-pixel text-[6px] text-white/30 text-center">NO IMG</div>
                          )
                        })()}
                      </div>
                      {/* Text */}
                      <div className="flex flex-col justify-between flex-grow overflow-hidden py-1">
                        <div>
                          <span className="text-[7px] font-pixel text-[#F97316] uppercase block mb-1">
                            {result.collection}
                          </span>
                          <h2 className="text-base font-bold uppercase truncate tracking-tight">
                            {result.name}
                          </h2>
                        </div>
                        <div className="text-[7px] font-pixel text-gray-400 group-hover:text-black transition-colors uppercase mt-2">
                          ACCESS LOGS →
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>

              {!isLoading && results.length === 0 && (query.length >= 2 || activeCollection !== 'all') && (
                <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-300 rounded-xl">
                  <p className="font-serif text-xl text-gray-400 italic">
                    "No records found matching your filters. Perhaps the information was lost in the fragmentation."
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </AncientScrollContainer>
    </div>
  )
}
