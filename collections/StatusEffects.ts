import type { CollectionConfig } from 'payload'

export const StatusEffects: CollectionConfig = {
  slug: 'status-effects',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['Buff', 'Debuff'],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
}
