import type { CollectionConfig } from 'payload'

export const Cards: CollectionConfig = {
  slug: 'cards',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'category'],
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
      name: 'type',
      type: 'select',
      options: [
        { label: 'Role Card', value: 'role' },
        { label: 'Preset Card', value: 'preset' },
        { label: 'Skill Card', value: 'skill' },
        { label: 'Map Card', value: 'map' },
        { label: 'Boss Card', value: 'boss' },
        { label: 'Mini Boss Card', value: 'miniboss' },
        { label: 'Item Card', value: 'item' },
        { label: 'Back Card', value: 'back' },
        { label: 'Utility Card', value: 'utility' },
      ],
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Sub-category like character name (Mandirigma) or region.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
