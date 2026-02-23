'use client'
import { useState, useEffect } from 'react'
import { X, Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import type { AnnouncementBanner as AnnouncementBannerType } from '@/payload-types'
import RichText from '@/components/RichText'

const icons: Record<AnnouncementBannerType['type'], React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
}

const styles: Record<AnnouncementBannerType['type'], string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  warning: 'bg-orange-50 border-orange-200 text-orange-900',
  success: 'bg-green-50 border-green-200 text-green-900',
  error: 'bg-red-50 border-red-200 text-red-900',
}

const iconColors: Record<AnnouncementBannerType['type'], string> = {
  info: 'text-blue-600',
  warning: 'text-orange-600',
  success: 'text-green-600',
  error: 'text-red-600',
}

type Props = NonNullable<AnnouncementBannerType> & {
  id: string
}

export function AnnouncementBanner({
  id,
  message,
  type = 'info',
  dismissible = true,
  showOnce = true,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (showOnce) {
      const dismissed = localStorage.getItem(`announcement-banner-dismissed-${id}`)
      setIsVisible(!dismissed)
    } else {
      setIsVisible(true)
    }
  }, [id, showOnce])

  const handleDismiss = () => {
    setIsVisible(false)
    if (showOnce) {
      localStorage.setItem(`announcement-banner-dismissed-${id}`, 'true')
    }
  }

  const Icon = icons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={`${styles[type]} border-b`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Icon className={`w-5 h-5 shrink-0 ${iconColors[type]}`} />
                  <RichText
                    data={message}
                    enableGutter={false}
                    enableProse={false}
                    className="text-sm sm:text-base [&_p]:m-0"
                  />
                </div>
                {dismissible && (
                  <button
                    onClick={handleDismiss}
                    className={`p-1 hover:opacity-70 transition-opacity cursor-pointer shrink-0 ${iconColors[type]}`}
                    aria-label="Zavřít oznámení"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
