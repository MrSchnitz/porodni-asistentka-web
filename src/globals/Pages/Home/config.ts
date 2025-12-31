import { GlobalConfig } from 'payload'
import { revalidateHome } from './hooks/revalidateHome'
import { link } from '@/fields/link'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  label: 'Domů',
  admin: {
    group: 'Stránky',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      interfaceName: 'Hero',
      label: 'Hero sekce',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          required: true,
        },
        {
          name: 'quote',
          type: 'text',
          label: 'Citát',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Podnadpis',
        },
        {
          name: 'heroImage',
          type: 'upload',
          label: 'Hero obrázek',
          relationTo: 'media',
        },
        {
          name: 'ctaButtons',
          label: 'CTA tlačítka',
          type: 'array',
          fields: [link({ appearances: false })],
          maxRows: 2,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      interfaceName: 'Services',
      label: 'Sekce služby',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Podnadpis',
        },
        {
          name: 'services',
          type: 'array',
          label: 'Služby',
          maxRows: 6,
          fields: [
            {
              name: 'item',
              type: 'relationship',
              label: 'Vyberte zobrazené služby',
              relationTo: ['services'],
            },
          ],
        },
        {
          name: 'ctaButton',
          label: 'CTA tlačítko',
          type: 'array',
          fields: [link({ appearances: false })],
          maxRows: 1,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      interfaceName: 'Reviews',
      label: 'Sekce recenze',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Podnadpis',
        },
        {
          name: 'reviews',
          type: 'array',
          label: 'Recenze',
          fields: [
            {
              name: 'reference',
              type: 'relationship',
              label: 'Vyberte zobrazené recenze',
              relationTo: ['reviews'],
            },
          ],
        },
        {
          name: 'ctaButton',
          label: 'CTA tlačítko',
          type: 'array',
          fields: [link({ appearances: false })],
          maxRows: 1,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}
