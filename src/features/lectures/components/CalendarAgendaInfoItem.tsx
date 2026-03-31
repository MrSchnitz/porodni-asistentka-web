import { IconName } from '@/components/ui/icon-picker'
import { cn } from '@/lib/utils'
import { DynamicIcon } from 'lucide-react/dynamic'

export const CalendarAgendaInfoItem = ({
  icon,
  title,
  value,
  isCancelled,
}: {
  icon: IconName | null
  title: string
  value: string
  isCancelled: boolean
}) => {
  return (
    <div className="flex items-center gap-1.5 text-xs md:text-sm text-foreground shrink-0">
      {icon && (
        <DynamicIcon name={icon} className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
      )}
      <span className={cn(isCancelled && 'line-through')}>
        {title && <strong>{title}: </strong>}
        {value}
      </span>
    </div>
  )
}
