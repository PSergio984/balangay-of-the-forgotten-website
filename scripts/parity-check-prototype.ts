// PROTOTYPE — parity verification check (throwaway, answers: "can we prove migration parity?")
// Run: npx tsx scripts/parity-check-prototype.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

const OLD_WIKI = process.env.OLD_WIKI_PATH || 'D:/Github/balangay_of_the_forgotten'
const DB = process.env.DATABASE_URL ? 'neon (live)' : 'NO DB CONNECTION'

const expected = {
  characters: ['Mandirigma', 'Bagani', 'Babaylan', 'Mangangayaw'],
  bosses: ['Bathala', 'Mayari', 'Apolaki', 'Bakunawa', 'Minokawa'],
  minibosses: ['Manananggal', 'Tiyanak', 'Sirena', 'Kapre'],
  relics: ['Korona', 'Luhain', 'Pangil', 'Silang'],
  locations: ['Kaluwalhatian', 'Bundok Pulag', 'Daragang Magayon', 'Dagat ng Kabisayaan'],
  'status-effects': [
    'Bonecracked', 'Rage / Enraged', 'On Guard', 'Blessing', 'Focused Aim',
    'Overexplosion', 'Moonfall', 'Invulnerable', 'Stun', 'Devoured',
    'Eye of the Dragon', 'Bind',
  ],
  rules: ['Prep', 'Opening the Table', 'Introduction to Cards', 'Introduction to Dice', 'Core Loop'],
}

const cardDirs = ['ROLE CARDS', 'PRESET CARDS', 'SKILL CARDS', 'MAP CARDS', 'MAIN BOSS CARDS', 'MINI BOSS CARDS', 'SPECIAL ITEM CARDS']

const countAssets = (dir: string): number => {
  const full = path.join(OLD_WIKI, 'assets', dir)
  if (!fs.existsSync(full)) return 0
  let n = 0
  for (const f of fs.readdirSync(full)) {
    const p = path.join(full, f)
    if (fs.lstatSync(p).isDirectory()) n += countAssets(path.join(dir, f))
    else if (/\.(jpg|jpeg|png|gif)$/i.test(f)) n++
  }
  return n
}

const main = async () => {
  const payload = await getPayload({ config })
  console.log('=== PARITY CHECK (PROTOTYPE) ===')
  console.log(`DB: ${DB} | old wiki: ${OLD_WIKI}\n`)

  const rows: string[] = []
  let missingTotal = 0
  for (const [col, names] of Object.entries(expected)) {
    const r = await payload.find({ collection: col, limit: 200, depth: 0 })
    const actual = new Set(r.docs.map((d: any) => (d.name || d.title) as string))
    const missing = names.filter((n) => !actual.has(n) && ![...actual].some((a) => a.includes(n.split(' ')[0])))
    missingTotal += missing.length
    const status = missing.length === 0 ? 'OK  ' : 'GAP '
    rows.push(`${status} ${col.padEnd(14)} expected ${String(names.length).padStart(2)} | found ${String(actual.size).padStart(2)} | missing: ${missing.join(', ') || '-'}`)
    console.log(rows[rows.length - 1])
  }

  const cardAssets = cardDirs.map((d) => `${d}: ${countAssets(d)}`)
  const cardsR = await payload.find({ collection: 'cards', limit: 300, depth: 0 })
  console.log(`\n--- Cards (asset count vs seeded) ---`)
  console.log(`assets -> ${cardAssets.join(' | ')}`)
  console.log(`cards in DB: ${cardsR.totalDocs}`)

  const mediaR = await payload.find({ collection: 'media', limit: 1, depth: 0 })
  console.log(`media in DB: ${mediaR.totalDocs}`)

  // placeholder-lore scan (the known content gap)
  const loreCols = ['characters', 'bosses', 'minibosses', 'relics', 'locations']
  console.log(`\n--- Placeholder lore ('Lore not found.') ---`)
  for (const col of loreCols) {
    const r = await payload.find({ collection: col, limit: 200, depth: 0 })
    const bad = r.docs.filter((d: any) => JSON.stringify(d.description || {}).includes('Lore not found.'))
    console.log(`${col.padEnd(14)} ${bad.length} placeholder(s)`)
  }

  console.log(`\n=== VERDICT: ${missingTotal === 0 ? 'COVERAGE CLEAR (content decisions aside)' : `${missingTotal} expected entity(-ies) missing`} ===`)
  await payload.destroy()
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
