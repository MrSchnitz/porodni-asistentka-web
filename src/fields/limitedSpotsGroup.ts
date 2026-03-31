import type { Field } from 'payload'

export type LimitedSpotsGroupOptions = {
  /** Help text for the "Limited spots" checkbox. */
  limitedSpotsHint?: string
}

const defaultLimitedSpotsHint = 'Pro zobrazení počtu míst musí být stav termínu "Naplánováno".'

/**
 * Group: limited spots + count (same as in service schedule tables).
 */
export function createLimitedSpotsGroup(options?: LimitedSpotsGroupOptions): Field {
  return {
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'hasLimitedSpots',
        type: 'checkbox',
        label: 'Omezený počet míst',
        defaultValue: false,
        admin: {
          description: options?.limitedSpotsHint ?? defaultLimitedSpotsHint,
        },
      },
      {
        name: 'numberOfSpots',
        type: 'number',
        label: 'Počet míst',
        admin: {
          width: '25%',
          condition: (_, siblingData) => siblingData?.hasLimitedSpots === true,
        },
        defaultValue: 10,
      },
    ],
  }
}
