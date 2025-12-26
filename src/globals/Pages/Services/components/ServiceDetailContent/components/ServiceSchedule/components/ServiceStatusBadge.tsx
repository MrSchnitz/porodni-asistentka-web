import { Badge } from '@/components/ui/badge'

import { ScheduleStatus } from '../../../../../types'

export const ServiceStatusBadge = ({ status }: { status: ScheduleStatus }) => {
  switch (status) {
    case 'booked':
      return <Badge className="bg-red-500 text-white font-medium">Obsazeno</Badge>
    case 'cancelled':
      return <Badge className="bg-red-500 text-white font-medium">Zrušeno</Badge>
    default:
      return null
  }
}
