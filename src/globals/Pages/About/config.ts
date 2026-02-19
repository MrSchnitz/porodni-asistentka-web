import { link } from '@/fields/link'
import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  label: 'Stránka o mně',
  admin: {
    group: 'Stránky',
  },
  fields: [
    pageHeader,
    {
      name: 'image',
      type: 'upload',
      label: 'Obrázek',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Nadpis',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Obsah',
      required: true,
    },
    {
      name: 'myValuesSection',
      type: 'group',
      label: 'Sekce s mými hodnotami',
      fields: [
        { name: 'showMyValues', type: 'checkbox', label: 'Zobrazit sekci s mými hodnotami' },
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          defaultValue: 'Moje hodnoty',
          admin: { condition: (_, siblingData) => siblingData?.showMyValues },
        },
        {
          name: 'values',
          type: 'array',
          label: 'Hodnoty',
          labels: {
            singular: 'Hodnota',
            plural: 'Hodnoty',
          },
          admin: {
            initCollapsed: true,
            condition: (_, siblingData) => siblingData?.showMyValues,
            components: {
              RowLabel: '@/components/admin/TextRowLabel',
            },
          },
          fields: [
            { name: 'title', type: 'text', label: 'Nadpis hodnoty' },
            { name: 'description', type: 'textarea', label: 'Popis hodnoty' },
          ],
        },
      ],
    },
    {
      name: 'ctaSection',
      type: 'group',
      label: 'Sekce pro přesměrování',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Podnadpis',
        },
        {
          name: 'ctaButtons',
          label: 'Tlačítka pro přesměrování',
          type: 'array',
          labels: {
            singular: 'Tlačítko pro přesměrování',
            plural: 'Tlačítka pro přesměrování',
          },
          fields: [link({ appearances: false })],
          maxRows: 2,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
}
