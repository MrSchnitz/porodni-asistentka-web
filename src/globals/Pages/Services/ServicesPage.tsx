import { getGlobal } from '@/utilities/getGlobals'
import ServicesPageClient from './ServicesPage.client'
import { ServicesPage as ServicesPageType } from '@/payload-types'

export default async function ServicesPage() {
  const data = (await getGlobal('servicesPage', 2)) as ServicesPageType
  
  return <ServicesPageClient data={data} />
}
