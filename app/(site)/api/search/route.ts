import { NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const collectionFilter = searchParams.get('collection') || 'all'
  const tag = searchParams.get('tag') || ''
  const rarity = searchParams.get('rarity') || ''

  // If all parameters are empty, return empty results
  if (!query && collectionFilter === 'all' && !tag && !rarity) {
    return NextResponse.json({ docs: [] })
  }

  try {
    const payload = await getPayloadInstance()
    const collections = ['bosses', 'characters', 'relics', 'locations', 'minibosses']
    const targetCollections = collectionFilter === 'all' 
      ? collections 
      : (collections.includes(collectionFilter) ? [collectionFilter] : [])

    const searchPromises = targetCollections.map(async (col) => {
      const andFilters: any[] = []

      if (query) {
        andFilters.push({
          name: {
            contains: query,
          },
        })
      }

      if (tag) {
        andFilters.push({
          tags: {
            contains: tag,
          },
        })
      }

      if (rarity && col === 'relics') {
        andFilters.push({
          rarity: {
            equals: rarity,
          },
        })
      }

      const queryOptions: any = {
        collection: col as any,
        limit: 15,
      }

      if (andFilters.length > 0) {
        queryOptions.where = {
          and: andFilters,
        }
      }

      const result = await payload.find(queryOptions)
      return result.docs.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        slug: doc.slug,
        collection: col,
        image: doc.image,
        description: doc.description,
        tags: doc.tags,
        rarity: doc.rarity,
      }))
    })

    const allResults = await Promise.all(searchPromises)
    const docs = allResults.flat()

    return NextResponse.json({ docs })
  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
