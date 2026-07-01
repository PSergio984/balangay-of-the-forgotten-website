import type { CollectionConfig } from 'payload'
import { slugHook } from '@/lib/slug'

export const Locations: CollectionConfig = {
  slug: 'locations',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: { beforeChange: [slugHook('name')] },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'locations',
    },
    {
      name: 'subLocations',
      type: 'join',
      collection: 'locations',
      on: 'parent',
    },
    {
      name: 'bosses',
      type: 'join',
      collection: 'bosses',
      on: 'location',
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imagePreview',
      type: 'ui',
      admin: {
        components: {
          Cell: '/components/admin/ImageThumbnailCell',
        },
      },
    },
  ],
}
