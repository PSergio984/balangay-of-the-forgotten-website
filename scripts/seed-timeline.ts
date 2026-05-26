import { getPayload } from 'payload'
import config from '../payload.config'

const seedTimeline = async () => {
  const payload = await getPayload({ config })

  console.log('--- Cleaning Existing Events ---')
  await payload.delete({ collection: 'events', where: { id: { exists: true } } })

  console.log('--- Seeding Timeline Events ---')
  const events = [
    {
      title: 'The Great Fragmentation',
      year: 0,
      era: 'The Great Fragmentation',
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'The primordial age ended when the sky shattered into floating islands. The deities retreated, and the first Balangays were built to bridge the void.',
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
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Explorers from the lowlands discovered the currents of the Sky Mist, enabling long-distance travel between the fragmented islands.',
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
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Unity was established among the floating tribes. The Balangay of the Forgotten was commissioned as a vessel of lore and protection.',
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
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'The chosen souls (Pinili) awakened to defend the archipelago against the rising shadows of the primordial deities.',
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
    })
    console.log(`Created event: ${event.title}`)
  }

  console.log('--- Timeline Seeding Complete! ---')
  process.exit(0)
}

seedTimeline().catch((err) => {
  console.error(err)
  process.exit(1)
})
