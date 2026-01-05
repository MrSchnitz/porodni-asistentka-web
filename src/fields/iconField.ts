import { Field } from 'payload'

export const iconField: Field = {
  name: 'icon',
  type: 'text',
  label: 'Ikona',
  admin: {
    components: {
      Field: '@/components/admin/IconField',
    },
    style: {
      marginBottom: 'var(--spacing-field)',
    },
  },
}

export const iconImageField: Field = {
  name: 'icon',
  type: 'group',
  label: '',
  fields: [
    {
      name: 'fileIcon',
      type: 'upload',
      label: 'Ikona ze souboru',
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
}
