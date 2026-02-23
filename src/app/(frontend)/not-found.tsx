import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PAGE_ROUTES } from '@/features/_shared/pageRoutes'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-dvh py-16 sm:py-24 bg-linear-to-br from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-6xl sm:text-7xl font-medium text-primary/30 mb-4 tabular-nums"
            style={{ fontFamily: 'var(--font-display)' }}
            aria-hidden
          >
            404
          </p>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl text-foreground font-medium mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Jejda, tady nic není.
          </h1>
          <p className="text-foreground/80 text-base md:text-lg mb-8">
            Omlouváme se, požadovaná stránka neexistuje nebo byla přesunuta. Zkontrolujte adresu
            nebo se vraťte na úvodní stránku.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="bg-primary/60 hover:bg-secondary/60 text-foreground w-full sm:w-auto"
            >
              <Link href={PAGE_ROUTES.homePage.path}>
                <Home className="w-4 h-4" aria-hidden />
                Úvodní stránka
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={PAGE_ROUTES.servicesPage.path}>
                <ArrowLeft className="w-4 h-4" aria-hidden />
                Služby
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
