'use client'
import { Service, ServicesPage } from '@/payload-types'
import { PageHeader } from '../components/PageHeader'
import { ServicePageCard } from './components/ServicePageCard'
import { usePathname } from 'next/navigation'

type Props = {
  data: ServicesPage
}

export default function ServicesPageClient({ data: { pageHeader, services } }: Props) {
  const pathname = usePathname()

  const pageName = pathname.split('/')[1]

  return (
    <main>
      <PageHeader data={pageHeader} />

      {/* Services Grid */}
      {services && (
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map(({ id, item }) => (
                <ServicePageCard key={id} pageName={pageName} data={item.value as Service} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
