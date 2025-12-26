import { Service } from '@/payload-types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServiceDetailContent } from './components/ServiceDetailContent/ServiceDetailContent'
import { ServiceDetailHeader } from './components/ServiceDetailHeader'
import { PAGE_ROUTES } from '../pageRoutes'

type Props = {
  service: Service
}

export function ServiceDetailPage({ service }: Props) {
  return (
    <main className="min-h-dvh bg-background">
      <ServiceDetailHeader title={service.title} icon={service.icon?.lucideIcon ?? undefined} />
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ServiceDetailContent service={service} isPageDetail />
          <Link href={PAGE_ROUTES.contactPage.path}>
            <Button size="lg" className="w-full mt-6 bg-primary hover:bg-secondary text-foreground">
              Kontaktovat
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
