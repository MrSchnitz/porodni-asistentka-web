import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'
import type { ServiceStatus } from '@/payload-types'
import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'
import { isRichTextEmpty } from '@/utilities/richText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { AdditionalInfo } from '@/features/_shared/types'
import { CalendarAgendaStatusBadge } from '@/features/lectures/components/CalendarAgendaStatusBadge'
import { CalendarAgendaInfoItem } from '@/features/lectures/components/CalendarAgendaInfoItem'
import { IconName } from '@/components/ui/icon-picker'

const DISPLAY_TZ = 'Europe/Prague'

type Props = {
  title: string
  startDate: string
  endDate: string
  description?: DefaultTypedEditorState | null
  infoItems?: AdditionalInfo[] | null
  status?: ServiceStatus
  hasLimitedSpots?: boolean | null
  numberOfSpots?: number | null
}

export const CalendarAgendaItem = ({
  title,
  startDate,
  endDate,
  description,
  infoItems,
  status,
  hasLimitedSpots,
  numberOfSpots,
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
        'border border-primary/20 rounded-lg overflow-hidden bg-background max-w-4xl',
        isCancelled && 'opacity-70',
      )}
    >
      <div className="flex">
        {/* Date and time */}
        <div className="bg-primary/10 border-r border-primary/20 p-2 md:p-3 flex flex-col items-center justify-center w-[80px] md:w-[100px] shrink-0">
          <div className="text-xl md:text-2xl font-bold text-foreground">{dayNum}</div>
          <div className="text-sm md:text-base font-bold text-foreground/90">{time}</div>
          <div className="mt-1">
            <CalendarAgendaStatusBadge
              status={!isScheduled ? status : null}
              numberOfSpots={showAvailableSpots ? numberOfSpots : null}
            />
          </div>
        </div>

        {/* Title and description */}
        <div className="flex-1 p-3">
          <h3
            className={cn(
              'flex mb-2 text-base md:text-lg font-bold text-foreground leading-tight',
              isCancelled && 'line-through text-foreground/60',
            )}
          >
            {title}
          </h3>

          {description && !isRichTextEmpty(description) && (
            <RichText
              className={cn(
                'text-xs md:text-sm text-foreground mb-3',
                isCancelled && 'opacity-60 line-through',
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
            {infoItems &&
              infoItems.length > 0 &&
              infoItems.map((item) => (
                <CalendarAgendaInfoItem
                  key={item.id}
                  icon={item.icon as IconName | null}
                  title={item.title ?? ''}
                  value={item.value ?? ''}
                  isCancelled={isCancelled}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
