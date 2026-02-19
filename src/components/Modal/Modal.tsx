'use client'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState, useCallback, useImperativeHandle, useRef } from 'react'

type ModalImperativeHandle = {
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
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export function Modal({
  children,
  onCloseComplete,
  isVisible = true,
  ref,
  className,
  backdropClassName,
  modalClassName,
  ...ariaProps
}: Props) {
  const [isOpen, setIsOpen] = useState(isVisible)
  const modalRef = useRef<HTMLDivElement>(null)

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

  // Focus modal when opened
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus()
    }
  }, [isOpen])

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
            aria-hidden="true"
          />

          {/* Animated content container */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'relative z-60 w-full max-w-4xl max-h-[95dvh] overflow-y-auto rounded-2xl outline-none',
              modalClassName,
            )}
            {...ariaProps}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
