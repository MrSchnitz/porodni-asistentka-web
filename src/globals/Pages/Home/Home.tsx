import { getGlobal } from '@/utilities/getGlobals'
import { HomePage as HomePageType } from '@/payload-types'
import { HomeContent } from './HomeContent'

export async function Home() {
  const homeData = (await getGlobal('homePage', 2)) as HomePageType
  return <HomeContent data={homeData} />
}
