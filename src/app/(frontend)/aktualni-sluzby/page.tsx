import type { Metadata } from 'next'
import { WeeklyPageContent } from '@/globals/Pages/WeeklyScheduledServices/WeeklyPageContent'
import type { WeeklyScheduledServicesPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { dayNames, getWeeklyScheduleItems } from './actions'

export const metadata: Metadata = {
  title: 'Aktuální služby',
  description: 'Aktuální rozvrh služeb a termíny – lekce, kurzy a konzultace porodní asistentky.',
}

export default async function Page() {
  const [pageData, { weeklySchedule, dayDates }] = await Promise.all([
    getGlobal('weeklyScheduledServicesPage', 2),
    getWeeklyScheduleItems(),
  ])
  return (
    <WeeklyPageContent
      data={pageData as WeeklyScheduledServicesPage}
      weeklySchedule={weeklySchedule}
      dayDates={dayDates}
      dayNames={dayNames}
    />
  )
}
