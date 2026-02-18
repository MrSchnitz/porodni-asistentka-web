'use client'

import { HeroImagePreload } from '@/components/HeroImagePreload/HeroImagePreload'
import { HeroSection } from '@/globals/Pages/Home/HeroSection'
import { ReviewsSection } from '@/globals/Pages/Home/ReviewsSection'
import { ServicesSection } from '@/globals/Pages/Home/ServicesSection'
import { HomePage } from '@/payload-types'

type Props = {
  data: HomePage
}

export function HomeContent({ data }: Props) {
  return (
    <>
      {data.hero && (
        <>
          <HeroImagePreload images={data.hero.heroImages} />
          <HeroSection data={data.hero} />
        </>
      )}
      {data.services && <ServicesSection data={data.services} />}
      {data.reviews && <ReviewsSection data={data.reviews} />}
    </>
  )
}
