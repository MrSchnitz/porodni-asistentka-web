import { DynamicIcon, IconName } from 'lucide-react/dynamic'

type ContentSectionProps = {
  icon: IconName
  title: string
  description?: string
  children: React.ReactNode
  withBackground?: boolean
}

export const ServiceContentSection = ({
  icon,
  title,
  description,
  children,
  withBackground,
}: ContentSectionProps) => {
  const content = (
    <>
      <div className="flex items-center gap-2 mb-4">
        {icon && <DynamicIcon name={icon} className="w-5 h-5 text-primary" aria-hidden="true" />}
        <h3 className="text-xl font-medium text-foreground">{title}</h3>
      </div>
      {description && <p className="text-lg text-foreground/70 mb-4">{description}</p>}
      {children}
    </>
  )

  if (withBackground) {
    return <div className="bg-muted rounded-xl p-4 border border-primary/20">{content}</div>
  }

  return content
}
