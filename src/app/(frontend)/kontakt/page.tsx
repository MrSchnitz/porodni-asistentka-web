import type { Metadata } from 'next'
import { ContactPageContent } from '@/features/contact/ContactPageContent'
import type { ContactPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktujte porodní asistentku – rezervace termínů, dotazy ke službám a doprovodu u porodu.',
}

export default async function Page() {
  const data = (await getGlobal('contactPage', 1)) as ContactPage
  return <ContactPageContent data={data} />
}
