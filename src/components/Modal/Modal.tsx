'use client'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState, useCallback, useImperativeHandle } from 'react'

export type ModalImperativeHandle = {
  handleClose: () => void
}

type Props = {
  children: React.ReactNode
  onCloseComplete?: () => void
  isVisible?: boolean
  ref?: React.RefObject<ModalImperativeHandle | null>
  className?: string
  backdropClassName?: string
  modalClassName?: string
}

export function Modal({
  children,
  onCloseComplete,
  isVisible = true,
  ref,
  className,
  backdropClassName,
  modalClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState(isVisible)

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }, [])

  // Navigate back after exit animation completes
  const handleAnimationComplete = () => {
    if (!isOpen) {
      onCloseComplete?.()
    }
  }

  useImperativeHandle(ref, () => ({
    handleClose,
  }))

  useEffect(() => {
    if (isVisible) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [isVisible, handleOpen, handleClose])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [handleClose])

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isOpen && (
        <div className={cn('fixed inset-0 z-60 flex items-center justify-center', className)}>
          {/* Animated backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn('fixed inset-0 bg-black/50 backdrop-blur-sm', backdropClassName)}
            onClick={handleClose}
          />

          {/* Animated content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'relative z-60 w-full max-w-4xl max-h-[95dvh] overflow-y-auto rounded-2xl',
              modalClassName,
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
