import { Field } from 'payload'

export const pageHeader: Field = {
  name: 'pageHeader',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', label: 'Page title', required: true },
    { name: 'subtitle', type: 'text', label: 'Page subtitle' },
  ],
}
