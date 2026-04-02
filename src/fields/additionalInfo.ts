import { AdditionalInfo } from '@/features/_shared/types'
import { iconField } from '@/fields/iconField'
import type { ArrayField, Field } from 'payload'

export type AdditionalInfoFieldParams = {
  options?: Partial<ArrayField>
  /** When true (default), title and value subfields are required. */
  required?: boolean
  presets?: AdditionalInfo[]
}

export const additionalInfo = ({
  options,
  required = false,
  presets,
}: AdditionalInfoFieldParams): Field => ({
  name: 'additionalInfo',
  type: 'array',
  label: 'Informace',
  labels: { singular: 'Informace', plural: 'Informace' },
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: '@/components/admin/AdditionalInfoRowLabel',
    },
  },
  fields: [
    ...(presets?.length
      ? [
          {
            name: 'preset',
            type: 'select' as const,
            label: 'Předvyplnit',
            required: false,
            options: presets.map(({ title }) => ({ label: title, value: title })),
            presets,
            admin: {
              className: 'mt-4',
              components: {
                Field: '@/components/admin/AdditionalInfoPresetSelect',
              },
            },
          } as Field,
        ]
      : []),
    iconField,
    {
      name: 'title',
      admin: { className: 'mt-4' },
      type: 'text',
      label: 'Název informace',
      required,
    },
    { name: 'value', type: 'text', label: 'Popis informace', required },
  ],
  ...(options ?? {}),
})
