import { notFound } from 'next/navigation'
import { getPayloadInstance } from '@/lib/payload'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const revalidate = 3600

export async function generateStaticParams() {
  const payload = await getPayloadInstance()
  const collections = ['bosses', 'characters', 'relics', 'locations', 'minibosses']
  const params = []

  for (const collection of collections) {
    const result = await payload.find({
      collection: collection as any,
      limit: 100,
      select: { slug: true },
    })
    for (const doc of result.docs) {
      params.push({ category: collection, slug: (doc as any).slug })
    }
  }
  return params
}

interface WikiPageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default async function WikiEntryPage({ params }: WikiPageProps) {
  const { category, slug } = await params
  const payload = await getPayloadInstance()

  // Map category to collection slug
  const collectionMap: Record<string, string> = {
    bosses: 'bosses',
    characters: 'characters',
    relics: 'relics',
    locations: 'locations',
    minibosses: 'minibosses',
  }

  const collection = collectionMap[category]

  if (!collection) {
    return notFound()
  }

  const result = await payload.find({
    collection: collection as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const doc: any = result.docs[0]

  if (!doc) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <AncientScrollContainer>
        <div className="flex flex-col gap-12">
          {/* Breadcrumbs */}
          <nav className="text-sm font-pixel text-gray-500 uppercase flex gap-2">
            <a href="/" className="hover:text-black transition-colors">Home</a>
            <span>/</span>
            <span className="text-black">{category}</span>
          </nav>

          <header className="border-b-8 border-black pb-6">
            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
              {doc.name || doc.title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="bg-black text-white px-3 py-1 text-sm font-pixel uppercase">
                {category.slice(0, -1)}
              </span>
              {doc.role && (
                <span className="border-2 border-black px-3 py-1 text-sm font-pixel uppercase">
                  {doc.role}
                </span>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-6 border-l-8 border-[#F97316] pl-4 uppercase">Lore & History</h2>
                <div className="wiki-lore-content prose prose-xl max-w-none text-gray-800 leading-relaxed">
                  {doc.description ? (
                    <RichText data={doc.description as any} />
                  ) : (
                    <p>
                      No detailed lore available for {doc.name || doc.title}. Seek the elders for more information.
                    </p>
                  )}
                </div>
              </section>

              {doc.moveset && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 border-l-8 border-[#F97316] pl-4 uppercase">Abilities & Moveset</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doc.moveset.map((move: any, index: number) => (
                      <div key={index} className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        <h3 className="font-bold text-xl uppercase mb-2">{move.name}</h3>
                        {move.type && (
                          <span className="text-xs bg-[#F0F9FF] border border-blue-200 px-2 py-0.5 rounded text-blue-600 mb-3 inline-block uppercase font-pixel">
                            {move.type}
                          </span>
                        )}
                        <p className="text-gray-600 italic">"{move.description}"</p>
                        {move.cooldown && <p className="text-xs font-pixel mt-4 text-[#F97316]">COOLDOWN: {move.cooldown} TURNS</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Relational Sections (Join fields) */}
              {doc.droppedRelics && doc.droppedRelics.docs?.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 border-l-8 border-[#F97316] pl-4 uppercase">Dropped Relics</h2>
                  <div className="flex flex-wrap gap-4">
                    {doc.droppedRelics.docs.map((relic: any) => (
                      <a key={relic.id} href={`/wiki/relics/${relic.slug}`} className="bg-black text-white px-4 py-2 hover:bg-[#F97316] transition-colors uppercase font-pixel text-sm">
                        {relic.name}
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-8">
              {/* Infobox-style card */}
              <div className="border-4 border-black p-4 bg-white shadow-[10px_10px_0px_0px_rgba(249,115,22,1)] sticky top-32">
                <div className="relative aspect-square bg-[#0C4A6E] mb-6 border-4 border-black overflow-hidden group">
                  {doc.image ? (
                    <Image 
                      src={typeof doc.image === 'string' ? doc.image : (doc.image.url.startsWith('/api/media/file/') ? doc.image.url.replace('/api/media/file/', '/media/') : doc.image.url)} 
                      alt={doc.name || doc.title || 'Entry image'} 
                      fill 
                      className="object-cover pixelated"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 font-pixel text-xs text-center p-8">
                      IMAGE NOT RECOVERED FROM ARCHIVES
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold border-b-4 border-black pb-2 text-center uppercase">Quick Facts</h3>
                  
                  {doc.stats && (
                    <div className="grid grid-cols-2 gap-4">
                      <StatItem label="Health" value={doc.stats.hp} color="text-red-600" />
                      <StatItem label="Attack" value={doc.stats.atk} color="text-orange-600" />
                      <StatItem label="Magic" value={doc.stats.mag} color="text-blue-600" />
                      <StatItem label="Defense" value={doc.stats.def} color="text-green-600" />
                    </div>
                  )}

                  <div className="pt-4 border-t-2 border-black/10 space-y-3">
                    {doc.location && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 uppercase font-pixel text-[10px]">Primary Habitat</span>
                        <span className="font-bold uppercase tracking-tight">{(doc.location as any).name}</span>
                      </div>
                    )}
                    {doc.parentBoss && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 uppercase font-pixel text-[10px]">Bound to</span>
                        <span className="font-bold uppercase tracking-tight">{(doc.parentBoss as any).name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </AncientScrollContainer>
    </main>
  )
}

function StatItem({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-2 border-2 border-black/5">
      <span className="text-[10px] font-pixel text-gray-400 uppercase leading-none mb-1">{label}</span>
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
    </div>
  )
}
