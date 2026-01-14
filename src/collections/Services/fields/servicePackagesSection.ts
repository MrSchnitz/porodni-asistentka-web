import { Field, GroupField } from 'payload'

export const servicePackagesSection = (options?: Partial<GroupField>): Field => ({
  name: 'packageSection',
  type: 'group',
  label: 'Balíčky služeb',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Povolit sekci balíčků služeb',
      defaultValue: false,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Název sekce',
      defaultValue: 'Balíčky služeb',
      admin: {
        condition: (data, siblingData) => siblingData?.enabled,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Popis sekce',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
      },
    },
    {
      name: 'packages',
      type: 'array',
      label: 'Jednolivé balíčky',
      labels: {
        singular: 'Balíček',
        plural: 'Balíčky',
      },
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
        components: {
          RowLabel: '@/components/admin/TextRowLabel#TextRowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Název balíčku',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'includedOffers',
          type: 'array',
          label: 'Zahrnuté služby',
          labels: {
            singular: 'Služba',
            plural: 'Služby',
          },
          admin: {
            components: {
              RowLabel: '@/components/admin/TextRowLabel#TextRowLabel',
            },
          },
          fields: [
            {
              name: 'item',
              type: 'textarea',
              label: 'Název služby',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  ...options,
})
