'use client'

import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'
import { Button } from '@/components/ui/button'
import { HomePage } from '@/payload-types'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { getLinkUrl } from '@/utilities/getLinkUrl'

const DEFAULT_IMAGE_SWITCH_INTERVAL = 6000 // milliseconds (6 seconds)
const DEFAULT_IMAGE_SWITCH_DURATION = 1 // seconds

type Props = {
  data: HomePage['hero']
}

export function HeroSection({
  data: { title, subtitle, heroImages, switchInterval, quote, ctaButtons },
}: Props) {
  const imageSwitchInterval = switchInterval ? switchInterval * 1000 : DEFAULT_IMAGE_SWITCH_INTERVAL // switchInterval is in seconds, so we need to convert it to milliseconds

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-accent via-background to-accent/30">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {quote && (
              <motion.div
                className="flex items-center gap-2 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="w-6 h-6 text-primary" aria-hidden="true" />
                <span
                  className="text-primary text-2xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {quote}
                </span>
              </motion.div>
            )}

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                className="text-xl sm:text-2xl mb-8 text-foreground/80 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}

            {ctaButtons && (
              <motion.div
                className="flex flex-col flex-wrap sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {ctaButtons.map((button, index) => (
                  <Link key={button.id} href={getLinkUrl(button.link)}>
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
              </motion.div>
            )}
          </motion.div>

          {/* Image Carousel */}
          {heroImages && heroImages.length > 0 && (
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <ImageCarousel
                images={heroImages.map((img) => img.heroImage)}
                interval={imageSwitchInterval}
                duration={DEFAULT_IMAGE_SWITCH_DURATION}
                className="relative rounded-3xl overflow-hidden shadow-lg aspect-4/3"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 rounded-3xl bg-primary/10 pointer-events-none"></div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
