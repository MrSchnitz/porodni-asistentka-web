import { link } from '@/fields/link'
import { CollectionConfig } from 'payload'

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (č→c, ř→r, etc.)
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
}

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    defaultColumns: ['title', 'description'],
    useAsTitle: 'title',
    group: 'Content',
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from title if not provided or on create
        if (data?.title && (!data.slug || operation === 'create')) {
          data.slug = generateSlug(data.title)
        }
        return data
      },
    ],
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
      name: 'slug',
      type: 'text',
      label: 'Slug',
      admin: {
        position: 'sidebar',
        placeholder: 'slug-z-nazvu',
        description: 'Automaticky generovaný z názvu. Lze upravit.',
      },
      required: true,
      unique: true,
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
    },
    {
      name: 'lessons',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'richText', required: true },
          ],
        },
      ],
    },
    {
      name: 'price',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Cena' },
        { name: 'value', type: 'text', required: true },
      ],
      required: true,
    },
    {
      name: 'place',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Místo' },
        { name: 'value', type: 'text', required: true },
      ],
      required: true,
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Délka' },
        { name: 'value', type: 'text', required: true },
      ],
      required: true,
    },
    { name: 'note', type: 'richText' },
  ],
}
