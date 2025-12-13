import { Service } from '@/payload-types'
import { ServiceContent } from './ServiceContent'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = {
  service: Service
}

export function ServiceDetailPage({ service }: Props) {
  return (
    <main className="min-h-screen bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/sluzby"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na služby</span>
          </Link>

          {/* Service Content */}
          <div className="bg-background rounded-2xl p-6 sm:p-8 shadow-lg border border-primary/20">
            <ServiceContent service={service} />
          </div>
        </div>
      </div>
    </main>
  )
}

