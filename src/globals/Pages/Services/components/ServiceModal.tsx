'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Service } from '@/payload-types'
import { ServiceContent } from './ServiceContent'
import { useEffect, useState, useCallback } from 'react'

type Props = {
  service: Service
}

export function ServiceModal({ service }: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Navigate back after exit animation completes
  const handleAnimationComplete = () => {
    if (!isOpen) {
      router.back()
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Animated backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Animated content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-primary/30">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors z-10"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <div className="p-6">
                <ServiceContent service={service} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
