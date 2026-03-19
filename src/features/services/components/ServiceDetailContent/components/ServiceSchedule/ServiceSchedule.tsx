import { Card, CardContent } from '@/components/ui/card'
import { ServiceScheduleTable } from './components/ServiceScheduleTable'
import { Schedule } from '@/features/_shared/types'
import { ServiceAvailableSpotsBadge } from './components/ServiceAvailableSpotsBadge'
import { ServiceStatusBadge } from './components/ServiceStatusBadge'
import clsx from 'clsx'

type Props = {
  schedule: Schedule
}

export const ServiceSchedule = ({ schedule }: Props) => {
  const isScheduled = schedule.status === 'scheduled'
  const isCancelled = schedule.status === 'cancelled'
  const showAvailableSpots = isScheduled && schedule.hasLimitedSpots && schedule.numberOfSpots
  const showHeader = schedule.title || schedule.description || showAvailableSpots || !isScheduled

  return (
    <Card className={clsx('border-primary/20', isCancelled && 'opacity-60')}>
      <CardContent className="p-4">
        {showHeader && (
          <div className="bg-muted rounded-t-lg p-4 -m-4 mb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-lg font-bold text-foreground">{schedule.title}</h5>
                </div>
                {schedule.description && (
                  <p className="mt-2 text-sm text-foreground/90">{schedule.description}</p>
                )}
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <ServiceStatusBadge status={schedule.status} />
                {showAvailableSpots && schedule.numberOfSpots && (
                  <ServiceAvailableSpotsBadge numberOfSpots={schedule.numberOfSpots} />
                )}
              </div>
            </div>
          </div>
        )}

        {schedule.scheduleItems && (
          <ServiceScheduleTable
            scheduleItems={schedule.scheduleItems}
            isEverythingCancelled={isCancelled}
          />
        )}
      </CardContent>
    </Card>
  )
}
