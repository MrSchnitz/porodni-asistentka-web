import { getGlobal } from '@/utilities/getGlobals'
import { ServicesPage as ServicesPageType } from '@/payload-types'
import ServicesPage from '@/globals/Pages/Services/ServicesPage'

export default async function Page() {
  const data = (await getGlobal('servicesPage', 3)) as ServicesPageType

  return <ServicesPage data={data} />
}
