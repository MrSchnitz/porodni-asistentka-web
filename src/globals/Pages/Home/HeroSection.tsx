'use client'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { HomePage } from '@/payload-types'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

type Props = {
  data: HomePage['hero']
}

export function HeroSection({ data: { title, subtitle, heroImage, quote, ctaButtons } }: Props) {
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
                <Sparkles className="w-6 h-6 text-primary" />
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
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
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
              </motion.div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Media resource={heroImage} />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
