import type { CollectionConfig } from 'payload'

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
  ],
}
