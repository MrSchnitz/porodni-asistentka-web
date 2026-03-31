import { additionalInfo } from '@/fields/additionalInfo'
import { pageHeader } from '@/fields/pageHeader'
import { eventScheduleStatusField } from '@/fields/eventScheduleStatus'
import { createLimitedSpotsGroup } from '@/fields/limitedSpotsGroup'
import { scheduleDateTimeRange } from '@/fields/scheduleDateTimeRange'
import { GlobalConfig } from 'payload'
import { AdditionalInfo } from '../_shared/types'

const lectureInfoPresets: AdditionalInfo[] = [
  { icon: 'map-pin', title: 'Místo', value: '' },
  { icon: 'coins', title: 'Cena', value: '' },
  { icon: 'clock-3', title: 'Délka', value: '' },
]

const defaultLectureInfoItems: AdditionalInfo[] = [{ icon: 'map-pin', title: 'Místo', value: '' }]

export const LecturesPage: GlobalConfig = {
  slug: 'lecturesPage',
  label: 'Přednášky',
  admin: {
    group: 'Stránky',
  },
  fields: [
    pageHeader,
    {
      name: 'lectures',
      type: 'array',
      label: 'Přednášky',
      labels: {
        singular: 'Přednáška',
        plural: 'Přednášky',
      },
      admin: {
        components: {
          RowLabel: '@/components/admin/TextRowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Název přednášky',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Popis přednášky',
        },
        scheduleDateTimeRange,
        eventScheduleStatusField,
        createLimitedSpotsGroup(),
        additionalInfo(
          {
            name: 'infoItems',
            label: 'Doplňující informace',
            defaultValue: defaultLectureInfoItems,
          },
          false,
          lectureInfoPresets,
        ),
      ],
    },
  ],
}
