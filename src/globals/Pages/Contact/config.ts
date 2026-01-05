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
      fields: [
        iconField,
        { name: 'title', type: 'text', label: 'Nadpis' },
        {
          name: 'value',
          type: 'text',
          label: 'Hodnota',
          admin: {
            condition: (_, siblingData) => siblingData?.valueType !== 'formattedText',
          },
        },
        {
          name: 'formattedValue',
          type: 'richText',
          label: 'Hodnota',
          admin: {
            condition: (_, siblingData) => siblingData?.valueType === 'formattedText',
          },
        },
        {
          name: 'valueType',
          type: 'select',
          label: 'Typ hodnoty',
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Formatovaný text', value: 'formattedText' },
            { label: 'Email', value: 'email' },
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
