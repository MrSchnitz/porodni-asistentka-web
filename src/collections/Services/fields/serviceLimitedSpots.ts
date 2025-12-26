import { Field } from 'payload'

export const serviceLimitedSpots: Field = {
  type: 'group',
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      name: 'hasLimitedSpots',
      type: 'checkbox',
      label: 'Omezený počet míst',
      defaultValue: false,
    },
    {
      name: 'numberOfSpots',
      type: 'number',
      label: 'Počet míst',
      admin: {
        width: '25%',
        condition: (_, siblingData) => siblingData?.hasLimitedSpots === true,
      },
      defaultValue: 10,
    },
  ],
}
