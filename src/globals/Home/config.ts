import { GlobalConfig } from 'payload'
import { revalidateHome } from './hooks/revalidateHome'
import { link } from '@/fields/link'

export const Home: GlobalConfig = {
  slug: 'home',
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
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}
