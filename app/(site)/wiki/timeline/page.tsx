import React from 'react'
import type { Metadata } from 'next'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import { getPayloadInstance } from '@/lib/payload'
import TimelineClient from '@/components/wiki/TimelineClient'

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
    depth: 2, // Ensure related lores are fully populated
  })

  const events = result.docs

  return (
    <div className="flex-grow flex flex-col bg-[#0a0a0a] pt-32 pb-24">
      <AncientScrollContainer className="flex-grow flex flex-col">
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

          {events.length > 0 ? (
            <TimelineClient events={events} />
          ) : (
            <div className="py-40 text-center border-4 border-dashed border-gray-300 rounded-xl">
              <p className="font-serif text-2xl text-gray-400 italic">
                "The scrolls of time are currently empty. Check the Archives Admin to write history."
              </p>
            </div>
          )}
        </div>
      </AncientScrollContainer>
    </div>
  )
}
