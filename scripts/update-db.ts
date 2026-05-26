import { getPayload } from 'payload'
import config from '../payload.config'

const update = async () => {
  const payload = await getPayload({ config })

  console.log('--- Updating Database ---')

  // 1. Delete 'Luha ng Buwan' (luhain)
  const luhain = await payload.find({
    collection: 'relics',
    where: { slug: { equals: 'luhain' } }
  })
  if (luhain.docs.length > 0) {
    await payload.delete({ collection: 'relics', id: luhain.docs[0].id })
    console.log('Deleted relic: Luha ng Buwan')
  }

  // 2. Update 'Ang Kabilang Mundo'
  const kabilangMundo = await payload.find({
    collection: 'locations',
    where: { slug: { equals: 'ang-kabilang-mundo' } }
  })
  if (kabilangMundo.docs.length > 0) {
    await payload.update({
      collection: 'locations',
      id: kabilangMundo.docs[0].id,
      data: {
        description: { root: { children: [{ children: [{ text: 'The entire fragmented world where the Balangay sails, encompassing all realms of the afterlife.' }], type: 'paragraph' }], type: 'root' } }
      } as any
    })
    console.log('Updated location: Ang Kabilang Mundo')
  }

  // 3. Update Minibosses movesets to exact old wiki stats
  const minibossUpdates = {
    'kapre': [
        { name: 'Tree Smash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Uproot Smash', description: 'Deals 1.5 x ATK to single enemies.' },
        { name: 'Forest Wrath', description: 'Deals 1.6 x ATK to all enemies' }
    ],
    'manananggal': [
        { name: 'Batwing Slash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Blood Splash', description: 'Deals 1.5 x ATK to single enemies.' },
        { name: 'Split Body', description: 'Deals 1.6 x ATK to all enemies' }
    ],
    'sirena': [
        { name: 'Drowning Current', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Tidal Surge', description: 'Deals 1.5 x ATK to single enemies.' },
        { name: 'Moonlight Hymn', description: 'Deals 1.6 x ATK to all enemies' }
    ],
    'tiyanak': [
        { name: 'Claw Latch', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Blood Hex', description: 'Deals 1.5 x ATK to single enemies.' },
        { name: 'Demonic Wall', description: 'Deals 1.6 x ATK to all enemies' }
    ]
  }

  for (const [slug, moveset] of Object.entries(minibossUpdates)) {
    const mini = await payload.find({
      collection: 'minibosses',
      where: { slug: { equals: slug } }
    })
    if (mini.docs.length > 0) {
      await payload.update({
        collection: 'minibosses',
        id: mini.docs[0].id,
        data: { moveset } as any
      })
      console.log(`Updated miniboss moveset: ${slug}`)
    }
  }

  console.log('--- Update Complete! ---')
  process.exit(0)
}

update().catch(err => {
  console.error(err)
  process.exit(1)
})