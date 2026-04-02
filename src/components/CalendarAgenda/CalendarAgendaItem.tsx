import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'
import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'
import { isRichTextEmpty } from '@/utilities/richText'
import { parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { CalendarItem } from '@/features/_shared/types'
import { CalendarAgendaStatusBadge } from '@/components/CalendarAgenda/components/CalendarAgendaStatusBadge'
import { CalendarAgendaInfoItem } from '@/components/CalendarAgenda/components/CalendarAgendaInfoItem'
import { IconName } from '@/components/ui/icon-picker'
import { CalendarAgendaSignUpButton } from './CalendarAgendaSignUpButton'

const DISPLAY_TZ = 'Europe/Prague'

type Props = {
  calendarItem: CalendarItem
  isInsideTable?: boolean
}

export const CalendarAgendaItem = ({
  calendarItem: {
    title,
    startDate,
    endDate,
    description,
    additionalInfo,
    status,
    hasLimitedSpots,
    numberOfSpots,
  },
  isInsideTable = false,
}: Props) => {
  const start = startDate ? parseISO(startDate) : null
  const dayNum = start ? formatInTimeZone(start, DISPLAY_TZ, 'd. M.') : ''
  const time = start ? formatInTimeZone(start, DISPLAY_TZ, 'HH:mm') : ''
  const { completeDateString } = formatServiceDateTime({ startDate, endDate })
  const isScheduled = status === 'scheduled' || status == null
  const isCancelled = status === 'cancelled'
  const showAvailableSpots = isScheduled && hasLimitedSpots === true && numberOfSpots != null

  return (
    <div
      className={cn(
        'border-primary/30 overflow-hidden bg-background',
        isCancelled && 'opacity-70',
        isInsideTable ? 'border-t' : 'border rounded-lg max-w-4xl',
      )}
    >
      <div className="flex">
        {/* Date and time */}
        <div
          className={cn(
            'bg-primary/10 border-r border-primary/20 p-2 md:p-3 flex flex-col items-center justify-center w-[80px] md:w-[100px] shrink-0',
            isInsideTable && 'p-1 md:p-2',
          )}
        >
          <div
            className={cn(
              'font-bold text-foreground',
              isInsideTable ? 'text-base md:text-base' : 'text-xl md:text-2xl',
            )}
          >
            {dayNum}
          </div>
          <div
            className={cn(
              'font-bold text-foreground/90',
              isInsideTable ? 'text-xs md:text-xs' : 'text-sm md:text-base',
            )}
          >
            {time}
          </div>
          <div className="mt-1">
            <CalendarAgendaStatusBadge
              status={!isScheduled ? status : null}
              numberOfSpots={showAvailableSpots ? numberOfSpots : null}
            />
          </div>
        </div>

        {/* Title and description */}
        <div className={cn('flex-1 p-3', isInsideTable && 'p-2 bg-card')}>
          <h3
            className={cn(
              'flex mb-2 text-base md:text-lg font-bold text-foreground leading-tight',
              isCancelled && 'line-through text-foreground/60',
              isInsideTable && 'mb-0 text-sm md:text-sm',
            )}
          >
            {title}
          </h3>

          {description && !isRichTextEmpty(description) && (
            <RichText
              className={cn(
                'text-xs md:text-sm text-foreground mb-3',
                isCancelled && 'opacity-60 line-through',
                isInsideTable && 'mb-0 [&>p]:mt-0.5 [&>p]:mb-1',
              )}
              data={description}
            />
          )}

          <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-x-3 gap-y-2">
            {completeDateString && (
              <CalendarAgendaInfoItem
                icon="calendar"
                title="Datum"
                value={completeDateString}
                isCancelled={isCancelled}
              />
            )}
            {additionalInfo &&
              additionalInfo.length > 0 &&
              additionalInfo.map((item) => (
                <CalendarAgendaInfoItem
                  key={item.id}
                  icon={item.icon as IconName | null}
                  title={item.title ?? ''}
                  value={item.value ?? ''}
                  isCancelled={isCancelled}
                />
              ))}
          </div>

          {!isInsideTable && isScheduled && !isCancelled && (
            <CalendarAgendaSignUpButton className="mt-2" eventTitle={title} />
          )}
        </div>
      </div>
    </div>
  )
}
