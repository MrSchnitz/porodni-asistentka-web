import type { Metadata } from 'next'
import { ServicesPageContent } from '@/features/services/ServicesPageContent'
import type { ServicesPage as ServicesPageType } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export const metadata: Metadata = {
  title: 'Služby',
  description:
    'Přehled služeb porodní asistentky – příprava na porod, doprovod u porodu, laktační poradenství a péče o rodinu.',
}

export default async function Page() {
  const data = (await getGlobal('servicesPage', 3)) as ServicesPageType
  return <ServicesPageContent data={data} />
}
