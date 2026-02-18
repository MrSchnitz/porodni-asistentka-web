import { AboutPageContent } from '@/globals/Pages/About/AboutPageContent'
import type { AboutPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export default async function Page() {
  const data = (await getGlobal('aboutPage', 1)) as AboutPage
  return <AboutPageContent data={data} />
}
