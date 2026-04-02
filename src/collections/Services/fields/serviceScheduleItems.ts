import { Field } from 'payload'
import { eventScheduleStatusField } from '@/fields/eventScheduleStatus'
import { createLimitedSpotsGroup } from '@/fields/limitedSpotsGroup'
import { scheduleDateTimeRange } from '@/fields/scheduleDateTimeRange'

export const serviceScheduleItems: Field = {
  name: 'scheduleItems',
  label: 'Termíny',
  type: 'array',
  labels: { singular: 'Termín', plural: 'Termíny' },
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: '@/collections/Services/components/RowLabels/ScheduleRowLabel',
    },
  },
  fields: [
    scheduleDateTimeRange,
    {
      name: 'lesson',
      type: 'text',
      label: 'Náplň',
      required: true,
      admin: {
        description: 'Vyberte lekci nebo zadejte vlastní název',
        components: {
          Field: '@/collections/Services/components/LessonSelect/LessonSelect',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Poznámka',
    },
    eventScheduleStatusField,
    createLimitedSpotsGroup(),
  ],
}
