'use client'

import { PageHeader } from '@/globals/Pages/components/PageHeader'
import { WeeklyInfoSection } from '@/globals/Pages/WeeklyScheduledServices/components/WeeklyAnnouncements'
import { WeeklyDaySection } from '@/globals/Pages/WeeklyScheduledServices/components/WeeklyDaySection'
import { WeeklyScheduleCard } from '@/globals/Pages/WeeklyScheduledServices/components/WeeklyScheduledCard'
import { WeeklyScheduledServicesPage } from '@/payload-types'
import type { WeeklyScheduleByDay } from '@/app/(frontend)/aktualni-sluzby/actions'

const ORDERED_DAYS: (keyof WeeklyScheduleByDay)[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
]

type Props = {
  data: WeeklyScheduledServicesPage
  weeklySchedule: WeeklyScheduleByDay
  dayDates: Record<keyof WeeklyScheduleByDay, string>
  dayNames: Record<keyof WeeklyScheduleByDay, string>
}

export function WeeklyPageContent({ data, weeklySchedule, dayDates, dayNames }: Props) {
  const { pageHeader, infoSection } = data

  return (
    <main className="min-h-dvh">
      <PageHeader data={pageHeader} />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {ORDERED_DAYS.map((day) => {
              const items = weeklySchedule[day] ?? []

              return (
                <WeeklyDaySection key={day} day={dayNames[day]} date={dayDates[day]}>
                  {items.length === 0 ? (
                    <p className="text-gray-500">Žádné termíny</p>
                  ) : (
                    items.map((item) => (
                      <WeeklyScheduleCard
                        key={item.serviceName}
                        serviceName={item.serviceName}
                        tableName={item.tableName}
                        lessonName={item.lessonName}
                        status={item.status}
                        notes={item.notes}
                        time={item.time}
                        location={item.location}
                        slug={item.slug}
                      />
                    ))
                  )}
                </WeeklyDaySection>
              )
            })}
          </div>
        </div>
      </section>
      {infoSection && <WeeklyInfoSection infoSection={infoSection} />}
    </main>
  )
}
