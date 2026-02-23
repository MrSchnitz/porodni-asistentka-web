'use client'

import { ContactForm } from '@/features/contact/components/ContactForm'
import { ContactInformation } from '@/features/contact/components/ContactInformation'
import { PageHeader } from '@/features/_shared/PageHeader'
import { ContactPage } from '@/payload-types'

type Props = {
  data: ContactPage
}

export function ContactPageContent({ data }: Props) {
  return (
    <main className="min-h-dvh flex flex-col bg-linear-to-br from-background to-muted">
      <section id="contact" className="py-20 flex-1">
        <PageHeader data={data.pageHeader} className="bg-none py-0 sm:py-0 mb-16" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {data.contactInfo && (
              <div>
                <ContactInformation contactInfo={data.contactInfo} note={data.note ?? null} />
              </div>
            )}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
