import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Home } from '@/payload-types'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  data: Home['hero']
}

export function HeroSection({ data: { title, subtitle, heroImage, quote, ctaButtons } }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-accent via-background to-accent/30">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            {quote && (
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <span
                  className="text-primary text-2xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {quote}
                </span>
              </div>
            )}

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl sm:text-2xl mb-8 text-foreground/80 max-w-xl">{subtitle}</p>
            )}

            {ctaButtons && (
              <div className="flex flex-col sm:flex-row gap-4">
                {ctaButtons.map((button, index) => (
                  <Link key={button.id} href={button.link.url ?? ''}>
                    <Button
                      size="lg"
                      variant={index > 0 ? 'outline' : 'default'}
                      className={cn({
                        'bg-primary hover:bg-secondary text-foreground px-8 shadow-lg': index === 0,
                        'border-primary text-primary hover:bg-primary/10': index > 0,
                      })}
                    >
                      {button.link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}

            {/* <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center">
                <div
                  className="text-3xl text-primary mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  15+
                </div>
                <div className="text-sm text-foreground/70">Let zkušeností</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl text-primary mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  500+
                </div>
                <div className="text-sm text-foreground/70">Spokojených rodin</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl text-primary mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  24/7
                </div>
                <div className="text-sm text-foreground/70">Dostupnost</div>
              </div>
            </div> */}
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Media resource={heroImage} />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
