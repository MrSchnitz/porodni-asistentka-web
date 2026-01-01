import { HeroSection } from './HeroSection'
import { getGlobal } from '@/utilities/getGlobals'
import { HomePage as HomePageType } from '@/payload-types'
import { ServicesSection } from './ServicesSection'
import { ReviewsSection } from './ReviewsSection'

export async function Home() {
  const homeData = (await getGlobal('homePage', 2)) as HomePageType

  return (
    <>
      <HeroSection data={homeData.hero} />
      <ServicesSection data={homeData.services} />
      <ReviewsSection data={homeData.reviews} />
    </>
  )
}
