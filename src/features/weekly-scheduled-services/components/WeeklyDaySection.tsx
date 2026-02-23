import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  children: React.ReactNode
  day: string
  date: string
}

export const WeeklyDaySection = ({ className, day, date, children }: Props) => {
  return (
    <div>
      <div
        className={cn(
          'sticky top-navbar-mobile sm:top-navbar z-10 flex items-center gap-4 py-6 bg-background/95 backdrop-blur-sm',
          className,
        )}
      >
        <h2 className="text-3xl text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          {`${day} ${date}`}
        </h2>
        <div className="flex-1 h-px bg-primary/30"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
    </div>
  )
}
