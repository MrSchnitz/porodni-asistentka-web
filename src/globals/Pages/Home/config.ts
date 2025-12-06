import { GlobalConfig } from 'payload'
import { revalidateHome } from './hooks/revalidateHome'
import { link } from '@/fields/link'

export const Home: GlobalConfig = {
  slug: 'home',
  admin: {
    group: 'Pages',
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
          label: 'Title',
          required: true,
        },
        {
          name: 'quote',
          type: 'text',
          label: 'Quote',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaButtons',
          label: 'CTA button',
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
      label: 'Sluzby sekce',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
        },
        {
          name: 'services',
          type: 'array',
          label: 'Sluzby',
          maxRows: 6,
          fields: [
            {
              name: 'reference',
              type: 'relationship',
              label: 'Choose displayed services',
              relationTo: ['services'],
            },
          ],
        },
        {
          name: 'ctaButton',
          label: 'CTA button',
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
      label: 'Recenze sekce',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
        },
        {
          name: 'reviews',
          type: 'array',
          label: 'Recenze',
          fields: [
            {
              name: 'reference',
              type: 'relationship',
              label: 'Choose displayed reviews',
              relationTo: ['reviews'],
            },
          ],
        },
        {
          name: 'ctaButton',
          label: 'CTA button',
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
