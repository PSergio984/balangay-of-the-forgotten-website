import type { MetadataRoute } from 'next'
import { getPayloadInstance } from '../lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadInstance()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://balangay-wiki.vercel.app'
  
  const staticPaths = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/wiki`, lastModified: new Date() },
    { url: `${baseUrl}/wiki/search`, lastModified: new Date() },
    { url: `${baseUrl}/wiki/timeline`, lastModified: new Date() },
  ]
  
  const collections = ['bosses', 'characters', 'relics', 'locations', 'minibosses', 'status-effects', 'rules', 'cards']
  const dynamicPaths: MetadataRoute.Sitemap = []
  
  for (const collection of collections) {
    // Add category list page
    dynamicPaths.push({
      url: `${baseUrl}/wiki/${collection}`,
      lastModified: new Date(),
    })
    
    // Add dynamic articles within collection
    try {
      const result = await payload.find({
        collection: collection as any,
        limit: 200,
        select: { slug: true },
      })
      
      for (const doc of result.docs) {
        if (doc.slug) {
          dynamicPaths.push({
            url: `${baseUrl}/wiki/${collection}/${doc.slug}`,
            lastModified: new Date(),
          })
        }
      }
    } catch (e) {
      console.error(`Sitemap failed to fetch collection ${collection}:`, e)
    }
  }
  
  return [...staticPaths, ...dynamicPaths]
}
