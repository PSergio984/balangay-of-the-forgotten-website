import type { CollectionConfig } from 'payload'

export const Relics: CollectionConfig = {
  slug: 'relics',
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
      name: 'effect',
      type: 'textarea',
    },
    {
      name: 'type',
      type: 'select',
      options: ['Artifact', 'Special', 'Fragment'],
      defaultValue: 'Artifact',
    },
    {
      name: 'sourceBoss',
      type: 'relationship',
      relationTo: 'bosses',
    },
    {
      name: 'foundAt',
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
