import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Záhlaví',
  admin: {
    group: 'Rozložení',
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
      label: 'Nadpis záhlaví',
      required: true,
    },
    {
      name: 'headerSubTitle',
      type: 'text',
      label: 'Podnadpis záhlaví',
    },
    { name: 'phone', label: 'Telefon', required: true, type: 'text' },
    { name: 'email', label: 'E-mail', required: true, type: 'email' },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigační položky',
      labels: {
        singular: 'Navigační položka',
        plural: 'Navigační položky',
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/features/layout/Header/components/admin/NavItemRowLabel#NavItemRowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
