import { Field, GroupField } from 'payload'

export const serviceBenefitsSection = (options?: Partial<GroupField>): Field => ({
  name: 'benefitsSection',
  type: 'group',
  label: 'Výhody',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Povolit sekci výhody',
      defaultValue: false,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Název sekce',
      defaultValue: 'Výhody',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
      },
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Jednotlivé výhody',
      labels: {
        singular: 'Výhoda',
        plural: 'Výhody',
      },
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
        components: {
          RowLabel: '@/components/admin/TextRowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'textarea',
          label: 'Název výhody',
          required: true,
        },
      ],
    },
  ],
  ...options,
})
