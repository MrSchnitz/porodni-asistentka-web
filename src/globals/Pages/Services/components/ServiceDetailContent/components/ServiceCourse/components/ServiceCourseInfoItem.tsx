import { DynamicIcon, IconName } from 'lucide-react/dynamic'

type Props = {
  icon?: string | null
  title: string
  value: string
}

export const ServiceCourseInfoItem = ({ icon, title, value }: Props) => {
  return (
    <div className="flex items-center gap-2 bg-background p-3 rounded-lg border border-primary/20">
      {icon && (
        <div className="bg-primary/10 p-2 rounded-full">
          <DynamicIcon name={icon as IconName} className="w-4 h-4 text-primary" />
        </div>
      )}
      <div>
        <p className="text-xs text-foreground/80">{title}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}
