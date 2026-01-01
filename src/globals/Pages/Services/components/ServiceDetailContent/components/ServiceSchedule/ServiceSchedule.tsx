import { Card, CardContent } from '@/components/ui/card'
import { ServiceScheduleTable } from './components/ServiceScheduleTable'
import { Schedule } from '../../../../../types'
import { ServiceAvailableSpotsBadge } from './components/ServiceAvailableSpotsBadge'
import { ServiceStatusBadge } from './components/ServiceStatusBadge'

type Props = {
  schedule: Schedule
}

export const ServiceSchedule = ({ schedule }: Props) => {
  const showAvailableSpots =
    schedule.status === 'scheduled' && schedule.hasLimitedSpots && schedule.numberOfSpots
  const showStatusBadge = schedule.status !== 'scheduled'

  return (
    <Card className={`border-primary/20 ${schedule.status !== 'scheduled' ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="bg-muted rounded-t-lg p-4 -m-4 mb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h5 className="text-lg font-medium text-foreground">{schedule.title}</h5>
              </div>
              {schedule.description && (
                <p className="mt-2 text-sm text-foreground/60">{schedule.description}</p>
              )}
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              {showStatusBadge && <ServiceStatusBadge status={schedule.status} />}
              {showAvailableSpots && schedule.numberOfSpots && (
                <ServiceAvailableSpotsBadge numberOfSpots={schedule.numberOfSpots} />
              )}
            </div>
          </div>
        </div>

        {schedule.scheduleItems && <ServiceScheduleTable scheduleItems={schedule.scheduleItems} />}
      </CardContent>
    </Card>
  )
}
