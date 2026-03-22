'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PAGE_ROUTES } from '@/features/_shared/pageRoutes'
import { cn } from '@/lib/utils'

function shouldNavigateBackInBrowser(): boolean {
  if (typeof window === 'undefined') return false
  const ref = document.referrer
  if (ref) {
    try {
      return new URL(ref).origin === window.location.origin
    } catch {
      return false
    }
  }
  return window.history.length > 1
}

type Props = {
  compact?: boolean
}

export function ServiceDetailBackButton({ compact }: Props) {
  return (
    <Link
      href={PAGE_ROUTES.servicesPage.path}
      className={compact ? 'shrink-0' : undefined}
      aria-label="Zpět na přehled služeb"
      onClick={(e) => {
        if (!shouldNavigateBackInBrowser()) return
        e.preventDefault()
        window.history.back()
      }}
    >
      <Button
        variant="ghost"
        size={compact ? 'sm' : 'default'}
        className={cn(
          'text-foreground/70 hover:text-foreground hover:bg-muted',
          compact ? 'h-8 px-2' : 'w-fit',
        )}
      >
        <ArrowLeft className={cn('mr-2', compact ? 'w-3 h-3' : 'w-4 h-4')} aria-hidden="true" />
        Zpět
      </Button>
    </Link>
  )
}
