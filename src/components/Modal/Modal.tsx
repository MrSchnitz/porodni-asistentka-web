'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Service } from '@/payload-types'
import { useEffect, useState, useCallback, useImperativeHandle } from 'react'

export type ModalImperativeHandle = {
  handleClose: () => void
}

type Props = {
  children: React.ReactNode
  ref?: React.RefObject<ModalImperativeHandle | null>
}

export function Modal({ children, ref }: Props) {
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

  useImperativeHandle(ref, () => ({
    handleClose,
  }))

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
            className="relative z-50 w-full max-w-4xl max-h-[95dvh] overflow-y-auto rounded-2xl"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
