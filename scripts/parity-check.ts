// Production parity check — proves migration coverage vs the old wiki (decision #11).
// Run: npx tsx scripts/parity-check.ts  (after each seed; zero gaps = old wiki retireable)
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

const OLD_WIKI = process.env.OLD_WIKI_PATH || 'D:/Github/balangay_of_the_forgotten'
const DB = process.env.DATABASE_URL ? 'neon (live)' : 'NO DB CONNECTION'

// Expected entities per collection — CANONICAL names (docx wins, decision #10).
// The old-wiki pages these derive from use different names; that mapping is documented
// in NAME_MAP below and resolved in the coverage lists so old-wiki names never
// produce false gaps (e.g. the old wiki's 'Luhain' page IS the Tabak ng Luha ng Buwan).
const expected: Record<string, string[]> = {
  characters: ['Mandirigma', 'Bagani', 'Babaylan', 'Mangangayaw'],
  bosses: ['Bathala', 'Mayari', 'Apolaki', 'Bakunawa', 'Minokawa'],
  minibosses: ['Manananggal', 'Tiyanak', 'Sirena', 'Kapre'],
  relics: ['Korona ng Araw', 'Tabak ng Luha ng Buwan', 'Pangil ng Buwan', 'Bato ng Pagsilang'],
  locations: ['Kaluwalhatian', 'Bundok Pulag', 'Daragang Magayon', 'Dagat ng Kabisayaan'],
  'status-effects': [
    'Bonecracked', 'Rage / Enraged', 'On Guard', 'Blessing', 'Focused Aim',
    'Overexplosion', 'Moonfall', 'Invulnerable', 'Stun', 'Devoured',
    'Eye of the Dragon', 'Bind',
  ],
  rules: ['Prep', 'Opening the Table', 'Introduction to Cards', 'Introduction to Dice', 'Core Loop'],
}

// Old-wiki name -> canonical seeded name (decision #10, #11). The DB must contain the
// canonical name; these entries only document/verify the equivalence so old-wiki names
// never get re-added as separate entities.
const NAME_MAP: Record<string, string> = {
  Korona: 'Korona ng Araw',
  Luhain: 'Tabak ng Luha ng Buwan',
  'Luha ng Buwan': 'Tabak ng Luha ng Buwan',
  Pangil: 'Pangil ng Buwan',
  Silang: 'Bato ng Pagsilang',
}

// Intentional deltas — printed, never counted as gaps.
const KNOWN_DEVIATIONS = [
  'Ang Kabilang Mundo — removed as a location (world name; world lore lives on the wiki home) [dec. #10]',
  'Memory Fragment — extra relic entity, by design (no old-wiki page)',
  'Lawa ng Laguna / Ilog ng Lusong — prose-only regions, no location entries [dec. #10]',
  'Balaraw / Kalasag / Agos-Oras — special items as Cards type=item, not relics [dec. #7]',
  'Timeline events — canonical timeline deferred (#13); seed-wiki-full owns Events for now',
  'char-stats.docx — fully covered by character/boss/miniboss/status-effect seeds [dec. #5]',
]

const PLACEHOLDER_TEXT = 'Lore not found.'
const PLACEHOLDER_TARGET = 1 // Memory Fragment only, by design

const cardDirs = [
  'ROLE CARDS', 'PRESET CARDS', 'SKILL CARDS', 'MAP CARDS',
  'MAIN BOSS CARDS', 'MINI BOSS CARDS', 'SPECIAL ITEM CARDS',
]

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
  console.log('=== PARITY CHECK ===')
  console.log(`DB: ${DB} | old wiki: ${OLD_WIKI}\n`)

  let gaps = 0
  const rows: string[] = []

  for (const [col, names] of Object.entries(expected)) {
    const r = await payload.find({ collection: col as any, limit: 200, depth: 0 })
    const actual = new Set(r.docs.map((d: any) => (d.name || d.title) as string))
    const missing = names.filter((n) => !actual.has(n))
    gaps += missing.length
    const status = missing.length === 0 ? 'OK  ' : 'GAP '
    rows.push(
      `${status} ${col.padEnd(14)} expected ${String(names.length).padStart(2)} | found ${String(actual.size).padStart(2)} | missing: ${missing.join(', ') || '-'}`
    )
    console.log(rows[rows.length - 1])
  }

  const expectedCardAssets =
    cardDirs.reduce((n, d) => n + countAssets(d), 0) + 1 /* CARD BACK OG.png */ + 5 /* turnpiece + d4/d10/d20/d100 */
  const cardsR = await payload.find({ collection: 'cards', limit: 300, depth: 0 })
  const cardGap = expectedCardAssets > cardsR.totalDocs
  if (cardGap) gaps += expectedCardAssets - cardsR.totalDocs
  console.log(
    `\n--- Cards ---\nassets: ${cardDirs.map((d) => `${d}=${countAssets(d)}`).join(' | ')}\ncard assets expected: ${expectedCardAssets} | cards in DB: ${cardsR.totalDocs} ${cardGap ? '(GAP)' : '(OK)'}`
  )

  const mediaR = await payload.find({ collection: 'media', limit: 1, depth: 0 })
  console.log(`media in DB: ${mediaR.totalDocs}`)

  const loreCols = ['characters', 'bosses', 'minibosses', 'relics', 'locations']
  let placeholders = 0
  console.log(`\n--- Placeholder lore ('${PLACEHOLDER_TEXT}') ---`)
  for (const col of loreCols) {
    const r = await payload.find({ collection: col as any, limit: 200, depth: 0 })
    const bad = r.docs.filter((d: any) => JSON.stringify(d.description || {}).includes(PLACEHOLDER_TEXT))
    placeholders += bad.length
    console.log(
      `${col.padEnd(14)} ${bad.length} placeholder(s)${bad.length ? ': ' + bad.map((d: any) => d.name || d.title).join(', ') : ''}`
    )
  }
  const placeholderGap = Math.max(0, placeholders - PLACEHOLDER_TARGET)
  gaps += placeholderGap
  console.log(`placeholder total: ${placeholders} (target: ${PLACEHOLDER_TARGET} — Memory Fragment by design)${placeholderGap ? ' (GAP)' : ''}`)

  console.log('\n--- Known deviations (not counted as gaps) ---')
  for (const d of KNOWN_DEVIATIONS) console.log(`  - ${d}`)

  console.log(`\n=== VERDICT: ${gaps === 0 ? 'ZERO GAPS — old wiki retireable' : `${gaps} GAP(S) REMAINING`} ===`)
  await payload.destroy()
  process.exit(gaps === 0 ? 0 : 1)
}

main().catch((e) => { console.error(e); process.exit(1) })
