import { iconField } from '@/fields/iconField'
import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contactPage',
  label: 'Stránka kontaktu',
  admin: {
    group: 'Stránky',
  },
  fields: [
    pageHeader,
    {
      name: 'contactInfo',
      type: 'array',
      label: 'Kontaktní informace',
      labels: {
        singular: 'Kontaktní informace',
        plural: 'Kontaktní informace',
      },
      admin: {
        components: {
          RowLabel: '@/features/contact/components/admin/ContactInfoRowLabel',
        },
      },
      fields: [
        iconField,
        { name: 'title', type: 'text', label: 'Nadpis' },
        {
          name: 'value',
          type: 'text',
          label: 'Popis',
          admin: {
            condition: (_, siblingData) => siblingData?.valueType !== 'formattedText',
          },
        },
        {
          name: 'formattedValue',
          type: 'richText',
          label: 'Popis',
          admin: {
            condition: (_, siblingData) => siblingData?.valueType === 'formattedText',
          },
        },
        {
          name: 'valueType',
          type: 'select',
          label: 'Typ popisu',
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Formatovaný text', value: 'formattedText' },
            { label: 'E-mail', value: 'email' },
            { label: 'Telefon', value: 'phone' },
            { label: 'Odkaz', value: 'link' },
          ],
        },
      ],
    },
    {
      name: 'note',
      type: 'richText',
      label: 'Poznámka',
    },
  ],
}
