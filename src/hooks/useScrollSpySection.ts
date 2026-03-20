'use client'

import { useLayoutEffect, useState } from 'react'

/**
 * Active section = last one (in page order) whose top has passed the nav offset;
 * at the top of the page, the first section wins.
 */
function pickActiveSectionId(ids: string[], offsetPx: number, slackPx = 8): string | null {
  if (ids.length === 0) return null

  let active: string | null = null
  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= offsetPx + slackPx) {
      active = id
    }
  }
  return active ?? ids[0]
}

export function useScrollSpySection(sectionIds: string[], offsetPx: number) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (sectionIds.length === 0) {
      setActiveId(null)
      return
    }

    let raf = 0
    const update = () => {
      setActiveId(pickActiveSectionId(sectionIds, offsetPx))
    }

    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sectionIds, offsetPx])

  return activeId
}
