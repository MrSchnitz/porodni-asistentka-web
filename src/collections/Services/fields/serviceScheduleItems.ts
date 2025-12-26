import { Field } from 'payload'
import { serviceStatus } from './serviceStatus'
import { serviceLimitedSpots } from './serviceLimitedSpots'
import { serviceScheduleDates } from './serviceScheduleDates'

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
    serviceScheduleDates,
    {
      name: 'lesson',
      type: 'text',
      label: 'Obsah',
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
    },
    serviceStatus,
    serviceLimitedSpots,
  ],
}
