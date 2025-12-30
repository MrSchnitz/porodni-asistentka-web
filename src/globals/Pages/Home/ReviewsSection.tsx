'use client'
import { HomePage } from '@/payload-types'
import { ReviewCard } from './components/ReviewCard'
import { motion } from 'motion/react'
import { hasData } from '@/utilities/payload'

type Props = {
  data: HomePage['reviews']
}

export function ReviewsSection({ data: { title, subtitle, reviews } }: Props) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-xl text-foreground/70">{subtitle}</p>}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => {
            if (!hasData(review.reference?.value)) {
              return null
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ReviewCard review={review.reference.value} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
