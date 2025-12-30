'use client'

import { Button } from '@/components/ui/button'
import { StickyHeader } from '../../../components/StickyNavbar'
import { useBreakpoint } from '@/hooks/useMediaQuery'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { ServicePageSections } from '../../../types'

type Props = {
  serviceSections: ServicePageSections
}

export function ServicePageNavigation({ serviceSections }: Props) {
  const isSmOrLarger = useBreakpoint('sm')
  const { scrollToSection } = useScrollToSection()

  return (
    <StickyHeader>
      <div className="overflow-x-auto scrollbar-hide pb-1 -mb-1">
        <div className="flex gap-2 sm:gap-3 w-fit mx-auto">
          {serviceSections.map(
            ({ id, servicesSection }) =>
              servicesSection?.title && (
                <Button
                  key={id}
                  variant="outline"
                  size={isSmOrLarger ? 'default' : 'sm'}
                  onClick={() => scrollToSection(id)}
                  className="border-primary/30 hover:bg-primary/10 shrink-0"
                >
                  {servicesSection.title}
                </Button>
              ),
          )}
        </div>
      </div>
    </StickyHeader>
  )
}
