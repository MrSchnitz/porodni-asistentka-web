import { Card, CardHeader } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ServiceStatus } from '@/payload-types'
import { ServiceStatusBadge } from '../../Services/components/ServiceDetailContent/components/ServiceSchedule/components/ServiceStatusBadge'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PAGE_ROUTES } from '../../pageRoutes'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

const InfoItem = ({
  icon,
  value,
  isCancelled,
}: {
  icon: IconName
  value: string
  isCancelled: boolean
}) => {
  return (
    <div className="flex items-center gap-2 text-foreground/80">
      {icon && <DynamicIcon name={icon} className="w-4 h-4 text-primary" />}
      <span className={cn(isCancelled ? 'line-through' : '')}>{value}</span>
    </div>
  )
}

export const WeeklyScheduleCard = ({
  serviceName,
  tableName,
  lessonName,
  status,
  notes,
  time,
  location,
  slug,
}: {
  serviceName: string
  tableName: string
  lessonName: string
  status?: ServiceStatus
  notes: string
  time: string
  location: string
  slug: string
}) => {
  const isCancelled = ['cancelled', 'booked'].includes(status ?? '')

  return (
    <Link href={`${PAGE_ROUTES.servicesPage.path}/${slug}`}>
      <Card className="border-primary/30 transition-all duration-300 gap-0 group hover:shadow-lg cursor-pointer">
        <CardHeader className={cn(isCancelled && 'opacity-70')}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p
                className={cn(
                  'text-sm font-medium uppercase tracking-wide',
                  isCancelled ? 'text-foreground/40' : 'text-primary',
                )}
              >
                {serviceName}
              </p>
              <p
                className={cn('text-sm', isCancelled ? 'text-foreground/50' : 'text-foreground/80')}
              >
                {tableName}
              </p>
              <h3
                className={cn(
                  'text-base',
                  isCancelled ? 'text-foreground/50 line-through' : 'text-foreground',
                )}
              >
                {lessonName}
              </h3>
            </div>
            <ServiceStatusBadge status={status} />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div
            className={cn(
              'space-y-2 border-t border-primary/30 pt-3 text-sm',
              isCancelled && 'opacity-70',
            )}
          >
            <InfoItem icon="clock" value={time} isCancelled={isCancelled} />
            <InfoItem icon="map-pin" value={location} isCancelled={isCancelled} />
            {notes && <p className="text-foreground/80 m-0">{notes}</p>}
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-primary/30">
            <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all text-sm">
              <span>Zobrazit detail služby</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
