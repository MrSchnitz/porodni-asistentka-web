import { iconField } from '@/fields/iconField'
import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'servicesPage',
  dbName: 'svc_page', // Shortened db name
  label: 'Stránka služeb',
  admin: {
    group: 'Stránky',
  },
  fields: [
    pageHeader,
    {
      name: 'serviceSections',
      dbName: 'sections',
      type: 'array',
      label: 'Sekce služeb',
      labels: {
        singular: 'Sekce služeb',
        plural: 'Sekce služeb',
      },
      admin: {
        components: {
          RowLabel: '@/globals/Pages/Services/components/admin/ServiceSectionRowLabel',
        },
      },
      fields: [
        {
          name: 'servicesSection',
          type: 'group',
          label: 'Služby sekce',
          fields: [
            iconField,
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
              dbName: 'items',
              type: 'array',
              label: 'Vyberte služby pro zobrazení na stránce',
              labels: {
                singular: 'Služba',
                plural: 'Služby',
              },
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
