import React from 'react'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import Link from 'next/link'

const categories = [
  {
    name: 'Characters',
    slug: 'characters',
    description: 'The brave souls (Pinili) chosen to protect the Balangay.',
    color: 'bg-blue-600',
    icon: '👤'
  },
  {
    name: 'Bosses',
    slug: 'bosses',
    description: 'The primordial deities and forces that test our unity.',
    color: 'bg-red-600',
    icon: '👺'
  },
  {
    name: 'Mini Bosses',
    slug: 'minibosses',
    description: 'The guardians of the regions and shadow spirits.',
    color: 'bg-purple-600',
    icon: '👻'
  },
  {
    name: 'Relics',
    slug: 'relics',
    description: 'Ancient artifacts recovered from the ruins of the archipelago.',
    color: 'bg-orange-600',
    icon: '💎'
  },
  {
    name: 'Locations',
    slug: 'locations',
    description: 'The sacred and fragmented lands we must navigate.',
    color: 'bg-green-600',
    icon: '🗺️'
  }
]

export default function WikiHubPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <AncientScrollContainer>
        <div className="flex flex-col gap-12">
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-widest text-[#0C4A6E]">
              The Ancient Archives
            </h1>
            <p className="text-xl text-gray-600 font-serif italic">
              "Every Balangay carries a story; every soul, a legend."
            </p>
            <div className="w-32 h-2 bg-[#F97316] mx-auto mt-8" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.slug}
                href={`/wiki/${category.slug}`}
                className="group relative border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <div className={`w-16 h-16 ${category.color} flex items-center justify-center text-3xl border-4 border-black mb-6 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold uppercase mb-4 tracking-tighter">
                  {category.name}
                </h2>
                <p className="text-gray-600 font-serif">
                  {category.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-pixel text-[#F97316]">
                  <span>ENTER ARCHIVES</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-12 p-8 border-4 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase">Missing something?</h3>
                <p className="text-gray-500 font-serif">The archives are still being recovered from the Great Fragmentation.</p>
              </div>
              <button className="bg-black text-white px-8 py-4 font-pixel text-xs uppercase hover:bg-[#F97316] transition-colors shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
                Contribute Lore
              </button>
            </div>
          </section>
        </div>
      </AncientScrollContainer>
    </main>
  )
}
