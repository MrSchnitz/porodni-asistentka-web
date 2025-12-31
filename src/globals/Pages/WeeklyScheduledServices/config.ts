import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const WeeklyScheduledServicesPage: GlobalConfig = {
  slug: 'weeklyScheduledServicesPage',
  label: 'Aktuální služby',
  admin: {
    group: 'Stránky',
  },
  fields: [pageHeader],
}
