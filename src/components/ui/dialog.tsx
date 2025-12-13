'use client'
import * as React from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { createPortal } from 'react-dom'

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Dialog({ open, onClose, children }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Animated backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Animated content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

interface DialogContentProps {
  children: React.ReactNode
  onClose: () => void
}

export function DialogContent({ children, onClose }: DialogContentProps) {
  return (
    <div className="bg-card rounded-2xl shadow-2xl border border-primary/30">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors z-10"
      >
        <X className="w-6 h-6 text-foreground" />
      </button>
      {children}
    </div>
  )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pb-4">{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl text-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>
      {children}
    </h2>
  )
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-foreground/70">{children}</p>
}

export function DialogBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 pb-6">{children}</div>
}
