import { GlobalConfig } from 'payload'
import { revalidateHome } from './hooks/revalidateHome'
import { link } from '@/fields/link'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  label: 'Úvodní stránka',
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
      label: 'Úvodní sekce',
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
          type: 'group',
          label: 'Úvodní obrázky',
          fields: [
            {
              name: 'switchInterval',
              type: 'number',
              label: 'Interval mezi obrázky (v sekundách)',
              defaultValue: 6,
              min: 1,
              max: 20,
            },
            {
              name: 'heroImages',
              type: 'array',
              label: '',
              labels: {
                singular: 'Úvodní obrázek',
                plural: 'Úvodní obrázky',
              },
              fields: [
                {
                  name: 'heroImage',
                  type: 'upload',
                  label: 'Úvodní obrázek',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          name: 'ctaButtons',
          label: 'Tlačítka pro přesměrování',
          type: 'array',
          labels: {
            singular: 'Tlačítko pro přesměrování',
            plural: 'Tlačítka pro přesměrování',
          },
          fields: [link({ appearances: false })],
          maxRows: 3,
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
          labels: {
            singular: 'Služba',
            plural: 'Služby',
          },
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
          label: 'Tlačítko pro přesměrování',
          labels: {
            singular: 'Tlačítko pro přesměrování',
            plural: 'Tlačítka pro přesměrování',
          },
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
          labels: {
            singular: 'Recenze',
            plural: 'Recenze',
          },
          fields: [
            {
              name: 'reference',
              type: 'relationship',
              label: 'Vyberte zobrazené recenze',
              relationTo: ['reviews'],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}
