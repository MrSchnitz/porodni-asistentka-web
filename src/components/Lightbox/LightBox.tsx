'use client'
import { X } from 'lucide-react'
import { Media } from '../Media'
import { Props as MediaProps } from '../Media/types'
import { createPortal } from 'react-dom'

type Props = {
  resource: MediaProps['resource']
  onClose: () => void
}

export const LightBox = ({ resource, onClose }: Props) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-2xl flex items-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>
        <Media resource={resource} imgClassName="object-contain rounded-lg shadow-2xl sm:w-full" />
      </div>
    </div>,
    document.body,
  )
}
