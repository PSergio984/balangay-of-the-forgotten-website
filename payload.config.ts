import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Bosses } from './collections/Bosses'
import { Minibosses } from './collections/Minibosses'
import { Relics } from './collections/Relics'
import { Locations } from './collections/Locations'
import { Characters } from './collections/Characters'
import { News } from './collections/News'
import { Events } from './collections/Events'
import { StatusEffects } from './collections/StatusEffects'
import { Rules } from './collections/Rules'
import { Cards } from './collections/Cards'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Force an explicit sslmode=verify-full so pg-connection-string does not fall back to
// the 'prefer' alias default and emit its SECURITY WARNING on every connection.
const rawDbUrl = process.env.DATABASE_URL || ''
const DATABASE_URL = rawDbUrl.includes('sslmode=')
  ? rawDbUrl.replace(/sslmode=[^&]+/, 'sslmode=verify-full')
  : rawDbUrl + (rawDbUrl.includes('?') ? '&' : '?') + 'sslmode=verify-full'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Bosses,
    Minibosses,
    Relics,
    Locations,
    Characters,
    News,
    Events,
    StatusEffects,
    Rules,
    Cards,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: DATABASE_URL,
    },
  }),
})
