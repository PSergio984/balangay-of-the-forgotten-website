import React from 'react'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import WorldMapSection from '@/components/landing/WorldMapSection'

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <AncientScrollContainer>
        <div className="flex flex-col gap-12">
           <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-widest text-[#0C4A6E]">
              World Exploration
            </h1>
            <p className="text-xl text-gray-600 font-serif italic">
              "Mapping the fragmented archipelago of the afterlife."
            </p>
            <div className="w-32 h-2 bg-[#F97316] mx-auto mt-8" />
          </header>

          <WorldMapSection />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <section className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold uppercase mb-4 tracking-tighter border-b-4 border-black pb-2">Navigation Log</h2>
              <div className="space-y-4 font-serif text-gray-600 italic">
                <p>"Day 1: We entered through Ang Lagusan. The air is heavy with the scent of sea salt and old parchment."</p>
                <p>"Day 14: The heat of Daragang Magayon is unbearable. Apolaki's presence is felt in every flame."</p>
                <p>"Day 42: The mists of Bundok Pulag are whispering. Mayari's tears have turned the peak into a silver sanctuary."</p>
              </div>
            </section>
            
            <section className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold uppercase mb-4 tracking-tighter border-b-4 border-black pb-2">Regional Intel</h2>
              <div className="space-y-4 font-pixel text-[10px] leading-relaxed">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span>DAGAT KABISAYAAN</span>
                  <span className="text-orange-600">HIGH DANGER</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span>BUNDOK PULAG</span>
                  <span className="text-yellow-600">MODERATE</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span>DARAGANG MAGAYON</span>
                  <span className="text-red-600">CRITICAL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>KALUWALHATIAN</span>
                  <span className="text-purple-600">DIVINE</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </AncientScrollContainer>
    </main>
  )
}
