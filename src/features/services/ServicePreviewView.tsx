'use client'

import { LayoutGrid, FileText } from 'lucide-react'
import { useState } from 'react'
import { Service } from '@/payload-types'
import { ServiceDetailPage } from '@/features/services/ServiceDetailPage'
import { ServicePageCard } from '@/features/services/components/ServicePage/ServicePageCard'
import { cn } from '@/utilities/ui'

type View = 'card' | 'detail'

type Props = {
  service: Service
}

/**
 * Service preview with Service card / Service detail toggle –
 * admin has no active tab in postMessage, so the choice is made in the preview.
 */
export function ServicePreviewView({ service }: Props) {
  const [view, setView] = useState<View>('detail')

  const hasCard = !!service?.card
  const hasDetail = !!service?.detail

  return (
    <div className="min-h-dvh bg-background">
      {/* Preview bar – visually separated from page content */}
      <div
        className="sticky top-0 z-10 flex justify-center items-center gap-3 border-y-2 border-amber-500/40 bg-amber-50/80 px-4 py-2 shadow-sm dark:border-amber-400/30 dark:bg-amber-950/30"
        role="tablist"
        aria-label="Přepínač zobrazení náhledu"
      >
        <div className="flex gap-4">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'card'}
            className={cn(
              'flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors',
              view === 'card'
                ? 'border-amber-500/60 bg-amber-500/20 text-amber-900 dark:border-amber-400/50 dark:bg-amber-500/25 dark:text-amber-100'
                : 'border-amber-300/40 bg-white/60 text-amber-800/80 hover:bg-amber-100/60 dark:border-amber-600/40 dark:bg-amber-900/30 dark:text-amber-200/80 dark:hover:bg-amber-800/40',
            )}
            onClick={() => setView('card')}
          >
            <LayoutGrid className="size-3.5" aria-hidden />
            Kartička služby
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'detail'}
            className={cn(
              'flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors',
              view === 'detail'
                ? 'border-amber-500/60 bg-amber-500/20 text-amber-900 dark:border-amber-400/50 dark:bg-amber-500/25 dark:text-amber-100'
                : 'border-amber-300/40 bg-white/60 text-amber-800/80 hover:bg-amber-100/60 dark:border-amber-600/40 dark:bg-amber-900/30 dark:text-amber-200/80 dark:hover:bg-amber-800/40',
            )}
            onClick={() => setView('detail')}
          >
            <FileText className="size-3.5" aria-hidden />
            Detail služby
          </button>
        </div>
      </div>

      {view === 'card' && (
        <div className="p-6">
          {hasCard ? (
            <div className="mx-auto max-w-md">
              <ServicePageCard pageName="sluzby" data={service} />
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              Vyplňte sekci Kartička služby v adminu.
            </p>
          )}
        </div>
      )}

      {view === 'detail' && (
        <>
          {hasCard && hasDetail ? (
            <ServiceDetailPage service={service} />
          ) : (
            <p className="text-center text-muted-foreground py-12 px-4">
              {!hasCard && !hasDetail
                ? 'Vyplňte Kartičku služby a Detail služby v adminu.'
                : !hasCard
                  ? 'Vyplňte sekci Kartička služby v adminu.'
                  : 'Vyplňte sekci Detail služby v adminu.'}
            </p>
          )}
        </>
      )}
    </div>
  )
}
