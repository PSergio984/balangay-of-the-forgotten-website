import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

const OLD_WIKI_PATH = 'C:/Users/admin/OneDrive/Documents/GitHub/balangay_of_the_forgotten'

// Helper to extract content between <h2> and <p>
function extractLore(html: string, title: string): string {
  const regex = new RegExp(`<h2>${title}</h2>[\\s\\S]*?<p>([\\s\\S]*?)</p>`, 'i')
  const match = html.match(regex)
  return match ? match[1].trim().replace(/\s+/g, ' ') : ''
}

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('--- Cleaning Existing Data ---')
  await payload.delete({ collection: 'characters', where: { id: { exists: true } } })
  await payload.delete({ collection: 'bosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'minibosses', where: { id: { exists: true } } })
  await payload.delete({ collection: 'relics', where: { id: { exists: true } } })
  await payload.delete({ collection: 'locations', where: { id: { exists: true } } })
  await payload.delete({ collection: 'media', where: { id: { exists: true } } })

  // Helper to upload image and return ID
  const uploadImage = async (filePath: string, alt: string) => {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`)
      return null
    }
    const filename = path.basename(filePath)
    const buffer = fs.readFileSync(filePath)
    const file = {
      data: buffer,
      mimetype: 'image/png', // Default to png
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

  // 1. Relics
  console.log('--- Seeding Relics ---')
  const relicFiles = ['Korona', 'Luhain', 'Pangil', 'Silang']
  for (const name of relicFiles) {
    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'relics', `${name}.png`)
    const imageId = await uploadImage(imgPath, name)

    await payload.create({
      collection: 'relics',
      data: {
        name: name,
        slug: name.toLowerCase(),
        effect: 'Ancient relic of the archipelago.',
        image: imageId,
        foundAt: name === 'Korona' ? locations['bundok-pulag'] : locations['dagat-ng-kabisayaan']
      } as any
    })
    console.log(`Created relic: ${name}`)
  }

  // 2. Characters
  console.log('--- Seeding Characters ---')
  const roles = ['mandirigma', 'bagani', 'babaylan', 'mangangayaw']
  for (const role of roles) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'roles', `${role}.html`)
    const html = fs.readFileSync(htmlPath, 'utf-8')
    const titleMatch = html.match(/<h2>(.*?)<\/h2>/)
    const tagalogTitle = titleMatch ? titleMatch[1] : 'Lore'
    const loreText = extractLore(html, tagalogTitle)

    const displayName = role.charAt(0).toUpperCase() + role.slice(1)
    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'roles', `${displayName}.png`)
    const imageId = await uploadImage(imgPath, displayName)

    await payload.create({
      collection: 'characters',
      data: {
        name: displayName,
        slug: role,
        role: role === 'mandirigma' ? 'Damage' : role === 'bagani' ? 'Tank' : role === 'babaylan' ? 'Healer' : 'Ranged',
        description: { root: { children: [{ children: [{ text: loreText }], type: 'paragraph' }], type: 'root' } },
        image: imageId,
        presets: [
            { name: 'Standard', stats: { hp: 500, atk: 50, mag: 50, def: 50 } }
        ]
      } as any
    })
    console.log(`Created character: ${displayName}`)
  }

  // 3. Bosses
  console.log('--- Seeding Bosses ---')
  const bosses = ['bathala', 'mayari', 'apolaki', 'bakunawa', 'minokawa']
  for (const boss of bosses) {
    const htmlPath = path.join(OLD_WIKI_PATH, 'boss', `${boss}.html`)
    let loreText = 'Records lost to time.'
    if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8')
        const titleMatch = html.match(/<h2>(.*?)<\/h2>/)
        const tagalogTitle = titleMatch ? titleMatch[1] : 'Ang'
        loreText = extractLore(html, tagalogTitle)
    }

    const displayName = boss.charAt(0).toUpperCase() + boss.slice(1)
    const imgPath = path.join(OLD_WIKI_PATH, 'assets', 'boss', `${displayName}.png`)
    const imageId = await uploadImage(imgPath, displayName)

    await payload.create({
      collection: 'bosses',
      data: {
        name: displayName,
        slug: boss,
        description: { root: { children: [{ children: [{ text: loreText }], type: 'paragraph' }], type: 'root' } },
        stats: { hp: 2000, atk: 100, mag: 100, def: 100 },
        image: imageId,
        location: locations['dagat-ng-kabisayaan']
      } as any
    })
    console.log(`Created boss: ${displayName}`)
  }

  console.log('--- Seeding Complete! ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
