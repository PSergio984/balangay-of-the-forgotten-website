import type { CollectionConfig } from 'payload'

export const Minibosses: CollectionConfig = {
  slug: 'minibosses',
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
      name: 'stats',
      type: 'group',
      fields: [
        { name: 'hp', type: 'number', required: true },
        { name: 'atk', type: 'number', required: true },
        { name: 'mag', type: 'number', required: true },
        { name: 'def', type: 'number', required: true },
      ],
    },
    {
      name: 'parentBoss',
      type: 'relationship',
      relationTo: 'bosses',
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
