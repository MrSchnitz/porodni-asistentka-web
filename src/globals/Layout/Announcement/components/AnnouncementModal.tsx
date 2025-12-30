'use client'
import { useState, useEffect } from 'react'
import { X, Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import type { AnnouncementModal as AnnouncementModalType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Modal } from '@/components/Modal/Modal'
import { Button } from '@/components/ui/button'

const icons: Record<AnnouncementModalType['type'], React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
}

const colors: Record<AnnouncementModalType['type'], string> = {
  info: 'text-blue-600',
  warning: 'text-orange-600',
  success: 'text-green-600',
  error: 'text-red-600',
}

const bgColors: Record<AnnouncementModalType['type'], string> = {
  info: 'bg-blue-50',
  warning: 'bg-orange-50',
  success: 'bg-green-50',
  error: 'bg-red-50',
}

type Props = NonNullable<AnnouncementModalType> & {
  id: string
}

export function AnnouncementModal({
  id,
  title,
  message,
  type = 'info',
  showOnce = true,
  buttonText = 'Rozumím',
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (showOnce) {
      const dismissed = localStorage.getItem(`announcement-modal-dismissed-${id}`)
      if (!dismissed) {
        // Zobrazit modal s mírným zpožděním pro lepší UX
        setTimeout(() => setIsVisible(true), 500)
      }
    } else {
      setTimeout(() => setIsVisible(true), 500)
    }
  }, [id, showOnce])

  const handleDismiss = () => {
    setIsVisible(false)
    if (showOnce) {
      localStorage.setItem(`announcement-modal-dismissed-${id}`, 'true')
    }
  }

  const Icon = icons[type]

  return (
    <>
      <Modal
        isVisible={isVisible}
        onCloseComplete={handleDismiss}
        modalClassName="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden m-4"
      >
        {/* Header s ikonou */}
        <div className={`${bgColors[type]} p-6 relative`}>
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 hover:opacity-70 transition-opacity"
            aria-label="Zavřít"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-4">
            <div className={`${colors[type]} bg-white rounded-full p-3`}>
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-gray-900 pr-8">{title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <RichText
            data={message}
            enableGutter={false}
            enableProse={false}
            className="text-gray-700 leading-relaxed [&_p]:m-0"
          />
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <Button onClick={handleDismiss} size="lg" className="w-full text-white">
            {buttonText}
          </Button>
        </div>
      </Modal>
    </>
  )
}
