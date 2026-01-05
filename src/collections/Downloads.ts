import type { CollectionConfig } from 'payload'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: {
    singular: 'Soubor ke stažení',
    plural: 'Soubory ke stažení',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename', 'category', 'updatedAt'],
    group: 'Obsah',
  },
  folders: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Název',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Popis',
      type: 'textarea',
    },
  ],
  upload: {
    staticDir: 'downloads',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/*',
    ],
  },
}
