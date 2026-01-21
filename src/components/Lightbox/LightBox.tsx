'use client'
import { X } from 'lucide-react'
import { Media } from '../Media'
import { Props as MediaProps } from '../Media/types'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

type Props = {
  resource: MediaProps['resource']
  onClose: () => void
}

export const LightBox = ({ resource, onClose }: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Focus trap and escape key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Focus the dialog
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Zvětšený obrázek"
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center outline-none"
      onClick={onClose}
    >
      <div className="relative max-w-2xl flex items-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2"
          aria-label="Zavřít zvětšený obrázek"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
        <Media resource={resource} imgClassName="object-contain rounded-lg shadow-2xl sm:w-full" />
      </div>
    </div>,
    document.body,
  )
}
