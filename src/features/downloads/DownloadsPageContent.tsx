import { DownloadsPage as DownloadsPageType } from '@/payload-types'
import { PageHeader } from '@/features/_shared/PageHeader'
import { hasData } from '@/utilities/payload'
import { DownloadCard } from './components/DownloadCard'
import { ImportantItemsSection } from './components/ImportantItemsSection'

export function DownloadsPageContent({ data }: { data: DownloadsPageType }) {
  const { pageHeader, downloads, important } = data

  const hasDownloads = downloads?.length && downloads.length > 0

  return (
    <div className="min-dvh-screen bg-background">
      <PageHeader data={pageHeader} />

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Documents List */}
            {hasDownloads ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {downloads?.map(({ id, file }) => {
                  if (!hasData(file)) {
                    return null
                  }

                  return <DownloadCard key={id} {...file} />
                })}
              </div>
            ) : (
              <p
                className="text-2xl text-center text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Není dostupný žádný soubor ke stažení.
              </p>
            )}

            {/* Info Box */}
            {important?.infoItems && important.infoItems.length > 0 && (
              <ImportantItemsSection {...important} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
