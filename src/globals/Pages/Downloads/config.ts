import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const DownloadsPage: GlobalConfig = {
  slug: 'downloadsPage',
  label: 'Stránka Ke stažení',
  admin: {
    group: 'Stránky',
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.newPassword) {
          const bcrypt = await import('bcryptjs')
          data.passwordHash = await bcrypt.hash(data.newPassword, 10)
          data.newPassword = null
        }
        return data
      },
    ],
  },
  fields: [
    pageHeader,
    {
      name: 'passwordHash',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'passwordStatus',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/globals/Pages/Downloads/components/PasswordStatus',
          },
        },
      },
    },
    {
      name: 'newPassword',
      type: 'text',
      label: 'Nastavit nové heslo',
      admin: {
        description: 'Zadejte heslo a uložte. Po uložení se pole vyprázdní.',
      },
    },
    {
      name: 'downloads',
      type: 'array',
      label: 'Soubory ke stažení',
      labels: {
        singular: 'Soubor ke stažení',
        plural: 'Soubory ke stažení',
      },
      fields: [{ name: 'file', type: 'upload', label: 'Soubor', relationTo: 'downloads' }],
    },
    {
      name: 'important',
      type: 'group',
      label: 'Důležité informace',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Název sekce',
          defaultValue: 'Důležité informace',
        },
        {
          name: 'infoItems',
          type: 'array',
          label: '',
          labels: {
            singular: 'Informace',
            plural: 'Informace',
          },
          fields: [{ name: 'item', type: 'text', label: 'Informace', required: true }],
        },
      ],
    },
  ],
}
