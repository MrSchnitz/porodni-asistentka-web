import { GroupField } from 'payload'

type ServiceLessonSectionOptions = {
  admin?: GroupField['admin']
}

export const serviceLessonSection = (options?: ServiceLessonSectionOptions): GroupField => ({
  type: 'group',
  name: 'lessonsSection',
  label: 'Lekce',
  admin: {
    hideGutter: true,
    ...options?.admin,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Nadpis', defaultValue: 'Obsah' },
    { name: 'description', type: 'textarea', label: 'Popis' },
    {
      name: 'showLessonNumbers',
      type: 'checkbox',
      label: 'Číslovat lekce',
      defaultValue: false,
    },
    {
      name: 'lessons',
      interfaceName: 'lessons',
      type: 'array',
      label: 'Jednotlivé lekce',
      labels: { singular: 'Lekce', plural: 'Lekce' },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/collections/Services/components/RowLabels/LessonRowLabel',
        },
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'richText' },
      ],
    },
  ],
})
