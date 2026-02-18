import ServicesPage from '@/globals/Pages/Services/ServicesPage'
import type { ServicesPage as ServicesPageType } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export default async function Page() {
  const data = (await getGlobal('servicesPage', 3)) as ServicesPageType
  return <ServicesPage data={data} />
}
