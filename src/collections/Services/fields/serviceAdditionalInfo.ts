import { ArrayField, Field } from 'payload'

export const serviceAdditionalInfo = (options?: Partial<ArrayField>): Field => ({
  name: 'additionalInfo',
  type: 'array',
  label: 'Informace',
  labels: { singular: 'Informace', plural: 'Informace' },
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: '@/collections/Services/components/RowLabels/InfoRowLabel',
    },
  },
  fields: [
    {
      name: 'icon',
      type: 'text',
      label: 'Ikona',
      admin: {
        components: {
          Field: '@/components/admin/IconField',
        },
      },
    },
    { name: 'title', admin: { className: 'mt-4' }, type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
  ],
  ...options,
})
