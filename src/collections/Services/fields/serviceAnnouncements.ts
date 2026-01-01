import { ArrayField, Field } from 'payload'

export const serviceAnnouncements = (options?: Partial<ArrayField>): Field => ({
  name: 'announcements',
  type: 'array',
  interfaceName: 'announcements',
  label: 'Oznámení',
  labels: {
    singular: 'Oznámení',
    plural: 'Oznámení',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nadpis',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Popis',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Datum',
      admin: {
        date: {
          pickerAppearance: 'default',
          displayFormat: 'd.M.yyyy',
        },
      },
    },
    { name: 'image', type: 'upload', label: 'Obrázek', relationTo: 'media' },
  ],
  ...options,
})
