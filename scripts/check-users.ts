import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const check = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'users',
    limit: 100,
    overrideAccess: true,
  })
  console.log("RAW FIND RESULT:", JSON.stringify(result, null, 2))
  await payload.destroy()
  process.exit(0)
}

check().catch((err) => {
  console.error(err)
  process.exit(1)
})
