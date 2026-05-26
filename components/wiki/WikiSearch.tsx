"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  slug: string;
  collection: string;
  image?: any;
}

const WikiSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        try {
          // In a real app, you'd probably have a dedicated search endpoint 
          // or query multiple collections. For simplicity, we'll search across a few.
          const collections = ['bosses', 'characters', 'relics', 'locations'];
          const allResults: SearchResult[] = [];

          for (const col of collections) {
            const res = await fetch(`/api/${col}?where[name][contains]=${query}&limit=3`);
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
          setIsOpen(allResults.length > 0);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (category: string, slug: string) => {
    router.push(`/wiki/${category}/${slug}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the Archives..."
          className="w-full bg-white border-4 border-black p-3 font-pixel text-sm focus:outline-none focus:ring-4 focus:ring-[#F97316] transition-all"
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden"
          >
            {results.map((result) => (
              <button
                key={`${result.collection}-${result.id}`}
                onClick={() => handleSelect(result.collection, result.slug)}
                className="w-full text-left p-3 hover:bg-[#F0F9FF] border-b-2 border-black last:border-b-0 flex gap-4 items-center group transition-colors"
              >
                <div className="relative w-12 h-12 bg-[#0C4A6E] shrink-0 border-2 border-black overflow-hidden">
                  {result.image ? (
                    <img 
                      src={typeof result.image === 'string' ? result.image : (result.image.url.startsWith('/api/media/file/') ? result.image.url.replace('/api/media/file/', '/media/') : result.image.url)} 
                      alt="" 
                      className="w-full h-full object-cover pixelated"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-[6px] font-pixel">?</div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-bold text-base uppercase tracking-tight truncate">{result.name}</div>
                  <div className="text-[8px] font-pixel text-gray-400 uppercase">{result.collection}</div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#F97316]">→</span>
                </div>
              </button>
            ))}
            <Link 
              href="/wiki/search" 
              className="block w-full text-center p-3 bg-gray-100 font-pixel text-[10px] hover:bg-[#F97316] hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              VIEW ALL RESULTS
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WikiSearch;
