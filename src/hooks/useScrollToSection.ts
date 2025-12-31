'use client'

import { useCallback } from 'react'
import { useBreakpoint } from './useMediaQuery'

// Layout constants
const MAIN_NAVBAR_HEIGHT = { mobile: 72, desktop: 80 }
const STICKY_NAVBAR_HEIGHT = 52

export function useScrollToSection() {
  const isSmOrLarger = useBreakpoint('sm')
  const mainNavbarHeight = isSmOrLarger ? MAIN_NAVBAR_HEIGHT.desktop : MAIN_NAVBAR_HEIGHT.mobile
  const totalOffset = mainNavbarHeight + STICKY_NAVBAR_HEIGHT

  const scrollToSection = useCallback(
    (id?: string | null) => {
      if (typeof window === 'undefined' || !id) {
        return
      }

      const section = document.getElementById(id)
      if (section) {
        const elementPosition = section.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - totalOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    },
    [totalOffset],
  )

  return { scrollToSection, totalOffset, mainNavbarHeight }
}
