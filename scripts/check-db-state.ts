import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const count = async (payload: any, collection: string) => {
  const r = await payload.find({ collection, limit: 1, depth: 0 })
  return r.totalDocs
}

const main = async () => {
  const payload = await getPayload({ config })
  const cols = ['characters', 'bosses', 'minibosses', 'relics', 'locations', 'status-effects', 'rules', 'cards', 'events', 'news', 'media']
  for (const c of cols) {
    console.log(`${c}: ${await count(payload, c)}`)
  }
  const backs = await payload.find({ collection: 'cards', where: { type: { equals: 'back' } }, limit: 10 })
  const utils = await payload.find({ collection: 'cards', where: { type: { equals: 'utility' } }, limit: 10 })
  console.log('cards type=back:', backs.docs.map((d: any) => d.name).join(', ') || '(none)')
  console.log('cards type=utility:', utils.docs.map((d: any) => d.name).join(', ') || '(none)')
  const loreCheck = async (collection: string) => {
    const r = await payload.find({ collection, limit: 100, depth: 0 })
    const bad = r.docs.filter((d: any) => JSON.stringify(d.description || {}).includes('Lore not found.'))
    console.log(`${collection} with "Lore not found.": ${bad.length}${bad.length ? ' - ' + bad.map((d: any) => d.name || d.title).join(', ') : ''}`)
    return bad.length
  }
  const totalBad = await loreCheck('characters') + await loreCheck('relics') + await loreCheck('bosses') + await loreCheck('minibosses') + await loreCheck('locations')
  console.log('TOTAL entities with placeholder lore:', totalBad)
  await payload.destroy()
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
