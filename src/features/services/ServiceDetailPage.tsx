import { Service } from '@/payload-types'
import { ServiceDetailContent } from './components/ServiceDetailContent/ServiceDetailContent'
import { ServiceDetailCtaButtons } from './components/ServiceDetailCtaButtons'
import { ServiceDetailHeader } from './components/ServiceDetailHeader'
import { notFound } from 'next/navigation'

type Props = {
  service: Service
}

export function ServiceDetailPage({ service }: Props) {
  if (!service.card) {
    return notFound()
  }

  return (
    <main className="min-h-dvh bg-background">
      <ServiceDetailHeader title={service.title} icon={service.icon} />
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ServiceDetailContent service={service} isPageDetail />
          <ServiceDetailCtaButtons ctaButtons={service.detail?.ctaButtons} />
        </div>
      </section>
    </main>
  )
}
