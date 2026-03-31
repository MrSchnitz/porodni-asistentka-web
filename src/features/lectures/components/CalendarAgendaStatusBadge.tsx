import { Badge } from '@/components/ui/badge'
import { ServiceStatusBadge } from '@/features/services/components/ServiceDetailContent/components/ServiceSchedule/components/ServiceStatusBadge'
import { ServiceStatus } from '@/payload-types'

export const CalendarAgendaStatusBadge = ({
  status,
  numberOfSpots,
}: {
  status: ServiceStatus
  numberOfSpots: number | null
}) => {
  if (status) {
    return <ServiceStatusBadge className="text-[10px] md:text-xs" status={status} />
  }

  if (numberOfSpots !== null) {
    if (numberOfSpots <= 0) {
      return <ServiceStatusBadge className="text-[10px] md:text-xs" status="booked" />
    }

    return (
      <Badge className="bg-background">
        {`${numberOfSpots} ${numberOfSpots === 1 ? 'místo' : numberOfSpots < 5 ? 'místa' : 'míst'}`}
      </Badge>
    )
  }

  return null
}
