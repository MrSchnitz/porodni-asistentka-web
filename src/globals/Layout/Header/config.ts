import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Layout',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Ikona',
      required: true,
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
      name: 'headerTitle',
      type: 'text',
      label: 'Header title',
      required: true,
    },
    {
      name: 'headerSubTitle',
      type: 'text',
      label: 'Header subtitle',
    },
    { name: 'phone', label: 'Phone', required: true, type: 'text' },
    { name: 'email', label: 'Email', required: true, type: 'email' },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Layout/components/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
