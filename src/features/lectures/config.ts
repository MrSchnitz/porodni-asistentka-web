import { createCalendarItemsField } from '@/fields/calendarItems'
import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const LecturesPage: GlobalConfig = {
  slug: 'lecturesPage',
  label: 'Přednášky',
  admin: {
    group: 'Stránky',
  },
  fields: [pageHeader, createCalendarItemsField()],
}
