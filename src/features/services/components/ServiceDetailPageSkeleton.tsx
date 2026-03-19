export function ServiceDetailPageSkeleton() {
  return (
    <main className="min-h-dvh bg-background">
      <div className="bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl animate-pulse">
          <div className="flex flex-col gap-6">
            <div className="h-10 w-28 bg-primary/15 rounded-md" />
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 shrink-0 bg-primary/20 rounded-full" />
              <div className="space-y-3 flex-1 min-w-0 pt-0.5">
                <div className="h-9 bg-primary/15 rounded-md w-4/5 max-w-lg" />
                <div className="h-4 bg-primary/15 rounded w-full" />
                <div className="h-4 bg-primary/15 rounded w-11/12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 animate-pulse">
          <div className="space-y-2">
            <div className="h-4 bg-primary/15 rounded w-full" />
            <div className="h-4 bg-primary/15 rounded w-full" />
            <div className="h-4 bg-primary/15 rounded w-5/6" />
            <div className="h-4 bg-primary/15 rounded w-4/6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-28 rounded-xl border border-primary/20 bg-card/80" />
            <div className="h-28 rounded-xl border border-primary/20 bg-card/80" />
          </div>

          <div className="space-y-3">
            <div className="h-6 bg-primary/20 rounded-md w-52" />
            <div className="h-36 rounded-xl border border-primary/20 bg-card/80" />
          </div>

          <div className="h-12 bg-primary/30 rounded-lg w-full mt-6" />
        </div>
      </section>
    </main>
  )
}
