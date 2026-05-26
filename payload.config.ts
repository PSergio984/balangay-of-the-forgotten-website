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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
})
