'use client'

import { useState, useEffect } from 'react'

/**
 * Tailwind breakpoints
 */
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof breakpoints

/**
 * Hook to check if viewport matches a media query
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Hook to check if viewport is at least the specified Tailwind breakpoint
 * @example useBreakpoint('md') // true if viewport >= 768px
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`)
}

/**
 * Hook to check if viewport is mobile (< sm breakpoint)
 */
export function useIsMobile(): boolean {
  const isSmOrLarger = useBreakpoint('sm')
  return !isSmOrLarger
}

/**
 * Get current breakpoint name
 */
export function useCurrentBreakpoint(): Breakpoint | 'xs' {
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  const isLg = useBreakpoint('lg')
  const isXl = useBreakpoint('xl')
  const is2xl = useBreakpoint('2xl')

  if (is2xl) return '2xl'
  if (isXl) return 'xl'
  if (isLg) return 'lg'
  if (isMd) return 'md'
  if (isSm) return 'sm'
  return 'xs'
}

