"use client";

import React, { useState, useEffect } from 'react'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  slug: string;
  collection: string;
  image?: any;
  tags?: string;
  rarity?: string;
}

const collections = [
  { label: 'All Categories', value: 'all' },
  { label: 'Bosses', value: 'bosses' },
  { label: 'Characters', value: 'characters' },
  { label: 'Relics', value: 'relics' },
  { label: 'Locations', value: 'locations' },
  { label: 'Mini Bosses', value: 'minibosses' },
]

const tagsList = [
  { label: 'All Tags', value: '' },
  { label: 'Lunar', value: 'lunar' },
  { label: 'Solar', value: 'solar' },
  { label: 'Eclipse', value: 'eclipse' },
  { label: 'Fire', value: 'fire' },
  { label: 'Water', value: 'water' },
  { label: 'Shadow', value: 'shadow' },
  { label: 'Sky', value: 'sky' },
  { label: 'Holy', value: 'holy' },
]

const raritiesList = [
  { label: 'All Rarities', value: '' },
  { label: 'Common', value: 'Common' },
  { label: 'Rare', value: 'Rare' },
  { label: 'Epic', value: 'Epic' },
  { label: 'Legendary', value: 'Legendary' },
]

export default function SearchHubPage() {
  const [query, setQuery] = useState('')
  const [activeCollection, setActiveCollection] = useState('all')
  const [activeTag, setActiveTag] = useState('')
  const [activeRarity, setActiveRarity] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const search = async () => {
      // If no query and no filters selected, clear results
      if (!query && activeCollection === 'all' && !activeTag && !activeRarity) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        let url = `/api/search?q=${encodeURIComponent(query)}&collection=${activeCollection}`;
        if (activeTag) {
          url += `&tag=${encodeURIComponent(activeTag)}`;
        }
        if (activeRarity) {
          url += `&rarity=${encodeURIComponent(activeRarity)}`;
        }

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
  }, [query, activeCollection, activeTag, activeRarity]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
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
                    onClick={() => {
                      setActiveCollection(col.value);
                      if (col.value !== 'relics' && col.value !== 'all') {
                        setActiveRarity(''); // Clear rarity if category is not relics
                      }
                    }}
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

            {/* Tag Filter */}
            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[8px] uppercase text-gray-400">Filter by Element/Theme</span>
              <div className="flex flex-wrap gap-2">
                {tagsList.map((tag) => (
                  <button
                    key={tag.value}
                    onClick={() => setActiveTag(tag.value)}
                    className={`px-3 py-1.5 font-pixel text-[8px] uppercase border-2 border-black transition-all ${
                      activeTag === tag.value 
                        ? 'bg-[#0C4A6E] text-white -translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer' 
                        : 'bg-white text-black hover:bg-gray-55 cursor-pointer'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rarity Filter (Only for Relics or All) */}
            {(activeCollection === 'relics' || activeCollection === 'all') && (
              <div className="flex flex-col gap-2 animate-fadeIn">
                <span className="font-pixel text-[8px] uppercase text-gray-400">Filter by Relic Rarity</span>
                <div className="flex flex-wrap gap-2">
                  {raritiesList.map((rarity) => (
                    <button
                      key={rarity.value}
                      onClick={() => setActiveRarity(rarity.value)}
                      className={`px-3 py-1.5 font-pixel text-[8px] uppercase border-2 border-black transition-all ${
                        activeRarity === rarity.value 
                          ? 'bg-[#15803D] text-white -translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer' 
                          : 'bg-white text-black hover:bg-gray-55 cursor-pointer'
                      }`}
                    >
                      {rarity.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.length > 0 ? (
              results.map((result) => (
                <Link
                  key={`${result.collection}-${result.id}`}
                  href={`/wiki/${result.collection}/${result.slug}`}
                  className="group flex gap-4 border-4 border-black p-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
                >
                  <div className="relative w-24 h-24 bg-[#0C4A6E] shrink-0 border-2 border-black overflow-hidden">
                    {result.image ? (
                      <Image
                        src={typeof result.image === 'string' ? result.image : (result.image.url.startsWith('/api/media/file/') ? result.image.url.replace('/api/media/file/', '/media/') : result.image.url)}
                        alt={result.name || ''}
                        fill
                        unoptimized
                        className="object-cover pixelated"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 font-pixel text-[8px] text-center p-2">
                        NO IMAGE
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between overflow-hidden py-1">
                    <div>
                      <span className="text-[7px] font-pixel text-[#F97316] uppercase block mb-1">
                        {result.collection}
                      </span>
                      <h2 className="text-xl font-bold uppercase truncate tracking-tight">
                        {result.name}
                      </h2>
                    </div>

                    {/* Metadata tags */}
                    <div className="space-y-1 mt-1">
                      {result.rarity && (
                        <span className={`inline-block px-1.5 py-0.5 text-[6px] font-pixel border border-black uppercase ${
                          result.rarity === 'Legendary' ? 'bg-amber-100 text-amber-700' :
                          result.rarity === 'Epic' ? 'bg-purple-100 text-purple-700' :
                          result.rarity === 'Rare' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {result.rarity}
                        </span>
                      )}
                      
                      {result.tags && (
                        <div className="flex flex-wrap gap-1">
                          {result.tags.split(',').map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-500 px-1 py-0.5 text-[5px] font-pixel uppercase rounded">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-[7px] font-pixel text-gray-400 group-hover:text-black transition-colors uppercase mt-1">
                      ACCESS LOGS →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              !isLoading && (query.length >= 2 || activeTag || activeRarity || activeCollection !== 'all') && (
                <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-300 rounded-xl">
                  <p className="font-serif text-xl text-gray-400 italic">
                    "No records found matching your filters. Perhaps the information was lost in the fragmentation."
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </AncientScrollContainer>
    </main>
  )
}
