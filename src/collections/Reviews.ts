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
    description: 'Pro možnost živého náhledu je potřeba nejdříve recenzi uložit',
  },
  fields: [
    {
      name: 'rating',
      label: 'Hodnocení',
      type: 'number',
      required: true,
      admin: {
        description: 'Zadejte číselné hodnocení od 1 do 5 (počet hvězdiček)',
      },
      defaultValue: 5,
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
