'use client'

import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

type Props = {
  images: (number | string | MediaType | null | undefined)[]
  interval?: number
  className?: string
}

export function ImageCarousel({ images: rawImages, interval = 5000, className }: Props) {
  const images = rawImages.filter((img): img is number | string | MediaType => img != null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (images.length === 0) return null

  return (
    <div className={className}>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Media resource={images[currentIndex]} fill imgClassName="object-cover" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
