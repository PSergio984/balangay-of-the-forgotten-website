import type { CollectionConfig } from 'payload'
import { slugHook } from '@/lib/slug'

export const Bosses: CollectionConfig = {
  slug: 'bosses',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['imagePreview', 'name', 'location', 'hp'],
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
      name: 'moveset',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'select', options: ['Single Target', 'AoE', 'Buff', 'Ultimate', 'Passive'] },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      label: 'Home Region',
    },
    {
      name: 'droppedRelics',
      type: 'join',
      collection: 'relics',
      on: 'sourceBoss',
      label: 'Associated Relics',
    },
    {
      name: 'minibosses',
      type: 'join',
      collection: 'minibosses',
      on: 'parentBoss',
      label: 'Guardians',
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
