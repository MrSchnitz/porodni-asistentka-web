import { HeroSection } from './HeroSection'
import { getGlobal } from '@/utilities/getGlobals'
import { HomePage as HomePageType } from '@/payload-types'
import { ServicesSection } from './ServicesSection'
import { ReviewsSection } from './ReviewsSection'
import { HeroImagePreload } from '@/components/HeroImagePreload/HeroImagePreload'

export async function Home() {
  const homeData = (await getGlobal('homePage', 2)) as HomePageType

  return (
    <>
      {/* Preload hero images - these <link> tags are hoisted to <head> by Next.js */}
      <HeroImagePreload images={homeData.hero.heroImages} />
      <HeroSection data={homeData.hero} />
      <ServicesSection data={homeData.services} />
      <ReviewsSection data={homeData.reviews} />
    </>
  )
}
