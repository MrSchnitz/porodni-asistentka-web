import { serviceAnnouncementsSection } from '@/collections/Services/fields/serviceAnnouncementsSection'
import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const WeeklyScheduledServicesPage: GlobalConfig = {
  slug: 'weeklyScheduledServicesPage',
  dbName: 'weekly_svc_page',
  label: 'Aktuální služby',
  admin: {
    group: 'Stránky',
  },
  fields: [
    pageHeader,
    {
      name: 'infoSection',
      type: 'group',
      label: 'Aktuality a oznámení',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nadpis',
          defaultValue: 'Aktuality a oznámení',
          required: true,
        },
        { name: 'description', type: 'textarea', label: 'Popis' },
        serviceAnnouncementsSection({ dbName: 'announce' }),
      ],
    },
  ],
}
