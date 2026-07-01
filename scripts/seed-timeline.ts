import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'

const seedTimeline = async () => {
  const payload = await getPayload({ config })

  console.log('--- Cleaning Existing Events & Timeline Media ---')
  // We can also clean up the media created for timeline to keep db clean
  const existingTimelineMedia = await payload.find({
    collection: 'media',
    where: {
      alt: {
        like: 'Timeline Event:',
      },
    },
    limit: 100,
  })

  for (const mediaDoc of existingTimelineMedia.docs) {
    await payload.delete({
      collection: 'media',
      id: mediaDoc.id,
      overrideAccess: true,
    })
    console.log(`Deleted old media: ${mediaDoc.alt}`)
  }

  await payload.delete({ collection: 'events', where: { id: { exists: true } } })

  // Helper to upload media file
  const uploadTimelineMedia = async (filename: string, altText: string) => {
    const filePath = path.resolve(process.cwd(), 'scripts', 'assets', filename)
    if (!fs.existsSync(filePath)) {
      console.warn(`Asset not found: ${filePath}`)
      return undefined
    }

    try {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `Timeline Event: ${altText}`,
        },
        filePath,
        overrideAccess: true,
      })
      console.log(`Uploaded media: ${filename} (ID: ${mediaDoc.id})`)
      return mediaDoc.id
    } catch (error) {
      console.error(`Failed to upload media ${filename}:`, error)
      return undefined
    }
  }

  console.log('--- Seeding Timeline Events ---')

  // Upload images first
  const fragmentationImageId = await uploadTimelineMedia('timeline-fragmentation.png', 'The Great Fragmentation')
  const skyMistImageId = await uploadTimelineMedia('timeline-sky-mist.png', 'Discovery of the Sky Mist')
  const ageOfBalangayImageId = await uploadTimelineMedia('timeline-age-of-balangay.png', 'The Age of the Balangay')
  const arrivalPiniliImageId = await uploadTimelineMedia('timeline-arrival-pinili.png', 'Arrival of the Pinili')

  const events = [
    {
      title: 'The Great Fragmentation',
      year: 0,
      era: 'The Great Fragmentation',
      image: fragmentationImageId,
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'The primordial age ended when the sky shattered into floating islands. The deities retreated, and the first Balangays were built to bridge the void.',
                  type: 'text',
                  version: 1,
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'root',
        },
      },
    },
    {
      title: 'Discovery of the Sky Mist',
      year: 215,
      era: 'Early Migration',
      image: skyMistImageId,
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Explorers from the lowlands discovered the currents of the Sky Mist, enabling long-distance travel between the fragmented islands.',
                  type: 'text',
                  version: 1,
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'root',
        },
      },
    },
    {
      title: 'The Age of the Balangay',
      year: 500,
      era: 'Age of the Balangay',
      image: ageOfBalangayImageId,
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Unity was established among the floating tribes. The Balangay of the Forgotten was commissioned as a vessel of lore and protection.',
                  type: 'text',
                  version: 1,
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'root',
        },
      },
    },
    {
      title: 'Arrival of the Pinili',
      year: 742,
      era: 'The Current Awakening',
      image: arrivalPiniliImageId,
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'The chosen souls (Pinili) awakened to defend the archipelago against the rising shadows of the primordial deities.',
                  type: 'text',
                  version: 1,
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'root',
        },
      },
    },
  ]

  for (const event of events) {
    await payload.create({
      collection: 'events',
      data: event as any,
      overrideAccess: true,
    })
    console.log(`Created event: ${event.title}`)
  }

  console.log('--- Timeline Seeding Complete! ---')
  await payload.destroy()
  process.exit(0)
}

seedTimeline().catch((err) => {
  console.error(err)
  process.exit(1)
})
