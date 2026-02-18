import { ContactPageContent } from '@/globals/Pages/Contact/ContactPageContent'
import type { ContactPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export default async function Page() {
  const data = (await getGlobal('contactPage', 1)) as ContactPage
  return <ContactPageContent data={data} />
}
