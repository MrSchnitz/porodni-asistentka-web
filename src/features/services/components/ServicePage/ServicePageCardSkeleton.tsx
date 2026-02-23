function ServicePageCardSkeleton() {
  return (
    <div className="bg-background rounded-2xl p-6 shadow-sm border border-primary/30 animate-pulse h-full flex flex-col">
      {/* Icon + title row (same as ServicePageCard) */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 shrink-0 bg-primary/20 rounded-full" />
        <div className="h-7 bg-primary/20 rounded w-3/4" />
      </div>

      {/* Description skeleton - 3 lines */}
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-primary/15 rounded w-full" />
        <div className="h-4 bg-primary/15 rounded w-5/6" />
        <div className="h-4 bg-primary/15 rounded w-4/6" />
      </div>

      {/* Divider + single price line (Price: ...) */}
      <div className="mt-4 pt-4 border-t border-primary/20">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-primary/15 rounded w-12" />
          <div className="h-4 bg-primary/15 rounded w-28" />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-primary/30 rounded-lg w-full mt-4" />
    </div>
  )
}

export function ServicesGridSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <ServicePageCardSkeleton key={index} />
      ))}
    </>
  )
}
