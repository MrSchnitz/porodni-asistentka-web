import { HomePageContent } from '@/features/home/HomePageContent'
import type { HomePage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export default async function HomePage() {
  const data = (await getGlobal('homePage', 2)) as HomePage
  return <HomePageContent data={data} />
}
