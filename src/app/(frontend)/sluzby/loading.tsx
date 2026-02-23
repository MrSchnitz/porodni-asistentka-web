import { ServicesGridSkeleton } from '@/features/services/components/ServicePage/ServicePageCardSkeleton'

export default function Loading() {
  return (
    <main>
      {/* Header skeleton */}
      <section className="py-10 sm:py-20 bg-linear-to-br from-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-pulse">
            <div className="h-12 bg-primary/15 rounded w-3/4 mx-auto mb-4" />
            <div className="h-6 bg-primary/15 rounded w-full max-w-xl mx-auto" />
          </div>
        </div>
      </section>
      {/* Services grid skeleton – same layout as ServicePageSection */}
      <section className="py-10 sm:py-20 even:bg-card odd:bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServicesGridSkeleton />
          </div>
        </div>
      </section>
    </main>
  )
}
