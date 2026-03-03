'use client'

import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

type Props = {
  images: (number | string | MediaType | null | undefined)[]
  interval?: number
  duration?: number
  className?: string
}

export function ImageCarousel({
  images: rawImages,
  interval = 5000,
  duration = 1,
  className,
}: Props) {
  const images = rawImages.filter((img): img is number | string | MediaType => img != null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = images[currentIndex]
  const optimizedCurrentImage =
    typeof currentImage === 'object' && currentImage !== null
      ? {
          ...currentImage,
          url: currentImage.sizes?.desktop?.url || currentImage.url,
          width: currentImage.sizes?.desktop?.width || currentImage.width,
          height: currentImage.sizes?.desktop?.height || currentImage.height,
        }
      : currentImage

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (images.length === 0) return null

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galerie obrázků"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: 'easeInOut' }}
          className="absolute inset-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`Obrázek ${currentIndex + 1} z ${images.length}`}
        >
          <Media
            resource={optimizedCurrentImage}
            fill
            imgClassName="object-cover"
            size="(max-width: 1023px) 0px, 42vw"
            quality={75}
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
      </AnimatePresence>

      {/* Screen reader announcement for slide changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Obrázek {currentIndex + 1} z {images.length}
      </div>
    </div>
  )
}
