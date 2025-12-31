import { Field, GlobalConfig } from 'payload'

const announcementFields: Field[] = [
  {
    name: 'message',
    type: 'richText',
    label: 'Zpráva',
    required: true,
  },
  {
    name: 'type',
    type: 'select',
    label: 'Typ',
    required: true,
    defaultValue: 'info',
    options: [
      {
        label: 'Informační',
        value: 'info',
      },
      {
        label: 'Varování',
        value: 'warning',
      },
      {
        label: 'Úspěch',
        value: 'success',
      },
      {
        label: 'Chyba',
        value: 'error',
      },
    ],
  },
  {
    name: 'dismissible',
    type: 'checkbox',
    label: 'Možnost zavřít',
    defaultValue: true,
  },
  {
    name: 'showOnce',
    type: 'checkbox',
    label: 'Zobrazit oznámení pouze jednou',
    defaultValue: true,
  },
]

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  label: 'Oznámení',
  admin: {
    group: 'Rozložení',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bannerEnabled',
      type: 'checkbox',
      label: 'Povolit horní banner oznámení',
      defaultValue: false,
    },
    {
      name: 'modalEnabled',
      type: 'checkbox',
      label: 'Povolit vyskakovací okno oznámení',
      defaultValue: false,
    },
    {
      type: 'group',
      name: 'banner',
      interfaceName: 'announcementBanner',
      label: 'Horní banner oznámení',
      admin: {
        hideGutter: true,
        condition: (_, siblingData) => siblingData?.bannerEnabled,
      },
      fields: announcementFields,
    },
    {
      type: 'group',
      name: 'modal',
      interfaceName: 'announcementModal',
      label: 'Vyskakovací okno oznámení',
      admin: {
        hideGutter: true,
        condition: (_, siblingData) => siblingData?.modalEnabled,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
        },
        ...announcementFields,
        {
          name: 'buttonText',
          type: 'text',
          label: 'Text tlačítka',
          defaultValue: 'Rozumím',
        },
      ],
    },
  ],
}
