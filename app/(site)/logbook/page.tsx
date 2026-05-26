import React from 'react'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'

export default function LogbookPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 text-white">
      <AncientScrollContainer>
        <div className="flex flex-col items-center gap-8 py-20">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-[#0C4A6E]">Logbook</h1>
          <p className="text-xl text-gray-600 font-serif italic text-center max-w-2xl">
            "Every entry is a fragment of the past. The ink is still wet on the stories of the new world."
          </p>
          <div className="w-24 h-1 bg-[#F97316]" />
          <p className="font-pixel text-xs text-gray-400 mt-12 animate-pulse">RECOVERING CHRONICLES</p>
        </div>
      </AncientScrollContainer>
    </main>
  )
}
