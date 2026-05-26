import type { CollectionConfig } from 'payload'

export const Characters: CollectionConfig = {
  slug: 'characters',
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
      name: 'role',
      type: 'select',
      options: ['Damage', 'Tank', 'Healer', 'Ranged'],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'presets',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
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
      ],
    },
    {
      name: 'moveset',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'cooldown', type: 'number' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
