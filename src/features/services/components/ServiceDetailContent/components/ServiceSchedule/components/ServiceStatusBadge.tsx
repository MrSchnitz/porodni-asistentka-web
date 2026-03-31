import { Badge } from '@/components/ui/badge'

import { ScheduleStatus } from '@/features/_shared/types'
import { cn } from '@/lib/utils'

type Props = {
  status: ScheduleStatus
  className?: string
}

export const ServiceStatusBadge = ({ status, className }: Props) => {
  switch (status) {
    case 'booked':
      return (
        <Badge className={cn('bg-red-100 text-red-400 text-xs font-bold', className)}>
          Obsazeno
        </Badge>
      )
    case 'cancelled':
      return (
        <Badge className={cn('bg-red-100 text-red-600 text-xs font-bold', className)}>
          Zrušeno
        </Badge>
      )
    case 'inProgress':
      return (
        <Badge className={cn('bg-yellow-100 text-green-600 text-xs font-bold', className)}>
          Probíhá
        </Badge>
      )
    default:
      return null
  }
}
