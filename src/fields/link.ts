import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { PAGE_ROUTES } from '@/globals/Pages/pageRoutes'

type LinkAppearances = 'default' | 'outline'

const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Výchozí',
    value: 'default',
  },
  outline: {
    label: 'Obrys',
    value: 'outline',
  },
}

const pageSelectOptions = Object.values(PAGE_ROUTES).map((route) => ({
  label: route.label,
  value: route.path,
}))

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    label: '',
    interfaceName: 'link',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Interní odkaz',
                value: 'reference',
              },
              {
                label: 'Vlastní URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Otevřít v nové záložce',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Vyberte stránku',
      options: pageSelectOptions,
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Vlastní URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Popisek',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      label: 'Vzhled',
      admin: {
        description: 'Vyberte, jak má být odkaz zobrazen.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
