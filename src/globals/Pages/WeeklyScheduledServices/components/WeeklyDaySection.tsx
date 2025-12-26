export const WeeklyDaySection = ({
  day,
  date,
  children,
}: {
  day: string
  date: string
  children: React.ReactNode
}) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          {`${day} ${date}`}
        </h2>
        <div className="flex-1 h-px bg-primary/30"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
    </div>
  )
}
