import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    defaultColumns: ['title', 'description'],
    useAsTitle: 'title',
    group: "Content"
  },
  fields: [
    {
      name: 'icon',
      type: 'group',
      label: 'Ikona',
      fields: [
        {
          name: 'fileIcon',
          type: 'upload',
          label: 'Ikona ze souboru',
          relationTo: 'media',
        },
        {
          name: 'lucideIcon',
          type: 'text',
          label: 'Ikona z knihovny',
          admin: {
            components: {
              Field: '@/components/admin/IconField',
            },
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    { name: 'place', type: 'text', required: true },
    { name: 'duration', type: 'text', required: true },
    { name: 'note', type: 'richText' },
  ],
}
