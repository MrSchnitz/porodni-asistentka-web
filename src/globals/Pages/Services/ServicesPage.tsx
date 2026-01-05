'use client'

import { ServicesPage as ServicesPageType } from '@/payload-types'
import { PageHeader } from '../components/PageHeader'
import { ServicePageCard } from './components/ServicePage/ServicePageCard'
import { ServicePageSection } from './components/ServicePage/ServicePageSection'
import { ServicePageNavigation } from './components/ServicePage/ServicePageNavigation'
import { hasData } from '@/utilities/payload'
import { usePathname } from 'next/navigation'

type Props = {
  data: ServicesPageType
}

export default function ServicesPage({ data: { pageHeader, serviceSections } }: Props) {
  const pathname = usePathname()
  const pageName = pathname.split('/')[1]

  const showNavbar = serviceSections?.length && serviceSections.length > 1

  return (
    <main>
      <PageHeader
        data={pageHeader}
        navbar={
          showNavbar ? <ServicePageNavigation serviceSections={serviceSections ?? []} /> : undefined
        }
      />
      {serviceSections?.map(({ id, servicesSection }) => {
        if (!servicesSection?.serviceSectionItems?.length) {
          return null
        }
        const showThreeColumns = servicesSection.serviceSectionItems.length > 2

        return (
          <ServicePageSection
            key={id}
            id={id}
            icon={servicesSection.icon}
            title={servicesSection.title}
            description={servicesSection.description}
            showThreeColumns={showThreeColumns}
          >
            {servicesSection.serviceSectionItems.map(({ item, id }) => {
              if (!hasData(item.value)) {
                return null
              }

              return <ServicePageCard key={id} pageName={pageName} data={item.value} />
            })}
          </ServicePageSection>
        )
      })}
    </main>
  )
}
