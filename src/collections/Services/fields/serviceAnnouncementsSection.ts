import { Field, GroupField } from 'payload'

export const serviceAnnouncementsSection = (options?: Partial<GroupField>): Field => ({
  name: 'announcementsSection',
  type: 'group',
  label: 'Oznámení',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Povolit sekci oznámení',
      defaultValue: false,
    },
    {
      name: 'announcements',
      type: 'array',
      interfaceName: 'announcements',
      label: '',
      labels: {
        singular: 'Oznámení',
        plural: 'Oznámení',
      },
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
        components: {
          RowLabel: '@/collections/Services/components/RowLabels/TextRowLabel#TextRowLabel',
        },
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
    },
  ],
  ...options,
})
