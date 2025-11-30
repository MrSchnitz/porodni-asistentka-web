import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
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
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
