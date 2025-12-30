import { link } from '@/fields/link'
import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  admin: {
    group: 'Pages',
  },
  fields: [
    pageHeader,
    {
      name: 'image',
      type: 'upload',
      label: 'Obrázek',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Nadpis',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Obsah',
      required: true,
    },
    {
      name: 'ctaSection',
      type: 'group',
      label: 'CTA sekce',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
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
  ],
}
