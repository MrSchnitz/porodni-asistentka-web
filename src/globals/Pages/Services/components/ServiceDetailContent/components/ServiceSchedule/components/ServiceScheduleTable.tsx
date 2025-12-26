import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'
import clsx from 'clsx'
import { Calendar, Clock } from 'lucide-react'
import { ScheduleItems, ScheduleStatus } from '../../../../../types'
import { ServiceStatusBadge } from './ServiceStatusBadge'

const getIsAvailable = (status: ScheduleStatus) => {
  return !['cancelled', 'booked'].includes(status ?? '')
}

type Props = {
  scheduleItems: ScheduleItems
}

export const ServiceScheduleTable = ({ scheduleItems }: Props) => {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Datum</TableHead>
              <TableHead className="w-[150px]">Čas</TableHead>
              <TableHead>Obsah lekce</TableHead>
              <TableHead>Poznámky</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleItems.map(({ id, startDate, endDate, lesson, notes, status }) => {
              const isAvailable = getIsAvailable(status)
              const { dateString, timeString } = formatServiceDateTime({
                startDate,
                endDate,
              })

              return (
                <TableRow key={id} className={clsx(!isAvailable && 'line-through')}>
                  <TableCell className="font-medium">{dateString}</TableCell>
                  <TableCell>{timeString}</TableCell>
                  <TableCell>{lesson}</TableCell>
                  <TableCell>
                    {isAvailable ? notes : <ServiceStatusBadge status={status} />}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {scheduleItems.map(({ id, startDate, endDate, notes, lesson, status }) => {
          const isAvailable = getIsAvailable(status)
          const { dateString, timeString } = formatServiceDateTime({
            startDate,
            endDate,
          })

          return (
            <Card key={id} className="border border-primary/20">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex gap-1 items-start">
                    <div className="space-y-2 flex-1">
                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span
                          className={clsx(
                            'font-medium text-foreground',
                            !isAvailable && 'line-through',
                          )}
                        >
                          {dateString}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span
                          className={clsx('text-foreground/80', !isAvailable && 'line-through')}
                        >
                          {timeString}
                        </span>
                      </div>
                    </div>
                    {!isAvailable && <ServiceStatusBadge status={status} />}
                  </div>

                  {/* Lesson content */}
                  {lesson && (
                    <div className="pt-2 border-t border-primary/20">
                      <span className={clsx('text-foreground/80', !isAvailable && 'line-through')}>
                        {lesson}
                      </span>
                    </div>
                  )}

                  {/* Notes */}
                  {notes && (
                    <div className="pt-2 border-t border-primary/20">
                      <span className="text-foreground/80">{notes}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
