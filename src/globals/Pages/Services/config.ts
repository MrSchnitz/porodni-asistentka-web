import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'servicesPage',
  admin: {
    group: 'Pages',
  },
  fields: [
    pageHeader,
    {
      name: 'services',
      type: 'array',
      label: 'Vybrane služby',
      fields: [
        {
          name: 'item',
          type: 'relationship',
          label: 'Vyberte služby pro zobrazení na stránce',
          relationTo: ['services'],
          required: true,
        },
      ],
    },
  ],
}
