import { HeroSection } from './HeroSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Home as HomeType } from '@/payload-types'
import { ServicesSection } from './ServicesSection'
import { ReviewsSection } from './ReviewsSection'

export async function Home() {
  const homeData = (await getCachedGlobal('home', 1)()) as HomeType

  return (
    <>
      <HeroSection data={homeData.hero} />
      <ServicesSection data={homeData.services} />
      <ReviewsSection data={homeData.reviews} />
    </>
  )
}
