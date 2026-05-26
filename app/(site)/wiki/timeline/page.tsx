import React from 'react'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import { getPayloadInstance } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

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
                    className={`relative flex flex-col md:flex-row gap-8 items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Event Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#F97316] border-4 border-black rotate-45 z-10 hidden md:block" />

                    {/* Content Card */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="bg-black text-white px-4 py-1 font-pixel text-xs mb-4 inline-block">
                        YEAR {event.year} • {event.era}
                      </div>
                      <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-[#0C4A6E]">
                        {event.title}
                      </h2>
                      <div className="prose prose-lg text-gray-600 font-serif">
                        <RichText data={event.description as any} />
                      </div>
                    </div>

                    {/* Image/Visual Area */}
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-video bg-gray-200 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
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
