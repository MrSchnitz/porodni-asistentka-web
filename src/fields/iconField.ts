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
