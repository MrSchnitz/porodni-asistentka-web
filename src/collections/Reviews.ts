import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Recenze',
    plural: 'Recenze',
  },
  admin: {
    useAsTitle: 'content',
    group: 'Obsah',
  },
  fields: [
    {
      name: 'rating',
      label: 'Hodnocení',
      type: 'number',
      required: true,
      max: 5,
      min: 1,
    },
    {
      name: 'content',
      label: 'Obsah',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      label: 'Autor',
      type: 'text',
    },
  ],
}
