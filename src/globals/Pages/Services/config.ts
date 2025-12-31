import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'servicesPage',
  label: 'Služby',
  admin: {
    group: 'Stránky',
  },
  fields: [
    pageHeader,
    {
      name: 'serviceSections',
      type: 'array',
      label: 'Sekce služeb',
      fields: [
        {
          name: 'servicesSection',
          type: 'group',
          label: 'Služby sekce',
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
            {
              name: 'title',
              type: 'text',
              label: 'Nadpis',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Popis',
            },
            {
              name: 'serviceSectionItems',
              type: 'array',
              label: 'Vyberte služby pro zobrazení na stránce',
              fields: [
                {
                  name: 'item',
                  type: 'relationship',
                  label: '',
                  relationTo: ['services'],
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
