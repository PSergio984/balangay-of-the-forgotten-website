import { notFound } from 'next/navigation'
import { getPayloadInstance } from '@/lib/payload'
import AncientScrollContainer from '@/components/landing/AncientScrollContainer'
import Link from 'next/link'
import Image from 'next/image'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  return [
    { category: 'bosses' },
    { category: 'characters' },
    { category: 'relics' },
    { category: 'locations' },
    { category: 'minibosses' },
    { category: 'status-effects' },
    { category: 'rules' },
    { category: 'cards' },
  ]
}

export default async function WikiCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const payload = await getPayloadInstance()

  // Map category to collection slug
  const collectionMap: Record<string, string> = {
    bosses: 'bosses',
    characters: 'characters',
    relics: 'relics',
    locations: 'locations',
    minibosses: 'minibosses',
    'status-effects': 'status-effects',
    rules: 'rules',
    cards: 'cards',
  }

  const collection = collectionMap[category]

  if (!collection) {
    return notFound()
  }

  const result = await payload.find({
    collection: collection as any,
    limit: 100,
    select: {
      name: true,
      title: true,
      slug: true,
      image: true,
      type: true, // For cards
    },
  })

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <AncientScrollContainer>
        <div className="flex flex-col gap-12">
          <nav className="text-sm font-pixel text-gray-500 uppercase flex gap-2">
            <Link href="/wiki" className="hover:text-black transition-colors">Archives</Link>
            <span>/</span>
            <span className="text-black">{category}</span>
          </nav>

          <header className="border-b-8 border-black pb-6">
            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-[#0C4A6E]">
              {category}
            </h1>
            <p className="text-xl text-gray-600 mt-4 font-serif italic">
              Records recovered from the {category} collection.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {result.docs.map((doc: any) => (
              <Link 
                key={doc.id}
                href={`/wiki/${category}/${doc.slug}`}
                className="group border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all overflow-hidden"
              >
                <div className={`relative ${category === 'cards' ? 'aspect-[2.5/3.5]' : 'aspect-square'} bg-[#0C4A6E] border-b-4 border-black overflow-hidden`}>
                  {doc.image ? (
                    <Image 
                      src={typeof doc.image === 'string' ? doc.image : (doc.image.url.startsWith('/api/media/file/') ? doc.image.url.replace('/api/media/file/', '/media/') : doc.image.url)} 
                      alt={doc.name || doc.title || 'Entry image'} 
                      fill 
                      loading="eager"
                      unoptimized
                      className="object-contain pixelated group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 font-pixel text-[8px] p-4 text-center">
                      NO IMAGE FOUND
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-bold text-lg uppercase tracking-tight truncate flex-1">
                      {doc.name || doc.title}
                    </h3>
                    {doc.type && category === 'cards' && (
                      <span className="text-[6px] font-pixel bg-black text-white px-1 py-0.5 uppercase shrink-0">
                        {doc.type}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-pixel text-gray-400">VIEW ENTRY</span>
                    <span className="text-[#F97316]">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AncientScrollContainer>
    </main>
  )
}
