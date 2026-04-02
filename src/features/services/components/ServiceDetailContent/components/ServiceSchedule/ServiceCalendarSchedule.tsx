import { Card, CardContent } from '@/components/ui/card'
import { CalendarSchedule } from '@/features/_shared/types'
import { ServiceAvailableSpotsBadge } from './components/ServiceAvailableSpotsBadge'
import { ServiceStatusBadge } from './components/ServiceStatusBadge'
import clsx from 'clsx'
import { CalendarAgendaItem } from '@/components/CalendarAgenda/CalendarAgendaItem'

type Props = {
  calendarSchedule: CalendarSchedule
}

export const ServiceCalendarSchedule = ({ calendarSchedule }: Props) => {
  const isScheduled = calendarSchedule.status === 'scheduled'
  const isCancelled = calendarSchedule.status === 'cancelled'
  const showAvailableSpots =
    isScheduled && calendarSchedule.hasLimitedSpots && calendarSchedule.numberOfSpots
  const showHeader =
    calendarSchedule.title || calendarSchedule.description || showAvailableSpots || !isScheduled
  const showCalendarItems =
    calendarSchedule.calendarItems && calendarSchedule.calendarItems.length > 0

  return (
    <Card
      className={clsx(
        'border border-primary/30 rounded-lg overflow-hidden',
        isCancelled && 'opacity-60',
      )}
    >
      <CardContent className="p-0">
        {showHeader && (
          <div className="bg-muted rounded-t-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-lg font-bold text-foreground">{calendarSchedule.title}</h5>
                </div>
                {calendarSchedule.description && (
                  <p className="mt-2 text-sm text-foreground/90">{calendarSchedule.description}</p>
                )}
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <ServiceStatusBadge status={calendarSchedule.status} />
                {showAvailableSpots && calendarSchedule.numberOfSpots && (
                  <ServiceAvailableSpotsBadge numberOfSpots={calendarSchedule.numberOfSpots} />
                )}
              </div>
            </div>
          </div>
        )}

        {showCalendarItems &&
          calendarSchedule.calendarItems?.map((calendarItem) => (
            <CalendarAgendaItem key={calendarItem.id} isInsideTable calendarItem={calendarItem} />
          ))}
      </CardContent>
    </Card>
  )
}
