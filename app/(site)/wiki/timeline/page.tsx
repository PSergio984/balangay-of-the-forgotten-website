import React from 'react'
import type { Metadata } from 'next'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import { getPayloadInstance } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chronicles & Historical Timeline | Balangay of the Forgotten',
  description: 'Explore the historical events of the archipelago chronologically, from the Divine Genesis to the Eclipse War and the Awakening of the Balangay.',
}

export const revalidate = 3600

export default async function TimelinePage() {
  const payload = await getPayloadInstance()
  
  const result = await payload.find({
    collection: 'events',
    sort: 'year',
    limit: 100,
  })

  const events = result.docs

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <AncientScrollContainer>
        <div className="flex flex-col gap-12">
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-8xl font-bold uppercase tracking-widest text-[#0C4A6E]">
              Chronicles
            </h1>
            <p className="text-xl text-gray-600 font-serif italic max-w-2xl mx-auto">
              "To know where the Balangay is going, one must first look at the wake it has left behind."
            </p>
            <div className="w-32 h-2 bg-[#F97316] mx-auto mt-8" />
          </header>

          <div className="relative mt-20">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black/10 -translate-x-1/2 hidden md:block" />

            <div className="space-y-24">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <div 
                    key={event.id}
                    className={`relative flex flex-col md:flex-row gap-8 items-center group ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Event Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#F97316] border-4 border-black rotate-45 z-10 hidden md:block transition-all duration-300 group-hover:scale-125 group-hover:bg-[#0c4a6e] group-hover:rotate-90" />

                    {/* Content Card */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
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
                              
                              return (
                                <Link
                                  key={rIdx}
                                  href={`/wiki/${collectionPath}/${val.slug}`}
                                  className="px-2.5 py-1 bg-gray-50 hover:bg-[#F97316] hover:text-white border-2 border-black font-pixel text-[7px] uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                                >
                                  {name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image/Visual Area */}
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-video bg-gray-200 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        {event.image ? (
                          <Image
                            src={typeof event.image === 'string' ? event.image : (event.image as any).url.replace('/api/media/file/', '/media/')}
                            alt={event.title}
                            fill
                            unoptimized
                            className="object-cover pixelated"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-pixel text-xs text-gray-400 p-8 text-center uppercase">
                            VISUAL RECORD LOST
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-40 text-center border-4 border-dashed border-gray-300 rounded-xl">
                  <p className="font-serif text-2xl text-gray-400 italic">
                    "The scrolls of time are currently empty. Check the Archives Admin to write history."
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AncientScrollContainer>
    </main>
  )
}
