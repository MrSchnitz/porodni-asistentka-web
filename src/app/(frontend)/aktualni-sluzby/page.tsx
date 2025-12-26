import { getGlobal } from '@/utilities/getGlobals'
import { WeeklyScheduledServicesPage } from '@/payload-types'
import { PageHeader } from '@/globals/Pages/components/PageHeader'
import { WeeklyDaySection } from '@/globals/Pages/WeeklyScheduledServices/components/WeeklyDaySection'
import { WeeklyScheduleCard } from '@/globals/Pages/WeeklyScheduledServices/components/WeeklyScheduledCard'
import { dayNames, getWeeklyScheduleItems, WeeklyScheduleByDay } from './actions'

const ORDERED_DAYS: (keyof WeeklyScheduleByDay)[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export default async function Page() {
  const [pageData, { weeklySchedule, dayDates }] = await Promise.all([
    getGlobal('weeklyScheduledServicesPage', 2),
    getWeeklyScheduleItems(),
  ])
  const { pageHeader } = pageData as WeeklyScheduledServicesPage

  return (
    <main>
      <PageHeader data={pageHeader} />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {ORDERED_DAYS.map((day) => {
              const items = weeklySchedule[day]

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
    </main>
  )
}
