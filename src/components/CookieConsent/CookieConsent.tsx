'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const COOKIE_NOTICE_KEY = 'cookie-notice-consent'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(COOKIE_NOTICE_KEY)
    if (!seen) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_NOTICE_KEY, new Date().toISOString())
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-label="Oznámení o cookies"
          aria-describedby="cookie-description"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-sm md:p-0"
        >
          <div
            className={cn(
              'overflow-hidden rounded-2xl border border-primary/20',
              'bg-card/95 backdrop-blur-sm',
              'shadow-lg shadow-primary/10',
            )}
          >
            {/* Decorative cookie */}
            <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.05]" aria-hidden="true">
              <Cookie className="size-24 text-primary" strokeWidth={1} />
            </div>

            <div className="relative p-4">
              <div className="mb-3 flex items-center gap-2">
                <Cookie className="size-5 text-primary" aria-hidden="true" />
                <span className="font-medium text-foreground">Cookies</span>
              </div>

              <p id="cookie-description" className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Na našich stránkách používáme pouze nezbytné cookies pro správné fungování webu.
              </p>

              <Button size="sm" onClick={handleAccept} className="w-full">
                Rozumím
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
