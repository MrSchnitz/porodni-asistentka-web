import { Field, GroupField } from 'payload'

type AnnouncementsSectionOptions = Partial<GroupField> & {
  dbName?: string
}

export const serviceAnnouncementsSection = (options?: AnnouncementsSectionOptions): Field => ({
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
      dbName: options?.dbName ? `${options.dbName}` : undefined,
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
