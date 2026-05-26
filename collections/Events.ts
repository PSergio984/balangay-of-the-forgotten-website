import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'era'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        description: 'Year of the event (e.g., 742)',
      }
    },
    {
      name: 'era',
      type: 'select',
      options: [
        'Early Migration',
        'The Great Fragmentation',
        'Age of the Balangay',
        'The Current Awakening'
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedLore',
      type: 'relationship',
      relationTo: ['bosses', 'characters', 'locations'],
      hasMany: true,
    }
  ],
}
