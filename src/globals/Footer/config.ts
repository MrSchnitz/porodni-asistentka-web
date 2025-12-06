import { link } from '@/fields/link'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Ikona',
      fields: [
        {
          name: 'img',
          type: 'upload',
          label: 'Obrázek ze souboru',
          relationTo: 'media',
        },
        {
          name: 'lucideIcon',
          type: 'text',
          label: 'Ikona z knihovny',
          admin: {
            components: {
              Field: '@/components/admin/IconField',
            },
          },
        },
      ],
    },
    {
      name: 'footerTitle',
      type: 'text',
      label: 'Footer title',
      required: true,
    },
    {
      name: 'footerSubTitle',
      type: 'text',
      label: 'Footer subtitle',
    },
    {
      name: 'quickLinks',
      type: 'group',
      label: 'Rychlé odkazy',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          defaultValue: 'Rychlé odkazy',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Rychlé odkazy',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/globals/Header/RowLabel#RowLabel',
            },
          },
          required: true,
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Kontakt',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          defaultValue: 'Kontakt',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
        },
        {
          name: 'adress',
          type: 'text',
          label: 'Adressa',
        },
      ],
    },
    {
      name: 'bottomText',
      type: 'text',
      label: 'Spodní text',
    },
  ],
}
