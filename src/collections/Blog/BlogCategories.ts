import { CollectionConfig } from 'payload'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  labels: {
    singular: 'Kategorie blogu',
    plural: 'Kategorie blogu',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Obsah',
    hidden: true,
  },
  fields: [{ name: 'title', type: 'text', label: 'Název kategorie' }],
}
