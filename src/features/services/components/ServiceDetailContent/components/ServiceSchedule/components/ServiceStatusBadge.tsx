import { Badge } from '@/components/ui/badge'

import { ScheduleStatus } from '@/features/_shared/types'

export const ServiceStatusBadge = ({ status }: { status: ScheduleStatus }) => {
  switch (status) {
    case 'booked':
      return <Badge className="bg-red-100 text-red-400 text-xs font-medium">Obsazeno</Badge>
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-600 text-xs font-medium">Zrušeno</Badge>
    case 'inProgress':
      return <Badge className="bg-yellow-100 text-green-600 text-xs font-medium">Probíhá</Badge>
    default:
      return null
  }
}
