import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

const OLD_WIKI_PATH = process.env.OLD_WIKI_PATH || 'D:/Github/balangay_of_the_forgotten'

if (!fs.existsSync(OLD_WIKI_PATH)) {
  throw new Error(
    `OLD_WIKI_PATH does not exist: ${OLD_WIKI_PATH}. Set the OLD_WIKI_PATH env var to the old wiki repo location.`
  )
}

// Helper to extract lore from old wiki HTML
function extractLoreFull(html: string, title: string): any {
  const regex = new RegExp(`<h2>${title}</h2>([\\s\\S]*?)(?:<h2>|<div class="image-section">|</div>)`, 'i')
  const match = html.match(regex)
  if (!match) return { root: { children: [{ children: [{ text: 'Lore not found.', type: 'text' }], type: 'paragraph' }], type: 'root' } }

  const content = match[1]
  const pRegex = /<p>([\s\S]*?)<\/p>/gi
  const paragraphs = []
  let pMatch
  
  while ((pMatch = pRegex.exec(content)) !== null) {
      const cleanText = pMatch[1].replace(/<[^>]*>?/gm, '').trim().replace(/\s+/g, ' ')
      if (cleanText) {
         paragraphs.push({
             type: 'paragraph',
             children: [{ text: cleanText, type: 'text' }]
         })
      }
  }
  
  if (paragraphs.length === 0) {
      const fallbackText = content.replace(/<[^>]*>?/gm, '').trim().replace(/\s+/g, ' ')
      return { root: { children: [{ children: [{ text: fallbackText || 'Lore not found.', type: 'text' }], type: 'paragraph' }], type: 'root' } }
  }
  
  return { root: { children: paragraphs, type: 'root' } }
}

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('--- Cleaning Existing Data ---')
  await payload.delete({ collection: 'characters', where: { id: { exists: true } } })
  await payload.delete({ collection: 'bosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'minibosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'relics', where: { id: { exists: true } } })
  await payload.delete({ collection: 'locations', where: { id: { exists: true } } })
  await payload.delete({ collection: 'status-effects', where: { id: { exists: true } } })
  await payload.delete({ collection: 'rules', where: { id: { exists: true } } })
  await payload.delete({ collection: 'cards', where: { id: { exists: true } } })
  await payload.delete({ collection: 'events', where: { id: { exists: true } } })
  // Don't delete media to avoid breaking existing references if we don't re-upload everything

  // Helper to upload image
  const uploadImage = async (filePath: string, alt: string) => {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`)
      return null
    }
    const filename = path.basename(filePath)
    
    // Check if it already exists in media to prevent duplicates
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } }
    })
    
    if (existing.docs.length > 0) {
      return existing.docs[0].id
    }

    const buffer = fs.readFileSync(filePath)
    const file = {
      data: buffer,
      mimetype: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
      name: filename,
      size: buffer.length,
    }
    
    try {
      const doc = await payload.create({
        collection: 'media',
        data: { alt },
        file,
      })
      return doc.id
    } catch (err) {
      console.error(`Upload failed for ${filename}:`, err)
      return null
    }
  }

  console.log('--- Seeding Status Effects ---')
  const statusEffectsData = [
    { name: 'Bonecracked', type: 'Debuff', description: 'Reduce target DEF by 10% for next turn.' },
    { name: 'Rage / Enraged', type: 'Buff', description: '+50% DMG, attacks ignore 20% of enemy DEF, +20% hit for 3 turns' },
    { name: 'On Guard', type: 'Buff', description: 'Gain +40% defense for 3 turns' },
    { name: 'Blessing', type: 'Buff', description: '+20% dmg buff for 2 turns' },
    { name: 'Focused Aim', type: 'Buff', description: 'Next 2 turns +30% hit chance and attacks ignore 20% of enemy DEF' },
    { name: 'Overexplosion', type: 'Debuff', description: 'Deal 10% of attacking damage dealt to all allies, immediate' },
    { name: 'Moonfall', type: 'Debuff', description: 'Reduces the hit enemies DEF by 20% for 2 turns' },
    { name: 'Invulnerable', type: 'Buff', description: 'Reduce incoming DMG by its entirety (100%).' },
    { name: 'Stun', type: 'Debuff', description: 'Affected targets cannot attack.' },
    { name: 'Devoured', type: 'Debuff', description: 'For 2 turns, takes DMG equal to 20% of MAG (fixed at 60HP).' },
    { name: 'Eye of the Dragon', type: 'Debuff', description: 'For 2 turns, decrease DEF of targets by 10%.' },
    { name: 'Bind', type: 'Debuff', description: 'Reduce target DEF by 15% for 2 turns.' },
  ]
  for (const status of statusEffectsData) {
    await payload.create({ collection: 'status-effects', data: status as any })
  }

  console.log('--- Seeding Locations ---')
  const locationsData = [
    { name: 'Dagat ng Kabisayaan', slug: 'dagat_kabisayaan', tagalogTitle: 'Karagatan ng Eklipse' },
    { name: 'Daragang Magayon', slug: 'daragang_magayon', tagalogTitle: 'Pulo ng Apoy' },
    { name: 'Bundok Pulag', slug: 'bundok_pulag', tagalogTitle: 'Pilak ng Dambana' },
    { name: 'Kaluwalhatian', slug: 'kaluwalhatian', tagalogTitle: 'Ang Kaharian sa Ulap' },
  ]

  const locations: Record<string, number | string> = {}
  for (const loc of locationsData) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'maps', `${loc.slug}.html`)
    let loreData = { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
    if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8')
        loreData = extractLoreFull(html, loc.tagalogTitle)
    }

    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'maps', `${loc.name}.png`)
    const imageId = await uploadImage(imgPath, loc.name)

    const doc = await payload.create({ 
      collection: 'locations', 
      data: {
        name: loc.name,
        slug: loc.slug.replace('_', '-'),
        description: loreData,
        image: imageId
      } as any 
    })
    locations[loc.slug] = doc.id
    console.log(`Created location: ${loc.name}`)
  }

  console.log('--- Seeding Relics (Items) ---')
  // Canonical names/effects/locations per Game-Lore.docx (docx wins, decision #10);
  // real effects migrated from seed-wiki.ts relic/item effects (conflict C10).
  const relicsData = [
    { name: 'Korona ng Araw', slug: 'korona', htmlSlug: 'korona', effect: '+15% DMG to all.', loc: 'daragang_magayon', sourceBoss: 'apolaki', type: 'Artifact' },
    { name: 'Tabak ng Luha ng Buwan', slug: 'luhain', htmlSlug: 'luhain', tagalogTitle: 'Tabak ng Luha ng Buwan - Ang Bantay ni Mayari', effect: '+25% DEF to 2 players.', loc: 'bundok_pulag', sourceBoss: 'mayari', type: 'Artifact' },
    { name: 'Pangil ng Buwan', slug: 'pangil', htmlSlug: 'pangil', effect: 'A next round with No Cooldown of skills for all.', loc: 'dagat_kabisayaan', sourceBoss: 'bakunawa', type: 'Artifact' },
    { name: 'Bato ng Pagsilang', slug: 'silang', htmlSlug: 'silang', tagalogTitle: 'Bato ng Pagsilang - Ang Bantay ni Bathala', effect: 'Grant double shield stats to all allies next turn.', loc: 'kaluwalhatian', sourceBoss: 'bathala', type: 'Artifact' },
    { name: 'Memory Fragment', slug: 'memory-fragment', htmlSlug: 'memory-fragment', effect: 'The combination of all sacred relics. A fragment of the ultimate truth.', type: 'Fragment' }
  ]

  for (const relic of relicsData) {
    let loreData = { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
    if (relic.htmlSlug !== 'memory-fragment') {
        const htmlPath = path.join(OLD_WIKI_PATH, 'relics', `${relic.htmlSlug}.html`)
        if (fs.existsSync(htmlPath)) {
            const html = fs.readFileSync(htmlPath, 'utf-8')
            const titleMatch = html.match(/<h2>(.*?)<\/h2>/)
            const tagalogTitle = relic.tagalogTitle || (titleMatch ? titleMatch[1] : 'Lore')
            loreData = extractLoreFull(html, tagalogTitle)
        }
    }

    let nameForAsset = relic.name
    if (relic.htmlSlug) {
      const assetNames: Record<string, string> = {
        korona: 'Korona', luhain: 'Luhain', pangil: 'Pangil', silang: 'Silang', 'memory-fragment': 'Memory Fragment',
      }
      nameForAsset = assetNames[relic.htmlSlug] || relic.name
    }
    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'relics', `${nameForAsset}.png`)
    const imageId = await uploadImage(imgPath, relic.name)

    await payload.create({ 
      collection: 'relics', 
      data: {
        name: relic.name,
        slug: relic.slug,
        description: loreData,
        effect: relic.effect,
        foundAt: relic.loc ? locations[relic.loc] : undefined,
        image: imageId,
        type: relic.type
      } as any 
    })
    console.log(`Created relic: ${relic.name}`)
  }

  console.log('--- Seeding Bosses ---')
  const bossesData = [
    {
      name: 'Bathala', slug: 'bathala', tagalogTitle: 'Ama ng Langit', loc: 'kaluwalhatian',
      stats: { hp: 2800, atk: 110, mag: 250, def: 200 },
      moveset: [
        { name: "Heaven's Mandate", type: 'Buff', description: 'Do On Guard on self. Removes Debuff. Won’t work if it gets pick after the previous turn.' },
        { name: 'Skyhammer', type: 'Single Target', description: 'Deals 175% MAG on a single target. 70% chance to stun 1 player for 1 turn.' },
        { name: 'Thunderous Decree', type: 'AoE', description: 'Deals 125% MAG on all players. 50% chance to stun 2 players for 1 turn.' },
        { name: 'Celestial Judgement', type: 'Ultimate', description: 'Massive combine strike (ATK+MAG) x 3.0 on highest HP target. Rests for 1 turn after.' },
      ]
    },
    {
      name: 'Mayari', slug: 'mayari', tagalogTitle: 'Diyosa ng Buwan', loc: 'bundok_pulag',
      stats: { hp: 2100, atk: 300, mag: 120, def: 180 },
      moveset: [
        { name: 'Moonlight Grace', type: 'Buff', description: 'Heal herself with a total of 25% max HP.' },
        { name: 'Lunar Strike', type: 'Single Target', description: 'Powerful strike, dealing 115% ATK + 20% MAG.' },
        { name: 'Moonfall Spear', type: 'Single Target', description: 'Deals 105% ATK. Inflict Moonfall (Reduces DEF by 20% for 2 turns).' },
        { name: 'Tide of Night', type: 'AoE', description: 'Invulnerable next turn. Removes all debuffs. Damage all opponents with 30% current HP.' },
      ]
    },
    {
      name: 'Apolaki', slug: 'apolaki', tagalogTitle: 'Diyos ng Araw', loc: 'daragang_magayon',
      stats: { hp: 1700, atk: 360, mag: 70, def: 150 },
      moveset: [
        { name: 'Solar Flare Slash', type: 'Single Target', description: 'Deals 175% ATK to enemy, + 55% CRIT Rate.' },
        { name: 'Radiant Charge', type: 'AoE', description: 'Deals damage to all enemies (80% ATK + 100% MAG). 30% chance to stun 1 hit enemy.' },
        { name: 'Daybreak Fury', type: 'Buff', description: 'Enraged for next turn. Cost 30% of current HP.' },
        { name: 'Sunburst Nova', type: 'AoE', description: 'Deals 1.2x(100% ATK + 125% MAG) to all. Skip 1 turn after.' },
      ]
    },
    {
      name: 'Bakunawa', slug: 'bakunawa', tagalogTitle: 'Serpiyente ng Buwan', loc: 'dagat_kabisayaan',
      stats: { hp: 2000, atk: 40, mag: 300, def: 190 },
      moveset: [
        { name: 'Eclipse Fang', type: 'Single Target', description: 'Heals Bakunawa for 50 (+100%) MAG. Deals 110% MAG as damage.' },
        { name: "Serpent's Coil", type: 'Single Target', description: 'Binds enemy. Deal 50 (+150%) ATK damage.' },
        { name: 'Lunar Devour', type: 'AoE', description: 'Deal 80% MAG to all. Inflicts Devoured (Takes fixed 60HP DMG for 2 turns).' },
        { name: 'Shadow Dive', type: 'Buff', description: 'Recharge magical power, skip 1 turn. Next attack deals double damage.' },
        { name: 'Eat the Sun and Moon', type: 'Passive', description: 'At 50% HP, Bakunawa skips its turn and summons Minokawa. Minokawa takes 50% of Bakunawa\'s current HP to inherit. Both heal 20% of Bakunawa\'s max HP. Minokawa attacks the same turn.' },
      ]
    },
    {
      name: 'Minokawa', slug: 'minokawa', tagalogTitle: 'Lawin ng Kamatayan', loc: 'dagat_kabisayaan',
      stats: { hp: 2000, atk: 300, mag: 40, def: 190 },
      moveset: [
        { name: 'Solar Devour', type: 'Single Target', description: 'Swallows prey, stunning for 1 turn. Deals 90% ATK, ignore 10% DEF.' },
        { name: 'Wing Tempest', type: 'AoE', description: 'Deals 80% ATK damage to all. Inflicts Eye of the Dragon (Decrease DEF by 10% for 2 turns).' },
        { name: 'Brave Slash', type: 'AoE', description: 'Powerful air slash, dealing 80% ATK + 100% MAG.' },
        { name: "Sky's Wrath", type: 'Single Target', description: 'Dives with cosmic force. Deals 180% ATK. Heals 20% max HP on kill.' },
      ]
    }
  ]

  const bosses: Record<string, string | number> = {}
  for (const boss of bossesData) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'boss', `${boss.slug}.html`)
    let loreData = { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
    if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8')
        loreData = extractLoreFull(html, boss.tagalogTitle)
    }
    if (boss.slug === 'minokawa') {
      // Minokawa's HP is dynamic ("inherits Bakunawa's total HP" per char-stats) —
      // seeded as the resolved 2000, with the rule noted in prose (conflict C1).
      loreData.root.children.push({
        type: 'paragraph',
        children: [{ text: 'Note: Minokawa inherits Bakunawa\'s total HP in battle — see Bakunawa\'s "Eat the Sun and Moon" passive.', type: 'text' }]
      })
    }

    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'boss', `${boss.name}.png`)
    const imageId = await uploadImage(imgPath, boss.name)

    const doc = await payload.create({
      collection: 'bosses',
      data: {
        name: boss.name,
        slug: boss.slug,
        description: loreData,
        stats: boss.stats,
        moveset: boss.moveset,
        location: locations[boss.loc],
        image: imageId
      } as any
    })
    bosses[boss.slug] = doc.id
    console.log(`Created boss: ${boss.name}`)
  }

  console.log('--- Linking Relic sourceBoss ---')
  for (const relic of relicsData) {
    if (relic.sourceBoss && bosses[relic.sourceBoss]) {
      await payload.update({
        collection: 'relics',
        where: { slug: { equals: relic.slug } },
        data: { sourceBoss: bosses[relic.sourceBoss] },
      })
      console.log(`Linked relic: ${relic.name} -> ${relic.sourceBoss}`)
    }
  }

  console.log('--- Seeding Mini Bosses ---')
  const minibossesData = [
    {
      name: 'Manananggal', slug: 'manananggal', tagalogTitle: 'Ang Bantay ni Mayari', loc: 'bundok_pulag', parentBoss: 'mayari',
      stats: { hp: 900, atk: 230, mag: 35, def: 100 },
      moveset: [
        { name: 'Batwing Slash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Blood Splash', description: 'Deals 1.5 x ATK to one enemy' },
        { name: 'Split Body', description: 'Deals 1.6 x ATK to all enemies' },
      ]
    },
    {
      name: 'Tiyanak', slug: 'tiyanak', tagalogTitle: 'Ang Bantay ni Apolaki', loc: 'daragang_magayon', parentBoss: 'apolaki',
      stats: { hp: 1150, atk: 50, mag: 195, def: 125 },
      moveset: [
        { name: 'Claw Latch', description: 'Deals 1.2 x MAG to one enemy' },
        { name: 'Blood Hex', description: 'Deals 1.5 x MAG to one enemy' },
        { name: 'Demonic Wail', description: 'Deals 1.6 x MAG to all enemies' },
      ]
    },
    {
      name: 'Sirena', slug: 'sirena', tagalogTitle: 'Ang Bantay ni Bakunawa at Minokawa', loc: 'dagat_kabisayaan', parentBoss: 'bakunawa',
      stats: { hp: 1000, atk: 20, mag: 240, def: 80 },
      moveset: [
        { name: 'Drowning Current', description: 'Deals 1.2 x MAG to one enemy' },
        { name: 'Tidal Surge', description: 'Deals 1.5 x MAG to one enemy' },
        { name: 'Moonlight Hymn', description: 'Deals 1.6 x MAG to all enemies' },
      ]
    },
    {
      name: 'Kapre', slug: 'kapre', tagalogTitle: 'Ang Bantay ni Bathala', loc: 'kaluwalhatian', parentBoss: 'bathala',
      stats: { hp: 1300, atk: 200, mag: 0, def: 150 },
      moveset: [
        { name: 'Tree Smash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Uproot Smash', description: 'Deals 1.5 x ATK to one enemy' },
        { name: 'Forest Wrath', description: 'Deals 1.6 x ATK to all enemies' },
      ]
    }
  ]

  for (const mini of minibossesData) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'mini_boss', `${mini.slug}.html`)
    let loreData = { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
    if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8')
        loreData = extractLoreFull(html, mini.tagalogTitle)
    }

    let assetName = mini.name
    if (mini.name === 'Tiyanak') assetName = 'Tiyanak Swarm'
    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'mini_boss', `${assetName}.png`)
    const imageId = await uploadImage(imgPath, mini.name)

    await payload.create({
      collection: 'minibosses',
      data: {
        name: mini.name,
        slug: mini.slug,
        description: loreData,
        stats: mini.stats,
        moveset: mini.moveset,
        location: locations[mini.loc],
        parentBoss: mini.parentBoss ? bosses[mini.parentBoss] : undefined,
        image: imageId
      } as any
    })
    console.log(`Created miniboss: ${mini.name}`)
  }

  console.log('--- Seeding Characters ---')
  const charactersData = [
    {
      name: 'Mandirigma', slug: 'mandirigma', role: 'Damage', tagalogTitle: 'Ang Sandata ng Balangay',
      presets: [
        { name: 'Glass Canon', stats: { hp: 650, atk: 120, mag: 0, def: 60 } },
        { name: 'Bruiser', stats: { hp: 800, atk: 90, mag: 0, def: 90 } },
        { name: 'Berserker', stats: { hp: 700, atk: 100, mag: 0, def: 75 } },
      ],
      moveset: [
        { name: 'Attack', description: 'Deals 50 (+150% ATK), 100% hit', cooldown: 1 },
        { name: 'Heavy Attack', description: 'Deals 334% ATK, 80% hit, 50% chance to inflict Bonecracked', cooldown: 2 },
        { name: 'Rest', description: 'Removes negative status effects for self', cooldown: 3 },
        { name: 'All-in Attack', description: 'Deals 834% ATK, 40% hit', cooldown: 3 },
        { name: 'Berserk State', description: 'Inflicts Rage on self. Requirement: HP at 50%', cooldown: 4 },
      ]
    },
    {
      name: 'Bagani', slug: 'bagani', role: 'Tank', tagalogTitle: 'Ang Kalasag ng Balangay',
      presets: [
        { name: 'Wall', stats: { hp: 1050, atk: 30, mag: 0, def: 250 } },
        { name: 'Juggernaut', stats: { hp: 1000, atk: 60, mag: 0, def: 190 } },
        { name: 'Damage Soaker', stats: { hp: 1200, atk: 40, mag: 0, def: 160 } },
      ],
      moveset: [
        { name: 'Shield Bash', description: 'Deals 50 (+100% ATK), 100% hit', cooldown: 1 },
        { name: 'Taunt', description: 'Boss targets you for 2 turns', cooldown: 2 },
        { name: 'Fortify', description: 'Gain shield equal to +30% max HP for 2 turns', cooldown: 4 },
        { name: 'Last Stand', description: 'Do On Guard on self. Requirement: HP <= 20%', cooldown: 4 },
        { name: 'Guardian’s Oath', description: 'Sacrifice 25% current HP, shield all allies (except itself) for 25% current HP for 2 turns. Unstackable.', cooldown: 4 },
      ]
    },
    {
      name: 'Babaylan', slug: 'babaylan', role: 'Healer', tagalogTitle: 'Ang Diwa ng Balangay',
      presets: [
        { name: 'Pure Healer', stats: { hp: 500, atk: 0, mag: 220, def: 70 } },
        { name: 'Support Cleric', stats: { hp: 650, atk: 0, mag: 200, def: 80 } },
        { name: 'Battle Priest', stats: { hp: 800, atk: 0, mag: 180, def: 130 } },
      ],
      moveset: [
        { name: 'Heal', description: 'Restore HP equivalent to 100 (+50% MAG) to ally, and heals self for 50%', cooldown: 2 },
        { name: 'Blessing', description: 'Apply +20% DMG buff for 2 turns to ally', cooldown: 3 },
        { name: 'Mana Surge', description: 'Deals 100% MAG, 100% hit', cooldown: 1 },
        { name: 'Purify', description: 'Removes all debuffs to all players', cooldown: 2 },
        { name: 'Sacrifice', description: 'Lose 200 HP, heal all allies (except itself) HP equivalent to 50 (+100% MAG)', cooldown: 3 },
      ]
    },
    {
      name: 'Mangangayaw', slug: 'mangangayaw', role: 'Ranged', tagalogTitle: 'Ang Anino ng Balangay',
      presets: [
        { name: 'Sniper', stats: { hp: 600, atk: 110, mag: 0, def: 50 } },
        { name: 'Ranger', stats: { hp: 700, atk: 90, mag: 0, def: 100 } },
        { name: 'Hunter', stats: { hp: 750, atk: 100, mag: 0, def: 80 } },
      ],
      moveset: [
        { name: 'Quick Shot', description: 'Deals 150 (+ 150% ATK), 100% hit', cooldown: 1 },
        { name: 'Piercing Arrow', description: 'Deals 225% ATK, ignores defense, 80% hit', cooldown: 3 },
        { name: 'Volley', description: 'Deals 50 (+100% ATK) each to all enemies, 80% hit', cooldown: 1 },
        { name: 'Focus Aim', description: 'Apply +30% hit chance and ignore 20% enemy DEF for next 2 turns', cooldown: 4 },
        { name: 'Explosive Arrow', description: 'Deals 300 (+ 500% ATK), 50% hit, 30% chance to commit Overexplosion', cooldown: 3 },
      ]
    }
  ]

  const characters: Record<string, string | number> = {}
  for (const char of charactersData) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'roles', `${char.slug}.html`)
    let loreData = { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
    if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8')
        loreData = extractLoreFull(html, char.tagalogTitle)
    }

    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'roles', `${char.name}.png`)
    const imageId = await uploadImage(imgPath, char.name)

    const doc = await payload.create({
      collection: 'characters',
      data: {
        name: char.name,
        slug: char.slug,
        role: char.role,
        description: loreData,
        presets: char.presets,
        moveset: char.moveset,
        image: imageId
      } as any
    })
    characters[char.slug] = doc.id
    console.log(`Created character: ${char.name}`)
  }

  console.log('--- Seeding Rules ---')
  // Full rule content comes from GAME-MASTER-SCRIPT-v0.2 (extracted-content.json -> script
  // key) — docx wins; the old-wiki cards.html holds only a skeleton of headings/one-liners.
  // Audience split per decision #6/#9: Prep + Opening the Table gmOnly, story sections
  // player-facing, script instructions become Intro to Cards/Dice (d9 -> d10 canonical).
  const extractedJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'extracted-content.json'), 'utf-8')
  )
  const scriptText: string = extractedJson.script

  const cleanScript = (s: string): string =>
    s
      .replace(/\u00E2\u20AC\u0153/g, '\u201C') // â€œ -> left quote
      .replace(/\u00E2\u20AC\u2122/g, '\u2019') // â€™ -> apostrophe
      .replace(/\u00E2\u20AC[\u009C\u009D]/g, '\u201D') // â€<ctl> -> right quote
      .replace(/\u00E2\u20AC/g, '\u2014') // remaining â€ -> em dash
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

  const scriptSection = (start: string, end: string): string => {
    const m = new RegExp(start).exec(scriptText)
    if (!m) return ''
    const from = m.index + m[0].length
    if (!end) return cleanScript(scriptText.slice(from))
    const em = new RegExp(end).exec(scriptText.slice(from))
    const to = em ? from + em.index : scriptText.length
    return cleanScript(scriptText.slice(from, to))
  }

  const toRichText = (text: string) => ({
    root: { children: [{ children: [{ text }], type: 'paragraph' }], type: 'root' }
  })

  const rulesData = [
    { title: 'Prep', order: 1, gmOnly: true, text: scriptSection('1\\) Prep \\(GM, before players arrive\\)', '2\\) Opening the table') },
    { title: 'Opening the Table', order: 2, gmOnly: true, text: 'GM script + background music. The GM narrates the opening story — Brief History – Pambungad, Pagtawag sa mga Manlalaro, Paglalahad ng Apat na Diyos, Paglipat sa Manlalakbay — then walks the players through the card and dice instructions.' },
    { title: 'Introduction to Cards', order: 3, gmOnly: false, text: scriptSection('\\[Instruksiyon sa Cards\\]', '\\[Instruksiyon sa Dice\\]') },
    { title: 'Introduction to Dice', order: 4, gmOnly: false, text: scriptSection('\\[Instruksiyon sa Dice\\]', '3\\) Explain the simple core loop').replace(/\bd9\b/gi, 'd10') },
    { title: 'Core Loop', order: 5, gmOnly: false, text: scriptSection('3\\) Explain the simple core loop \\(one line\\)', '\\[Transition to Gameplay\\]') },
    { title: 'Brief History – Pambungad', gmOnly: false, text: scriptSection('\\[Brief History[^\\]]*\\]', '\\[Pagtawag sa mga Manlalaro\\]') },
    { title: 'Pagtawag sa mga Manlalaro', gmOnly: false, text: scriptSection('\\[Pagtawag sa mga Manlalaro\\]', '\\[Paglalahad ng Apat na Diyos\\]') },
    { title: 'Paglalahad ng Apat na Diyos', gmOnly: false, text: scriptSection('\\[Paglalahad ng Apat na Diyos\\]', '\\[Paglipat sa Manlalakbay\\]') },
    { title: 'Paglipat sa Manlalakbay', gmOnly: false, text: scriptSection('\\[Paglipat sa Manlalakbay\\]', '\\[Instruksiyon sa Cards\\]') },
    { title: 'Transition to Gameplay', gmOnly: true, text: scriptSection('\\[Transition to Gameplay\\]', '') },
  ]

  const matPath = path.join(OLD_WIKI_PATH, 'assets', 'rules', 'playing_mat.jpg')
  const matImageId = fs.existsSync(matPath) ? await uploadImage(matPath, 'Balangay Playing Mat') : null

  for (const rule of rulesData) {
    const children: any[] = [{ children: [{ text: rule.text, type: 'text' }], type: 'paragraph' }]
    if (rule.title === 'Introduction to Cards' && matImageId) {
      children.push({
        type: 'upload',
        relationTo: 'media',
        value: matImageId,
        fields: { alt: 'Playing mat — where players place their chosen cards' },
        children: [{ text: '', type: 'text' }],
        version: 1,
        format: 'center',
      })
    }

    await payload.create({
      collection: 'rules',
      data: {
        title: rule.title,
        slug: rule.title.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, ''),
        content: { root: { children, type: 'root' } },
        order: rule.order,
        gmOnly: rule.gmOnly,
      } as any
    })
    console.log(`Created rule: ${rule.title}${rule.gmOnly ? ' (GM)' : ''}`)
  }

  console.log('--- Seeding Cards ---')
  const assetsPath = path.join(OLD_WIKI_PATH, 'assets')
  
  const seedCardDir = async (dirName: string, type: string, category?: string) => {
      const fullPath = path.join(assetsPath, dirName)
      if (!fs.existsSync(fullPath)) return
      
      const files = fs.readdirSync(fullPath)
      for (const file of files) {
          const filePath = path.join(fullPath, file)
          if (fs.lstatSync(filePath).isDirectory()) {
              await seedCardDir(path.join(dirName, file), type, file)
              continue
          }
          
          if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) continue
          
          const name = file.split('.')[0].replace(/([A-Z])/g, ' $1').trim()
          const imageId = await uploadImage(filePath, name)
          if (imageId) {
              await payload.create({
                  collection: 'cards',
                  data: {
                      name,
                      slug: `${type}-${file.split('.')[0].toLowerCase()}`,
                      type: type as any,
                      category: category,
                      image: imageId,
                      description: `Official ${type} card for ${name}.`
                  } as any
              })
              console.log(`Created card: ${name} (${type})`)
          }
      }
  }

  await seedCardDir('ROLE CARDS', 'role')
  await seedCardDir('PRESET CARDS', 'preset')
  await seedCardDir('SKILL CARDS', 'skill')
  await seedCardDir('MAP CARDS', 'map')
  await seedCardDir('MAIN BOSS CARDS', 'boss')
  await seedCardDir('MINI BOSS CARDS', 'miniboss')
  await seedCardDir('SPECIAL ITEM CARDS', 'item')
  
  // Seed individual cards
  const backCardPath = path.join(assetsPath, 'CARD BACK OG.png')
  const backImageId = await uploadImage(backCardPath, 'Card Back')
  if (backImageId) {
      await payload.create({
          collection: 'cards',
          data: {
              name: 'Balangay Card Back',
              slug: 'card-back',
              type: 'back',
              image: backImageId,
              description: 'The official card back for all Balangay of the Forgotten cards.'
          } as any
      })
  }

  const utilities = [
      { file: 'turnpiece.png', name: 'Turn Piece', type: 'utility' },
      { file: 'd4.png', name: 'd4 Dice', type: 'utility' },
      { file: 'd10.png', name: 'd10 Dice', type: 'utility' },
      { file: 'd20.png', name: 'd20 Dice', type: 'utility' },
      { file: 'd100.png', name: 'd100 Dice', type: 'utility' }
  ]

  for (const util of utilities) {
      const utilPath = path.join(assetsPath, util.file)
      const utilImageId = await uploadImage(utilPath, util.name)
      if (utilImageId) {
          await payload.create({
              collection: 'cards',
              data: {
                  name: util.name,
                  slug: util.name.toLowerCase().replace(/\s+/g, '-'),
                  type: 'utility',
                  image: utilImageId,
                  description: `Game utility: ${util.name}`
              } as any
          })
      }
  }

  console.log('--- Seeding Chronicles (Events) ---')
  const eventsData = [
    {
      title: 'The Divine Genesis',
      year: -1000,
      era: 'Early Migration',
      descriptionText: 'Bathala, Mayari, and Apolaki watch over the creation of the archipelago. The first Balangay vessels are carved by ancestral hands, blessed with rituals to navigate both the mortal seas and the currents of memory.'
    },
    {
      title: 'The Age of Harmony',
      year: 250,
      era: 'Early Migration',
      descriptionText: 'Mortal settlements flourish along the coastlines of Dagat ng Kabisayaan and Bundok Pulag. Ancient scrolls detail peaceful cooperation between mortals and elemental spirits under the guidance of the gods.'
    },
    {
      title: "The Father's Tyranny",
      year: 500,
      era: 'The Great Fragmentation',
      descriptionText: 'Consumed by greed and pride, Bathala claims supreme dominion. He seizes the Stone of Birth and retreats to the floating kingdom of Kaluwalhatian, enslaving the forest Kapre to guard his heavenly sanctuary.'
    },
    {
      title: 'The Eclipse War',
      year: 520,
      era: 'The Great Fragmentation',
      descriptionText: 'Mayari and Apolaki unite to challenge their father’s tyranny. The celestial conflict fragments the archipelago, separating the mortal realm from the memory-bound Kabilang Mundo. During the war, Mayari\'s silver sword, the Tears of the Moon, is shattered.'
    },
    {
      title: 'The Rising of Bakunawa',
      year: 700,
      era: 'Age of the Balangay',
      descriptionText: 'As the gods remain wounded and isolated, the giant sea serpent Bakunawa rises from the depths of the Eclipse Ocean, attempting to swallow the moons. Sirens are spawned to lure mortal ships to their doom.'
    },
    {
      title: 'The Wake of the Forgotten',
      year: 1000,
      era: 'The Current Awakening',
      descriptionText: 'The ancient Balangay vessel reawakens. A new generation of Pinili (the Chosen)—the Mandirigma, Bagani, Babaylan, and Mangangayaw—step aboard to cross the veil into the Kabilang Mundo and reconstruct the forgotten memories.'
    }
  ]

  for (const ev of eventsData) {
    // Generate Lexical description
    const desc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: ev.descriptionText
              }
            ]
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    }

    let imageId = null
    if (ev.title === 'The Divine Genesis' || ev.title === 'The Wake of the Forgotten') {
        const bgPath = path.join(assetsPath, 'bglong.png')
        imageId = await uploadImage(bgPath, ev.title)
    } else if (ev.title === 'The Eclipse War' || ev.title === 'The Rising of Bakunawa') {
        const fightPath = path.join(assetsPath, 'fight-scene', 'Dagat.png')
        imageId = await uploadImage(fightPath, ev.title)
    } else {
        const kalPath = path.join(assetsPath, 'kaluwalhatian.png')
        imageId = await uploadImage(kalPath, ev.title)
    }

    let relatedLore: any[] = []
    
    if (ev.title === 'The Divine Genesis') {
      relatedLore = [
        { relationTo: 'bosses', value: bosses['bathala'] },
        { relationTo: 'bosses', value: bosses['mayari'] },
        { relationTo: 'bosses', value: bosses['apolaki'] },
        { relationTo: 'locations', value: locations['kaluwalhatian'] }
      ].filter(r => r.value)
    } else if (ev.title === 'The Age of Harmony') {
      relatedLore = [
        { relationTo: 'locations', value: locations['dagat_kabisayaan'] },
        { relationTo: 'locations', value: locations['bundok_pulag'] }
      ].filter(r => r.value)
    } else if (ev.title === "The Father's Tyranny") {
      relatedLore = [
        { relationTo: 'bosses', value: bosses['bathala'] },
        { relationTo: 'locations', value: locations['kaluwalhatian'] }
      ].filter(r => r.value)
    } else if (ev.title === 'The Eclipse War') {
      relatedLore = [
        { relationTo: 'bosses', value: bosses['mayari'] },
        { relationTo: 'bosses', value: bosses['apolaki'] },
        { relationTo: 'locations', value: locations['ang_kabilang_mundo'] }
      ].filter(r => r.value)
    } else if (ev.title === 'The Rising of Bakunawa') {
      relatedLore = [
        { relationTo: 'bosses', value: bosses['bakunawa'] },
        { relationTo: 'locations', value: locations['dagat_kabisayaan'] }
      ].filter(r => r.value)
    } else if (ev.title === 'The Wake of the Forgotten') {
      relatedLore = [
        { relationTo: 'characters', value: characters['mandirigma'] },
        { relationTo: 'characters', value: characters['bagani'] },
        { relationTo: 'characters', value: characters['babaylan'] },
        { relationTo: 'characters', value: characters['mangangayaw'] },
        { relationTo: 'locations', value: locations['ang_kabilang_mundo'] }
      ].filter(r => r.value)
    }

    await payload.create({
      collection: 'events',
      data: {
        title: ev.title,
        year: ev.year,
        era: ev.era,
        description: desc,
        image: imageId,
        relatedLore
      } as any
    })
    console.log(`Created event: ${ev.title}`)
  }

  console.log('--- Seeding Complete! ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
