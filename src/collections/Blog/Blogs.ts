import { generateSlug } from '@/utilities/generateSlug'
import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogy',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Obsah',
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
      name: 'slug',
      type: 'text',
      label: 'URL zkratka služby (Slug)',
      admin: {
        position: 'sidebar',
        placeholder: 'slug-z-nazvu',
        description: 'Automaticky generovaný z názvu služby. Lze upravit.',
      },
      required: true,
      unique: true,
    },
    { name: 'title', type: 'text', label: 'Název', required: true },
    { name: 'headImage', type: 'upload', label: 'Hlavní obrázek', relationTo: 'media' },
    { name: 'content', type: 'richText', label: 'Obsah článku', required: true },
    { name: 'publishedAt', type: 'date', label: 'Datum publikace' },
    { name: 'author', type: 'text', label: 'Autor' },
    {
      name: 'category',
      type: 'relationship',
      label: 'Kategorie',
      relationTo: 'blog-categories',
    },
  ],
}
