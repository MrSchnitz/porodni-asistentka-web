import { iconField } from '@/fields/iconField'
import { ArrayField, Field } from 'payload'

export const serviceAdditionalInfo = (
  options?: Partial<ArrayField>,
  required: boolean = true,
): Field => ({
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
    iconField,
    {
      name: 'title',
      admin: { className: 'mt-4' },
      type: 'text',
      label: 'Název',
      required: required,
    },
    { name: 'value', type: 'text', label: 'Hodnota', required: required },
  ],
  ...options,
})
