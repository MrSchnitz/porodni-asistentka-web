import { Badge } from '@/components/ui/badge'

import { ScheduleStatus } from '../../../../../../types'

export const ServiceStatusBadge = ({ status }: { status: ScheduleStatus }) => {
  switch (status) {
    case 'booked':
      return <Badge className="bg-red-100 text-red-600 text-xs font-medium">Obsazeno</Badge>
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-600 text-xs font-medium">Zrušeno</Badge>
    default:
      return null
  }
}
