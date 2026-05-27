import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

const OLD_WIKI_PATH = 'C:/Users/admin/OneDrive/Documents/GitHub/balangay_of_the_forgotten'

// Helper to extract lore from old wiki HTML
function extractLoreFull(html: string, title: string): any {
  const regex = new RegExp(`<h2>${title}</h2>([\\s\\S]*?)(?:<h2>|<div class="image-section">|</div>)`, 'i')
  const match = html.match(regex)
  if (!match) return { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }

  const content = match[1]
  const pRegex = /<p>([\s\S]*?)<\/p>/gi
  const paragraphs = []
  let pMatch
  
  while ((pMatch = pRegex.exec(content)) !== null) {
      const cleanText = pMatch[1].replace(/<[^>]*>?/gm, '').trim().replace(/\s+/g, ' ')
      if (cleanText) {
         paragraphs.push({
             type: 'paragraph',
             children: [{ text: cleanText }]
         })
      }
  }
  
  if (paragraphs.length === 0) {
      const fallbackText = content.replace(/<[^>]*>?/gm, '').trim().replace(/\s+/g, ' ')
      return { root: { children: [{ children: [{ text: fallbackText || 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
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
    { name: 'Daragang Magayon', slug: 'daragang_magayon', tagalogTitle: 'Bulkan ng Magayon' },
    { name: 'Bundok Pulag', slug: 'bundok_pulag', tagalogTitle: 'Bundok ng mga Diyos' },
    { name: 'Kaluwalhatian', slug: 'kaluwalhatian', tagalogTitle: 'Tahanan ng mga Diyos' },
    { name: 'Ang Kabilang Mundo', slug: 'ang_kabilang_mundo', tagalogTitle: 'Lagusan' }
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
  const relicsData = [
    { name: 'Korona ng Araw', slug: 'korona', htmlSlug: 'korona', effect: 'Ancient relic of the archipelago.', loc: 'bundok_pulag', type: 'Artifact' },
    { name: 'Luha ng Buwan', slug: 'luhain', htmlSlug: 'luhain', tagalogTitle: 'Tabak ng Luha ng Buwan - Ang Bantay ni Mayari', effect: 'Ancient relic of the archipelago.', loc: 'dagat_kabisayaan', type: 'Artifact' },
    { name: 'Pangil ng Buwan', slug: 'pangil', htmlSlug: 'pangil', effect: 'Ancient relic of the archipelago.', loc: 'dagat_kabisayaan', type: 'Artifact' },
    { name: 'Silang', slug: 'silang', htmlSlug: 'silang', tagalogTitle: 'Bato ng Pagsilang - Ang Bantay ni Bathala', effect: 'Ancient relic of the archipelago.', loc: 'kaluwalhatian', type: 'Artifact' },
    { name: 'Memory Fragment', slug: 'memory-fragment', htmlSlug: 'memory-fragment', effect: 'The combination of all sacred relics. A fragment of the ultimate truth.', loc: 'ang_kabilang_mundo', type: 'Fragment' }
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

    let nameForAsset = relic.name === 'Memory Fragment' ? 'Memory Fragment' : relic.name.split(' ')[0]
    if (relic.htmlSlug === 'luhain') nameForAsset = 'Luhain'
    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'relics', `${nameForAsset}.png`)
    const imageId = await uploadImage(imgPath, relic.name)

    await payload.create({ 
      collection: 'relics', 
      data: {
        name: relic.name,
        slug: relic.slug,
        description: loreData,
        effect: relic.effect,
        foundAt: locations[relic.loc],
        image: imageId,
        type: relic.type
      } as any 
    })
    console.log(`Created relic: ${relic.name}`)
  }

  console.log('--- Seeding Bosses ---')
  const bossesData = [
    {
      name: 'Bathala', slug: 'bathala', tagalogTitle: 'Ama ng Langit',
      stats: { hp: 2800, atk: 110, mag: 250, def: 200 },
      moveset: [
        { name: "Heaven's Mandate", type: 'Buff', description: 'Do On Guard on self. Removes Debuff. Won’t work if it gets pick after the previous turn.' },
        { name: 'Skyhammer', type: 'Single Target', description: 'Deals 175% MAG on a single target. 70% chance to stun 1 player for 1 turn.' },
        { name: 'Thunderous Decree', type: 'AoE', description: 'Deals 125% MAG on all players. 50% chance to stun 2 players for 1 turn.' },
        { name: 'Celestial Judgement', type: 'Ultimate', description: 'Massive combine strike (ATK+MAG) x 3.0 on highest HP target. Rests for 1 turn after.' },
      ]
    },
    {
      name: 'Mayari', slug: 'mayari', tagalogTitle: 'Diyosa ng Buwan',
      stats: { hp: 2100, atk: 300, mag: 120, def: 180 },
      moveset: [
        { name: 'Moonlight Grace', type: 'Buff', description: 'Heal herself with a total of 25% max HP.' },
        { name: 'Lunar Strike', type: 'Single Target', description: 'Powerful strike, dealing 115% ATK + 20% MAG.' },
        { name: 'Moonfall Spear', type: 'Single Target', description: 'Deals 105% ATK. Inflict Moonfall (Reduces DEF by 20% for 2 turns).' },
        { name: 'Tide of Night', type: 'AoE', description: 'Invulnerable next turn. Removes all debuffs. Damage all opponents with 30% current HP.' },
      ]
    },
    {
      name: 'Apolaki', slug: 'apolaki', tagalogTitle: 'Diyos ng Araw',
      stats: { hp: 1700, atk: 360, mag: 70, def: 150 },
      moveset: [
        { name: 'Solar Flare Slash', type: 'Single Target', description: 'Deals 175% ATK to enemy, + 55% CRIT Rate.' },
        { name: 'Radiant Charge', type: 'AoE', description: 'Deals damage to all enemies (80% ATK + 100% MAG). 30% chance to stun 1 hit enemy.' },
        { name: 'Daybreak Fury', type: 'Buff', description: 'Enraged for next turn. Cost 30% of current HP.' },
        { name: 'Sunburst Nova', type: 'AoE', description: 'Deals 1.2x(100% ATK + 125% MAG) to all. Skip 1 turn after.' },
      ]
    },
    {
      name: 'Bakunawa', slug: 'bakunawa', tagalogTitle: 'Serpiyente ng Buwan',
      stats: { hp: 2000, atk: 40, mag: 300, def: 190 },
      moveset: [
        { name: 'Eclipse Fang', type: 'Single Target', description: 'Heals Bakunawa for 50 (+100%) MAG. Deals 110% MAG as damage.' },
        { name: "Serpent's Coil", type: 'Single Target', description: 'Binds enemy. Deal 50 (+150%) ATK damage.' },
        { name: 'Lunar Devour', type: 'AoE', description: 'Deal 80% MAG to all. Inflicts Devoured (Takes fixed 60HP DMG for 2 turns).' },
        { name: 'Shadow Dive', type: 'Buff', description: 'Recharge magical power, skip 1 turn. Next attack deals double damage.' },
        { name: 'Eat the Sun and Moon', type: 'Passive', description: 'At 50% HP, summons Minokawa. Both heal 20% of Bakunawa max HP.' },
      ]
    },
    {
      name: 'Minokawa', slug: 'minokawa', tagalogTitle: 'Lawin ng Kamatayan',
      stats: { hp: 1000, atk: 300, mag: 40, def: 190 },
      moveset: [
        { name: 'Solar Devour', type: 'Single Target', description: 'Swallows prey, stunning for 1 turn. Deals 90% ATK, ignore 10% DEF.' },
        { name: 'Wing Tempest', type: 'AoE', description: 'Deals 80% ATK damage to all. Inflicts Eye of the Dragon (Decrease DEF by 10% for 2 turns).' },
        { name: 'Brave Slash', type: 'AoE', description: 'Powerful air slash, dealing 80% ATK + 100% MAG.' },
        { name: "Sky's Wrath", type: 'Single Target', description: 'Dives with cosmic force. Deals 180% ATK. Heals 20% max HP on kill.' },
      ]
    }
  ]

  for (const boss of bossesData) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'boss', `${boss.slug}.html`)
    let loreData = { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
    if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8')
        loreData = extractLoreFull(html, boss.tagalogTitle)
    }

    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'boss', `${boss.name}.png`)
    const imageId = await uploadImage(imgPath, boss.name)

    await payload.create({
      collection: 'bosses',
      data: {
        name: boss.name,
        slug: boss.slug,
        description: loreData,
        stats: boss.stats,
        moveset: boss.moveset,
        image: imageId,
      } as any
    })
    console.log(`Created boss: ${boss.name}`)
  }

  console.log('--- Seeding Mini Bosses ---')
  const minibossesData = [
    {
      name: 'Manananggal', slug: 'manananggal', tagalogTitle: 'Ang Bantay ni Mayari', loc: 'dagat_kabisayaan',
      stats: { hp: 900, atk: 230, mag: 35, def: 100 },
      moveset: [
        { name: 'Batwing Slash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Blood Splash', description: 'Deals 1.5 x ATK to one enemy' },
        { name: 'Split Body', description: 'Deals 1.6 x ATK to all enemies' },
      ]
    },
    {
      name: 'Tiyanak', slug: 'tiyanak', tagalogTitle: 'Ang Bantay ni Apolaki', loc: 'daragang_magayon',
      stats: { hp: 1150, atk: 50, mag: 195, def: 125 },
      moveset: [
        { name: 'Claw Latch', description: 'Deals 1.2 x MAG to one enemy' },
        { name: 'Blood Hex', description: 'Deals 1.5 x MAG to one enemy' },
        { name: 'Demonic Wail', description: 'Deals 1.6 x MAG to all enemies' },
      ]
    },
    {
      name: 'Sirena', slug: 'sirena', tagalogTitle: 'Ang Bantay ni Bakunawa at Minokawa', loc: 'dagat_kabisayaan',
      stats: { hp: 1000, atk: 20, mag: 240, def: 80 },
      moveset: [
        { name: 'Drowning Current', description: 'Deals 1.2 x MAG to one enemy' },
        { name: 'Tidal Surge', description: 'Deals 1.5 x MAG to one enemy' },
        { name: 'Moonlight Hymn', description: 'Deals 1.6 x MAG to all enemies' },
      ]
    },
    {
      name: 'Kapre', slug: 'kapre', tagalogTitle: 'Ang Bantay ni Bathala', loc: 'bundok_pulag',
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
        image: imageId,
      } as any
    })
    console.log(`Created miniboss: ${mini.name}`)
  }

  console.log('--- Seeding Characters ---')
  const charactersData = [
    {
      name: 'Mandirigma', slug: 'mandirigma', role: 'Damage', tagalogTitle: 'Ang Matapang na Mandirigma',
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
      name: 'Bagani', slug: 'bagani', role: 'Tank', tagalogTitle: 'Ang Tagapagtanggol',
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
        { name: 'Guardian’s Oath', description: 'Sacrifice 25% current HP, shield all allies for 25% current HP for 2 turns', cooldown: 4 },
      ]
    },
    {
      name: 'Babaylan', slug: 'babaylan', role: 'Healer', tagalogTitle: 'Ang Manggagamot',
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
      name: 'Mangangayaw', slug: 'mangangayaw', role: 'Ranged', tagalogTitle: 'Ang Mangangaso',
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

  for (const char of charactersData) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'roles', `${char.slug}.html`)
    let loreData = { root: { children: [{ children: [{ text: 'Lore not found.' }], type: 'paragraph' }], type: 'root' } }
    if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8')
        loreData = extractLoreFull(html, char.tagalogTitle)
    }

    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'roles', `${char.name}.png`)
    const imageId = await uploadImage(imgPath, char.name)

    await payload.create({
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
    console.log(`Created character: ${char.name}`)
  }

  console.log('--- Seeding Rules ---')
  const rulesHtmlPath = path.join(OLD_WIKI_PATH, 'wiki', 'cards.html')
  if (fs.existsSync(rulesHtmlPath)) {
      const html = fs.readFileSync(rulesHtmlPath, 'utf-8')
      const rulesData = [
          { title: 'Prep', tagalogTitle: '1\\) Prep \\(GM, before players arrive\\)' },
          { title: 'Opening the Table', tagalogTitle: '2\\) Opening the Table' },
          { title: 'Core Loop', tagalogTitle: '5\\) Core Loop' }
      ]
      
      let order = 1
      for (const rule of rulesData) {
          const regex = new RegExp(`<h3>${rule.tagalogTitle}</h3>([\\s\\S]*?)(?:<h3>|</div>)`, 'i')
          const match = html.match(regex)
          let ruleContent = { root: { children: [{ children: [{ text: 'Content not found.' }], type: 'paragraph' }], type: 'root' } }
          
          if (match) {
              const content = match[1]
              const cleanText = content.replace(/<[^>]*>?/gm, '').trim().replace(/\s+/g, ' ')
              ruleContent = { root: { children: [{ children: [{ text: cleanText }], type: 'paragraph' }], type: 'root' } }
          }

          await payload.create({
              collection: 'rules',
              data: {
                  title: rule.title,
                  slug: rule.title.toLowerCase().replace(/\s+/g, '-'),
                  content: ruleContent,
                  order: order++
              } as any
          })
          console.log(`Created rule: ${rule.title}`)
      }
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

  console.log('--- Seeding Complete! ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
