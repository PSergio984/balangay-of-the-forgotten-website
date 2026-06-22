import { NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const collectionFilter = searchParams.get('collection') || 'all'

  // If all parameters are empty, return empty results
  if (!query && collectionFilter === 'all') {
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

      const queryOptions: any = {
        collection: col as any,
        limit: 15,
        depth: 1,
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
