import { cn } from '@/lib/utils'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

type Props = {
  className?: string
  icon?: string | null
  title: string
  value: string | React.ReactNode
}

export const ServiceInfoItem = ({ icon, title, value, className }: Props) => {
  return (
    <div className={cn('bg-background rounded-lg p-3 border border-primary/20', className)}>
      <div className="flex items-center gap-2 text-foreground/90 mb-1">
        {icon && (
          <DynamicIcon
            name={icon as IconName}
            className="w-4 h-4 text-primary"
            aria-hidden="true"
          />
        )}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className="text-base">{value}</span>
    </div>
  )
}
