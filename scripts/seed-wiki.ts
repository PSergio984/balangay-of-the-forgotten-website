import { getPayload } from 'payload'
import config from '../payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('--- Cleaning Existing Data ---')
  await payload.delete({ collection: 'characters', where: { id: { exists: true } } })
  await payload.delete({ collection: 'bosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'minibosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'relics', where: { id: { exists: true } } })
  await payload.delete({ collection: 'locations', where: { id: { exists: true } } })
  await payload.delete({ collection: 'news', where: { id: { exists: true } } })

  console.log('--- Seeding Locations ---')
  const locationsData = [
    { name: 'Dagat ng Kabisayaan', slug: 'dagat-ng-kabisayaan', description: { root: { children: [{ children: [{ text: 'The vast seas where spirits roam.' }], type: 'paragraph' }], type: 'root' } } },
    { name: 'Daragang Magayon', slug: 'daragang-magayon', description: { root: { children: [{ children: [{ text: 'The volcanic peaks of beauty and fire.' }], type: 'paragraph' }], type: 'root' } } },
    { name: 'Bundok Pulag', slug: 'bundok-pulag', description: { root: { children: [{ children: [{ text: 'The sacred playground of the gods.' }], type: 'paragraph' }], type: 'root' } } },
  ]

  const locations: Record<string, string | number> = {}
  for (const loc of locationsData) {
    const doc = await payload.create({ collection: 'locations', data: loc as any })
    locations[loc.slug] = doc.id
    console.log(`Created location: ${loc.name}`)
  }

  console.log('--- Seeding Relics (Items) ---')
  const relicsData = [
    { 
      name: '1st Item', 
      slug: 'item-1', 
      effect: '+15% DMG to all.', 
      foundAt: locations['dagat-ng-kabisayaan']
    },
    { 
      name: '2nd Item', 
      slug: 'item-2', 
      effect: '+25% DEF to 2 players.', 
      foundAt: locations['daragang-magayon']
    },
    { 
      name: '3rd Item', 
      slug: 'item-3', 
      effect: 'A next round with No Cooldown of skills for all.', 
      foundAt: locations['bundok-pulag']
    },
  ]

  for (const relic of relicsData) {
    await payload.create({ collection: 'relics', data: relic as any })
    console.log(`Created relic: ${relic.name}`)
  }

  console.log('--- Seeding Bosses ---')
  const bossesData = [
    {
      name: 'Bathala',
      slug: 'bathala',
      stats: { hp: 2800, atk: 110, mag: 250, def: 200 },
      moveset: [
        { name: "Heaven's Mandate", type: 'Buff', description: 'Do On Guard on self. Removes Debuff. Won’t work if it gets pick after the previous turn.' },
        { name: 'Skyhammer', type: 'Single Target', description: 'Deals 175% MAG on a single target. 70% chance to stun 1 player for 1 turn.' },
        { name: 'Thunderous Decree', type: 'AoE', description: 'Deals 125% MAG on all players. 50% chance to stun 2 players for 1 turn.' },
        { name: 'Celestial Judgement', type: 'Ultimate', description: 'Massive combine strike (ATK+MAG) x 3.0 on highest HP target. Rests for 1 turn after.' },
      ]
    },
    {
      name: 'Mayari',
      slug: 'mayari',
      stats: { hp: 2100, atk: 300, mag: 120, def: 180 },
      moveset: [
        { name: 'Moonlight Grace', type: 'Buff', description: 'Heal herself with a total of 25% max HP.' },
        { name: 'Lunar Strike', type: 'Single Target', description: 'Powerful strike, dealing 115% ATK + 20% MAG.' },
        { name: 'Moonfall Spear', type: 'Single Target', description: 'Deals 105% ATK. Inflict Moonfall (Reduces DEF by 20% for 2 turns).' },
        { name: 'Tide of Night', type: 'AoE', description: 'Invulnerable next turn. Removes all debuffs. Damage all opponents with 30% current HP.' },
      ]
    },
    {
      name: 'Apolaki',
      slug: 'apolaki',
      stats: { hp: 1700, atk: 360, mag: 70, def: 150 },
      moveset: [
        { name: 'Solar Flare Slash', type: 'Single Target', description: 'Deals 175% ATK to enemy, + 55% CRIT Rate.' },
        { name: 'Radiant Charge', type: 'AoE', description: 'Deals damage to all enemies (80% ATK + 100% MAG). 30% chance to stun 1 hit enemy.' },
        { name: 'Daybreak Fury', type: 'Buff', description: 'Enraged for next turn. Cost 30% of current HP.' },
        { name: 'Sunburst Nova', type: 'AoE', description: 'Deals 1.2x(100% ATK + 125% MAG) to all. Skip 1 turn after.' },
      ]
    },
    {
      name: 'Bakunawa',
      slug: 'bakunawa',
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
      name: 'Minokawa',
      slug: 'minokawa',
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
    await payload.create({ collection: 'bosses', data: boss as any })
    console.log(`Created boss: ${boss.name}`)
  }

  console.log('--- Seeding Mini Bosses ---')
  const minibossesData = [
    {
      name: 'Manananggal',
      slug: 'manananggal',
      stats: { hp: 900, atk: 230, mag: 35, def: 100 },
      location: locations['dagat-ng-kabisayaan'],
      moveset: [
        { name: 'Batwing Slash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Blood Splash', description: 'Deals 1.5 x ATK to one enemy' },
        { name: 'Split Body', description: 'Deals 1.6 x ATK to all enemies' },
      ]
    },
    {
      name: 'Tiyanak',
      slug: 'tiyanak',
      stats: { hp: 1150, atk: 50, mag: 195, def: 125 },
      location: locations['daragang-magayon'],
      moveset: [
        { name: 'Claw Latch', description: 'Deals 1.2 x MAG to one enemy' },
        { name: 'Blood Hex', description: 'Deals 1.5 x MAG to one enemy' },
        { name: 'Demonic Wail', description: 'Deals 1.6 x MAG to all enemies' },
      ]
    },
    {
      name: 'Siren',
      slug: 'siren',
      stats: { hp: 1000, atk: 20, mag: 240, def: 80 },
      location: locations['dagat-ng-kabisayaan'],
      moveset: [
        { name: 'Drowning Current', description: 'Deals 1.2 x MAG to one enemy' },
        { name: 'Tidal Surge', description: 'Deals 1.5 x MAG to one enemy' },
        { name: 'Moonlight Hymn', description: 'Deals 1.6 x MAG to all enemies' },
      ]
    },
    {
      name: 'Kapre',
      slug: 'kapre',
      stats: { hp: 1300, atk: 200, mag: 0, def: 150 },
      location: locations['bundok-pulag'],
      moveset: [
        { name: 'Tree Smash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Uproot Smash', description: 'Deals 1.5 x ATK to one enemy' },
        { name: 'Forest Wrath', description: 'Deals 1.6 x ATK to all enemies' },
      ]
    }
  ]

  for (const mini of minibossesData) {
    await payload.create({ collection: 'minibosses', data: mini as any })
    console.log(`Created miniboss: ${mini.name}`)
  }

  console.log('--- Seeding Characters ---')
  const charactersData = [
    {
      name: 'Mandirigma',
      slug: 'mandirigma',
      role: 'Damage',
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
      name: 'Bagani',
      slug: 'bagani',
      role: 'Tank',
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
      name: 'Babaylan',
      slug: 'babaylan',
      role: 'Healer',
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
      name: 'Mangangayaw',
      slug: 'mangangayaw',
      role: 'Ranged',
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
    await payload.create({ collection: 'characters', data: char as any })
    console.log(`Created character: ${char.name}`)
  }

  console.log('--- Seeding News ---')
  const newsData = [
    { title: 'Vessel Sighted', slug: 'vessel-sighted', category: 'Lore', content: { root: { children: [{ children: [{ text: 'A large balangay was seen drifting near the edge of the forgotten reefs. No survivors reported.' }], type: 'paragraph' }], type: 'root' } } },
    { title: 'The Great Drought', slug: 'the-great-drought', category: 'Lore', content: { root: { children: [{ children: [{ text: 'The spirits of the waters have retreated. Tribes gather at the monolith to offer chants.' }], type: 'paragraph' }], type: 'root' } } },
    { title: 'Shadows in the Mist', slug: 'shadows-in-the-mist', category: 'Lore', content: { root: { children: [{ children: [{ text: 'Hunters speak of shifting shapes in the mangrove shadows. Keep the torches burning.' }], type: 'paragraph' }], type: 'root' } } },
  ]

  for (const news of newsData) {
    await payload.create({ collection: 'news', data: news as any })
    console.log(`Created news: ${news.title}`)
  }

  console.log('--- Seeding Complete! ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
