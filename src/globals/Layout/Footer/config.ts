import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Zápatí',
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
      name: 'footerTitle',
      type: 'text',
      label: 'Nadpis zápatí',
      required: true,
    },
    {
      name: 'footerSubTitle',
      type: 'text',
      label: 'Podnadpis zápatí',
    },
    {
      name: 'downloadsSection',
      type: 'group',
      label: 'Sekce ke stažení',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Povolit sekci ke stažení',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          defaultValue: 'Pro klienty',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Text odkazu',
          defaultValue: 'Dokumenty ke stažení',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Popis',
          defaultValue: 'Přístup k užitečným materiálům a dokumentům pro mé klientky.',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Kontakt',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          defaultValue: 'Kontakt',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
        {
          name: 'email',
          type: 'text',
          label: 'E-mail',
        },
        {
          name: 'adress',
          type: 'text',
          label: 'Adresa',
        },
      ],
    },
    {
      name: 'bottomText',
      type: 'text',
      label: 'Spodní text',
    },
  ],
}
