'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

const NAVBAR_HEIGHT = 80 // h-20 = 80px

type Props = {
  /** Content shown in normal document flow */
  children: React.ReactNode
  /** Content shown in fixed header (defaults to children) */
  fixedContent?: React.ReactNode
  /** Class for the original wrapper */
  className?: string
  /** Class for the fixed wrapper */
  fixedClassName?: string
  /** Whether to wrap fixed content in container */
  fixedContainer?: boolean
  /** Custom max-width for fixed container */
  fixedMaxWidth?: string
}

export function StickyHeader({
  children,
  fixedContent,
  className,
  fixedClassName,
  fixedContainer = true,
  fixedMaxWidth = 'max-w-6xl',
}: Props) {
  const [showFixed, setShowFixed] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFixed(!entry.isIntersecting)
      },
      {
        rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
        threshold: 0,
      }
    )

    observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  const content = fixedContent ?? children

  return (
    <>
      {/* Original content in document flow */}
      <div ref={headerRef} className={className}>
        {children}
      </div>

      {/* Fixed header that appears when original scrolls out */}
      <AnimatePresence>
        {showFixed && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'fixed top-18 sm:top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-primary/10 py-3',
              fixedClassName
            )}
          >
            {fixedContainer ? (
              <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', fixedMaxWidth)}>
                {content}
              </div>
            ) : (
              content
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

