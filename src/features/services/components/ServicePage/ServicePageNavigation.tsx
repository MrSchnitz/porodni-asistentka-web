'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { StickyHeader } from '@/features/_shared/StickyNavbar'
import { useBreakpoint } from '@/hooks/useMediaQuery'
import { useScrollSpySection } from '@/hooks/useScrollSpySection'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { cn } from '@/lib/utils'
import { ServicePageSections } from '@/features/_shared/types'

type Props = {
  serviceSections: ServicePageSections
}

export function ServicePageNavigation({ serviceSections }: Props) {
  const isSmOrLarger = useBreakpoint('sm')
  const { scrollToSection, totalOffset } = useScrollToSection()

  const navigableSections = useMemo(
    () =>
      serviceSections.filter(
        (
          s,
        ): s is typeof s & {
          id: string
          servicesSection: NonNullable<(typeof s)['servicesSection']>
        } => Boolean(s.id && s.servicesSection?.title),
      ),
    [serviceSections],
  )

  const sectionIds = useMemo(() => navigableSections.map((s) => s.id), [navigableSections])
  const activeId = useScrollSpySection(sectionIds, totalOffset)

  return (
    <StickyHeader>
      {({ showFixed }) => (
        <div className="overflow-x-auto scrollbar-hide pb-1 -mb-1">
          <div className="flex gap-2 sm:gap-3 w-fit mx-auto">
            {navigableSections.map(({ id, servicesSection }) => {
              const isActive = showFixed && activeId === id
              return (
                <Button
                  key={id}
                  variant="outline"
                  size={isSmOrLarger ? 'default' : 'sm'}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    'shrink-0 bg-background hover:bg-primary/10',
                    isActive
                      ? 'bg-primary/60 hover:bg-primary/80 text-foreground'
                      : 'border-primary/30',
                  )}
                >
                  {servicesSection.title}
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </StickyHeader>
  )
}
