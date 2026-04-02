import { AdditionalInfo } from '@/features/_shared/types'
import { additionalInfo } from '@/fields/additionalInfo'
import { eventScheduleStatusField } from '@/fields/eventScheduleStatus'
import { createLimitedSpotsGroup } from '@/fields/limitedSpotsGroup'
import { scheduleDateTimeRange } from '@/fields/scheduleDateTimeRange'
import type { ArrayField, Field } from 'payload'

const defaultInfoItems: AdditionalInfo[] = [{ icon: 'map-pin', title: 'Místo', value: '' }]

const presetInfoItems: AdditionalInfo[] = [
  { icon: 'house', title: 'Místo', value: '' },
  { icon: 'clock', title: 'Délka', value: '' },
  { icon: 'coins', title: 'Cena', value: '' },
]

export function createCalendarItemsField(options?: Partial<ArrayField>): Field {
  return {
    name: 'calendarItems',
    interfaceName: 'calendarItems',
    type: 'array',
    label: 'Kalendářové termíny',
    labels: { singular: 'Kalendářový termín', plural: 'Kalendářové termíny' },
    admin: {
      components: {
        RowLabel: '@/components/admin/TextRowLabel',
      },
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Název kalendářového termínu',
        required: true,
      },
      {
        name: 'description',
        type: 'richText',
        label: 'Popis kalendářového termínu',
      },
      scheduleDateTimeRange,
      eventScheduleStatusField,
      createLimitedSpotsGroup(),
      additionalInfo({
        options: {
          label: 'Doplňující informace',
          defaultValue: defaultInfoItems,
        },
        required: false,
        presets: presetInfoItems,
      }),
      {
        name: 'signUpDetails',
        type: 'richText',
        label: 'Informace k přihlášení (modal u tlačítka Přihlásit se)',
        admin: {
          description:
            'Volitelné. Pokud nevyplníte, v modalu se zobrazí výzva ke kontaktu na stránce Kontakt.',
        },
      },
    ],
    ...(options ?? {}),
  }
}
