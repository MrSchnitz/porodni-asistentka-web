import { PageHeader } from '@/features/_shared/PageHeader'
import { CalendarAgendaItem } from '@/components/CalendarAgenda/CalendarAgendaItem'
import type { LecturesPage } from '@/payload-types'
import { compareAsc, parseISO } from 'date-fns'

type Props = {
  data: LecturesPage
}

export function LecturesPageContent({ data }: Props) {
  const { pageHeader, calendarItems } = data

  const sortedCalendarItems = [...(calendarItems ?? [])].sort((a, b) =>
    compareAsc(parseISO(a?.startDate ?? ''), parseISO(b?.startDate ?? '')),
  )

  return (
    <main className="min-h-dvh bg-card">
      <PageHeader data={pageHeader} />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            {sortedCalendarItems.length === 0 ? (
              <p className="text-muted-foreground text-center">
                Zatím nejsou vypsané žádné přednášky.
              </p>
            ) : (
              sortedCalendarItems.map((calendarItem) => (
                <CalendarAgendaItem key={calendarItem.id} calendarItem={calendarItem} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
