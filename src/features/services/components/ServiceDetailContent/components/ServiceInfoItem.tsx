import { cn } from '@/lib/utils'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

type Props = {
  className?: string
  icon?: string | null
  title?: string | null
  value?: string | React.ReactNode
  inline?: boolean
}

export const ServiceInfoItem = ({ icon, title, value, className, inline = true }: Props) => {
  return (
    <div
      className={cn(
        'bg-background rounded-lg p-3 border border-primary/20 text-foreground/90',
        className,
      )}
    >
      <div className="flex gap-2 mb-1">
        {icon && (
          <DynamicIcon
            name={icon as IconName}
            className={cn(
              'w-4 h-4 text-primary shrink-0',
              inline ? 'self-baseline mt-1' : 'self-center',
            )}
            aria-hidden="true"
          />
        )}
        {inline ? (
          <span className="text-foreground/90">
            <span className="text-base font-bold mr-1.5">{title}:</span>
            <span className="text-base">{value}</span>
          </span>
        ) : (
          <span className="text-base font-bold">{title}</span>
        )}
      </div>
      {!inline && <span className="text-base">{value}</span>}
    </div>
  )
}
