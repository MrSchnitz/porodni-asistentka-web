import { DynamicIcon, IconName } from 'lucide-react/dynamic'

type Props = {
  id?: string | null
  icon?: string | null
  title?: string | null
  description?: string | null
  children: React.ReactNode
}

export function ServicePageSection({ id, icon, title, description, children }: Props) {
  return (
    <section id={id ?? undefined} className="py-10 sm:py-20 even:bg-card odd:bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          {icon && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-full mb-4">
              <DynamicIcon name={icon as IconName} className="w-8 h-8 text-white" />
            </div>
          )}
          {title && (
            <h2
              className="text-3xl sm:text-4xl mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">{children}</div>
      </div>
    </section>
  )
}
