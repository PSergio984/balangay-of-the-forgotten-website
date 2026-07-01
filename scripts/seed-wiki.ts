import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'

// Helper to convert plain text string with paragraphs into Lexical RichText JSON format
const toRichText = (text: string) => {
  const paragraphs = text.split('\n\n').filter(Boolean)
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: paragraphs.map((p) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: p,
            type: 'text',
            version: 1,
          },
        ],
      })),
    },
  }
}

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('--- Cleaning Existing Data ---')
  await payload.delete({ collection: 'characters', where: { id: { exists: true } } })
  await payload.delete({ collection: 'bosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'minibosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'relics', where: { id: { exists: true } } })
  await payload.delete({ collection: 'locations', where: { id: { exists: true } } })
  await payload.delete({ collection: 'news', where: { id: { exists: true } } })

  console.log('--- Cleaning Existing Seeded Media ---')
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      alt: {
        like: 'Seeded:',
      },
    },
    limit: 1000,
  })
  for (const doc of existingMedia.docs) {
    await payload.delete({
      collection: 'media',
      id: doc.id,
      overrideAccess: true,
    })
    console.log(`Deleted media: ${doc.alt}`)
  }

  // Media upload helper
  const uploadSeedMedia = async (filename: string, altText: string) => {
    const filePath = path.resolve(process.cwd(), 'public', 'media', filename)
    if (!fs.existsSync(filePath)) {
      console.warn(`Asset not found: ${filePath}`)
      return undefined
    }

    try {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `Seeded: ${altText}`,
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

  console.log('--- Uploading Media Assets ---')
  const images: Record<string, string | number | undefined> = {
    // Locations
    'dagat-ng-kabisayaan': await uploadSeedMedia('Dagat ng Kabisayaan.png', 'Dagat ng Kabisayaan Region'),
    'daragang-magayon': await uploadSeedMedia('Daragang Magayon.png', 'Daragang Magayon Region'),
    'bundok-pulag': await uploadSeedMedia('Bundok Pulag.png', 'Bundok Pulag Region'),
    
    // Relics
    'item-1': await uploadSeedMedia('Korona.png', 'Korona Relic'),
    'item-2': await uploadSeedMedia('Luhain.png', 'Luhain Relic'),
    'item-3': await uploadSeedMedia('Pangil.png', 'Pangil Relic'),
    'item-4': await uploadSeedMedia('Silang.png', 'Silang Relic'),

    // Bosses
    'bathala': await uploadSeedMedia('Bathala.png', 'Bathala Boss'),
    'mayari': await uploadSeedMedia('Mayari.png', 'Mayari Boss'),
    'apolaki': await uploadSeedMedia('Apolaki.png', 'Apolaki Boss'),
    'bakunawa': await uploadSeedMedia('Bakunawa.png', 'Bakunawa Boss'),
    'minokawa': await uploadSeedMedia('Minokawa.png', 'Minokawa Boss'),

    // Minibosses
    'manananggal': await uploadSeedMedia('Manananggal.png', 'Manananggal Guardian'),
    'tiyanak': await uploadSeedMedia('Tiyanak Swarm.png', 'Tiyanak Guardian'),
    'siren': await uploadSeedMedia('Sirena.png', 'Sirena Guardian'),
    'kapre': await uploadSeedMedia('Kapre.png', 'Kapre Guardian'),

    // Characters
    'mandirigma': await uploadSeedMedia('Mandirigma.png', 'Mandirigma'),
    'bagani': await uploadSeedMedia('Bagani.png', 'Bagani'),
    'babaylan': await uploadSeedMedia('Babaylan.png', 'Babaylan'),
    'mangangayaw': await uploadSeedMedia('Mangangayaw.png', 'Mangangayaw'),
  }

  console.log('--- Seeding Locations ---')
  const locationsData = [
    { 
      name: 'Dagat ng Kabisayaan', 
      slug: 'dagat-ng-kabisayaan', 
      image: images['dagat-ng-kabisayaan'],
      description: toRichText(
        'The Dagat ng Kabisayaan is a vast expanse of sapphire waters and mystical currents, dotted with thousands of floating islets. Folklore tells that these seas are watched over by the gentle ocean spirits and the great Maguayan, deity of the deep.\n\nIt is here that the first balangay boats sailed, charting paths through the sky mist that links the fragmented worlds.'
      )
    },
    { 
      name: 'Daragang Magayon', 
      slug: 'daragang-magayon', 
      image: images['daragang-magayon'],
      description: toRichText(
        'Daragang Magayon is a land dominated by colossal, smoke-crowned volcanic peaks, rich with geothermal heat and fertile volcanic ash. Named after the legendary beautiful maiden of fire and earth, the volcano is said to be the resting place of her eternal passion.\n\nRivers of magma flow like veins of the earth, guarded by elemental spirits that test the resolve of any traveler.'
      )
    },
    { 
      name: 'Bundok Pulag', 
      slug: 'bundok-pulag', 
      image: images['bundok-pulag'],
      description: toRichText(
        'As the highest playground of the gods, Bundok Pulag is shrouded in an endless sea of rolling white clouds. Legends state that this sacred mountain bridges the gap between the mortal realm and Kaluwalhatian, the kingdom of supreme gods.\n\nIt is home to ancient pine forests, mountain spirits, and ancestral graves that whisper forgotten tales to those who dare climb its peaks.'
      )
    },
  ]

  const locations: Record<string, string | number> = {}
  for (const loc of locationsData) {
    const doc = await payload.create({ collection: 'locations', data: loc as any, overrideAccess: true })
    locations[loc.slug] = doc.id
    console.log(`Created location: ${loc.name}`)
  }

  console.log('--- Seeding Relics (Items) ---')
  const relicsData = [
    { 
      name: 'Korona ng Lakan', 
      slug: 'korona-ng-lakan', 
      effect: '+15% DMG to all.', 
      image: images['item-1'],
      foundAt: locations['dagat-ng-kabisayaan'],
      description: toRichText(
        'The Korona ng Lakan is a golden crown woven with sacred grass and encrusted with glowing pearls. It was once worn by the Lakan (high rulers) of the ancient floating kingdoms as a symbol of divine mandate.\n\nThe crown is said to grant its bearer the authority to command the wind and call upon the ancestral spirits of leadership.'
      )
    },
    { 
      name: 'Luha ng Babaylan', 
      slug: 'luha-ng-babaylan', 
      effect: '+25% DEF to 2 players.', 
      image: images['item-2'],
      foundAt: locations['daragang-magayon'],
      description: toRichText(
        'A droplet of crystalized energy resembling a blue tear, the Luha ng Babaylan is a sacred amulet. It is said to have formed from the tears of the first Babaylan when she bore witness to the Great Fragmentation.\n\nIt holds absolute healing and purifying properties, capable of mending any mortal wound and soothing cursed spirits.'
      )
    },
    { 
      name: 'Pangil ng Bakunawa', 
      slug: 'pangil-ng-bakunawa', 
      effect: 'A next round with No Cooldown of skills for all.', 
      image: images['item-3'],
      foundAt: locations['bundok-pulag'],
      description: toRichText(
        'The Pangil ng Bakunawa is a giant, razor-sharp tooth carved from the jaw of the legendary moon-eating serpent dragon. The relic pulses with dark tides and raw magical energy.\n\nWarriors who hold it report hearing the distant roar of the ocean depths and feeling an unyielding urge to strike down their foes.'
      )
    },
    { 
      name: 'Silang ng Araw', 
      slug: 'silang-ng-araw', 
      effect: 'Grant double shield stats to all allies next turn.', 
      image: images['item-4'],
      foundAt: locations['bundok-pulag'],
      description: toRichText(
        'A golden sunburst medallion representing the rising sun of the east. Silang ng Araw was forged in the volcanic fires of Kanlaon and blessed by Apolaki, the sun god.\n\nIt radiates warmth and blinds enemies with solar flares, granting its bearer swift movement and a next round with no skill cooldowns.'
      )
    },
  ]

  for (const relic of relicsData) {
    await payload.create({ collection: 'relics', data: relic as any, overrideAccess: true })
    console.log(`Created relic: ${relic.name}`)
  }

  console.log('--- Seeding Bosses ---')
  const bossesData = [
    {
      name: 'Bathala',
      slug: 'bathala',
      image: images['bathala'],
      stats: { hp: 2800, atk: 110, mag: 250, def: 200 },
      description: toRichText(
        'Bathala is the supreme creator deity and king of the heavens in Philippine mythology. Having fashioned the universe from the void, he rules Kaluwalhatian with justice and cosmic order.\n\nIn the wake of the Great Fragmentation, Bathala retreated to the celestial realm, watchfully observing the mortals below and shielding the world from absolute destruction with his skyhammer.'
      ),
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
      image: images['mayari'],
      stats: { hp: 2100, atk: 300, mag: 120, def: 180 },
      description: toRichText(
        'Mayari is the beloved goddess of the moon and co-ruler of the heavens. Known for her supreme beauty and single-eyed grace, she fought Apolaki to establish equality between night and day.\n\nShe rules the night with a silver spear, guiding lost travelers with moonlight and protecting the dreamscapes of mortals from nightmare spirits.'
      ),
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
      image: images['apolaki'],
      stats: { hp: 1700, atk: 360, mag: 70, def: 150 },
      description: toRichText(
        'Apolaki is the fierce god of the sun and patron deity of warriors. He controls the day with his radiant light and golden sword, embodying passion, fire, and strength.\n\nIn battle, he unleashes solar flares that blind his foes, leading the chosen souls (Pinili) against the rising forces of darkness with unyielding bravery.'
      ),
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
      image: images['bakunawa'],
      stats: { hp: 2000, atk: 40, mag: 300, def: 190 },
      description: toRichText(
        'Bakunawa is the colossal sea serpent dragon of the deep. Consumed by envy of the sky\'s beauty, Bakunawa rose from the dark oceans to devour the seven moons, causing eclipses.\n\nBathala defeated the beast, binding it to the ocean floor. Now, the dragon stirs once more, eager to rise and plunge the archipelago into eternal darkness.'
      ),
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
      image: images['minokawa'],
      stats: { hp: 1000, atk: 300, mag: 40, def: 190 },
      description: toRichText(
        'The Minokawa is a giant, dragon-like bird of mythology, so massive it can swallow the sun. With feathers of steel and eyes like mirrors, it nests in the outer void beyond the sky.\n\nLegends say it hunts during eclipses, serving as a terrifying force of nature that can only be appeased by the collective songs of the floating tribes.'
      ),
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
    const doc = await payload.create({ collection: 'bosses', data: boss as any, overrideAccess: true })
    bosses[boss.slug] = doc.id
    console.log(`Created boss: ${boss.name}`)
  }

  console.log('--- Seeding Mini Bosses ---')
  const minibossesData = [
    {
      name: 'Manananggal',
      slug: 'manananggal',
      stats: { hp: 900, atk: 230, mag: 35, def: 100 },
      location: locations['dagat-ng-kabisayaan'],
      parentBoss: bosses['bakunawa'],
      image: images['manananggal'],
      description: toRichText(
        'The Manananggal is a legendary winged creature of the night. By day, she appears as a beautiful woman, but by night, she detaches her upper torso, growing bat-like wings to hunt in the sky mist.\n\nCursed by ancient spirits, she seeks the life force of innocent wanderers, fearing only the light of salt, garlic, and the rising sun.'
      ),
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
      parentBoss: bosses['bathala'],
      image: images['tiyanak'],
      description: toRichText(
        'The Tiyanak is a malevolent forest spirit disguised as a crying newborn baby. It lures kind-hearted travelers off the paths of Daragang Magayon with its wails.\n\nOnce picked up, it transforms into a clawed demon with sharp fangs, draining the lifeforce of its victims before vanishing back into the shadows.'
      ),
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
      parentBoss: bosses['bakunawa'],
      image: images['siren'],
      description: toRichText(
        'The Sirena is a beautiful water spirit with the lower body of a fish, residing in the Dagat ng Kabisayaan. Her haunting, melodic songs echo across the waves, enchanting sailors and pulling them down into the watery depths.\n\nSome say she is a guardian of the ocean\'s relics, testing the hearts of mortals.'
      ),
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
      parentBoss: bosses['apolaki'],
      image: images['kapre'],
      description: toRichText(
        'The Kapre is a towering tree giant that dwells in the ancient pine forests of Bundok Pulag. Smoking a magical cigar that never burns out, he sits on high branches, playing tricks on travelers by making them lose their way.\n\nWhile generally peaceful, he fiercely protects his forest home from those who disrespect nature.'
      ),
      moveset: [
        { name: 'Tree Smash', description: 'Deals 1.2 x ATK to one enemy' },
        { name: 'Uproot Smash', description: 'Deals 1.5 x ATK to one enemy' },
        { name: 'Forest Wrath', description: 'Deals 1.6 x ATK to all enemies' },
      ]
    }
  ]

  for (const mini of minibossesData) {
    await payload.create({ collection: 'minibosses', data: mini as any, overrideAccess: true })
    console.log(`Created miniboss: ${mini.name}`)
  }

  console.log('--- Seeding Characters ---')
  const charactersData = [
    {
      name: 'Mandirigma',
      slug: 'mandirigma',
      role: 'Damage',
      image: images['mandirigma'],
      description: toRichText(
        'The Mandirigma is a dedicated frontline warrior trained in the traditional martial arts of the islands. Armed with a heavy kampilan sword, they excel at close-quarters combat, unleashing powerful, devastating slashes.\n\nThey are the shield and sword of the Balangay, putting their lives on the line for their tribe.'
      ),
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
      image: images['bagani'],
      description: toRichText(
        'The Bagani is a legendary protector-knight who has sworn a sacred oath to defend the innocent. Carrying a massive wooden shield blessed by the mountain deities, they stand unmoved against the heaviest of boss strikes.\n\nThey taunt enemies, drawing attacks to themselves to safeguard their companions.'
      ),
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
      image: images['babaylan'],
      description: toRichText(
        'The Babaylan is a spiritual medium, healer, and keeper of the tribe\'s lore. Communicating with the diwatas (spirits) and ancestral guides, she channels divine light to heal wounds, purify negative curses, and bless warriors with spiritual empowerment during the heat of battle.'
      ),
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
      image: images['mangangayaw'],
      description: toRichText(
        'The Mangangayaw is a swift and lethal hunter-ranger of the sky forests. Equipped with a longbow, they strike from afar with pinpoint accuracy. They can target multiple enemies with volleys and utilize explosive arrows, scouting ahead to find path openings through the sky mist.'
      ),
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
    await payload.create({ collection: 'characters', data: char as any, overrideAccess: true })
    console.log(`Created character: ${char.name}`)
  }

  console.log('--- Seeding News ---')
  const newsData = [
    { title: 'Vessel Sighted', slug: 'vessel-sighted', category: 'Lore', content: { root: { children: [{ children: [{ text: 'A large balangay was seen drifting near the edge of the forgotten reefs. No survivors reported.', type: 'text', version: 1 }], type: 'paragraph' }], type: 'root' } } },
    { title: 'The Great Drought', slug: 'the-great-drought', category: 'Lore', content: { root: { children: [{ children: [{ text: 'The spirits of the waters have retreated. Tribes gather at the monolith to offer chants.', type: 'text', version: 1 }], type: 'paragraph' }], type: 'root' } } },
    { title: 'Shadows in the Mist', slug: 'shadows-in-the-mist', category: 'Lore', content: { root: { children: [{ children: [{ text: 'Hunters speak of shifting shapes in the mangrove shadows. Keep the torches burning.', type: 'text', version: 1 }], type: 'paragraph' }], type: 'root' } } },
  ]

  for (const news of newsData) {
    await payload.create({ collection: 'news', data: news as any, overrideAccess: true })
    console.log(`Created news: ${news.title}`)
  }

  console.log('--- Seeding Admin User ---')
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@balangay.com',
        password: 'password123',
      },
      overrideAccess: true,
    })
    console.log('Created default admin user: admin@balangay.com / password123')
  }

  console.log('--- Seeding Complete! ---')
  await payload.destroy()
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
