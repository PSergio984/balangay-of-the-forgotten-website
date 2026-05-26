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
}

const collections = [
  { label: 'All', value: 'all' },
  { label: 'Bosses', value: 'bosses' },
  { label: 'Characters', value: 'characters' },
  { label: 'Relics', value: 'relics' },
  { label: 'Locations', value: 'locations' },
  { label: 'Mini Bosses', value: 'minibosses' },
]

export default function SearchHubPage() {
  const [query, setQuery] = useState('')
  const [activeCollection, setActiveCollection] = useState('all')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const search = async () => {
      if (query.length < 2 && activeCollection === 'all') {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchCollections = activeCollection === 'all' 
          ? ['bosses', 'characters', 'relics', 'locations', 'minibosses']
          : [activeCollection];
        
        const allResults: SearchResult[] = [];

        for (const col of searchCollections) {
          const url = `/api/${col}?where[name][contains]=${query}&limit=10`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.docs) {
            allResults.push(...data.docs.map((doc: any) => ({
              id: doc.id,
              name: doc.name || doc.title,
              slug: doc.slug,
              collection: col,
              image: doc.image
            })));
          }
        }
        
        setResults(allResults);
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
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <AncientScrollContainer>
        <div className="flex flex-col gap-12">
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
                className="w-full bg-white border-4 border-black p-4 font-pixel text-lg focus:outline-none focus:ring-8 focus:ring-[#F97316] transition-all placeholder:text-gray-300"
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </header>

          <div className="flex flex-wrap gap-4 border-b-4 border-black pb-8">
            {collections.map((col) => (
              <button
                key={col.value}
                onClick={() => setActiveCollection(col.value)}
                className={`px-6 py-2 font-pixel text-[10px] uppercase border-4 border-black transition-all ${
                  activeCollection === col.value 
                    ? 'bg-[#F97316] text-white -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.length > 0 ? (
              results.map((result) => (
                <Link
                  key={`${result.collection}-${result.id}`}
                  href={`/wiki/${result.collection}/${result.slug}`}
                  className="group flex gap-4 border-4 border-black p-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
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
                  <div className="flex flex-col justify-center overflow-hidden">
                    <span className="text-[8px] font-pixel text-[#F97316] uppercase mb-1">
                      {result.collection}
                    </span>
                    <h2 className="text-xl font-bold uppercase truncate tracking-tight">
                      {result.name}
                    </h2>
                    <div className="mt-2 text-[10px] font-pixel text-gray-400 group-hover:text-black transition-colors">
                      ACCESS LOGS →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              !isLoading && query.length >= 2 && (
                <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-300 rounded-xl">
                  <p className="font-serif text-xl text-gray-400 italic">
                    "No records found matching your query. Perhaps the information was lost in the fragmentation."
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
