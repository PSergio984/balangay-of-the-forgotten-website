import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'media',
    limit: 100,
  })
  console.log('Media count:', result.docs.length)
  result.docs.forEach(doc => {
    console.log(`- ID: ${doc.id}, Filename: ${doc.filename}, URL: ${doc.url}, Alt: ${doc.alt}`)
  })
  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
