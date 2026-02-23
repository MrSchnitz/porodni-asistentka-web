'use client'

import { HeroImagePreload } from '@/components/HeroImagePreload/HeroImagePreload'
import { HeroSection } from '@/features/home/HeroSection'
import { ReviewsSection } from '@/features/home/ReviewsSection'
import { ServicesSection } from '@/features/home/ServicesSection'
import { HomePage } from '@/payload-types'

type Props = {
  data: HomePage
}

export function HomePageContent({ data }: Props) {
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
