import { Field } from 'payload'

export const pageHeader: Field = {
  name: 'pageHeader',
  type: 'group',
  interfaceName: 'pageHeader',
  label: 'Záhlaví stránky',
  fields: [
    { name: 'title', type: 'text', label: 'Nadpis stránky', required: true },
    { name: 'subtitle', type: 'text', label: 'Podnadpis stránky' },
  ],
}
